import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const RibbonTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.navy;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  // Split name into first and last for dual-tone gold/white styling
  const nameParts = (personalInfo.fullName || "Your Name").split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  // Dedicated teal & gold palette (harmonized with theme if user picked other)
  const tealBg = settings.colorTheme === "navy" || !settings.colorTheme ? "#133842" : theme.primary;
  const goldAccent = "#c59b27";
  const goldLight = "#fdf8e6";

  return (
    <div className={`w-full text-slate-800 bg-white ${font.fontFamilyClass} ${size.body} overflow-hidden shadow-xs`}>
      {/* Top Petrol Teal Header */}
      <div style={{ backgroundColor: tealBg }} className="text-white pt-7 pb-4 px-6 relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Circular Photo with Dual Gold/White Ring Frame */}
          <div className="shrink-0 relative">
            <div
              className="w-28 h-28 rounded-full p-1 shadow-md flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: goldAccent }}
            >
              <div className="w-full h-full rounded-full border-2 border-white overflow-hidden bg-slate-200 flex items-center justify-center">
                {personalInfo.photoUrl ? (
                  <img
                    src={personalInfo.photoUrl}
                    alt={personalInfo.fullName || "Profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-slate-400" />
                )}
              </div>
            </div>
          </div>

          {/* Name, Job Title & Summary */}
          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-wider uppercase">
              <span style={{ color: goldAccent }}>{firstName} </span>
              <span className="text-white">{lastName}</span>
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs uppercase tracking-widest text-slate-300 font-semibold">
                {personalInfo.jobTitle}
              </p>
            )}
            {personalInfo.summary && (
              <p className="text-xs text-slate-200/90 leading-relaxed max-w-2xl pt-1">
                {personalInfo.summary}
              </p>
            )}
          </div>
        </div>

        {/* 3D Wave Ribbon SVG Divider */}
        <div className="absolute -bottom-5 right-0 left-0 h-8 pointer-events-none overflow-hidden z-10">
          <svg
            viewBox="0 0 1000 36"
            preserveAspectRatio="none"
            className="w-full h-full"
            fill="none"
          >
            {/* Darker Under-fold of Ribbon */}
            <path
              d="M200,28 L350,36 L300,18 Z"
              fill="#8d6812"
              opacity="0.85"
            />
            {/* Front Golden Wave Ribbon */}
            <path
              d="M0,0 Q320,38 650,14 T1000,20 L1000,36 L0,36 Z"
              fill={goldAccent}
            />
            <path
              d="M0,0 Q320,34 650,12 T1000,18"
              stroke="#e9cf7e"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      {/* Main Two-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Left Teal Sidebar (~35% width) */}
        <aside
          style={{ backgroundColor: tealBg }}
          className="md:col-span-4 text-white p-5 pt-8 space-y-6"
        >
          {/* Contact Details with Icons */}
          <div className="space-y-2.5 text-xs text-slate-200">
            {personalInfo.phone && (
              <div className="flex items-center gap-2.5">
                <span className="p-1 rounded-full bg-white/10 text-white shrink-0">
                  <Phone className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.email && (
              <div className="flex items-center gap-2.5">
                <span className="p-1 rounded-full bg-white/10 text-white shrink-0">
                  <Mail className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2.5">
                <span className="p-1 rounded-full bg-white/10 text-white shrink-0">
                  <MapPin className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedinUrl && (
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:underline"
              >
                <span className="p-1 rounded-full bg-white/10 text-white shrink-0">
                  <Linkedin className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">LinkedIn</span>
              </a>
            )}
            {personalInfo.githubUrl && (
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:underline"
              >
                <span className="p-1 rounded-full bg-white/10 text-white shrink-0">
                  <Github className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">GitHub</span>
              </a>
            )}
            {personalInfo.websiteUrl && (
              <a
                href={personalInfo.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 hover:underline"
              >
                <span className="p-1 rounded-full bg-white/10 text-white shrink-0">
                  <Globe className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">Portfolio</span>
              </a>
            )}
          </div>

          {/* Outlined Gold Pill: SKILLS */}
          {skills?.technical && skills.technical.length > 0 && (
            <div className="space-y-3">
              <div
                className="border-2 rounded-full py-1 px-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white"
                style={{ borderColor: goldAccent }}
              >
                Skills
              </div>
              {settings.skillDisplayStyle === "text" ? (
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {skills.technical.map((tech, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span style={{ color: goldAccent }}>▪</span>
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
                      primaryColor={goldAccent}
                      primaryLightColor="rgba(255,255,255,0.15)"
                      borderColor="rgba(255,255,255,0.3)"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Outlined Gold Pill: LANGUAGES */}
          {skills?.languages && skills.languages.length > 0 && (
            <div className="space-y-3">
              <div
                className="border-2 rounded-full py-1 px-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white"
                style={{ borderColor: goldAccent }}
              >
                Languages
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {skills.languages.map((l) => (
                  <li key={l.id} className="flex items-center gap-2">
                    <span style={{ color: goldAccent }}>▪</span>
                    <span className="font-medium text-white">{l.language}</span>
                    <span className="text-slate-300 text-[11px]">— {l.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outlined Gold Pill: PRACTICES / HOBBIES */}
          {skills?.soft && skills.soft.length > 0 && (
            <div className="space-y-3">
              <div
                className="border-2 rounded-full py-1 px-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white"
                style={{ borderColor: goldAccent }}
              >
                Core Competencies
              </div>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {skills.soft.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span style={{ color: goldAccent }}>▪</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Main Area (White) */}
        <main className="md:col-span-8 p-6 pt-8 space-y-6">
          {/* Solid Gold Capsule: EXPERIENCE */}
          {experience && experience.length > 0 && (
            <section className="cv-break-avoid space-y-4">
              <div
                className="rounded-full py-1.5 px-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-white shadow-2xs"
                style={{ backgroundColor: goldAccent }}
              >
                Experience
              </div>

              <div className="space-y-4 pl-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 cv-break-avoid">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="font-bold text-slate-900 text-sm tracking-wide">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1.5 space-y-1 text-xs text-slate-700">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-slate-900 shrink-0 select-none">▪</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Solid Gold Capsule: EDUCATION */}
          {education && education.length > 0 && (
            <section className="cv-break-avoid space-y-4">
              <div
                className="rounded-full py-1.5 px-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-white shadow-2xs"
                style={{ backgroundColor: goldAccent }}
              >
                Education
              </div>

              <div className="space-y-3 pl-1">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-break-avoid text-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h4 className="font-bold text-slate-900">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h4>
                      <span className="text-slate-500">
                        {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-slate-600 font-medium">
                      {edu.institution} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects if present */}
          {projects && projects.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <div
                className="rounded-full py-1.5 px-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-white shadow-2xs"
                style={{ backgroundColor: goldAccent }}
              >
                Key Projects
              </div>
              <div className="space-y-3 pl-1">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs space-y-0.5">
                    <span className="font-bold text-slate-900">{proj.name}</span>
                    <p className="text-slate-700 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Bottom Gold Accent Bar */}
      <div className="h-2 w-full" style={{ backgroundColor: goldAccent }} />
    </div>
  );
};
