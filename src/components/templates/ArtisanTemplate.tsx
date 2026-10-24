import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const ArtisanTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.amber;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.serif;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-zinc-900 ${font.fontFamilyClass} ${size.body} p-2 border-2`} style={{ borderColor: theme.border }}>
      {/* Inner Hairline Frame */}
      <div className="border p-5 sm:p-7" style={{ borderColor: theme.border }}>
        {/* Luxury Centered Header */}
        <header className="text-center pb-5 border-b" style={{ borderColor: theme.border }}>
          {personalInfo.photoUrl && (
            <div className="flex justify-center mb-3">
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Artisan"}
                className="w-20 h-20 rounded-full object-cover border-2 shadow-xs"
                style={{ borderColor: theme.primary }}
              />
            </div>
          )}

          <span className="text-[10px] font-sans uppercase tracking-[0.3em] font-medium block mb-1" style={{ color: theme.primary }}>
            Curriculum Vitae
          </span>

          <h1 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-zinc-950 uppercase">
            {personalInfo.fullName || "Your Full Name"}
          </h1>

          {personalInfo.jobTitle && (
            <p className="mt-1 text-xs font-sans uppercase tracking-[0.2em] font-semibold text-zinc-600">
              {personalInfo.jobTitle}
            </p>
          )}

          {/* Filigree Divider */}
          <div className="flex items-center justify-center gap-3 my-2 text-xs" style={{ color: theme.primary }}>
            <span>─────</span>
            <span>✦</span>
            <span>─────</span>
          </div>

          {/* Contact Bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-zinc-600 font-sans">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.phone && <span>• {personalInfo.phone}</span>}
            {personalInfo.email && (
              <span>
                • <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
              </span>
            )}
            {personalInfo.websiteUrl && (
              <span>
                • <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
              </span>
            )}
          </div>
        </header>

        <div className={`mt-5 ${spacing.sectionGap}`}>
          {/* Executive Statement */}
          {personalInfo.summary && (
            <section className="cv-break-avoid text-center max-w-2xl mx-auto">
              <p className="text-zinc-700 italic font-serif leading-relaxed text-sm">
                “{personalInfo.summary}”
              </p>
            </section>
          )}

          {/* Experience Section */}
          {experience && experience.length > 0 && (
            <section>
              <div className="text-center mb-4">
                <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-950 font-sans inline-block px-3 border-b-2 pb-1" style={{ borderColor: theme.primary }}>
                  Professional Engagements
                </h2>
              </div>

              <div className={`space-y-4 ${spacing.itemGap}`}>
                {experience.map((exp) => (
                  <div key={exp.id} className="cv-break-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <span className="font-serif font-bold text-zinc-950 text-sm">
                        {exp.company}
                      </span>
                      <span className="text-xs font-mono text-zinc-400">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-xs font-sans italic text-zinc-600 mt-0.5">
                      <span>{exp.jobTitle}</span>
                      {exp.location && <span> — {exp.location}</span>}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-zinc-700 list-none pl-3 font-sans leading-relaxed">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[10px] mt-0.5" style={{ color: theme.primary }}>◆</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Portfolio & Commissions */}
          {projects && projects.length > 0 && (
            <section>
              <div className="text-center mb-4">
                <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-950 font-sans inline-block px-3 border-b-2 pb-1" style={{ borderColor: theme.primary }}>
                  Selected Commissions & Works
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="cv-break-avoid p-3 border rounded" style={{ borderColor: theme.border }}>
                    <span className="font-serif font-bold text-zinc-950 text-xs block">
                      {proj.name}
                    </span>
                    {proj.description && (
                      <p className="mt-1 text-xs text-zinc-600 font-sans leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education & Credentials */}
          {education && education.length > 0 && (
            <section className="cv-break-avoid">
              <div className="text-center mb-3">
                <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-950 font-sans inline-block px-3 border-b-2 pb-1" style={{ borderColor: theme.primary }}>
                  Academic Credentials
                </h2>
              </div>

              <div className="space-y-2 text-xs font-sans text-center">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <span className="font-semibold text-zinc-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="text-zinc-500"> — {edu.institution}</span>
                    <span className="text-zinc-400 font-mono text-[11px] block sm:inline sm:ml-2">
                      ({edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"})
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Masteries */}
          {skills?.technical && skills.technical.length > 0 && (
            <section className="cv-break-avoid">
              <div className="text-center mb-3">
                <h2 className="text-xs uppercase tracking-[0.25em] font-bold text-zinc-950 font-sans inline-block px-3 border-b-2 pb-1" style={{ borderColor: theme.primary }}>
                  Disciplines & Expertise
                </h2>
              </div>
              {settings.skillDisplayStyle === "text" ? (
                <p className="text-xs font-sans text-zinc-700 leading-relaxed text-center">
                  {skills.technical.join("  ◆  ")}
                </p>
              ) : (
                <div className={settings.skillDisplayStyle === "bars" || settings.skillDisplayStyle === "stars" || settings.skillDisplayStyle === "dots" ? "grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans" : "flex flex-wrap justify-center gap-1.5 font-sans"}>
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
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
