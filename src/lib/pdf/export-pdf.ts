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

/**
 * Method 2: Direct Client-Side PDF Download
 * Captures the #cv-preview-sheet element and compiles an A4 PDF for direct file download.
 */
export async function downloadDirectPDF(
  elementId: string = "cv-preview-sheet",
  data: CVData
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

    const canvas = await html2canvas(element, {
      scale: 2, // High resolution (retina 192 DPI)
      useCORS: true,
      allowTaint: false,
      logging: false,
      backgroundColor: "#ffffff",
      imageTimeout: 6000,
      onclone: (clonedDoc) => {
        const clonedEl = clonedDoc.getElementById(elementId);
        if (clonedEl) {
          clonedEl.style.transform = "none";
          if (clonedEl.parentElement) {
            clonedEl.parentElement.style.transform = "none";
          }
        }
      },
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
    heightLeft -= pageHeight;

    // Subsequent pages if CV spans more than 1 page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pageHeight;
    }

    const fileName = getCVFileName(data);
    pdf.save(fileName);
    return true;
  } finally {
    element.style.transform = originalTransform;
    if (parent) parent.style.transform = originalParentTransform;
  }
}
