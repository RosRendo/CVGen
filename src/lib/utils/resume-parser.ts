import { CVData, ExperienceItem, EducationItem, ProjectItem } from "@/lib/types/cv";

/**
 * Robust Regex and Markdown parser to transform raw resume text / markdown
 * or PDF-extracted text into structured CVData.
 */
export function parseResumeTextToCV(text: string, currentData?: CVData): Partial<CVData> {
  const clean = text.replace(/\r\n/g, "\n");
  const lines = clean.split("\n").map((l) => l.trim());

  const result: Partial<CVData> = {
    personalInfo: {
      fullName: currentData?.personalInfo.fullName || "",
      jobTitle: currentData?.personalInfo.jobTitle || "",
      email: currentData?.personalInfo.email || "",
      phone: currentData?.personalInfo.phone || "",
      location: currentData?.personalInfo.location || "",
      photoUrl: currentData?.personalInfo.photoUrl || "",
      linkedinUrl: currentData?.personalInfo.linkedinUrl || "",
      websiteUrl: currentData?.personalInfo.websiteUrl || "",
      githubUrl: currentData?.personalInfo.githubUrl || "",
      summary: currentData?.personalInfo.summary || "",
    },
    experience: [],
    education: [],
    skills: {
      technical: [],
      soft: [],
      languages: currentData?.skills.languages || [],
      ratings: currentData?.skills.ratings || {},
    },
    projects: [],
  };

  // 1. Extract Email
  const emailMatch = clean.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch && !emailMatch[0].includes("[Your")) {
    result.personalInfo!.email = emailMatch[0];
  }

  // 2. Extract Phone
  const phoneMatch = clean.match(/(\+?\d{1,4}[\s-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/);
  if (phoneMatch && phoneMatch[0].length >= 8 && !phoneMatch[0].includes("[Your")) {
    result.personalInfo!.phone = phoneMatch[0].trim();
  }

  // 3. Extract GitHub
  const githubMatch = clean.match(/(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i);
  if (githubMatch) {
    result.personalInfo!.githubUrl = `https://github.com/${githubMatch[1]}`;
  }

  // 4. Extract LinkedIn
  const linkedinMatch = clean.match(/(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i);
  if (linkedinMatch) {
    result.personalInfo!.linkedinUrl = `https://www.linkedin.com/in/${linkedinMatch[1]}`;
  }

  // 5. Extract Full Name & Title from first few non-empty lines
  const nonEmptyLines = lines.filter((l) => l && !l.startsWith("---") && !l.startsWith("==="));
  for (let i = 0; i < Math.min(nonEmptyLines.length, 5); i++) {
    const line = nonEmptyLines[i];
    if (line.startsWith("# ")) {
      result.personalInfo!.fullName = line.replace(/^#\s+/, "").trim();
    } else if (line.startsWith("**") && line.endsWith("**") && !result.personalInfo!.jobTitle) {
      result.personalInfo!.jobTitle = line.replace(/^\*\*|\*\*$/g, "").trim();
    } else if (!result.personalInfo!.fullName && i === 0 && line.length < 40 && !line.includes("@")) {
      result.personalInfo!.fullName = line;
    } else if (!result.personalInfo!.jobTitle && i === 1 && line.length < 60 && !line.includes("@")) {
      result.personalInfo!.jobTitle = line;
    } else if (line.includes("Cambodia") || line.includes("Phnom Penh")) {
      result.personalInfo!.location = line.split("|")[0].trim();
    }
  }

  // 6. Section Parsing
  const sections = clean.split(/\n(?=##?\s+)/);

  for (const sec of sections) {
    const secLines = sec.split("\n").map((l) => l.trim()).filter(Boolean);
    if (!secLines.length) continue;
    const header = secLines[0].toLowerCase();

    // Summary Section
    if (header.includes("summary")) {
      const summaryText = secLines.slice(1).filter((l) => !l.startsWith("---")).join(" ").trim();
      if (summaryText) {
        result.personalInfo!.summary = summaryText;
      }
    }

    // Experience Section
    else if (header.includes("experience") || header.includes("work")) {
      const expItems: ExperienceItem[] = [];
      let currentItem: Partial<ExperienceItem> | null = null;

      for (let i = 1; i < secLines.length; i++) {
        const line = secLines[i];
        if (line.startsWith("### ")) {
          if (currentItem && currentItem.jobTitle) {
            expItems.push(currentItem as ExperienceItem);
          }
          currentItem = {
            id: `exp-${Date.now()}-${expItems.length}`,
            jobTitle: line.replace(/^###\s+/, "").trim(),
            company: "Self-Directed Projects",
            location: "Phnom Penh, Cambodia",
            startDate: "2023",
            endDate: "Present",
            isCurrent: true,
            bullets: [],
          };
        } else if (currentItem && line.includes("|")) {
          const parts = line.split("|").map((p) => p.trim());
          if (parts[0]) currentItem.company = parts[0];
          if (parts[1]) currentItem.location = parts[1];
        } else if (currentItem && (line.includes("–") || line.includes("-")) && (line.includes("Present") || line.includes("202"))) {
          const dates = line.split(/[–-]/).map((d) => d.trim());
          if (dates[0]) currentItem.startDate = dates[0].replace(/\[|\]/g, "");
          if (dates[1]) currentItem.endDate = dates[1].replace(/\[|\]/g, "");
          currentItem.isCurrent = line.toLowerCase().includes("present");
        } else if (currentItem && line.startsWith("- ")) {
          currentItem.bullets?.push(line.replace(/^-\s+/, "").trim());
        }
      }
      if (currentItem && currentItem.jobTitle) {
        expItems.push(currentItem as ExperienceItem);
      }
      if (expItems.length) {
        result.experience = expItems;
      }
    }

    // Education Section
    else if (header.includes("education")) {
      const eduItems: EducationItem[] = [];
      let currentEdu: Partial<EducationItem> | null = null;

      for (let i = 1; i < secLines.length; i++) {
        const line = secLines[i];
        if (line.startsWith("### ")) {
          if (currentEdu && currentEdu.institution) {
            eduItems.push(currentEdu as EducationItem);
          }
          currentEdu = {
            id: `edu-${Date.now()}-${eduItems.length}`,
            degree: line.replace(/^###\s+/, "").trim(),
            institution: "Cambodia University of Technology and Science (CamTech)",
            fieldOfStudy: "Software Engineering",
            startDate: "2023",
            endDate: "Present",
            achievements: [],
          };
        } else if (currentEdu && line.includes("|")) {
          const parts = line.split("|").map((p) => p.trim());
          if (parts[0]) currentEdu.institution = parts[0];
        } else if (currentEdu && line.startsWith("- ")) {
          currentEdu.achievements?.push(line.replace(/^-\s+/, "").trim());
        }
      }
      if (currentEdu && currentEdu.institution) {
        eduItems.push(currentEdu as EducationItem);
      }
      if (eduItems.length) {
        result.education = eduItems;
      }
    }

    // Skills Section
    else if (header.includes("skill")) {
      const techSkills: string[] = [];
      const softSkills: string[] = [];

      for (let i = 1; i < secLines.length; i++) {
        const line = secLines[i];
        if (line.startsWith("- ")) {
          const skill = line.replace(/^-\s+/, "").trim();
          if (skill && !skill.startsWith("*")) {
            techSkills.push(skill);
          }
        }
      }
      if (techSkills.length) {
        result.skills!.technical = techSkills;
      }
    }

    // Projects Section
    else if (header.includes("project")) {
      const projItems: ProjectItem[] = [];
      let currentProj: Partial<ProjectItem> | null = null;

      for (let i = 1; i < secLines.length; i++) {
        const line = secLines[i];
        if (line.startsWith("### ")) {
          if (currentProj && currentProj.name) {
            projItems.push(currentProj as ProjectItem);
          }
          currentProj = {
            id: `proj-${Date.now()}-${projItems.length}`,
            name: line.replace(/^###\s+/, "").trim(),
            description: "",
            technologies: [],
          };
        } else if (currentProj && line.startsWith("**Technologies:**")) {
          const techs = line
            .replace(/^\*\*Technologies:\*\*/i, "")
            .split(/[,|]/)
            .map((t) => t.trim())
            .filter(Boolean);
          currentProj.technologies = techs;
        } else if (currentProj && line.startsWith("- ")) {
          const bullet = line.replace(/^-\s+/, "").trim();
          if (!currentProj.description) {
            currentProj.description = bullet;
          } else {
            currentProj.description += ` ${bullet}`;
          }
        } else if (currentProj && !line.startsWith("Project link:") && !line.startsWith("Status:")) {
          if (!currentProj.description) {
            currentProj.description = line;
          }
        }
      }
      if (currentProj && currentProj.name) {
        projItems.push(currentProj as ProjectItem);
      }
      if (projItems.length) {
        result.projects = projItems;
      }
    }
  }

  return result;
}
