import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.indigo;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  // Extract initials for monogram
  const initials = (personalInfo.fullName || "CV")
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`w-full text-slate-800 ${font.fontFamilyClass} ${size.body}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Asymmetric Profile & Metadata Sidebar (approx 34% width) */}
        <aside className="md:col-span-4 border-r border-slate-200/80 pr-5 space-y-6">
          {/* Photo or Monogram Badge & Title */}
          <div>
            {personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Creative Profile"}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-sm mb-3"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg text-white shadow-sm mb-3"
                style={{ backgroundColor: theme.primary }}
              >
                {initials}
              </div>
            )}
            <h1 className="text-xl font-bold text-slate-900 leading-snug">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs font-semibold tracking-wide uppercase mt-1" style={{ color: theme.primary }}>
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2 text-xs text-slate-600">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
              Contact
            </span>
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:underline">
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

          {/* Skills Matrix */}
          {skills?.technical && skills.technical.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-2">
                Skills & Disciplines
              </span>
              <div className={settings.skillDisplayStyle === "bars" || settings.skillDisplayStyle === "stars" || settings.skillDisplayStyle === "dots" ? "space-y-1.5" : "flex flex-wrap gap-1.5"}>
                {skills.technical.map((skill) => (
                  <SkillItemRenderer
                    key={skill}
                    name={skill}
                    rating={skills.ratings?.[skill] ?? 4}
                    style={settings.skillDisplayStyle}
                    showIcon={settings.skillShowIcons}
                    primaryColor={theme.primary}
                    primaryLightColor={theme.primaryLight}
                    borderColor={theme.border}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Education in Sidebar */}
          {education && education.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold mb-2">
                Education
              </span>
              <div className="space-y-3 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <span className="font-semibold text-slate-900 block">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
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
            <div>
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

        {/* Right Main Column: Experience, Bio, Projects (approx 66% width) */}
        <main className={`md:col-span-8 ${spacing.sectionGap}`}>
          {/* Creative Statement / Summary */}
          {personalInfo.summary && (
            <section className="cv-break-avoid">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-2">
                About & Creative Vision
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm">
                {personalInfo.summary}
              </p>
            </section>
          )}

          {/* Work Experience Timeline */}
          {experience && experience.length > 0 && (
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3">
                Experience Timeline
              </h2>
              <div className={`space-y-4 border-l-2 pl-4`} style={{ borderColor: theme.border }}>
                {experience.map((exp) => (
                  <div key={exp.id} className="cv-break-avoid relative">
                    <div
                      className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2"
                      style={{ borderColor: theme.primary }}
                    />
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <span className="font-bold text-slate-900 text-sm">
                        {exp.jobTitle}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700 mt-0.5">
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-slate-600 list-disc pl-4 leading-relaxed">
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

          {/* Featured Projects */}
          {projects && projects.length > 0 && (
            <section>
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold mb-3">
                Selected Work & Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="cv-break-avoid p-3 rounded-lg border border-slate-200/80 bg-slate-50/50"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {proj.name}
                      </span>
                      {proj.url && (
                        <a href={proj.url} target="_blank" rel="noreferrer" className="text-xs font-mono text-blue-600 hover:underline">
                          View Project ↗
                        </a>
                      )}
                    </div>
                    {proj.description && (
                      <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {proj.technologies.map((t, idx) => (
                          <span key={idx} className="px-1.5 py-0.5 rounded text-[10px] bg-white border border-slate-200 text-slate-700">
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
