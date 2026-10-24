import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.navy;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-slate-800 ${font.fontFamilyClass} ${size.body}`}>
      {/* Header */}
      <header className="border-b-2 pb-4 text-center" style={{ borderColor: theme.primary }}>
        <h1 className={`${size.h1} tracking-tight font-serif text-slate-900`}>
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="mt-1 text-sm font-medium tracking-wide uppercase" style={{ color: theme.primary }}>
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact Info Bar */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" style={{ color: theme.primary }} />
              <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                {personalInfo.email}
              </a>
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" style={{ color: theme.primary }} />
              <span>{personalInfo.phone}</span>
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" style={{ color: theme.primary }} />
              <span>{personalInfo.location}</span>
            </span>
          )}
          {personalInfo.linkedinUrl && (
            <span className="flex items-center gap-1">
              <Linkedin className="h-3 w-3" style={{ color: theme.primary }} />
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </span>
          )}
          {personalInfo.websiteUrl && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" style={{ color: theme.primary }} />
              <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline">
                Portfolio
              </a>
            </span>
          )}
          {personalInfo.githubUrl && (
            <span className="flex items-center gap-1">
              <Github className="h-3 w-3" style={{ color: theme.primary }} />
              <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">
                GitHub
              </a>
            </span>
          )}
        </div>
      </header>

      <div className={`mt-5 ${spacing.sectionGap}`}>
        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="cv-break-avoid">
            <h2
              className={`${size.h2} border-b pb-1 font-serif tracking-wider`}
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              Professional Summary
            </h2>
            <p className="mt-2 text-slate-700 leading-relaxed text-justify">{personalInfo.summary}</p>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2
              className={`${size.h2} border-b pb-1 font-serif tracking-wider`}
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              Work Experience
            </h2>
            <div className={`mt-3 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900">{exp.jobTitle}</span>
                    <span className="text-xs font-medium text-slate-600">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 italic">
                    <span>{exp.company}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1.5 list-disc space-y-1 pl-4 text-slate-700">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {bullet}
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
            <h2
              className={`${size.h2} border-b pb-1 font-serif tracking-wider`}
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              Education
            </h2>
            <div className={`mt-3 ${spacing.itemGap}`}>
              {education.map((edu) => (
                <div key={edu.id} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    {(edu.startDate || edu.endDate) && (
                      <span className="text-xs font-medium text-slate-600">
                        {edu.startDate ? `${edu.startDate} – ` : ""}
                        {edu.endDate || "Present"}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-700 italic">
                    <span>{edu.institution}</span>
                    {edu.gpa && <span className="font-medium not-italic">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-slate-700">
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
            <h2
              className={`${size.h2} border-b pb-1 font-serif tracking-wider`}
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              Key Projects
            </h2>
            <div className={`mt-3 ${spacing.itemGap}`}>
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900">
                      {proj.name}
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-xs font-normal underline"
                          style={{ color: theme.primary }}
                        >
                          [Link]
                        </a>
                      )}
                    </span>
                  </div>
                  <p className="mt-0.5 text-slate-700 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="mt-1 text-xs text-slate-600">
                      <strong className="text-slate-800">Technologies:</strong> {proj.technologies.join(", ")}
                    </p>
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
            <h2
              className={`${size.h2} border-b pb-1 font-serif tracking-wider`}
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              Skills & Languages
            </h2>
            <div className="mt-2.5 space-y-1.5 text-slate-700">
              {skills.technical && skills.technical.length > 0 && (
                <p>
                  <strong className="text-slate-900">Technical Skills:</strong> {skills.technical.join(" • ")}
                </p>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <p>
                  <strong className="text-slate-900">Professional Skills:</strong> {skills.soft.join(" • ")}
                </p>
              )}
              {skills.languages && skills.languages.length > 0 && (
                <p>
                  <strong className="text-slate-900">Languages:</strong>{" "}
                  {skills.languages.map((l) => `${l.language} (${l.proficiency})`).join(" • ")}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Certifications & Awards */}
        {((additional.certifications && additional.certifications.length > 0) ||
          (additional.awards && additional.awards.length > 0) ||
          (additional.volunteer && additional.volunteer.length > 0)) && (
          <section className="cv-break-avoid">
            <h2
              className={`${size.h2} border-b pb-1 font-serif tracking-wider`}
              style={{ color: theme.primary, borderColor: theme.border }}
            >
              Certifications & Honors
            </h2>
            <div className="mt-2 space-y-1.5">
              {additional.certifications &&
                additional.certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <span className="font-semibold text-slate-800">{cert.name}</span> — {cert.issuer}
                    {cert.date && <span className="text-slate-500"> ({cert.date})</span>}
                  </div>
                ))}
              {additional.awards &&
                additional.awards.map((award) => (
                  <div key={award.id} className="text-xs">
                    <span className="font-semibold text-slate-800">{award.title}</span> — {award.issuer}
                    {award.date && <span className="text-slate-500"> ({award.date})</span>}
                  </div>
                ))}
              {additional.volunteer &&
                additional.volunteer.map((vol) => (
                  <div key={vol.id} className="text-xs">
                    <span className="font-semibold text-slate-800">{vol.role}</span> at {vol.organization}
                    {vol.period && <span className="text-slate-500"> ({vol.period})</span>}
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
