import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const BohoTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.terracotta;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.serif;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-amber-950 ${font.fontFamilyClass} ${size.body}`}>
      {/* Organic Arch Header Background */}
      <div className="relative rounded-3xl bg-amber-50/60 p-6 sm:p-8 border border-amber-200/60 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="text-center sm:text-left space-y-2 flex-1">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-amber-800 font-semibold block">
              // Creative Portfolio & CV
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-950 tracking-tight">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs font-sans uppercase tracking-[0.2em] font-semibold" style={{ color: theme.primary }}>
                {personalInfo.jobTitle}
              </p>
            )}

            {/* Organic Contact Details */}
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-amber-900/80 font-sans">
              {personalInfo.email && (
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline">
                  <Mail className="h-3 w-3 text-amber-700" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-amber-700" />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-amber-700" />
                  <span>{personalInfo.location}</span>
                </span>
              )}
              {personalInfo.websiteUrl && (
                <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>
                  <Globe className="h-3 w-3" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          {/* Pebble Shape Portrait Frame */}
          <div className="shrink-0">
            {personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Boho Profile"}
                className="w-24 h-24 rounded-[32px_12px_32px_12px] object-cover border-2 shadow-sm"
                style={{ borderColor: theme.primary }}
              />
            ) : (
              <div
                className="w-24 h-24 rounded-[32px_12px_32px_12px] flex items-center justify-center text-white text-2xl font-serif shadow-sm"
                style={{ backgroundColor: theme.primary }}
              >
                ☼
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`space-y-6 ${spacing.sectionGap}`}>
        {/* Organic Bio / Ethos */}
        {personalInfo.summary && (
          <section className="cv-break-avoid p-4 rounded-2xl bg-amber-50/40 border border-amber-100 text-center sm:text-left">
            <h2 className="text-xs uppercase font-sans tracking-[0.2em] font-bold text-amber-900 mb-1">
              Creative Ethos & Summary
            </h2>
            <p className="text-amber-950/80 leading-relaxed text-sm font-sans">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-serif" style={{ color: theme.primary }}>◆</span>
              <h2 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-amber-950">
                Experience & Journey
              </h2>
              <div className="flex-1 h-px bg-amber-200" />
            </div>

            <div className={`space-y-4 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid border-l-2 pl-4 py-0.5" style={{ borderColor: theme.border }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-serif font-bold text-amber-950 text-sm sm:text-base">
                      {exp.jobTitle}
                    </span>
                    <span className="text-xs font-mono text-amber-700">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-sans font-medium text-amber-800 mt-0.5">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-amber-900/90 list-disc pl-4 leading-relaxed font-sans">
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

        {/* Projects & Creations */}
        {projects && projects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-serif" style={{ color: theme.primary }}>◆</span>
              <h2 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-amber-950">
                Crafts & Featured Works
              </h2>
              <div className="flex-1 h-px bg-amber-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid p-3.5 rounded-2xl bg-amber-50/50 border border-amber-200/60">
                  <span className="font-serif font-bold text-amber-950 text-xs sm:text-sm block">
                    {proj.name}
                  </span>
                  {proj.description && (
                    <p className="mt-1 text-xs text-amber-900/80 leading-relaxed font-sans">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <section className="cv-break-avoid">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-serif" style={{ color: theme.primary }}>◆</span>
              <h2 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-amber-950">
                Education & Background
              </h2>
              <div className="flex-1 h-px bg-amber-200" />
            </div>

            <div className="space-y-2 font-sans text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <span className="font-semibold text-amber-950">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="text-amber-800"> — {edu.institution}</span>
                  </div>
                  <span className="font-mono text-amber-700 text-[11px]">
                    {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Natural Skills Pills */}
        {skills?.technical && skills.technical.length > 0 && (
          <section className="cv-break-avoid">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-sm font-serif" style={{ color: theme.primary }}>◆</span>
              <h2 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-amber-950">
                Core Skills & Disciplines
              </h2>
              <div className="flex-1 h-px bg-amber-200" />
            </div>
            <div className={settings.skillDisplayStyle === "bars" || settings.skillDisplayStyle === "stars" || settings.skillDisplayStyle === "dots" ? "grid grid-cols-1 sm:grid-cols-2 gap-2 font-sans" : "flex flex-wrap gap-1.5 font-sans"}>
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
          </section>
        )}
      </div>
    </div>
  );
};
