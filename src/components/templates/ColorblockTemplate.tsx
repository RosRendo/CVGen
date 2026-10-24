import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const ColorblockTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.amber;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  const navyBg = "#23354d";
  const saffronBg = "#f59e0b";

  // Split name for dual-tone (first word in navy, remainder in giant white)
  const nameParts = (personalInfo.fullName || "Steven Watson").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return (
    <div className={`w-full text-slate-800 bg-white ${font.fontFamilyClass} ${size.body} shadow-xs`}>
      {/* Top Header Split: Left blank navy / Right Saffron Banner */}
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="hidden md:block md:col-span-4" style={{ backgroundColor: navyBg }} />
        <header
          className="md:col-span-8 p-6 sm:p-8 text-white relative flex flex-col justify-center min-h-[140px]"
          style={{ backgroundColor: saffronBg }}
        >
          <div className="space-y-0.5">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 block">
              {firstName}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wider text-white leading-none">
              {lastName || firstName}
            </h1>
            {personalInfo.jobTitle && (
              <p className="pt-1 text-sm font-semibold tracking-wide text-slate-900">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>
        </header>
      </div>

      {/* Main Two-Column Body */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[750px]">
        {/* Left Column: Navy Sidebar with Overlapping Card Photo (approx 35% width) */}
        <aside
          className="md:col-span-4 p-5 sm:p-6 text-white space-y-6"
          style={{ backgroundColor: navyBg }}
        >
          {/* Overlapping Portrait Photo Frame */}
          <div className="flex justify-center -mt-14 mb-4">
            <div className="w-36 h-44 rounded-sm border-4 border-white shadow-lg overflow-hidden bg-slate-700 flex items-center justify-center">
              {personalInfo.photoUrl ? (
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || "Candidate"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-slate-400" />
              )}
            </div>
          </div>

          {/* Saffron Rectangular Badge: SUMMARY */}
          {personalInfo.summary && (
            <div className="space-y-2">
              <span
                className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-2xs"
                style={{ backgroundColor: saffronBg }}
              >
                Summary
              </span>
              <p className="text-xs text-slate-200 leading-relaxed pt-1">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Saffron Rectangular Badge: CONTACTS */}
          <div className="space-y-2.5">
            <span
              className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-2xs"
              style={{ backgroundColor: saffronBg }}
            >
              Contacts
            </span>
            <div className="space-y-2 text-xs text-slate-200 pt-1">
              {personalInfo.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: saffronBg }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: saffronBg }} />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: saffronBg }} />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedinUrl && (
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:underline"
                >
                  <Linkedin className="h-3.5 w-3.5 shrink-0" style={{ color: saffronBg }} />
                  <span>LinkedIn</span>
                </a>
              )}
              {personalInfo.githubUrl && (
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:underline"
                >
                  <Github className="h-3.5 w-3.5 shrink-0" style={{ color: saffronBg }} />
                  <span>GitHub</span>
                </a>
              )}
              {personalInfo.websiteUrl && (
                <a
                  href={personalInfo.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:underline"
                >
                  <Globe className="h-3.5 w-3.5 shrink-0" style={{ color: saffronBg }} />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          {/* Saffron Rectangular Badge: SKILLS */}
          {skills?.technical && skills.technical.length > 0 && (
            <div className="space-y-2.5">
              <span
                className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-2xs"
                style={{ backgroundColor: saffronBg }}
              >
                Skills
              </span>

              {settings.skillDisplayStyle === "text" ? (
                <ul className="space-y-1.5 text-xs text-slate-200 pt-1">
                  {skills.technical.map((tech, idx) => (
                    <li key={idx} className="flex items-center gap-2 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: saffronBg }} />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2 pt-1">
                  {skills.technical.map((tech) => (
                    <SkillItemRenderer
                      key={tech}
                      name={tech}
                      rating={skills.ratings?.[tech] ?? 4}
                      style={settings.skillDisplayStyle}
                      showIcon={settings.skillShowIcons}
                      primaryColor={saffronBg}
                      primaryLightColor="rgba(255,255,255,0.15)"
                      borderColor="rgba(255,255,255,0.3)"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Languages in Sidebar */}
          {skills?.languages && skills.languages.length > 0 && (
            <div className="space-y-2 pt-1 border-t border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block font-bold">
                Languages
              </span>
              <ul className="space-y-1 text-xs text-slate-200">
                {skills.languages.map((l) => (
                  <li key={l.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: saffronBg }} />
                    <span className="font-semibold">{l.language}</span>
                    <span className="text-slate-400 text-[11px]">({l.proficiency})</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Column: White Body with Saffron Section Headers */}
        <main className="md:col-span-8 p-6 sm:p-8 space-y-6">
          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <span
                className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-2xs"
                style={{ backgroundColor: saffronBg }}
              >
                Work Experience
              </span>

              <div className="space-y-5 pt-2 pl-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 cv-break-avoid text-xs">
                    <div className="text-xs font-semibold text-slate-400 font-mono">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </div>
                    <div className="font-bold text-sm tracking-wide" style={{ color: saffronBg }}>
                      {exp.jobTitle}
                    </div>
                    <div className="font-bold text-slate-900">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1.5 space-y-1 text-slate-700">
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
            <section className="cv-break-avoid space-y-3">
              <span
                className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-2xs"
                style={{ backgroundColor: saffronBg }}
              >
                Education
              </span>

              <div className="space-y-4 pt-2 pl-1">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-break-avoid text-xs space-y-0.5">
                    <div className="text-xs font-semibold text-slate-400 font-mono">
                      {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                    </div>
                    <div className="font-bold text-slate-900 text-xs">
                      {edu.degree} in {edu.fieldOfStudy}
                    </div>
                    <div className="text-slate-600 font-medium">
                      {edu.institution} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Projects */}
          {projects && projects.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <span
                className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-2xs"
                style={{ backgroundColor: saffronBg }}
              >
                Projects & Initiatives
              </span>
              <div className="space-y-3 pt-2 pl-1 text-xs">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-0.5">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    <p className="text-slate-600 leading-relaxed">{proj.description}</p>
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
