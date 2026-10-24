import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User, Award, BookOpen, Heart } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const MidnightTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.navy;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  const goldGradient = "from-amber-600 to-amber-500";
  const cyanAccent = "#0ea5e9";

  return (
    <div className={`w-full text-slate-800 bg-white ${font.fontFamilyClass} ${size.body} relative overflow-hidden shadow-xs`}>
      {/* Top Right Diagonal Tech Stripes */}
      <div className="absolute top-0 right-0 pointer-events-none flex gap-1 -mr-6 -mt-3 rotate-45 opacity-85 z-10">
        <div className="w-4 h-16 bg-sky-500" />
        <div className="w-2.5 h-16 bg-sky-700" />
        <div className="w-1.5 h-16 bg-slate-900" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[850px]">
        {/* Left Column: Midnight Arch Sidebar (approx 38% width) */}
        <aside className="md:col-span-5 bg-[#0f1117] text-white p-6 sm:p-7 space-y-6 relative flex flex-col justify-between">
          <div className="space-y-6">
            {/* Top Arched Dome Enclosing Photo */}
            <div className="flex flex-col items-center text-center">
              <div className="w-36 h-44 rounded-t-full bg-gradient-to-b from-sky-900/40 to-transparent p-1.5 border-2 border-sky-400/40 mb-3 flex items-center justify-center overflow-hidden shadow-lg">
                <div className="w-full h-full rounded-t-full overflow-hidden bg-slate-800 flex items-center justify-center">
                  {personalInfo.photoUrl ? (
                    <img
                      src={personalInfo.photoUrl}
                      alt={personalInfo.fullName || "Candidate"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-14 h-14 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Candidate Name & Title */}
              <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white">
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              {personalInfo.jobTitle && (
                <p className="text-xs uppercase tracking-widest text-sky-400 font-semibold mt-1">
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>

            {/* Candidate Bio Summary */}
            {personalInfo.summary && (
              <p className="text-xs text-slate-300 leading-relaxed text-center sm:text-left border-y border-white/10 py-3">
                {personalInfo.summary}
              </p>
            )}

            {/* Contact Details with Blue Circular Icons */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white block mb-2">
                Contact
              </span>
              <div className="space-y-2 text-xs text-slate-300">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Phone className="h-3 w-3" />
                    </span>
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Mail className="h-3 w-3" />
                    </span>
                    <span className="truncate">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <MapPin className="h-3 w-3" />
                    </span>
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-sky-300 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Linkedin className="h-3 w-3" />
                    </span>
                    <span>LinkedIn</span>
                  </a>
                )}
                {personalInfo.websiteUrl && (
                  <a
                    href={personalInfo.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-sky-300 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Globe className="h-3 w-3" />
                    </span>
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>

            {/* Skills Matrix with 5-Stars Default */}
            {skills?.technical && skills.technical.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white block mb-2">
                  Skills
                </span>
                <div className="space-y-2 text-xs">
                  {skills.technical.map((tech) => {
                    const rating = skills.ratings?.[tech] ?? 5;
                    return (
                      <div key={tech} className="flex items-center justify-between gap-2">
                        <span className="text-slate-200 font-medium truncate">{tech}</span>
                        {settings.skillDisplayStyle === "text" ? (
                          <span className="text-sky-400 font-mono text-[10px]">Proficient</span>
                        ) : (
                          <div className="flex gap-0.5 text-xs select-none">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={star <= rating ? "text-amber-400" : "text-slate-700"}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Left Corner Stripes */}
          <div className="pointer-events-none flex gap-1 -ml-3 -mb-2 rotate-45 opacity-60">
            <div className="w-2.5 h-10 bg-sky-500" />
            <div className="w-1.5 h-10 bg-sky-700" />
          </div>
        </aside>

        {/* Right Main Column (White with Gold Gradient Banners) */}
        <main className="md:col-span-7 p-6 sm:p-8 space-y-6">
          {/* Education with Gold Gradient Capsule */}
          {education && education.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <div className="inline-block py-1 px-6 rounded-r-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-2xs">
                Education
              </div>

              <div className="space-y-3 pl-1 pt-1">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 cv-break-avoid text-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="font-bold text-slate-900 text-sm">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <span className="text-slate-500 font-medium">
                        {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-slate-600 font-semibold">{edu.institution}</div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <p className="text-slate-600 leading-relaxed">{edu.achievements.join(", ")}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience / Practical Work */}
          {experience && experience.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <div className="inline-block py-1 px-6 rounded-r-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-2xs">
                Work Experience
              </div>

              <div className="space-y-4 pl-1 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 cv-break-avoid text-xs border-b border-slate-100 pb-3 last:border-b-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wide">
                        {exp.jobTitle}
                      </h4>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-slate-600 font-semibold">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1 space-y-1 text-slate-700">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="leading-relaxed">
                            • {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards or Certifications if present */}
          {((additional?.awards && additional.awards.length > 0) ||
            (additional?.certifications && additional.certifications.length > 0)) && (
            <section className="cv-break-avoid space-y-3">
              <div className="inline-block py-1 px-6 rounded-r-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-2xs">
                Honors & Certifications
              </div>
              <div className="space-y-2 text-xs pl-1">
                {additional.awards?.map((award) => (
                  <div key={award.id} className="flex justify-between items-baseline">
                    <span className="font-bold text-slate-900">{award.title} ({award.issuer})</span>
                    <span className="text-slate-500 font-mono text-[11px]">{award.date}</span>
                  </div>
                ))}
                {additional.certifications?.map((cert) => (
                  <div key={cert.id} className="flex justify-between items-baseline">
                    <span className="font-semibold text-slate-800">{cert.name} — {cert.issuer}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{cert.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Language Proficiency Bar Charts */}
          {skills?.languages && skills.languages.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <div className="inline-block py-1 px-6 rounded-r-full bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-2xs">
                Languages
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1 pt-1">
                {skills.languages.map((l, idx) => {
                  const widthPct = idx === 0 ? "100%" : idx === 1 ? "85%" : "70%";
                  return (
                    <div key={l.id} className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="font-bold text-slate-800">{l.language}</span>
                        <span className="text-slate-500 text-[11px]">{l.proficiency}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-sky-800"
                          style={{ width: widthPct }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Interests & Core Competencies Rounded Box */}
          {skills?.soft && skills.soft.length > 0 && (
            <section className="cv-break-avoid">
              <div className="rounded-2xl p-4 bg-gradient-to-br from-amber-500/15 via-amber-500/5 to-slate-50 border border-amber-300/50 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-950 block">
                  Core Strengths & Interests
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
                  {skills.soft.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
