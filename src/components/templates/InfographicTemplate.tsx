import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer, getTechIcon } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const InfographicTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.indigo;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-slate-800 ${font.fontFamilyClass} ${size.body}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
        {/* Left Column: Visual Sidebar with Photo (approx 35% width) */}
        <aside className="md:col-span-4 rounded-xl bg-slate-50/80 p-4 sm:p-4.5 border border-slate-200/80 flex flex-col justify-between space-y-3.5">
          {/* Centered Profile Avatar */}
          <div className="flex flex-col items-center text-center">
            {personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Profile"}
                crossOrigin="anonymous"
                loading="eager"
                decoding="sync"
                className="w-20 h-20 sm:w-22 sm:h-22 rounded-full object-cover border-4 border-white shadow-md mb-2.5"
              />
            ) : (
              <div
                className="w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md mb-2.5"
                style={{ backgroundColor: theme.primary }}
              >
                {personalInfo.fullName
                  ? personalInfo.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()
                  : "CV"}
              </div>
            )}

            <h1 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider mt-0.5" style={{ color: theme.primary }}>
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs text-slate-600 border-t border-slate-200 pt-3.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
              Contact Channels
            </span>
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:underline truncate">
                <Mail className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </a>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedinUrl && (
              <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline" style={{ color: theme.primary }}>
                <Linkedin className="h-3.5 w-3.5 shrink-0" />
                <span>LinkedIn</span>
              </a>
            )}
            {personalInfo.websiteUrl && (
              <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline" style={{ color: theme.primary }}>
                <Globe className="h-3.5 w-3.5 shrink-0" />
                <span>Portfolio</span>
              </a>
            )}
            {personalInfo.githubUrl && (
              <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline" style={{ color: theme.primary }}>
                <Github className="h-3.5 w-3.5 shrink-0" />
                <span>GitHub</span>
              </a>
            )}
          </div>

          {/* Technical Skills Section */}
          {skills?.technical && skills.technical.length > 0 && (
            <div className="border-t border-slate-200 pt-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-2">
                Competency Meters
              </span>

              {settings.skillDisplayStyle === "bars" ? (
                // 1. Visual Bar Chart
                <div className="space-y-2">
                  {skills.technical.map((tech) => {
                    const rawRating = skills.ratings?.[tech];
                    const rating = typeof rawRating === "number" ? rawRating : 4;
                    const pct = rating <= 5 ? rating * 20 : Math.min(100, Math.max(20, rating));
                    return (
                      <div key={tech} className="w-full space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1.5 font-medium text-slate-800">
                            {settings.skillShowIcons && (
                              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                                {getTechIcon(tech, "h-3.5 w-3.5")}
                              </div>
                            )}
                            <span className="font-semibold">{tech}</span>
                          </span>
                          <span className="font-mono text-[10px] font-bold" style={{ color: theme.primary }}>
                            {pct}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full rounded-full overflow-hidden bg-slate-200/90 border border-slate-200/50">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: theme.primary }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : settings.skillDisplayStyle === "stars" ? (
                // 2. 5-Star Stack
                <div className="space-y-1.5">
                  {skills.technical.map((tech) => {
                    const rawRating = skills.ratings?.[tech];
                    const rating = typeof rawRating === "number" ? rawRating : 4;
                    const count = rating > 5 ? Math.round(rating / 20) : rating;
                    return (
                      <div key={tech} className="flex items-center justify-between text-xs py-0.5">
                        <span className="flex items-center gap-1.5 font-medium text-slate-800">
                          {settings.skillShowIcons && (
                            <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                              {getTechIcon(tech, "h-3.5 w-3.5")}
                            </div>
                          )}
                          <span>{tech}</span>
                        </span>
                        <div className="flex items-center gap-0.5 text-xs select-none">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} style={{ color: star <= count ? theme.primary : "#cbd5e1" }}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : settings.skillDisplayStyle === "dots" ? (
                // 3. Dot Levels Stack
                <div className="space-y-1.5">
                  {skills.technical.map((tech) => {
                    const rawRating = skills.ratings?.[tech];
                    const rating = typeof rawRating === "number" ? rawRating : 4;
                    const count = rating > 5 ? Math.round(rating / 20) : rating;
                    return (
                      <div key={tech} className="flex items-center justify-between text-xs py-0.5">
                        <span className="flex items-center gap-1.5 font-medium text-slate-800">
                          {settings.skillShowIcons && (
                            <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                              {getTechIcon(tech, "h-3.5 w-3.5")}
                            </div>
                          )}
                          <span>{tech}</span>
                        </span>
                        <div className="flex items-center gap-1 select-none">
                          {[1, 2, 3, 4, 5].map((dot) => (
                            <span
                              key={dot}
                              className="w-2 h-2 rounded-full inline-block"
                              style={{
                                backgroundColor: dot <= count ? theme.primary : "#cbd5e1",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : settings.skillDisplayStyle === "pills" ? (
                // 4. Pill Badges
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {skills.technical.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border shadow-2xs"
                      style={{
                        backgroundColor: theme.primaryLight,
                        borderColor: theme.border,
                        color: theme.primary,
                      }}
                    >
                      {settings.skillShowIcons && (
                        <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
                          {getTechIcon(tech, "h-3.5 w-3.5", theme.primary)}
                        </div>
                      )}
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              ) : (
                // 5. Plain Text: Stacked vertical list on top of each other with bullet style
                <ul className="space-y-1 text-xs">
                  {skills.technical.map((tech) => {
                    const bullet = settings.skillTextBulletStyle || "dot";
                    let bulletElem: React.ReactNode = null;
                    if (bullet === "dot") bulletElem = <span className="opacity-60 text-slate-400">•</span>;
                    else if (bullet === "dash") bulletElem = <span className="opacity-60 text-slate-400">–</span>;
                    else if (bullet === "check") bulletElem = <span className="text-emerald-600 font-bold text-xs">✓</span>;
                    else if (bullet === "pipe") bulletElem = <span className="opacity-40 text-slate-400">|</span>;
                    else if (bullet === "list") bulletElem = <span className="w-1.5 h-1.5 rounded-xs bg-slate-400 inline-block opacity-75" />;

                    return (
                      <li key={tech} className="flex items-center gap-2 text-slate-700">
                        {bulletElem}
                        {settings.skillShowIcons && (
                          <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                            {getTechIcon(tech, "h-3.5 w-3.5")}
                          </div>
                        )}
                        <span className="font-medium text-slate-800 text-[11.5px] truncate">{tech}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}

          {/* Core Strengths & Competencies */}
          {skills?.soft && skills.soft.length > 0 && (
            <div className="border-t border-slate-200 pt-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-2">
                Core Strengths
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skills.soft.map((s, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-white border border-slate-200 text-slate-700 shadow-2xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education in Sidebar */}
          {education && education.length > 0 && (
            <div className="border-t border-slate-200 pt-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-2">
                Education
              </span>
              <div className="space-y-2 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <span className="font-semibold text-slate-900 block">{edu.degree}</span>
                    <span className="text-slate-600 block">{edu.institution}</span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {skills?.languages && skills.languages.length > 0 && (
            <div className="border-t border-slate-200 pt-3.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-1.5">
                Languages
              </span>
              <ul className="space-y-1 text-xs text-slate-600">
                {skills.languages.map((l, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span className="font-medium text-slate-800">{l.language}</span>
                    <span className="text-slate-400">{l.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Main Column (approx 65% width) */}
        <main className="md:col-span-8 space-y-3">
          {/* Profile Statement */}
          {personalInfo.summary && (
            <section className="cv-break-avoid">
              <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-200">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: theme.primary }} />
                <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                  Professional Bio & Value
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed text-xs sm:text-[12px]">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {experience && experience.length > 0 && (
            <section className="cv-break-avoid">
              <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-200">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: theme.primary }} />
                <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                  Career History
                </h2>
              </div>
              <div className="space-y-2.5">
                {experience.map((exp) => (
                  <div key={exp.id} className="p-3 rounded-lg border border-slate-200 bg-white shadow-2xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <span className="font-bold text-slate-900 text-xs sm:text-[13px]">{exp.jobTitle}</span>
                      <span className="text-xs font-mono text-slate-400">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color: theme.primary }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1.5 space-y-1 text-xs text-slate-600 list-disc pl-4 leading-relaxed">
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

          {/* Shipped Projects */}
          {projects && projects.length > 0 && (
            <section className="cv-break-avoid">
              <div className="flex items-center gap-2 mb-1.5 pb-1 border-b border-slate-200">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: theme.primary }} />
                <h2 className="text-xs font-mono uppercase tracking-widest text-slate-500 font-bold">
                  Key Deliverables & Projects
                </h2>
              </div>
              <div className="space-y-2">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-2.5 rounded-lg border border-slate-200 bg-white shadow-2xs">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-[13px]">{proj.name}</span>
                      {proj.url && (
                        <a href={proj.url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 font-mono underline">
                          Demo ↗
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="mt-1 text-[11.5px] text-slate-600 leading-relaxed">{proj.description}</p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[9.5px] bg-slate-100 text-slate-700 font-mono">
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
        </main>
      </div>
    </div>
  );
};
