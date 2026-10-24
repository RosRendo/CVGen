import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const FloralTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.sage;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.serif;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-stone-800 ${font.fontFamilyClass} ${size.body} relative`}>
      {/* Botanical Corner Flourish SVG */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-40 -mr-2 -mt-2">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
          <path
            d="M90,10 C80,35 60,60 20,80 M90,10 C65,15 40,30 20,50 M90,10 C85,35 70,55 50,70"
            stroke={theme.primary}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <circle cx="65" cy="25" r="3.5" fill={theme.primary} opacity="0.6" />
          <circle cx="45" cy="45" r="4" fill={theme.border} opacity="0.8" />
          <circle cx="75" cy="45" r="3" fill={theme.primary} opacity="0.5" />
          <circle cx="35" cy="65" r="3" fill={theme.border} opacity="0.8" />
        </svg>
      </div>

      {/* Header with Botanical Frame */}
      <header className="pb-6 border-b border-stone-200/80 text-center relative">
        {/* Profile Photo with Floral Leaf Ring */}
        <div className="flex justify-center mb-3">
          {personalInfo.photoUrl ? (
            <div className="relative p-1 rounded-full border-2 border-dashed" style={{ borderColor: theme.primary }}>
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Botanical Profile"}
                className="w-20 h-20 rounded-full object-cover shadow-sm"
              />
            </div>
          ) : (
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white font-serif text-xl shadow-xs"
              style={{ backgroundColor: theme.primary }}
            >
              ❦
            </div>
          )}
        </div>

        <h1 className="text-3xl font-serif tracking-tight text-stone-900 font-normal">
          {personalInfo.fullName || "Your Full Name"}
        </h1>

        {personalInfo.jobTitle && (
          <p className="mt-1.5 text-xs font-sans tracking-[0.2em] uppercase font-medium" style={{ color: theme.primary }}>
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Botanical Divider Leaf */}
        <div className="flex items-center justify-center gap-2 my-3 text-stone-300">
          <span className="w-12 h-px bg-stone-200" />
          <span className="text-sm font-serif" style={{ color: theme.primary }}>❧ ❀ ☙</span>
          <span className="w-12 h-px bg-stone-200" />
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-stone-600 font-sans">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:underline">
              <Mail className="h-3 w-3 text-stone-400" />
              <span>{personalInfo.email}</span>
            </a>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-stone-400" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-stone-400" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.websiteUrl && (
            <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>
              <Globe className="h-3 w-3" />
              <span>Portfolio</span>
            </a>
          )}
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline" style={{ color: theme.primary }}>
              <Linkedin className="h-3 w-3" />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </header>

      <div className={`mt-6 ${spacing.sectionGap}`}>
        {/* Narrative Bio */}
        {personalInfo.summary && (
          <section className="cv-break-avoid max-w-2xl mx-auto text-center">
            <p className="text-stone-700 italic font-serif leading-relaxed text-sm sm:text-base">
              “{personalInfo.summary}”
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-serif" style={{ color: theme.primary }}>❦</span>
              <h2 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-stone-900">
                Professional Journey & Experience
              </h2>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className={`space-y-4 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                      {exp.jobTitle}
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 font-sans italic mt-0.5">
                    <span>{exp.company}</span>
                    {exp.location && <span> • {exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1.5 space-y-1 text-xs text-stone-700 list-disc pl-4 leading-relaxed font-sans">
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

        {/* Selected Creations & Projects */}
        {projects && projects.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-serif" style={{ color: theme.primary }}>❦</span>
              <h2 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-stone-900">
                Creations & Portfolio Work
              </h2>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid p-3 rounded-lg border border-stone-200/80 bg-stone-50/50">
                  <span className="font-serif font-bold text-stone-900 text-xs sm:text-sm block">
                    {proj.name}
                  </span>
                  {proj.description && (
                    <p className="mt-1 text-xs text-stone-600 leading-relaxed font-sans">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="cv-break-avoid">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm font-serif" style={{ color: theme.primary }}>❦</span>
              <h2 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-stone-900">
                Education & Credentials
              </h2>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <div className="space-y-2 font-sans">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-1 text-xs">
                  <div>
                    <span className="font-semibold text-stone-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="text-stone-500"> — {edu.institution}</span>
                  </div>
                  <span className="text-stone-400 font-mono text-[11px]">
                    {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Botanical Skill Tags */}
        {skills?.technical && skills.technical.length > 0 && (
          <section className="cv-break-avoid">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-sm font-serif" style={{ color: theme.primary }}>❦</span>
              <h2 className="text-xs font-sans uppercase tracking-[0.2em] font-bold text-stone-900">
                Artisan Skills & Specialties
              </h2>
              <div className="flex-1 h-px bg-stone-200" />
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
