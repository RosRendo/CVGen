import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, Terminal, ExternalLink } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const TechnicalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.navy;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-slate-800 ${font.fontFamilyClass} ${size.body}`}>
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-4">
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
          <div>
            <h1 className={`${size.h1} font-black tracking-tight text-slate-950 font-mono flex items-center gap-2`}>
              <Terminal className="h-6 w-6 inline-block" style={{ color: theme.primary }} />
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p className="mt-0.5 text-sm font-semibold tracking-wide text-slate-600">
                {"//"} {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {personalInfo.githubUrl && (
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 text-white font-mono text-[11px] hover:bg-slate-800"
              >
                <Github className="h-3 w-3" /> github
              </a>
            )}
            {personalInfo.linkedinUrl && (
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-2 py-1 rounded border border-slate-300 font-mono text-[11px] hover:bg-slate-100"
              >
                <Linkedin className="h-3 w-3" /> linkedin
              </a>
            )}
            {personalInfo.websiteUrl && (
              <a
                href={personalInfo.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 px-2 py-1 rounded border border-slate-300 font-mono text-[11px] hover:bg-slate-100"
              >
                <Globe className="h-3 w-3" /> portfolio
              </a>
            )}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-mono">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3 text-slate-400" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3 text-slate-400" />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-slate-400" />
              <span>{personalInfo.location}</span>
            </span>
          )}
        </div>
      </header>

      <div className={`mt-4 ${spacing.sectionGap}`}>
        {/* Technical Skills Matrix - Elevated to top for tech recruiters */}
        {skills && ((skills.technical && skills.technical.length > 0) || (skills.languages && skills.languages.length > 0)) && (
          <section className="cv-break-avoid rounded-lg border border-slate-200 bg-slate-50/70 p-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono flex items-center justify-between border-b border-slate-200 pb-1 mb-2">
              <span>&gt; Technical Competencies</span>
              <span className="text-[10px] text-slate-500 lowercase">stack_overview</span>
            </h2>
            <div className="space-y-1.5 text-xs">
              {skills.technical && skills.technical.length > 0 && (
                <div className="space-y-1">
                  <span className="font-mono font-semibold text-slate-700 min-w-20 block">Technologies:</span>
                  <div className={settings.skillDisplayStyle === "bars" || settings.skillDisplayStyle === "stars" || settings.skillDisplayStyle === "dots" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2" : "flex flex-wrap gap-1"}>
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
              {skills.soft && skills.soft.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center pt-0.5">
                  <span className="font-mono font-semibold text-slate-700 min-w-20">Practices:</span>
                  <span className="text-slate-600">{skills.soft.join(", ")}</span>
                </div>
              )}
              {skills.languages && skills.languages.length > 0 && (
                <div className="flex flex-wrap gap-1 items-center pt-0.5">
                  <span className="font-mono font-semibold text-slate-700 min-w-20">Languages:</span>
                  <span className="text-slate-600">
                    {skills.languages.map((l) => `${l.language} [${l.proficiency}]`).join(" | ")}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="cv-break-avoid">
            <h2 className={`${size.h2} font-mono font-bold text-slate-900 border-b border-slate-200 pb-1`}>
              &gt; Engineering Summary
            </h2>
            <p className="mt-1.5 text-slate-700 leading-relaxed text-xs">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className={`${size.h2} font-mono font-bold text-slate-900 border-b border-slate-200 pb-1`}>
              &gt; Work History
            </h2>
            <div className={`mt-2.5 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 text-xs">
                      {exp.jobTitle} <span className="font-normal text-slate-500">@</span> {exp.company}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500">
                      [{exp.startDate} - {exp.isCurrent ? "PRESENT" : exp.endDate?.toUpperCase() || "PRESENT"}]
                    </span>
                  </div>
                  {exp.location && <div className="text-[11px] text-slate-500 font-mono">{exp.location}</div>}
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1.5 list-disc space-y-1 pl-4 text-xs text-slate-700">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects & Repositories */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className={`${size.h2} font-mono font-bold text-slate-900 border-b border-slate-200 pb-1`}>
              &gt; Notable Projects & Code
            </h2>
            <div className={`mt-2.5 grid grid-cols-1 gap-2`}>
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid rounded border border-slate-200 p-2.5 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-mono text-xs flex items-center gap-1.5">
                      {proj.name}
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-0.5 text-[10px]"
                        >
                          <ExternalLink className="h-2.5 w-2.5" /> demo
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-600 hover:underline flex items-center gap-0.5 text-[10px]"
                        >
                          <Github className="h-2.5 w-2.5" /> repo
                        </a>
                      )}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-700 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1 font-mono text-[10px]">
                      {proj.technologies.map((t, idx) => (
                        <span key={idx} className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
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

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education && education.length > 0 && (
            <section className="cv-break-avoid">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                &gt; Education
              </h2>
              <div className="mt-2 space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <div className="font-bold text-slate-900">{edu.degree}</div>
                    <div className="text-slate-600">{edu.fieldOfStudy}</div>
                    <div className="text-slate-500 font-mono text-[11px]">
                      {edu.institution} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {additional && (additional.certifications?.length > 0 || additional.awards?.length > 0) && (
            <section className="cv-break-avoid">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
                &gt; Certs & Recognition
              </h2>
              <div className="mt-2 space-y-1.5 text-xs text-slate-700">
                {additional.certifications?.map((c) => (
                  <div key={c.id}>
                    <span className="font-semibold">{c.name}</span> — {c.issuer}
                  </div>
                ))}
                {additional.awards?.map((a) => (
                  <div key={a.id}>
                    <span className="font-semibold">{a.title}</span> — {a.issuer}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
