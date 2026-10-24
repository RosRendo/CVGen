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
});
