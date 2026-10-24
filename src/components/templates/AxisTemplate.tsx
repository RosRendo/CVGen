import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User, GraduationCap, Briefcase, Wrench } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const AxisTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.amber;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  const yellowAccent = "#f59e0b";
  const darkCharcoal = "#1c1e22";

  // Split name for dual-tone (first word in dark, remaining in bold yellow)
  const nameParts = (personalInfo.fullName || "Brian Baxter").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div className={`w-full text-zinc-800 bg-white ${font.fontFamilyClass} ${size.body} relative overflow-hidden shadow-xs`}>
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[850px]">
        {/* Left Column: Charcoal Sidebar with Top Yellow Diagonal Cut (approx 38% width) */}
        <aside
          style={{ backgroundColor: darkCharcoal }}
          className="md:col-span-5 text-white p-6 sm:p-7 space-y-6 relative flex flex-col justify-between"
        >
          {/* Top Yellow Diagonal Cutout Backdrop behind portrait */}
          <div className="relative -mx-6 -mt-7 mb-4 pt-6 px-6 pb-6 overflow-hidden">
            {/* Yellow Angular Background Wedge */}
            <div
              className="absolute top-0 left-0 w-28 h-40 pointer-events-none"
              style={{
                backgroundColor: yellowAccent,
                clipPath: "polygon(0 0, 100% 0, 0 100%)",
              }}
            />

            {/* Arched Dome Portrait Window */}
            <div className="relative z-10 flex justify-center mt-3">
              <div className="w-32 h-44 rounded-t-full border-4 border-white shadow-xl overflow-hidden bg-zinc-800 flex items-center justify-center">
                {personalInfo.photoUrl ? (
                  <img
                    src={personalInfo.photoUrl}
                    alt={personalInfo.fullName || "Candidate"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-14 h-14 text-zinc-500" />
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Contact Me Section with Yellow Vertical Pill */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
                <span className="w-1.5 h-4 rounded-sm shrink-0" style={{ backgroundColor: yellowAccent }} />
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                  Contact Me
                </h2>
              </div>

              <div className="space-y-2 text-xs text-zinc-300">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: yellowAccent }} />
                    <Phone className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: yellowAccent }} />
                    <Mail className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span className="truncate">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: yellowAccent }} />
                    <MapPin className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: yellowAccent }} />
                    <Linkedin className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {personalInfo.websiteUrl && (
                  <a
                    href={personalInfo.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: yellowAccent }} />
                    <Globe className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span>Portfolio</span>
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: yellowAccent }} />
                    <Github className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Dotted Separator */}
            <div className="border-b border-dotted border-white/20" />

            {/* Education Section */}
            {education && education.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-white/10 pb-1.5">
                  <span className="w-1.5 h-4 rounded-sm shrink-0" style={{ backgroundColor: yellowAccent }} />
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                    Education
                  </h2>
                </div>

                <div className="space-y-3 text-xs text-zinc-300">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: yellowAccent }} />
                        <span className="font-bold text-white">{edu.institution}</span>
                      </div>
                      <div className="pl-3 text-zinc-300">
                        {edu.degree} in {edu.fieldOfStudy}
                      </div>
                      <div className="pl-3 text-[11px] font-mono text-zinc-400">
                        {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages in Sidebar */}
            {skills?.languages && skills.languages.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-dotted border-white/20">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-sm shrink-0" style={{ backgroundColor: yellowAccent }} />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                    Languages
                  </span>
                </div>
                <div className="space-y-1 text-xs text-zinc-300 pl-3">
                  {skills.languages.map((l) => (
                    <div key={l.id} className="flex justify-between">
                      <span className="font-medium text-white">{l.language}</span>
                      <span className="text-zinc-400 text-[11px]">({l.proficiency})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Social or Soft skills at bottom of sidebar */}
          {skills?.soft && skills.soft.length > 0 && (
            <div className="pt-3 border-t border-white/10 text-xs text-zinc-400">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold mb-1.5">
                Core Strengths
              </span>
              <p className="leading-relaxed text-zinc-300">{skills.soft.join(" • ")}</p>
            </div>
          )}
        </aside>

        {/* Right Main Column with Timeline Rail (approx 62% width) */}
        <main className="md:col-span-7 flex flex-col justify-between">
          <div>
            {/* Top Header Band with Light Grey Background */}
            <header className="bg-zinc-100 p-6 sm:p-8 border-b border-zinc-200/80 relative">
              <div className="border-l-4 pl-4" style={{ borderColor: yellowAccent }}>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-zinc-900 leading-none">
                  <span>{firstName} </span>
                  <span style={{ color: yellowAccent }}>{lastName}</span>
                </h1>
                {personalInfo.jobTitle && (
                  <p className="mt-1.5 text-xs font-bold uppercase tracking-[0.25em] text-zinc-500">
                    {personalInfo.jobTitle}
                  </p>
                )}
              </div>
            </header>

            {/* Vertical Timeline Rail Area */}
            <div className="p-6 sm:p-8 space-y-7 relative pl-8 sm:pl-10 before:absolute before:left-4 sm:before:left-5 before:top-8 before:bottom-12 before:w-0.5 before:bg-zinc-200">
              {/* About Me */}
              {personalInfo.summary && (
                <section className="relative space-y-2 cv-break-avoid">
                  {/* Timeline Yellow Node Pin */}
                  <span
                    className="w-3.5 h-3.5 rounded-full absolute -left-6 sm:-left-7 top-0.5 ring-4 ring-white shadow-2xs"
                    style={{ backgroundColor: yellowAccent }}
                  />
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-950">
                    About Me
                  </h2>
                  <p className="text-xs text-zinc-600 leading-relaxed pt-1">
                    {personalInfo.summary}
                  </p>
                </section>
              )}

              {/* Job Experience */}
              {experience && experience.length > 0 && (
                <section className="relative space-y-3 cv-break-avoid">
                  {/* Timeline Yellow Node Pin */}
                  <span
                    className="w-3.5 h-3.5 rounded-full absolute -left-6 sm:-left-7 top-0.5 ring-4 ring-white shadow-2xs"
                    style={{ backgroundColor: yellowAccent }}
                  />
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-950">
                    Job Experience
                  </h2>

                  <div className="space-y-4 pt-1">
                    {experience.map((exp) => (
                      <div key={exp.id} className="space-y-1 cv-break-avoid text-xs">
                        <div className="flex flex-wrap items-baseline justify-between gap-1">
                          <h3 className="font-bold text-zinc-900 uppercase tracking-wide">
                            {exp.jobTitle}
                          </h3>
                          <span className="text-zinc-400 font-mono text-[11px]">
                            {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                          </span>
                        </div>
                        <div className="text-zinc-500 font-semibold italic">
                          {exp.company} {exp.location && `| ${exp.location}`}
                        </div>
                        {exp.bullets && exp.bullets.length > 0 && (
                          <ul className="mt-1 space-y-1 text-zinc-600">
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

              {/* Skills Section with Yellow Slider Bars */}
              {skills?.technical && skills.technical.length > 0 && (
                <section className="relative space-y-3 cv-break-avoid">
                  {/* Timeline Yellow Node Pin */}
                  <span
                    className="w-3.5 h-3.5 rounded-full absolute -left-6 sm:-left-7 top-0.5 ring-4 ring-white shadow-2xs"
                    style={{ backgroundColor: yellowAccent }}
                  />
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-950">
                    Skills
                  </h2>

                  {settings.skillDisplayStyle === "text" ? (
                    <div className="flex flex-wrap gap-2 pt-1 text-xs text-zinc-700">
                      {skills.technical.map((tech, idx) => (
                        <span key={idx} className="font-medium">
                          • {tech}
                        </span>
                      ))}
                    </div>
                  ) : settings.skillDisplayStyle === "pills" ? (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {skills.technical.map((tech) => (
                        <SkillItemRenderer
                          key={tech}
                          name={tech}
                          rating={skills.ratings?.[tech] ?? 4}
                          style="pills"
                          showIcon={settings.skillShowIcons}
                          primaryColor={yellowAccent}
                          primaryLightColor="#fef3c7"
                          borderColor="#fde68a"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {skills.technical.map((tech) => (
                        <SkillItemRenderer
                          key={tech}
                          name={tech}
                          rating={skills.ratings?.[tech] ?? 4}
                          style={settings.skillDisplayStyle}
                          showIcon={settings.skillShowIcons}
                          primaryColor={yellowAccent}
                          primaryLightColor="#fef3c7"
                          borderColor="#fde68a"
                        />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Projects if present */}
              {projects && projects.length > 0 && (
                <section className="relative space-y-2 cv-break-avoid">
                  <span
                    className="w-3.5 h-3.5 rounded-full absolute -left-6 sm:-left-7 top-0.5 ring-4 ring-white shadow-2xs"
                    style={{ backgroundColor: yellowAccent }}
                  />
                  <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-950">
                    Key Projects
                  </h2>
                  <div className="space-y-2 pt-1 text-xs">
                    {projects.map((proj) => (
                      <div key={proj.id}>
                        <span className="font-bold text-zinc-900 block">{proj.name}</span>
                        <p className="text-zinc-600 leading-relaxed">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>

          {/* Bottom Right Yellow Geometric Corner Triangle */}
          <div className="relative h-12 w-full overflow-hidden pointer-events-none">
            <div
              className="absolute bottom-0 right-0 w-24 h-24"
              style={{
                backgroundColor: yellowAccent,
                clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
              }}
            />
          </div>
        </main>
      </div>
    </div>
  );
};
