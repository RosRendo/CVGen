import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, Award, CheckCircle2 } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.navy;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  // Combine skills for executive competency matrix
  const competencies = [...(skills?.technical || []), ...(skills?.soft || [])].slice(0, 9);

  return (
    <div className={`w-full text-slate-800 ${font.fontFamilyClass} ${size.body}`}>
      {/* Executive Header Banner */}
      <header className="border-b-2 pb-5" style={{ borderColor: theme.primary }}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className={`${size.h1} font-serif tracking-tight font-bold text-slate-950`}>
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p
                className="mt-1.5 text-sm font-semibold tracking-widest uppercase"
                style={{ color: theme.primary }}
              >
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Contact Details Grid */}
          <div className="text-xs text-slate-600 space-y-1 sm:text-right">
            <div className="flex flex-wrap sm:justify-end gap-x-4 gap-y-1">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-1.5 hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" style={{ color: theme.primary }} />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5" style={{ color: theme.primary }} />
                  <span>{personalInfo.phone}</span>
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" style={{ color: theme.primary }} />
                  <span>{personalInfo.location}</span>
                </span>
              )}
            </div>

            <div className="flex flex-wrap sm:justify-end gap-3 pt-0.5">
              {personalInfo.linkedinUrl && (
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] font-medium hover:underline"
                  style={{ color: theme.primary }}
                >
                  <Linkedin className="h-3 w-3" />
                  <span>LinkedIn Profile</span>
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
                  <Globe className="h-3 w-3" />
                  <span>Executive Bio</span>
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
                  <Github className="h-3 w-3" />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className={`mt-5 ${spacing.sectionGap}`}>
        {/* Executive Profile & Strategic Value Proposition */}
        {personalInfo.summary && (
          <section className="cv-break-avoid">
            <h2
              className={`${size.h2} font-bold tracking-wider text-slate-950 pb-1 border-b`}
              style={{ borderColor: theme.border }}
            >
              Executive Summary
            </h2>
            <p className="mt-2 text-slate-700 leading-relaxed text-justify font-sans">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Executive Competencies Matrix */}
        {competencies.length > 0 && (
          <section className="cv-break-avoid">
            <h2
              className={`${size.h2} font-bold tracking-wider text-slate-950 pb-1 border-b`}
              style={{ borderColor: theme.border }}
            >
              Core Competencies & Strategic Capabilities
            </h2>
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {competencies.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded border border-slate-200/80 bg-slate-50/70"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: theme.primary }} />
                  <span className="font-medium text-slate-800">{skill}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Professional Experience & Career History */}
        {experience && experience.length > 0 && (
          <section>
            <h2
              className={`${size.h2} font-bold tracking-wider text-slate-950 pb-1 border-b`}
              style={{ borderColor: theme.border }}
            >
              Executive Experience & Career History
            </h2>
            <div className={`mt-3 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-950 text-[14px]">
                      {exp.jobTitle}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 mt-0.5">
                    <span className="font-semibold text-slate-800">{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>

                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-slate-700 list-disc list-outside pl-4 text-xs sm:text-[13px] leading-relaxed">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Strategic Projects & Initiatives */}
        {projects && projects.length > 0 && (
          <section>
            <h2
              className={`${size.h2} font-bold tracking-wider text-slate-950 pb-1 border-b`}
              style={{ borderColor: theme.border }}
            >
              Key Initiatives & Flagship Projects
            </h2>
            <div className={`mt-3 ${spacing.itemGap}`}>
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      {proj.name}
                    </span>
                    {proj.url && (
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-blue-600 font-medium hover:underline"
                      >
                        Project Link ↗
                      </a>
                    )}
                  </div>
                  {proj.description && (
                    <p className="mt-1 text-xs text-slate-600">{proj.description}</p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {proj.technologies.map((t, tIdx) => (
                        <span key={tIdx} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700">
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
            <h2
              className={`${size.h2} font-bold tracking-wider text-slate-950 pb-1 border-b`}
              style={{ borderColor: theme.border }}
            >
              Education & Academic Credentials
            </h2>
            <div className={`mt-3 ${spacing.itemGap}`}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {edu.startDate ? `${edu.startDate} – ` : ""}
                      {edu.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600">
                    <span>{edu.institution}</span>
                    {edu.gpa && <span> • GPA: {edu.gpa}</span>}
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Honors: {edu.achievements.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Credentials, Board, Languages & Awards */}
        {(additional?.certifications?.length > 0 ||
          additional?.awards?.length > 0 ||
          skills?.languages?.length > 0) && (
          <section className="cv-break-avoid">
            <h2
              className={`${size.h2} font-bold tracking-wider text-slate-950 pb-1 border-b`}
              style={{ borderColor: theme.border }}
            >
              Certifications, Languages & Honors
            </h2>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {additional?.certifications && additional.certifications.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">
                    Certifications & Credentials
                  </span>
                  <ul className="space-y-1 text-slate-600">
                    {additional.certifications.map((cert) => (
                      <li key={cert.id} className="flex items-center gap-1.5">
                        <Award className="h-3 w-3 text-slate-400 shrink-0" />
                        <span>
                          <strong>{cert.name}</strong> — {cert.issuer} {cert.date && `(${cert.date})`}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {skills?.languages && skills.languages.length > 0 && (
                <div>
                  <span className="font-semibold text-slate-800 block mb-1">
                    Languages
                  </span>
                  <p className="text-slate-600">
                    {skills.languages
                      .map((lang) => `${lang.language} (${lang.proficiency})`)
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
