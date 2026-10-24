import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const CorporateTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.navy;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-slate-800 ${font.fontFamilyClass} ${size.body}`}>
      {/* Top Corporate Stripe */}
      <div className="h-2.5 w-full" style={{ backgroundColor: theme.primary }} />

      {/* Header with Photo Integration */}
      <header className="pt-5 pb-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-5">
          {/* Candidate Name, Title & Contact */}
          <div className="flex-1 space-y-2">
            <div>
              <h1 className={`${size.h1} font-extrabold tracking-tight text-slate-900`}>
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              {personalInfo.jobTitle && (
                <p
                  className="mt-1 text-sm font-bold tracking-wider uppercase"
                  style={{ color: theme.primary }}
                >
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>

            {/* Contact Details Grid */}
            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-600">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>
                  <Linkedin className="h-3.5 w-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
              {personalInfo.websiteUrl && (
                <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>
                  <Globe className="h-3.5 w-3.5" />
                  <span>Portfolio</span>
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>

          {/* Dedicated Profile Photo Frame (Passport / Corporate Standard) */}
          <div className="shrink-0 self-center sm:self-start">
            {personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Corporate Photo"}
                className="w-24 h-28 sm:w-28 sm:h-32 object-cover rounded-lg border-2 border-slate-200 shadow-sm"
              />
            ) : (
              <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                <User className="h-8 w-8 stroke-1 text-slate-300" />
                <span className="text-[10px] font-mono mt-1 text-slate-400">Photo Frame</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={`mt-5 ${spacing.sectionGap}`}>
        {/* Executive Profile Summary */}
        {personalInfo.summary && (
          <section className="cv-break-avoid">
            <h2 className={`${size.h2} font-bold tracking-wider text-slate-900 border-b pb-1 mb-2`} style={{ borderColor: theme.border }}>
              Executive Profile
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className={`${size.h2} font-bold tracking-wider text-slate-900 border-b pb-1 mb-3`} style={{ borderColor: theme.border }}>
              Professional Experience
            </h2>
            <div className={`space-y-4 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 text-sm">
                      {exp.jobTitle}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5">
                    <span>{exp.company}</span>
                    {exp.location && <span> • {exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-slate-700 list-disc pl-4 leading-relaxed">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Credentials */}
        {education && education.length > 0 && (
          <section className="cv-break-avoid">
            <h2 className={`${size.h2} font-bold tracking-wider text-slate-900 border-b pb-1 mb-2`} style={{ borderColor: theme.border }}>
              Education & Qualifications
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-1 text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="text-slate-600"> — {edu.institution}</span>
                    {edu.gpa && <span> (GPA: {edu.gpa})</span>}
                  </div>
                  <span className="font-mono text-slate-500 text-[11px]">
                    {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Competencies */}
        {((skills?.technical && skills.technical.length > 0) ||
          (skills?.languages && skills.languages.length > 0)) && (
          <section className="cv-break-avoid">
            <h2 className={`${size.h2} font-bold tracking-wider text-slate-900 border-b pb-1 mb-2`} style={{ borderColor: theme.border }}>
              Core Competencies & Languages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {skills.technical && skills.technical.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">
                    Key Competencies
                  </span>
                  <div className={settings.skillDisplayStyle === "bars" || settings.skillDisplayStyle === "stars" || settings.skillDisplayStyle === "dots" ? "space-y-1.5" : "flex flex-wrap gap-1"}>
                    {skills.technical.map((tech) => (
                      <SkillItemRenderer
                        key={tech}
                        name={tech}
                        rating={skills.ratings?.[tech] ?? 4}
                        style={settings.skillDisplayStyle}
                        showIcon={settings.skillShowIcons}
                        primaryColor={theme.primary}
                        primaryLightColor={theme.primaryLight}
                        borderColor={theme.border}
                      />
                    ))}
                  </div>
                </div>
              )}

              {skills.languages && skills.languages.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">
                    Languages
                  </span>
                  <p className="text-slate-700">
                    {skills.languages
                      .map((l) => `${l.language} (${l.proficiency})`)
                      .join(" • ")}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
