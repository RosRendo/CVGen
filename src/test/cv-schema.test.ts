import { describe, it, expect } from "vitest";
import { CVDataSchema, StrictPersonalInfoSchema } from "@/lib/types/cv";
import { SOKHA_CHAN_CV, ALEX_RIVERA_CV, EMPTY_CV } from "@/lib/constants/sample-data";

describe("CV Data Model & Validation Tests", () => {
  it("successfully parses valid Cambodian Tech Graduate CV (Sokha Chan)", () => {
    const result = CVDataSchema.safeParse(SOKHA_CHAN_CV);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.personalInfo.fullName).toContain("សូខា ចាន់");
      expect(result.data.settings.templateId).toBe("modern");
      expect(result.data.experience.length).toBeGreaterThan(0);
      expect(result.data.skills.languages[0].language).toContain("Khmer");
    }
  });

  it("successfully parses International Designer CV (Alex Rivera)", () => {
    const result = CVDataSchema.safeParse(ALEX_RIVERA_CV);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.personalInfo.fullName).toBe("Alex Rivera");
      expect(result.data.settings.templateId).toBe("classic");
    }
  });

  it("successfully parses EMPTY_CV template preset", () => {
    const result = CVDataSchema.safeParse(EMPTY_CV);
    expect(result.success).toBe(true);
  });

  it("handles empty fields and default settings gracefully", () => {
    const minimalCV = {
      personalInfo: {
        fullName: "Test User",
        jobTitle: "Software Engineer",
        email: "test@example.com",
        phone: "+855 12 000 000",
        location: "Phnom Penh",
      },
    };
    const result = CVDataSchema.safeParse(minimalCV);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.settings.templateId).toBe("classic");
      expect(result.data.settings.colorTheme).toBe("navy");
      expect(result.data.experience).toEqual([]);
      expect(result.data.education).toEqual([]);
    }
  });

  it("validates strict constraints when finalizing publication", () => {
    const invalidInfo = {
      fullName: "", // Required min 1
      jobTitle: "Developer",
      email: "not-an-email", // Invalid email format
      phone: "",
      location: "",
    };
    const result = StrictPersonalInfoSchema.safeParse(invalidInfo);
    expect(result.success).toBe(false);
  });
});
