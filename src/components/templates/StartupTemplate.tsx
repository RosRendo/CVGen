import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, ExternalLink } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const StartupTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.monochrome;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-zinc-900 ${font.fontFamilyClass} ${size.body}`}>
      {/* Modern Startup Header */}
      <header className="pb-5 border-b border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            {personalInfo.jobTitle && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-[11px] font-mono text-zinc-700 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>// {personalInfo.jobTitle}</span>
              </div>
            )}
            <h1 className={`${size.h1} font-extrabold tracking-tight text-zinc-950`}>
              {personalInfo.fullName || "Your Full Name"}
            </h1>
          </div>

          {/* Social & Contact Strip */}
          <div className="flex flex-wrap sm:flex-col sm:items-end gap-1.5 text-xs text-zinc-600 font-mono">
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-zinc-950">
                <Mail className="h-3 w-3 text-zinc-400" />
                <span>{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="h-3 w-3 text-zinc-400" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-zinc-400" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 pt-1 font-sans">
              {personalInfo.githubUrl && (
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-[11px] font-medium text-zinc-800 transition-colors"
                >
                  <Github className="h-3 w-3" /> GitHub
                </a>
              )}
              {personalInfo.linkedinUrl && (
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-[11px] font-medium text-zinc-800 transition-colors"
                >
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </a>
              )}
              {personalInfo.websiteUrl && (
                <a
                  href={personalInfo.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-[11px] font-medium text-zinc-800 transition-colors"
                >
                  <Globe className="h-3 w-3" /> App
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className={`mt-5 ${spacing.sectionGap}`}>
        {/* Core Impact & Philosophy */}
        {personalInfo.summary && (
          <section className="cv-break-avoid">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-1.5">
              // Professional Summary
            </h2>
            <p className="text-zinc-700 leading-relaxed text-sm">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Work Experience with Tech Stack Badges */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-3">
              // Track Record & Employment
            </h2>
            <div className={`space-y-4 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid border-l-2 border-zinc-200 pl-3.5 space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-zinc-950 text-sm">
                      {exp.jobTitle}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>

                  <div className="text-xs font-medium text-zinc-700">
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-zinc-400"> • {exp.location}</span>}
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

        {/* Flagship Projects / Shipments */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-3">
              // Shipped Products & Builds
            </h2>
            <div className="grid grid-cols-1 gap-2.5">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="cv-break-avoid p-3 rounded-lg border border-zinc-200 bg-zinc-50/60"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-zinc-900 text-xs sm:text-sm">
                      {proj.name}
                    </span>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-600 hover:text-zinc-950 underline"
                      >
                        <span>Demo</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="mt-1 text-xs text-zinc-600 leading-relaxed">
                      {proj.description}
                    </p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.5 rounded bg-white border border-zinc-200 text-[10px] font-mono text-zinc-700">
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

        {/* Education & Academic Credentials */}
        {education && education.length > 0 && (
          <section className="cv-break-avoid">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
              // Education & Background
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-1 text-xs">
                  <div>
                    <span className="font-semibold text-zinc-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="text-zinc-500"> — {edu.institution}</span>
                  </div>
                  <span className="font-mono text-zinc-400 text-[11px]">
                    {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stack & Competencies */}
        {skills?.technical && skills.technical.length > 0 && (
          <section className="cv-break-avoid">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold mb-2">
              // Core Stack & Tools
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.technical.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-zinc-800 text-xs font-mono"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
