import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { CVData } from "../types/cv";

/**
 * Generate a clean standard filename e.g. "Sokha_Chan_CV.pdf"
 */
export function getCVFileName(data: CVData): string {
  const fullName = data.personalInfo.fullName.trim();
  if (!fullName) return "My_Professional_CV.pdf";

  // Clean non-alphanumeric characters for filename while keeping basic English/Khmer name parts
  const sanitized = fullName
    .replace(/[^\w\s\u1780-\u17FF-]/g, "")
    .trim()
    .replace(/\s+/g, "_");

  return `${sanitized || "CV"}_Resume.pdf`;
}

/**
 * Method 1: Native High-Fidelity Vector Print
 * Opens browser print dialog with @media print stylesheet.
 * Guarantees 100% vector typography, selectable text, multi-page page breaks, and zero image pixelation.
 */
export function triggerVectorPrint(data: CVData): void {
  const originalTitle = document.title;
  const fileName = getCVFileName(data).replace(/\.pdf$/i, "");

  try {
    document.title = fileName;
    window.print();
  } finally {
    // Restore title after print dialog closes
    setTimeout(() => {
      document.title = originalTitle;
    }, 1500);
  }
}

export interface AvoidBoundary {
  top: number;
  bottom: number;
}

/**
 * Calculates smart page break points that avoid splitting cards, headers, or pill badges in half.
 */
export function calculateSmartBreakPoints(
  totalHeight: number,
  pageHeight: number,
  avoidBoundaries: AvoidBoundary[],
  safetyMargin: number = 6
): number[] {
  if (totalHeight <= pageHeight) {
    return [totalHeight];
  }

  const breaks: number[] = [];
  let currentY = 0;

  while (currentY < totalHeight) {
    const idealBottom = currentY + pageHeight;

    if (idealBottom >= totalHeight) {
      breaks.push(totalHeight);
      break;
    }

    // Check if an avoid-boundary element is intersected by idealBottom
    let chosenBreak = idealBottom;
    for (const b of avoidBoundaries) {
      if (b.top < idealBottom && b.bottom > idealBottom) {
        const proposedBreak = b.top - safetyMargin;
        if (proposedBreak > currentY + pageHeight * 0.4) {
          if (proposedBreak < chosenBreak) {
            chosenBreak = proposedBreak;
          }
        }
      }
    }

    breaks.push(chosenBreak);
    currentY = chosenBreak;
  }

  return breaks;
}

/**
 * Method 2: Direct Client-Side PDF Download with Smart Element-Boundary Page Breaks
 * Captures the #cv-preview-sheet element, detects card boundaries, and compiles
 * an A4 PDF without slicing text or badges in half.
 */
export async function downloadDirectPDF(
  elementId: string = "cv-preview-sheet",
  data: CVData,
  forceMultiPage: boolean = false
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found for PDF export.`);
  }

  // Find parent zoom wrapper if present
  const parent = element.parentElement;
  const originalTransform = element.style.transform;
  const originalParentTransform = parent ? parent.style.transform : "";

  try {
    element.style.transform = "none";
    if (parent) parent.style.transform = "none";

    // Wait for web fonts so layout typography metrics are 100% computed
    if (typeof document !== "undefined" && (document as unknown as { fonts?: { ready: Promise<void> } }).fonts?.ready) {
      await (document as unknown as { fonts: { ready: Promise<void> } }).fonts.ready;
    }

    // Ensure all images (avatar portrait, tech icons) are fully loaded and decoded before capture
    const imgElements = Array.from(element.querySelectorAll("img"));
    await Promise.all(
      imgElements.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete && img.naturalWidth > 0) {
              resolve(true);
            } else {
              img.onload = () => resolve(true);
              img.onerror = () => resolve(true);
            }
          })
      )
    );

    // Collect avoid-break boundaries before canvas capture
    const elRect = element.getBoundingClientRect();
    const avoidElements = Array.from(
      element.querySelectorAll<HTMLElement>(
        ".cv-break-avoid, .portal-project-card, .portal-exp-item, .portal-edu-card, .portal-sidebar-block, section, article"
      )
    );

    const canvas = await html2canvas(element, {
      scale: 2.5, // Crisp 240+ DPI resolution (retina print quality)
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: "#ffffff",
      imageTimeout: 10000,
      windowWidth: 1280, // Guarantee desktop 2-column layout in html2canvas iframe
      onclone: (clonedDoc) => {
        const clonedEl = clonedDoc.getElementById(elementId);
        if (clonedEl) {
          clonedEl.style.transform = "none";
          clonedEl.style.boxShadow = "none";
          clonedEl.style.border = "none";
          clonedEl.style.borderRadius = "0";
          clonedEl.style.margin = "0";
          clonedEl.style.maxHeight = "none";
          if (clonedEl.parentElement) {
            clonedEl.parentElement.style.transform = "none";
            clonedEl.parentElement.style.padding = "0";
            clonedEl.parentElement.style.margin = "0";
          }
        }
      },
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeightMm = 297; // A4 height in mm
    const pageHeightPx = (canvas.width * 297) / 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Single-Page Detection:
    // If the document height fits on 1 A4 page (or within 20% single-page tolerance, up to ~356mm)
    // AND multi-page was NOT explicitly forced:
    // Match the live single-page preview and compile as a single crisp A4 page!
    const isSinglePage = !forceMultiPage && imgHeight <= pageHeightMm * 1.2;

    if (isSinglePage) {
      // Use lossless PNG for crisp, razor-sharp text and zero JPEG block artifacts
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297, undefined, "FAST");
      const fileName = getCVFileName(data);
      pdf.save(fileName);
      return true;
    }

    // Multi-page Smart Element Slicing:
    // Scale DOM boundary coordinates to canvas pixels
    const scaleY = canvas.height / (element.clientHeight || canvas.height);
    const avoidBoundaries: AvoidBoundary[] = avoidElements.map((el) => {
      const rect = el.getBoundingClientRect();
      return {
        top: (rect.top - elRect.top) * scaleY,
        bottom: (rect.bottom - elRect.top) * scaleY,
      };
    });

    const breakPoints = calculateSmartBreakPoints(canvas.height, pageHeightPx, avoidBoundaries);

    let startY = 0;
    for (let i = 0; i < breakPoints.length; i++) {
      const endY = breakPoints[i];
      const sliceHeightPx = endY - startY;
      const sliceHeightMm = (sliceHeightPx * imgWidth) / canvas.width;

      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceHeightPx;
      const ctx = sliceCanvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(
          canvas,
          0,
          startY,
          canvas.width,
          sliceHeightPx,
          0,
          0,
          canvas.width,
          sliceHeightPx
        );
      }

      const sliceData = sliceCanvas.toDataURL("image/png");

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(sliceData, "PNG", 0, 0, imgWidth, sliceHeightMm, undefined, "FAST");
      startY = endY;
    }

    const fileName = getCVFileName(data);
    pdf.save(fileName);
    return true;
  } finally {
    element.style.transform = originalTransform;
    if (parent) parent.style.transform = originalParentTransform;
  }
}
