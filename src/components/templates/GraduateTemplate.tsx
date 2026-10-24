import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, GraduationCap, Award, HeartHandshake } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const GraduateTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.navy;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-slate-800 ${font.fontFamilyClass} ${size.body}`}>
      {/* Header */}
      <header className="border-b pb-4" style={{ borderColor: theme.border }}>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            {personalInfo.photoUrl && (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Candidate Photo"}
                className="w-20 h-24 object-cover rounded border border-slate-300 shadow-2xs shrink-0"
              />
            )}
            <div>
              <span
                className="text-[11px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-1.5"
                style={{ backgroundColor: theme.badgeBg, color: theme.badgeText }}
              >
                Fresh Graduate / Candidate
              </span>
              <h1 className={`${size.h1} font-bold tracking-tight text-slate-900`}>
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              {personalInfo.jobTitle && (
                <p className="mt-1 text-sm font-semibold" style={{ color: theme.primary }}>
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-1 text-xs text-slate-600 md:text-right">
            {personalInfo.email && (
              <div className="flex items-center gap-1 md:justify-end">
                <Mail className="h-3 w-3" style={{ color: theme.primary }} />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                  {personalInfo.email}
                </a>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1 md:justify-end">
                <Phone className="h-3 w-3" style={{ color: theme.primary }} />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1 md:justify-end">
                <MapPin className="h-3 w-3" style={{ color: theme.primary }} />
                <span>{personalInfo.location}</span>
              </div>
            )}
            <div className="flex flex-wrap gap-2 md:justify-end pt-1">
              {personalInfo.linkedinUrl && (
                <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5 text-[11px]" style={{ color: theme.primary }}>
                  <Linkedin className="h-3 w-3" /> LinkedIn
                </a>
              )}
              {personalInfo.websiteUrl && (
                <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5 text-[11px]" style={{ color: theme.primary }}>
                  <Globe className="h-3 w-3" /> Portfolio
                </a>
              )}
              {personalInfo.githubUrl && (
                <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-0.5 text-[11px]" style={{ color: theme.primary }}>
                  <Github className="h-3 w-3" /> GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className={`mt-4 ${spacing.sectionGap}`}>
        {/* Career Objective / Summary */}
        {personalInfo.summary && (
          <section className="cv-break-avoid">
            <h2 className={`${size.h2} font-bold text-slate-900 border-b pb-1`} style={{ borderColor: theme.border }}>
              Career Objective & Profile
            </h2>
            <p className="mt-2 text-slate-700 leading-relaxed text-justify">{personalInfo.summary}</p>
          </section>
        )}

        {/* Education - Prominently at the top for Graduates */}
        {education && education.length > 0 && (
          <section>
            <h2
              className={`${size.h2} font-bold text-slate-900 border-b pb-1 flex items-center gap-1.5`}
              style={{ borderColor: theme.border }}
            >
              <GraduationCap className="h-4 w-4" style={{ color: theme.primary }} />
              Education & Academic Credentials
            </h2>
            <div className={`mt-3 ${spacing.itemGap}`}>
              {education.map((edu) => (
                <div key={edu.id} className="cv-break-avoid rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 text-sm">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="text-xs font-semibold" style={{ color: theme.primary }}>
                      {edu.startDate ? `${edu.startDate} – ` : ""}
                      {edu.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-slate-700 mt-0.5">
                    {edu.institution} {edu.gpa && <span className="ml-2 font-bold text-emerald-700">GPA: {edu.gpa}</span>}
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-2 text-xs">
                      <span className="font-semibold text-slate-800">Key Highlights & Honors:</span>
                      <ul className="mt-1 list-disc pl-4 space-y-0.5 text-slate-700">
                        {edu.achievements.map((ach, idx) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Academic & Practical Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className={`${size.h2} font-bold text-slate-900 border-b pb-1`} style={{ borderColor: theme.border }}>
              Academic & Independent Projects
            </h2>
            <div className={`mt-3 ${spacing.itemGap}`}>
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid">
                  <div className="flex items-baseline justify-between">
                    <span className="font-bold text-slate-900 text-xs">
                      {proj.name}
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-xs font-normal underline"
                          style={{ color: theme.primary }}
                        >
                          [Project Link]
                        </a>
                      )}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-700 leading-relaxed">{proj.description}</p>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="mt-1 text-xs text-slate-600">
                      <strong className="text-slate-800">Skills Utilized:</strong> {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work / Internship Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className={`${size.h2} font-bold text-slate-900 border-b pb-1`} style={{ borderColor: theme.border }}>
              Internships & Practical Experience
            </h2>
            <div className={`mt-3 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-slate-900 text-xs">{exp.jobTitle}</span>
                    <span className="text-xs font-medium text-slate-600">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 italic">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 text-xs text-slate-700">
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

        {/* Skills & Languages */}
        {((skills.technical && skills.technical.length > 0) ||
          (skills.soft && skills.soft.length > 0) ||
          (skills.languages && skills.languages.length > 0)) && (
          <section className="cv-break-avoid">
            <h2 className={`${size.h2} font-bold text-slate-900 border-b pb-1`} style={{ borderColor: theme.border }}>
              Skills & Languages
            </h2>
            <div className="mt-2.5 space-y-1.5 text-xs text-slate-700">
              {skills.technical && skills.technical.length > 0 && (
                <div>
                  <strong className="text-slate-900 block mb-1">Technical Skills:</strong>
                  {settings.skillDisplayStyle === "text" ? (
                    <p>{skills.technical.join(" • ")}</p>
                  ) : (
                    <div className={settings.skillDisplayStyle === "bars" || settings.skillDisplayStyle === "stars" || settings.skillDisplayStyle === "dots" ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : "flex flex-wrap gap-1"}>
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
                </div>
              )}
              {skills.soft && skills.soft.length > 0 && (
                <p>
                  <strong className="text-slate-900">Core Strengths:</strong> {skills.soft.join(" • ")}
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

        {/* Volunteer, Awards & Certifications */}
        {((additional.volunteer && additional.volunteer.length > 0) ||
          (additional.awards && additional.awards.length > 0) ||
          (additional.certifications && additional.certifications.length > 0)) && (
          <section className="cv-break-avoid">
            <h2
              className={`${size.h2} font-bold text-slate-900 border-b pb-1 flex items-center gap-1.5`}
              style={{ borderColor: theme.border }}
            >
              <HeartHandshake className="h-4 w-4" style={{ color: theme.primary }} />
              Leadership, Volunteering & Awards
            </h2>
            <div className="mt-2 space-y-1.5 text-xs text-slate-700">
              {additional.volunteer?.map((v) => (
                <div key={v.id}>
                  <strong className="text-slate-900">{v.role}</strong> — {v.organization}{" "}
                  {v.period && `(${v.period})`}
                  {v.description && <p className="text-slate-600 pl-2">{v.description}</p>}
                </div>
              ))}
              {additional.awards?.map((a) => (
                <div key={a.id} className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-amber-500" />
                  <strong className="text-slate-900">{a.title}</strong> — {a.issuer} {a.date && `(${a.date})`}
                </div>
              ))}
              {additional.certifications?.map((c) => (
                <div key={c.id}>
                  <strong className="text-slate-900">{c.name}</strong> — {c.issuer} {c.date && `(${c.date})`}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
