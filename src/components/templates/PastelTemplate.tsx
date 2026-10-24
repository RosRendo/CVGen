import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, Sparkles } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const PastelTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.rose;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  return (
    <div className={`w-full text-zinc-800 ${font.fontFamilyClass} ${size.body}`}>
      {/* Soft Pastel Aura Header */}
      <header className="rounded-3xl bg-gradient-to-r from-pink-50 via-purple-50 to-sky-50 p-6 sm:p-7 border border-pink-100 shadow-2xs mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 text-center sm:text-left">
          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-pink-200/60 text-xs font-medium text-pink-700 shadow-2xs">
              <Sparkles className="h-3 w-3 text-pink-500" />
              <span>Creative Profile</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight">
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs font-bold uppercase tracking-wider text-pink-600">
                {personalInfo.jobTitle}
              </p>
            )}

            {/* Pastel Contact Pills */}
            <div className="pt-2 flex flex-wrap justify-center sm:justify-start gap-2 text-xs">
              {personalInfo.email && (
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-zinc-700 hover:text-zinc-950 border border-zinc-200/60"
                >
                  <Mail className="h-3 w-3 text-pink-400" />
                  <span>{personalInfo.email}</span>
                </a>
              )}
              {personalInfo.phone && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-zinc-700 border border-zinc-200/60">
                  <Phone className="h-3 w-3 text-pink-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-zinc-700 border border-zinc-200/60">
                  <MapPin className="h-3 w-3 text-pink-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.websiteUrl && (
                <a
                  href={personalInfo.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/80 text-zinc-700 hover:text-zinc-950 border border-zinc-200/60"
                >
                  <Globe className="h-3 w-3 text-pink-400" />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          {/* Rounded Pastel Portrait */}
          <div className="shrink-0">
            {personalInfo.photoUrl ? (
              <img
                src={personalInfo.photoUrl}
                alt={personalInfo.fullName || "Pastel Profile"}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 rounded-3xl bg-white border-2 border-pink-200 flex items-center justify-center text-pink-400 text-2xl font-bold shadow-xs">
                ✨
              </div>
            )}
          </div>
        </div>
      </header>

      <div className={`space-y-6 ${spacing.sectionGap}`}>
        {/* Playful Bio */}
        {personalInfo.summary && (
          <section className="cv-break-avoid p-4 rounded-2xl bg-purple-50/40 border border-purple-100">
            <h2 className="text-xs uppercase tracking-wider font-bold text-purple-900 mb-1">
              About & Passion
            </h2>
            <p className="text-zinc-700 leading-relaxed text-sm">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience Section */}
        {experience && experience.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-pink-400" />
              <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-900">
                Work Experience & Projects
              </h2>
              <div className="flex-1 h-px bg-pink-100" />
            </div>

            <div className={`space-y-4 ${spacing.itemGap}`}>
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid p-3.5 rounded-2xl bg-zinc-50/60 border border-zinc-200/70">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <span className="font-bold text-zinc-900 text-sm">
                      {exp.jobTitle}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 px-2 py-0.5 rounded-full bg-white border border-zinc-200">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-pink-700 mt-1">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1 text-xs text-zinc-600 list-disc pl-4 leading-relaxed">
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

        {/* Education */}
        {education && education.length > 0 && (
          <section className="cv-break-avoid">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-900">
                Education & Training
              </h2>
              <div className="flex-1 h-px bg-purple-100" />
            </div>

            <div className="space-y-2 text-xs">
              {education.map((edu) => (
                <div key={edu.id} className="p-3 rounded-xl bg-white border border-zinc-200 flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <span className="font-bold text-zinc-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </span>
                    <span className="text-zinc-600 block sm:inline sm:ml-2">— {edu.institution}</span>
                  </div>
                  <span className="font-mono text-zinc-400 text-[11px]">
                    {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pastel Skills Badges */}
        {skills?.technical && skills.technical.length > 0 && (
          <section className="cv-break-avoid">
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <h2 className="text-xs uppercase tracking-wider font-bold text-zinc-900">
                Skills & Talents
              </h2>
              <div className="flex-1 h-px bg-sky-100" />
            </div>
            <div className={settings.skillDisplayStyle === "bars" || settings.skillDisplayStyle === "stars" || settings.skillDisplayStyle === "dots" ? "grid grid-cols-1 sm:grid-cols-2 gap-2" : "flex flex-wrap gap-1.5"}>
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
          </section>
        )}
      </div>
    </div>
  );
};
