import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User, Briefcase, GraduationCap, Award, Wrench, Heart } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const PortalTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.monochrome;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  const darkSidebarBg = "#22252a";

  return (
    <div className={`w-full text-zinc-800 bg-white ${font.fontFamilyClass} ${size.body} shadow-xs`}>
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[800px]">
        {/* Left Column: Charcoal Arched Portal Sidebar (approx 38% width) */}
        <aside
          style={{ backgroundColor: darkSidebarBg }}
          className="md:col-span-5 text-white p-6 sm:p-7 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-6">
            {/* Top Name & Job Title */}
            <div className="text-center border-b border-white/15 pb-5">
              <h1 className="text-xl sm:text-2xl font-black tracking-widest uppercase text-white">
                {personalInfo.fullName || "Your Full Name"}
              </h1>
              {personalInfo.jobTitle && (
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium">
                  {personalInfo.jobTitle}
                </p>
              )}
            </div>

            {/* Arched Dome Portrait Portal Frame */}
            <div className="flex justify-center">
              <div className="w-36 h-48 rounded-t-full border-4 border-white/90 overflow-hidden bg-zinc-800 shadow-md relative flex items-center justify-center">
                {personalInfo.photoUrl ? (
                  <img
                    src={personalInfo.photoUrl}
                    alt={personalInfo.fullName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-zinc-500" />
                )}
              </div>
            </div>

            {/* Contact Channels */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-1">
                <span className="w-5 h-5 rounded-full bg-white text-zinc-900 flex items-center justify-center text-[10px] shrink-0">
                  <User className="h-3 w-3" />
                </span>
                <span>Contact Details</span>
              </div>

              <div className="space-y-2 text-xs text-zinc-300">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                    <span>{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
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
                    <Linkedin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Github className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                    <span>GitHub</span>
                  </a>
                )}
                {personalInfo.websiteUrl && (
                  <a
                    href={personalInfo.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Globe className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>

            {/* Education inside Arched Dome Box */}
            {education && education.length > 0 && (
              <div className="rounded-t-3xl rounded-b-xl bg-white/5 border border-white/10 p-4 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border-b border-white/10 pb-1.5">
                  <span className="w-5 h-5 rounded-full bg-white text-zinc-900 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-3 w-3" />
                  </span>
                  <span>Education</span>
                </div>
                <div className="space-y-3 text-xs text-zinc-300">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <span className="font-bold text-white block">{edu.institution}</span>
                      <span className="text-zinc-300 block">
                        {edu.degree} in {edu.fieldOfStudy}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Languages or Certifications at bottom of sidebar */}
          {skills?.languages && skills.languages.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block font-bold mb-2">
                Languages
              </span>
              <div className="flex flex-wrap gap-2 text-xs text-zinc-300">
                {skills.languages.map((l) => (
                  <span key={l.id} className="px-2 py-0.5 rounded bg-white/10 text-white font-medium text-[11px]">
                    {l.language} ({l.proficiency})
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Main Column (Crisp White Editorial) */}
        <main className="md:col-span-7 p-6 sm:p-8 space-y-6">
          {/* About Me Section */}
          {personalInfo.summary && (
            <section className="cv-break-avoid space-y-2">
              <div className="flex items-center gap-2.5 border-b border-zinc-200 pb-1.5">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <User className="h-3.5 w-3.5" />
                </span>
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                  About Me
                </h2>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed pt-1">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Job Experience */}
          {experience && experience.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <div className="flex items-center gap-2.5 border-b border-zinc-200 pb-1.5">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <Briefcase className="h-3.5 w-3.5" />
                </span>
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                  Job Experience
                </h2>
              </div>

              <div className="space-y-4 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 cv-break-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wide">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-xs font-mono text-zinc-400">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-500 font-medium">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1.5 space-y-1 text-xs text-zinc-600">
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

          {/* Skills with Horizontal Sliders */}
          {skills?.technical && skills.technical.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <div className="flex items-center gap-2.5 border-b border-zinc-200 pb-1.5">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <Wrench className="h-3.5 w-3.5" />
                </span>
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                  Skills & Capabilities
                </h2>
              </div>

              {settings.skillDisplayStyle === "text" ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {skills.technical.map((tech, idx) => (
                    <span key={idx} className="text-xs font-medium text-zinc-800">
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
                      primaryColor="#18181b"
                      primaryLightColor="#f4f4f5"
                      borderColor="#e4e4e7"
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
                      primaryColor="#18181b"
                      primaryLightColor="#f4f4f5"
                      borderColor="#e4e4e7"
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Core Competencies & Soft Skills */}
          {skills?.soft && skills.soft.length > 0 && (
            <section className="cv-break-avoid space-y-2">
              <div className="flex items-center gap-2.5 border-b border-zinc-200 pb-1.5">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <Award className="h-3.5 w-3.5" />
                </span>
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                  Strengths & Competencies
                </h2>
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-zinc-700 pt-1">
                {skills.soft.map((s, idx) => (
                  <span key={idx} className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Projects if present */}
          {projects && projects.length > 0 && (
            <section className="cv-break-avoid space-y-2">
              <div className="flex items-center gap-2.5 border-b border-zinc-200 pb-1.5">
                <span className="w-6 h-6 rounded-full bg-zinc-950 text-white flex items-center justify-center shrink-0">
                  <Globe className="h-3.5 w-3.5" />
                </span>
                <h2 className="text-xs font-black uppercase tracking-widest text-zinc-900">
                  Key Projects
                </h2>
              </div>
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
        </main>
      </div>
    </div>
  );
};
