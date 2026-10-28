import { describe, it, expect, vi } from "vitest";
import { getCVFileName, triggerVectorPrint } from "@/lib/pdf/export-pdf";
import { SOKHA_CHAN_CV, ALEX_RIVERA_CV, EMPTY_CV } from "@/lib/constants/sample-data";

describe("PDF Export Pipeline", () => {
  it("generates correct sanitized filenames for candidates", () => {
    const sokhaFileName = getCVFileName(SOKHA_CHAN_CV);
    expect(sokhaFileName).toContain("Sokha_Chan");
    expect(sokhaFileName.endsWith("_Resume.pdf")).toBe(true);

    const alexFileName = getCVFileName(ALEX_RIVERA_CV);
    expect(alexFileName).toBe("Alex_Rivera_Resume.pdf");

    const fallbackFileName = getCVFileName(EMPTY_CV);
    expect(fallbackFileName).toBe("My_Professional_CV.pdf");
  });

  it("triggers vector print with document title replacement", () => {
    const printSpy = vi.spyOn(window, "print").mockImplementation(() => {});

    triggerVectorPrint(SOKHA_CHAN_CV);
    expect(printSpy).toHaveBeenCalledTimes(1);

    printSpy.mockRestore();
  });

  it("calculates smart page break points before intersected card boundaries", async () => {
    const { calculateSmartBreakPoints } = await import("@/lib/pdf/export-pdf");

    // Case 1: Single page document
    const singleBreaks = calculateSmartBreakPoints(900, 1123, []);
    expect(singleBreaks).toEqual([900]);

    // Case 2: Multi-page document where card intersects boundary (e.g. at 1123px)
    // Project card starts at 1050px and ends at 1200px.
    const boundaries = [{ top: 1050, bottom: 1200 }];
    const breaks = calculateSmartBreakPoints(1600, 1123, boundaries, 6);

    // Should break BEFORE the card (at 1050 - 6 = 1044px) instead of slicing at 1123px!
    expect(breaks[0]).toBe(1044);
    expect(breaks[1]).toBe(1600);
  });
});
