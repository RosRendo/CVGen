import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const NordicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.slate;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.serif;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-zinc-900 ${font.fontFamilyClass} ${size.body}`}>
      {/* Centered Editorial Header */}
      <header className="text-center pb-5 border-b border-zinc-200">
        <h1 className="text-3xl sm:text-4xl font-serif tracking-tight text-zinc-950 font-normal">
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-zinc-500 font-sans">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Subtle Framed Contact Line */}
        <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-zinc-600 font-sans">
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-zinc-950">
              <Mail className="h-3 w-3 text-zinc-400" />
              <span>{personalInfo.email}</span>
            </a>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-zinc-400" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-zinc-400" />
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.linkedinUrl && (
            <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-zinc-950">
              <Linkedin className="h-3 w-3 text-zinc-400" />
              <span>LinkedIn</span>
            </a>
          )}
          {personalInfo.websiteUrl && (
            <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-zinc-950">
              <Globe className="h-3 w-3 text-zinc-400" />
              <span>Portfolio</span>
            </a>
          )}
          {personalInfo.githubUrl && (
            <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-zinc-950">
              <Github className="h-3 w-3 text-zinc-400" />
              <span>GitHub</span>
            </a>
          )}
        </div>
      </header>

      <div className={`mt-6 ${spacing.sectionGap}`}>
        {/* Editorial Narrative / Profile */}
        {personalInfo.summary && (
          <section className="cv-break-avoid max-w-3xl mx-auto text-center">
            <p className="text-zinc-700 italic font-serif leading-relaxed text-sm sm:text-base">
              “{personalInfo.summary}”
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-zinc-900">
                Experience
              </span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>

            <div className={`space-y-5 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-serif font-bold text-zinc-950 text-base">
                      {exp.company}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">
                      {exp.startDate} — {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-600 font-sans italic mt-0.5">
                    <span>{exp.jobTitle}</span>
                    {exp.location && <span> • {exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs sm:text-[13px] text-zinc-700 list-disc pl-4 leading-relaxed font-sans">
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

        {/* Education Section */}
        {education && education.length > 0 && (
          <section className="cv-break-avoid">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-zinc-900">
                Education & Research
              </span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>

            <div className="space-y-3 font-sans">
              {education.map((edu) => (
                <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <span className="font-semibold text-zinc-900 text-sm block">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400">
                    {edu.startDate ? `${edu.startDate} — ` : ""}
                    {edu.endDate || "Present"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects / Publications */}
        {projects && projects.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-zinc-900">
                Selected Works
              </span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>

            <div className="space-y-3 font-sans">
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-zinc-900 text-xs sm:text-sm">
                      {proj.name}
                    </span>
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noreferrer" className="text-xs font-mono text-zinc-500 hover:text-zinc-950 underline">
                        View ↗
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="mt-1 text-xs text-zinc-600 leading-relaxed">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Competencies */}
        {skills?.technical && skills.technical.length > 0 && (
          <section className="cv-break-avoid">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-zinc-900">
                Expertise & Tools
              </span>
              <div className="flex-1 h-px bg-zinc-200" />
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans">
              {skills.technical.join(" • ")}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};
