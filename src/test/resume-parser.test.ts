import { describe, it, expect } from "vitest";
import { parseResumeTextToCV } from "@/lib/utils/resume-parser";

describe("Resume Parser", () => {
  const sampleMarkdown = `
# ROS RENDO
**Software Engineering Student | Full-Stack Developer**

Phnom Penh, Cambodia
Email: rousrendo@gmail.com | Phone: +855 81272720
GitHub: https://github.com/ROS-RENDO | LinkedIn: https://www.linkedin.com/in/ros-rendo-ab94572b1

---

## 1. Professional Summary

Software Engineering student and aspiring full-stack developer with hands-on experience building web applications.

## 2. Work Experience

### Independent Software Developer
Self-Directed Projects | Phnom Penh, Cambodia
2023 – Present

- Design and develop full-stack web application prototypes using modern technologies.
- Build responsive user interfaces with React, Next.js, and TypeScript.

## 3. Education

### Bachelor's Degree in Software Engineering
Cambodia University of Technology and Science (CamTech) | Cambodia
2023 – Present

- Core coursework in software development and database design.

## 4. Technical Skills

### Programming Languages
- JavaScript
- TypeScript
- Python
- PostgreSQL

## 5. Projects

### ServiceFinder — Home Services Marketplace
**Technologies:** Next.js, React, TypeScript, NestJS, Prisma, PostgreSQL

A home services marketplace concept designed to connect customers with service providers.

- Develop user-facing interfaces and backend services.
`;

  it("parses name, contact, and job title accurately", () => {
    const parsed = parseResumeTextToCV(sampleMarkdown);

    expect(parsed.personalInfo?.fullName).toBe("ROS RENDO");
    expect(parsed.personalInfo?.jobTitle).toBe("Software Engineering Student | Full-Stack Developer");
    expect(parsed.personalInfo?.email).toBe("rousrendo@gmail.com");
    expect(parsed.personalInfo?.phone).toBe("+855 81272720");
    expect(parsed.personalInfo?.githubUrl).toBe("https://github.com/ROS-RENDO");
    expect(parsed.personalInfo?.linkedinUrl).toBe("https://www.linkedin.com/in/ros-rendo-ab94572b1");
  });

  it("extracts summary, experience, and projects", () => {
    const parsed = parseResumeTextToCV(sampleMarkdown);

    expect(parsed.personalInfo?.summary).toContain("Software Engineering student");
    expect(parsed.experience?.length).toBe(1);
    expect(parsed.experience?.[0].jobTitle).toBe("Independent Software Developer");
    expect(parsed.experience?.[0].bullets.length).toBe(2);

    expect(parsed.education?.length).toBe(1);
    expect(parsed.education?.[0].degree).toBe("Bachelor's Degree in Software Engineering");

    expect(parsed.skills?.technical).toContain("TypeScript");
    expect(parsed.skills?.technical).toContain("PostgreSQL");

    expect(parsed.projects?.length).toBe(1);
    expect(parsed.projects?.[0].name).toBe("ServiceFinder — Home Services Marketplace");
    expect(parsed.projects?.[0].technologies).toContain("Next.js");
  });
});
