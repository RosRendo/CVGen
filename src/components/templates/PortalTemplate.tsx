import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  FolderGit2,
  ExternalLink,
  Code2,
  Layers,
  Sparkles,
} from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { getTechIcon } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const PortalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;

  const darkSidebarBg = "#1f2328";
  const tools = additional?.technicalTools || [];

  return (
    <div className={`w-full h-full text-zinc-800 bg-white ${font.fontFamilyClass} ${size.body}`}>
      <div className="grid grid-cols-12 w-full min-h-[297mm]">
        {/* ================= LEFT COLUMN: Charcoal Arched Portal Sidebar (5 of 12 cols = 41.7%) ================= */}
        <aside
          style={{ backgroundColor: darkSidebarBg }}
          className="col-span-5 text-white p-5 space-y-3.5 flex flex-col justify-between"
        >
          <div className="space-y-3.5">
            {/* Top Name & Job Title */}
            <div className="text-center border-b border-white/15 pb-3">
              <h1 className="text-lg sm:text-xl font-black tracking-widest uppercase text-white">
                {personalInfo.fullName || "ROS RENDO"}
              </h1>
              {personalInfo.jobTitle && (
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-zinc-300 font-semibold">
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>

            {/* Arched Dome Portrait Portal Frame */}
            <div className="flex justify-center">
              <div className="w-28 h-36 rounded-t-full border-3 border-white/90 overflow-hidden bg-zinc-800 shadow-md relative flex items-center justify-center">
                {personalInfo.photoUrl ? (
                  <img
                    src={personalInfo.photoUrl}
                    alt={personalInfo.fullName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-zinc-400">
                    <User className="w-12 h-12 text-zinc-500 mb-1" />
                    <span className="text-[9px] font-mono tracking-widest uppercase">PORTAL</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Channels */}
            <div className="space-y-2 pt-0.5">
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white border-b border-white/15 pb-1">
                <span className="w-4 h-4 rounded-full bg-white text-zinc-950 flex items-center justify-center text-[9px] shrink-0 font-black">
                  <User className="h-2.5 w-2.5" />
                </span>
                <span>Contact Channels</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-zinc-300">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span className="truncate">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Github className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span className="truncate">{personalInfo.githubUrl.replace(/^https?:\/\//, "")}</span>
                  </a>
                )}
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-3 w-3 text-zinc-400 shrink-0" />
                    <span className="truncate">{personalInfo.linkedinUrl.replace(/^https?:\/\//, "")}</span>
                  </a>
                )}
              </div>
            </div>

            {/* Technical Skills with Signature Arched Portal Sliders */}
            {skills?.technical && skills.technical.length > 0 && (
              <div className="space-y-2 pt-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white border-b border-white/15 pb-1">
                  <span className="w-4 h-4 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0">
                    <Wrench className="h-2.5 w-2.5" />
                  </span>
                  <span>Skills & Capabilities</span>
                </div>

                {/* Top Core Competencies with Arched Progress Sliders */}
                <div className="space-y-2 pt-0.5">
                  {skills.technical.slice(0, 6).map((tech) => {
                    const rawRating = skills.ratings?.[tech];
                    const rating = typeof rawRating === "number" ? rawRating : 4;
                    const pct = rating <= 5 ? rating * 20 : Math.min(100, Math.max(20, rating));

                    return (
                      <div key={tech} className="space-y-0.5">
                        <div className="flex justify-between items-center text-[10.5px]">
                          <span className="font-semibold text-zinc-200 flex items-center gap-1">
                            {settings.skillShowIcons && (
                              <span className="shrink-0">
                                {getTechIcon(tech, "w-3 h-3")}
                              </span>
                            )}
                            {tech}
                          </span>
                          <span className="text-[9.5px] font-mono text-zinc-400 font-bold">{pct}%</span>
                        </div>
                        {/* High-Contrast Monochrome Arched Meter Track */}
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                          <div
                            className="h-full bg-gradient-to-r from-zinc-300 to-white rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Additional Technical Skills Tags */}
                {skills.technical.length > 6 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {skills.technical.slice(6).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 text-[10px] font-mono border border-white/10"
                      >
                        {settings.skillShowIcons && getTechIcon(tech, "w-2.5 h-2.5")}
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Developer Tools & Platforms */}
            {tools.length > 0 && (
              <div className="space-y-1.5 pt-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-white border-b border-white/15 pb-1">
                  <span className="w-4 h-4 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0">
                    <Code2 className="h-2.5 w-2.5" />
                  </span>
                  <span>Tools & Platforms</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-200 text-[10px] font-mono border border-white/10 hover:border-white/30 transition-colors"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Education inside Arched Dome Box */}
            {education && education.length > 0 && (
              <div className="rounded-t-3xl rounded-b-xl bg-white/5 border border-white/10 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-1.5">
                  <span className="w-5 h-5 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-3 w-3" />
                  </span>
                  <span>Education</span>
                </div>
                <div className="space-y-3 text-xs text-zinc-300">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <span className="font-bold text-white block text-[11.5px]">{edu.institution}</span>
                      <span className="text-zinc-300 block text-[11px]">
                        {edu.degree} in {edu.fieldOfStudy}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 block">
                        {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                      </span>
                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="pt-1 space-y-0.5 text-[10px] text-zinc-400">
                          {edu.achievements.map((ach, aIdx) => (
                            <p key={aIdx}>• {ach}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications & Academic Awards */}
            {((additional?.certifications && additional.certifications.length > 0) ||
              (additional?.awards && additional.awards.length > 0)) && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-white/15 pb-1.5">
                  <span className="w-5 h-5 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0">
                    <Award className="h-3 w-3" />
                  </span>
                  <span>Certifications & Honors</span>
                </div>
                <div className="space-y-2 text-xs text-zinc-300">
                  {additional?.certifications?.map((cert) => (
                    <div key={cert.id} className="space-y-0.5">
                      <span className="font-bold text-white block text-[11px]">{cert.name}</span>
                      <span className="text-zinc-400 text-[10px] block">
                        {cert.issuer} {cert.date ? `• ${cert.date}` : ""}
                      </span>
                    </div>
                  ))}
                  {additional?.awards?.map((award) => (
                    <div key={award.id} className="space-y-0.5">
                      <span className="font-bold text-white block text-[11px]">{award.title}</span>
                      <span className="text-zinc-400 text-[10px] block">
                        {award.issuer} {award.date ? `• ${award.date}` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Soft Skills / Key Competencies */}
            {skills?.soft && skills.soft.length > 0 && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-white/15 pb-1.5">
                  <span className="w-5 h-5 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0">
                    <Sparkles className="h-3 w-3" />
                  </span>
                  <span>Strengths & Competencies</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.soft.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/10 text-zinc-200 text-[10.5px] border border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages with 5-Pip Monochrome Indicators */}
            {skills?.languages && skills.languages.length > 0 && (
              <div className="space-y-2 pt-1 border-t border-white/15">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white pb-1">
                  <span className="w-5 h-5 rounded-full bg-white text-zinc-950 flex items-center justify-center shrink-0">
                    <Globe className="h-3 w-3" />
                  </span>
                  <span>Languages</span>
                </div>
                <div className="space-y-1.5">
                  {skills.languages.map((l) => {
                    const isNative = l.proficiency.toLowerCase().includes("native");
                    const pips = isNative ? 5 : 4;

                    return (
                      <div
                        key={l.id}
                        className="flex items-center justify-between py-1 px-2.5 rounded bg-white/5 border border-white/10"
                      >
                        <div>
                          <span className="text-white font-bold text-[11px] block">{l.language}</span>
                          <span className="text-[9.5px] text-zinc-400 block">{l.proficiency}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((step) => (
                            <span
                              key={step}
                              className={`w-1.5 h-1.5 rounded-full ${
                                step <= pips ? "bg-white shadow-[0_0_2px_#fff]" : "bg-white/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* References Card */}
            {additional?.references && additional.references.length > 0 && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1 text-xs">
                <span className="text-[9.5px] font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                  Institutional References
                </span>
                {additional.references.map((ref) => (
                  <div key={ref.id} className="space-y-0.5">
                    <div className="text-white font-bold text-[11px]">{ref.name}</div>
                    <div className="text-zinc-400 text-[10px]">{ref.role} • {ref.institution}</div>
                    {ref.contact && (
                      <div className="text-zinc-400 text-[9.5px] font-mono italic">
                        {ref.contact}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* ================= RIGHT MAIN COLUMN: Crisp Editorial White (7 of 12 cols = 58.3%) ================= */}
        <main className="col-span-7 p-5 sm:p-6 space-y-3.5">
          {/* About Me / Executive Summary */}
          {personalInfo.summary && (
            <section className="cv-break-avoid space-y-1.5" style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-1">
                <span className="w-5 h-5 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <User className="h-3 w-3" />
                </span>
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                  Professional Summary
                </h2>
              </div>
              <p className="text-[11.5px] text-zinc-600 leading-relaxed font-normal">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Job Experience */}
          {experience && experience.length > 0 && (
            <section className="cv-break-avoid space-y-2" style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-1">
                <span className="w-5 h-5 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <Briefcase className="h-3 w-3" />
                </span>
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                  Job Experience
                </h2>
              </div>

              <div className="space-y-2.5 pt-0.5">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 cv-break-avoid" style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="font-bold text-zinc-950 text-xs uppercase tracking-wide">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-[10.5px] font-mono text-zinc-500 font-semibold">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-600 font-medium">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1 space-y-0.5 text-[11px] text-zinc-600 list-disc list-outside pl-4">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="leading-snug">
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

          {/* Featured Engineering Projects */}
          {projects && projects.length > 0 && (
            <section className="cv-break-avoid space-y-2" style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-1">
                <span className="w-5 h-5 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <FolderGit2 className="h-3 w-3" />
                </span>
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                  Key Projects & Architectural Systems
                </h2>
              </div>

              <div className="space-y-2 pt-0.5">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
                    className="p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/70 space-y-1 cv-break-avoid portal-project-card hover:border-zinc-400 transition-colors"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="font-bold text-zinc-950 text-xs tracking-tight">
                        {proj.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        {proj.url && (
                          <a
                            href={proj.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-zinc-900 underline hover:text-black transition-colors"
                          >
                            Demo <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-zinc-950 transition-colors"
                          >
                            GitHub <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-zinc-600 leading-snug text-[11px]">
                      {proj.description}
                    </p>

                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {proj.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[9.5px] font-mono font-semibold bg-white border border-zinc-200 text-zinc-800 shadow-2xs"
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

          {/* Core Architectural Competencies */}
          <section className="cv-break-avoid space-y-1.5 pt-0.5" style={{ breakInside: "avoid", pageBreakInside: "avoid" }}>
            <div className="flex items-center gap-2 border-b border-zinc-200 pb-1">
              <span className="w-5 h-5 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                <Layers className="h-3 w-3" />
              </span>
              <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                Core Architectural Competencies
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-0.5">
              <div className="p-2 rounded-lg border border-zinc-200 bg-zinc-50/70 space-y-0.5">
                <h3 className="text-[10px] font-black uppercase text-zinc-950 tracking-wide">
                  Relational Data Modeling
                </h3>
                <p className="text-[9px] text-zinc-600 leading-tight">
                  PostgreSQL, Prisma ORM, foreign keys, 35+ table schemas, transaction integrity.
                </p>
              </div>

              <div className="p-2 rounded-lg border border-zinc-200 bg-zinc-50/70 space-y-0.5">
                <h3 className="text-[10px] font-black uppercase text-zinc-950 tracking-wide">
                  Backend & API Engineering
                </h3>
                <p className="text-[9px] text-zinc-600 leading-tight">
                  REST APIs, NestJS, Node.js, JWT authentication, RBAC, input validation.
                </p>
              </div>

              <div className="p-2 rounded-lg border border-zinc-200 bg-zinc-50/70 space-y-0.5">
                <h3 className="text-[10px] font-black uppercase text-zinc-950 tracking-wide">
                  Cloud & Infrastructure
                </h3>
                <p className="text-[9px] text-zinc-600 leading-tight">
                  Docker, Linux Ubuntu, Nginx reverse proxy, PM2, AWS EC2, automated deployments.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
