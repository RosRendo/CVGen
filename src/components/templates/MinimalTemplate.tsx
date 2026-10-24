import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";

interface TemplateProps {
  data: CVData;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.monochrome;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-zinc-900 ${font.fontFamilyClass} ${size.body}`}>
      {/* Swiss Minimalist Header */}
      <header className="pb-6 border-b border-zinc-200">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <div>
            <h1 className={`${size.h1} font-bold tracking-tight text-zinc-950`}>
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p className="mt-1 text-xs font-mono uppercase tracking-widest text-zinc-500">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Minimalist Contact Line */}
          <div className="flex flex-wrap md:justify-end gap-x-3 gap-y-1 text-xs font-mono text-zinc-600">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="hover:text-zinc-950">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.phone && <span>/ {personalInfo.phone}</span>}
            {personalInfo.location && <span>/ {personalInfo.location}</span>}
            {personalInfo.linkedinUrl && (
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-950 underline underline-offset-2">
                LinkedIn
              </a>
            )}
            {personalInfo.websiteUrl && (
              <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-950 underline underline-offset-2">
                Portfolio
              </a>
            )}
            {personalInfo.githubUrl && (
              <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:text-zinc-950 underline underline-offset-2">
                GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Grid Architecture: Asymmetric Left Label / Right Content */}
      <div className={`mt-6 ${spacing.sectionGap}`}>
        {/* Profile / Summary */}
        {personalInfo.summary && (
          <section className="cv-break-avoid grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 border-b border-zinc-100 pb-5">
            <div className="md:col-span-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                01 / Profile
              </span>
            </div>
            <div className="md:col-span-9">
              <p className="text-zinc-700 leading-relaxed font-normal">
                {personalInfo.summary}
              </p>
            </div>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 border-b border-zinc-100 pb-5">
            <div className="md:col-span-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                02 / Experience
              </span>
            </div>
            <div className={`md:col-span-9 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-semibold text-zinc-950 text-sm">
                      {exp.jobTitle}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-600">
                    <span className="font-medium text-zinc-800">{exp.company}</span>
                    {exp.location && <span className="text-zinc-400">, {exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-zinc-600 list-disc pl-4 leading-relaxed">
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

        {/* Selected Projects */}
        {projects && projects.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 border-b border-zinc-100 pb-5">
            <div className="md:col-span-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                03 / Projects
              </span>
            </div>
            <div className={`md:col-span-9 ${spacing.itemGap}`}>
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-zinc-900 text-xs sm:text-sm">
                      {proj.name}
                    </span>
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noreferrer" className="text-xs font-mono text-zinc-500 hover:text-zinc-950 underline">
                        Demo ↗
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-xs text-zinc-600 leading-relaxed">{proj.description}</p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-100 text-zinc-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 border-b border-zinc-100 pb-5">
            <div className="md:col-span-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                04 / Education
              </span>
            </div>
            <div className={`md:col-span-9 ${spacing.itemGap}`}>
              {education.map((edu) => (
                <div key={edu.id} className="cv-break-avoid space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-semibold text-zinc-900 text-xs sm:text-sm">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {edu.startDate ? `${edu.startDate} — ` : ""}
                      {edu.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500">
                    <span>{edu.institution}</span>
                    {edu.gpa && <span> • GPA {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Competencies & Additional */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6">
          <div className="md:col-span-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
              05 / Competencies
            </span>
          </div>
          <div className="md:col-span-9 space-y-3 text-xs">
            {skills?.technical && skills.technical.length > 0 && (
              <div>
                <span className="font-mono text-zinc-400 text-[10px] uppercase block mb-1">
                  Technical Stack
                </span>
                <p className="text-zinc-700 leading-relaxed">
                  {skills.technical.join(" • ")}
                </p>
              </div>
            )}
            {skills?.languages && skills.languages.length > 0 && (
              <div>
                <span className="font-mono text-zinc-400 text-[10px] uppercase block mb-1">
                  Languages
                </span>
                <p className="text-zinc-700">
                  {skills.languages
                    .map((l) => `${l.language} (${l.proficiency})`)
                    .join(" • ")}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
