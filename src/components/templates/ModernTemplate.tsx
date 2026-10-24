import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.navy;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-slate-800 ${font.fontFamilyClass} ${size.body}`}>
      {/* Top Accent Strip */}
      <div className="h-2 w-full rounded-t" style={{ backgroundColor: theme.primary }} />

      {/* Header */}
      <header className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between pb-5 border-b border-slate-200 gap-4">
        <div className="flex items-center gap-4">
          {personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName || "Profile"}
              className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200 shadow-xs shrink-0"
            />
          )}
          <div>
            <h1 className={`${size.h1} font-extrabold tracking-tight text-slate-900`}>
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p className="mt-1 text-sm font-semibold tracking-wide uppercase" style={{ color: theme.primary }}>
                {personalInfo.jobTitle}
              </p>
            )}
          </div>
        </div>

        {/* Contact Info Pills */}
        <div className="flex flex-col gap-1.5 text-xs text-slate-600 md:text-right">
          {personalInfo.email && (
            <div className="flex items-center gap-1.5 md:justify-end">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-1.5 md:justify-end">
              <Phone className="h-3.5 w-3.5 text-slate-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-1.5 md:justify-end">
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-2 md:justify-end pt-0.5">
            {personalInfo.linkedinUrl && (
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium hover:underline"
                style={{ color: theme.primary }}
              >
                <Linkedin className="h-3 w-3" /> LinkedIn
              </a>
            )}
            {personalInfo.websiteUrl && (
              <a
                href={personalInfo.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium hover:underline"
                style={{ color: theme.primary }}
              >
                <Globe className="h-3 w-3" /> Portfolio
              </a>
            )}
            {personalInfo.githubUrl && (
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] font-medium hover:underline"
                style={{ color: theme.primary }}
              >
                <Github className="h-3 w-3" /> GitHub
              </a>
            )}
          </div>
        </div>
      </header>

      <div className={`mt-5 ${spacing.sectionGap}`}>
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="cv-break-avoid">
            <h2 className={`${size.h2} flex items-center gap-2 font-bold tracking-tight text-slate-900`}>
              <span className="h-4 w-1 rounded" style={{ backgroundColor: theme.primary }} />
              About Me
            </h2>
            <p className="mt-2 text-slate-700 leading-relaxed pl-3">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className={`${size.h2} flex items-center gap-2 font-bold tracking-tight text-slate-900`}>
              <span className="h-4 w-1 rounded" style={{ backgroundColor: theme.primary }} />
              Professional Experience
            </h2>
            <div className={`mt-3 pl-3 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid border-l-2 pl-3 py-0.5" style={{ borderColor: theme.border }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 text-[14px]">{exp.jobTitle}</span>
                    <span
                      className="px-2 py-0.5 text-[11px] font-medium rounded-full"
                      style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
                    >
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-slate-600 mt-0.5">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1.5 list-disc space-y-1 pl-4 text-slate-700 text-xs">
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

        {/* Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className={`${size.h2} flex items-center gap-2 font-bold tracking-tight text-slate-900`}>
              <span className="h-4 w-1 rounded" style={{ backgroundColor: theme.primary }} />
              Education
            </h2>
            <div className={`mt-3 pl-3 ${spacing.itemGap}`}>
              {education.map((edu) => (
                <div key={edu.id} className="cv-break-avoid border-l-2 pl-3 py-0.5" style={{ borderColor: theme.border }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    {(edu.startDate || edu.endDate) && (
                      <span className="text-xs text-slate-500 font-medium">
                        {edu.startDate ? `${edu.startDate} – ` : ""}
                        {edu.endDate || "Present"}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    {edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-slate-600">
                      {edu.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className={`${size.h2} flex items-center gap-2 font-bold tracking-tight text-slate-900`}>
              <span className="h-4 w-1 rounded" style={{ backgroundColor: theme.primary }} />
              Featured Projects
            </h2>
            <div className={`mt-3 pl-3 grid grid-cols-1 gap-2.5`}>
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid rounded-md bg-slate-50/80 p-2.5 border border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-xs">{proj.name}</h3>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-medium hover:underline"
                        style={{ color: theme.primary }}
                      >
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-700 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {proj.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 text-[10px] font-medium rounded"
                          style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {((skills.technical && skills.technical.length > 0) ||
          (skills.soft && skills.soft.length > 0) ||
          (skills.languages && skills.languages.length > 0)) && (
          <section className="cv-break-avoid">
            <h2 className={`${size.h2} flex items-center gap-2 font-bold tracking-tight text-slate-900`}>
              <span className="h-4 w-1 rounded" style={{ backgroundColor: theme.primary }} />
              Skills & Expertise
            </h2>
            <div className="mt-3 pl-3 space-y-2.5">
              {skills.technical && skills.technical.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-700 mb-1">Technical Proficiency:</div>
                  <div className={settings.skillDisplayStyle === "bars" || settings.skillDisplayStyle === "stars" || settings.skillDisplayStyle === "dots" ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : "flex flex-wrap gap-1.5"}>
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
                <div>
                  <div className="text-xs font-semibold text-slate-700 mb-1">Professional Strengths:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.soft.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-100 text-slate-700">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {skills.languages && skills.languages.length > 0 && (
                <div className="text-xs text-slate-700 pt-1">
                  <span className="font-semibold text-slate-800">Languages: </span>
                  {skills.languages.map((l) => `${l.language} (${l.proficiency})`).join(" • ")}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Certifications & Additional */}
        {((additional.certifications && additional.certifications.length > 0) ||
          (additional.awards && additional.awards.length > 0) ||
          (additional.volunteer && additional.volunteer.length > 0)) && (
          <section className="cv-break-avoid">
            <h2 className={`${size.h2} flex items-center gap-2 font-bold tracking-tight text-slate-900`}>
              <span className="h-4 w-1 rounded" style={{ backgroundColor: theme.primary }} />
              Certifications & Leadership
            </h2>
            <div className="mt-2.5 pl-3 space-y-1.5 text-xs text-slate-700">
              {additional.certifications?.map((c) => (
                <div key={c.id}>
                  <strong className="text-slate-900">{c.name}</strong> — {c.issuer} {c.date && `(${c.date})`}
                </div>
              ))}
              {additional.awards?.map((a) => (
                <div key={a.id}>
                  <strong className="text-slate-900">{a.title}</strong> — {a.issuer} {a.date && `(${a.date})`}
                </div>
              ))}
              {additional.volunteer?.map((v) => (
                <div key={v.id}>
                  <strong className="text-slate-900">{v.role}</strong> at {v.organization}{" "}
                  {v.period && `(${v.period})`}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
