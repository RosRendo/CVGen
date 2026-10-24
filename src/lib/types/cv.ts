import { z } from "zod";

// --- Schema Definitions ---

export const PersonalInfoSchema = z.object({
  fullName: z.string().default(""),
  jobTitle: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  location: z.string().default(""),
  photoUrl: z.string().optional().default(""),
  linkedinUrl: z.string().optional().default(""),
  websiteUrl: z.string().optional().default(""),
  githubUrl: z.string().optional().default(""),
  facebookUrl: z.string().optional(),
  summary: z.string().optional().default(""),
});

export const StrictPersonalInfoSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  photoUrl: z.string().optional().default(""),
  linkedinUrl: z.string().optional().default(""),
  websiteUrl: z.string().optional().default(""),
  githubUrl: z.string().optional().default(""),
  facebookUrl: z.string().optional(),
  summary: z.string().optional().default(""),
});

export const ExperienceItemSchema = z.object({
  id: z.string(),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().optional().default(""),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().default(""),
  isCurrent: z.boolean().default(false),
  bullets: z.array(z.string()).default([]),
});

export const EducationItemSchema = z.object({
  id: z.string(),
  institution: z.string().min(1, "Institution is required"),
  degree: z.string().min(1, "Degree is required"),
  fieldOfStudy: z.string().min(1, "Field of study is required"),
  startDate: z.string().optional().default(""),
  endDate: z.string().optional().default(""),
  gpa: z.string().optional().default(""),
  achievements: z.array(z.string()).default([]),
});

export const LanguageItemSchema = z.object({
  id: z.string(),
  language: z.string().min(1, "Language is required"),
  proficiency: z.string().min(1, "Proficiency is required"),
});

export const SkillsSchema = z.object({
  technical: z.array(z.string()).default([]),
  soft: z.array(z.string()).default([]),
  languages: z.array(LanguageItemSchema).default([]),
  ratings: z.record(z.string(), z.number()).optional().default({}),
});

export const ProjectItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Project name is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).default([]),
  url: z.string().optional().default(""),
  githubUrl: z.string().optional().default(""),
});

export const CertificationItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Certification name is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().optional().default(""),
  url: z.string().optional().default(""),
});

export const VolunteerItemSchema = z.object({
  id: z.string(),
  role: z.string().min(1, "Role is required"),
  organization: z.string().min(1, "Organization is required"),
  period: z.string().optional().default(""),
  description: z.string().optional().default(""),
});

export const AwardItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Award title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  date: z.string().optional().default(""),
  description: z.string().optional().default(""),
});

export const ReferenceItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Reference name is required"),
  role: z.string().min(1, "Role is required"),
  institution: z.string().min(1, "Institution / Company is required"),
  contact: z.string().optional().default(""),
});

export const AdditionalSchema = z.object({
  certifications: z.array(CertificationItemSchema).default([]),
  volunteer: z.array(VolunteerItemSchema).default([]),
  awards: z.array(AwardItemSchema).default([]),
  interests: z.array(z.string()).optional(),
  technicalTools: z.array(z.string()).optional(),
  references: z.array(ReferenceItemSchema).optional(),
});

export type TemplateId =
  | "classic"
  | "modern"
  | "technical"
  | "graduate"
  | "executive"
  | "minimal"
  | "compact"
  | "creative"
  | "nordic"
  | "startup"
  | "corporate"
  | "infographic"
  | "floral"
  | "boho"
  | "artisan"
  | "pastel"
  | "ribbon"
  | "portal"
  | "midnight"
  | "colorblock"
  | "axis"
  | "ocean"
  | "diamond"
  | "horizon"
  | "cyberpunk"
  | "editorial"
  | "zen"
  | "bento"
  | "oxford"
  | "bauhaus"
  | "camtech";

export type ColorTheme =
  | "slate"
  | "navy"
  | "emerald"
  | "indigo"
  | "burgundy"
  | "monochrome"
  | "rose"
  | "sage"
  | "terracotta"
  | "amber";

export type FontFamily = "sans" | "serif" | "khmer";
export type FontSize = "compact" | "normal" | "relaxed";
export type Spacing = "compact" | "normal" | "spacious";

export const CVSettingsSchema = z.object({
  templateId: z
    .enum([
      "classic",
      "modern",
      "technical",
      "graduate",
      "executive",
      "minimal",
      "compact",
      "creative",
      "nordic",
      "startup",
      "corporate",
      "infographic",
      "floral",
      "boho",
      "artisan",
      "pastel",
      "ribbon",
      "portal",
      "midnight",
      "colorblock",
      "axis",
      "ocean",
      "diamond",
      "horizon",
      "cyberpunk",
      "editorial",
      "zen",
      "bento",
      "oxford",
      "bauhaus",
      "camtech",
    ])
    .default("classic"),
  colorTheme: z
    .enum([
      "slate",
      "navy",
      "emerald",
      "indigo",
      "burgundy",
      "monochrome",
      "rose",
      "sage",
      "terracotta",
      "amber",
    ])
    .default("navy"),
  fontFamily: z.enum(["sans", "serif", "khmer"]).default("sans"),
  fontSize: z.enum(["compact", "normal", "relaxed"]).default("normal"),
  spacing: z.enum(["compact", "normal", "spacious"]).default("normal"),
  skillDisplayStyle: z
    .enum(["pills", "bars", "stars", "dots", "text"])
    .default("pills"),
  skillShowIcons: z.boolean().default(true),
});

export type SkillDisplayStyle = "pills" | "bars" | "stars" | "dots" | "text";

export const CVDataSchema = z.object({
  id: z.string().default("draft-cv"),
  title: z.string().default("My Professional CV"),
  lastModified: z.string().default("2026-10-23T12:00:00.000Z"),
  settings: CVSettingsSchema.default({
    templateId: "classic",
    colorTheme: "navy",
    fontFamily: "sans",
    fontSize: "normal",
    spacing: "normal",
    skillDisplayStyle: "pills",
    skillShowIcons: true,
  }),
  personalInfo: PersonalInfoSchema,
  experience: z.array(ExperienceItemSchema).default([]),
  education: z.array(EducationItemSchema).default([]),
  skills: SkillsSchema.default({ technical: [], soft: [], languages: [], ratings: {} }),
  projects: z.array(ProjectItemSchema).default([]),
  additional: AdditionalSchema.default({ certifications: [], volunteer: [], awards: [] }),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type ExperienceItem = z.infer<typeof ExperienceItemSchema>;
export type EducationItem = z.infer<typeof EducationItemSchema>;
export type LanguageItem = z.infer<typeof LanguageItemSchema>;
export type Skills = z.infer<typeof SkillsSchema>;
export type ProjectItem = z.infer<typeof ProjectItemSchema>;
export type CertificationItem = z.infer<typeof CertificationItemSchema>;
export type VolunteerItem = z.infer<typeof VolunteerItemSchema>;
export type AwardItem = z.infer<typeof AwardItemSchema>;
export type ReferenceItem = z.infer<typeof ReferenceItemSchema>;
export type Additional = z.infer<typeof AdditionalSchema>;
export type CVSettings = z.infer<typeof CVSettingsSchema>;
export type CVData = z.infer<typeof CVDataSchema>;
