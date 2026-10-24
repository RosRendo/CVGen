import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User, Award, BookOpen, Heart, CheckCircle2 } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const HorizonTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.navy;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  const slateBlue = "#4a7c94";
  const darkNavy = "#24303e";

  return (
    <div className={`w-full text-slate-800 bg-white ${font.fontFamilyClass} ${size.body} shadow-xs overflow-hidden`}>
      {/* Top Slate-Blue Horizontal Banner with Overlapping Avatar */}
      <header
        className="px-6 sm:px-8 py-6 text-white relative min-h-[110px] flex items-center justify-between"
        style={{ backgroundColor: slateBlue }}
      >
        <div className="space-y-0.5 max-w-lg">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-white leading-none">
            {personalInfo.fullName || "Your Full Name"}
          </h1>
          {personalInfo.jobTitle && (
            <p className="text-xs uppercase tracking-[0.25em] text-sky-200 font-semibold pt-1">
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Top-Right Overlapping Circular Avatar Frame */}
        <div className="shrink-0 relative -mb-16 z-10">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-200 flex items-center justify-center">
            {personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Candidate"}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-14 h-14 text-slate-400" />
            )}
          </div>
        </div>
      </header>

      {/* Main Two-Column Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[800px]">
        {/* Left Column: Deep Charcoal Navy Sidebar (approx 36% width) */}
        <aside
          style={{ backgroundColor: darkNavy }}
          className="md:col-span-4 text-white p-6 sm:p-7 space-y-6 pt-10"
        >
          {/* Personal Info & Contacts */}
          <div className="space-y-2.5 text-xs text-slate-200">
            {personalInfo.phone && (
              <div className="flex items-center gap-2.5">
                <Phone className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2.5">
                <Mail className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-sky-400 shrink-0" />
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
                <Linkedin className="h-3.5 w-3.5 text-sky-400 shrink-0" />
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
                <Globe className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span>Portfolio</span>
              </a>
            )}
            {personalInfo.githubUrl && (
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:text-sky-300 transition-colors"
              >
                <Github className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                <span>GitHub</span>
              </a>
            )}
          </div>

          {/* Hairline Divider */}
          <div className="border-t border-slate-700" />

          {/* Skills Section */}
          {skills?.technical && skills.technical.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                Skills
              </h2>
              {settings.skillDisplayStyle === "text" ? (
                <ul className="space-y-1 text-xs text-slate-200">
                  {skills.technical.map((tech, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-sky-400 font-bold">•</span>
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2">
                  {skills.technical.map((tech) => (
                    <SkillItemRenderer
                      key={tech}
                      name={tech}
                      rating={skills.ratings?.[tech] ?? 4}
                      style={settings.skillDisplayStyle}
                      showIcon={settings.skillShowIcons}
                      primaryColor="#38bdf8"
                      primaryLightColor="rgba(255, 255, 255, 0.15)"
                      borderColor="rgba(255, 255, 255, 0.25)"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Honors & Awards */}
          {additional?.awards && additional.awards.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-700">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                Honors & Awards
              </h2>
              <div className="space-y-2 text-xs text-slate-200">
                {additional.awards.map((award) => (
                  <div key={award.id} className="space-y-0.5">
                    <span className="font-bold text-sky-300">{award.date}: </span>
                    <span>{award.title} ({award.issuer})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {additional?.certifications && additional.certifications.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-700">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                Certifications
              </h2>
              <div className="space-y-2 text-xs text-slate-200">
                {additional.certifications.map((cert) => (
                  <div key={cert.id} className="space-y-0.5">
                    <span className="font-bold text-sky-300">{cert.date}: </span>
                    <span>{cert.name} issued by {cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages & Interests */}
          {skills?.languages && skills.languages.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-700">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                Languages
              </h2>
              <div className="space-y-1 text-xs text-slate-200">
                {skills.languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-semibold text-white">• {l.language}</span>
                    <span className="text-slate-400 text-[11px]">({l.proficiency})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {skills?.soft && skills.soft.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-slate-700">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                Interests & Strengths
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                - {skills.soft.join(", ")}
              </p>
            </div>
          )}
        </aside>

        {/* Right Column: White Body with Trailing Divider Lines (approx 64% width) */}
        <main className="md:col-span-8 p-6 sm:p-8 space-y-7 pt-10">
          {/* Objective / Summary */}
          {personalInfo.summary && (
            <section className="space-y-2 cv-break-avoid">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 shrink-0">
                  Objective
                </h2>
                <div className="flex-1 h-px bg-slate-300" />
              </div>
              <p className="text-xs text-slate-700 leading-relaxed pt-1">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Education */}
          {education && education.length > 0 && (
            <section className="space-y-4 cv-break-avoid">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 shrink-0">
                  Education
                </h2>
                <div className="flex-1 h-px bg-slate-300" />
              </div>

              <div className="space-y-4 pt-1">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 cv-break-avoid text-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0" />
                        <h3 className="font-bold text-slate-900 text-xs">
                          {edu.institution}
                        </h3>
                      </div>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                      </span>
                    </div>
                    <div className="pl-4 text-slate-600 font-medium">
                      Major: {edu.degree} in {edu.fieldOfStudy}
                    </div>
                    {edu.gpa && (
                      <div className="pl-4 text-slate-500 text-[11px] font-mono">
                        - GPA: {edu.gpa}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className="space-y-4 cv-break-avoid">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 shrink-0">
                  Work Experience
                </h2>
                <div className="flex-1 h-px bg-slate-300" />
              </div>

              <div className="space-y-5 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1.5 cv-break-avoid text-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0" />
                        <h3 className="font-bold text-slate-900 text-xs">
                          {exp.company}
                        </h3>
                      </div>
                      <span className="text-slate-500 font-mono text-[11px]">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="pl-4 text-slate-600 font-semibold italic">
                      {exp.jobTitle} {exp.location && `• ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="pl-4 space-y-1 text-slate-600">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="leading-relaxed">
                            - {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Activities / Projects */}
          {projects && projects.length > 0 && (
            <section className="space-y-3 cv-break-avoid">
              <div className="flex items-center gap-3">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 shrink-0">
                  Key Projects & Activities
                </h2>
                <div className="flex-1 h-px bg-slate-300" />
              </div>

              <div className="space-y-3 pt-1 text-xs">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0" />
                      <span className="font-bold text-slate-900">{proj.name}</span>
                    </div>
                    <p className="pl-4 text-slate-600 leading-relaxed">{proj.description}</p>
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
