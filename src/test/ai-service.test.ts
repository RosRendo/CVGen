import { describe, it, expect } from "vitest";
import { improveBulletText, generateSummaryText, tailorCvToJob } from "@/lib/ai/ai-service";
import { SOKHA_CHAN_CV } from "@/lib/constants/sample-data";

describe("AI Service & Heuristic Fallback Engine", () => {
  it("improves passive bullet points into strong action-oriented accomplishment", async () => {
    const rawBullet = "responsible for building checkout page in React";
    const result = await improveBulletText(rawBullet);

    expect(result.original).toBe(rawBullet);
    expect(result.actionVerb).toBe("Engineered");
    expect(result.improved).toContain("Engineered and delivered");
    expect(result.improved).toContain("[X%]"); // Requests user metric without hallucinating
    expect(result.metricTip).toBeDefined();
  });

  it("handles empty bullet points gracefully", async () => {
    const result = await improveBulletText("");
    expect(result.improved).toBeDefined();
    expect(result.actionVerb).toBe("Spearheaded");
  });

  it("generates truthful summary without hallucinations based on actual candidate data", async () => {
    const result = await generateSummaryText(SOKHA_CHAN_CV);
    expect(result.summary).toContain("Junior Full-Stack Software Engineer");
    expect(result.summary).toContain("Phnom Penh, Cambodia");
    expect(result.summary).toContain("Mekong Tech Solutions");
    expect(result.keyHighlights.length).toBeGreaterThan(0);
  });

  it("tailors CV to job description identifying matched skills and missing keywords", async () => {
    const jobDescription = `
      We are looking for a Junior Software Engineer with React, TypeScript, Docker, and Kubernetes experience.
      You will work on full-stack web applications and agile sprints.
    `;

    const result = await tailorCvToJob(jobDescription, SOKHA_CHAN_CV);

    // Sokha Chan already has React, TypeScript, and Docker in his CV
    expect(result.matchingSkills).toContain("TypeScript");
    expect(result.matchingSkills).toContain("React");
    expect(result.matchingSkills).toContain("Docker");

    // Kubernetes was in the JD but not in Sokha's CV, so it should be flagged as missing
    expect(result.missingKeywords).toContain("Kubernetes");
    expect(result.suggestedSummary).toBeDefined();
    expect(result.targetedAdvice.length).toBeGreaterThan(0);
  });
});
