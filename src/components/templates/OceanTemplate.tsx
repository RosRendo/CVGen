import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";
import { SkillItemRenderer } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

export const OceanTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.emerald;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  const oceanTeal = "#2d7e95";
  const petrolBlue = "#16495b";

  return (
    <div className={`w-full text-slate-800 bg-white ${font.fontFamilyClass} ${size.body} relative overflow-hidden shadow-xs`}>
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[850px]">
        {/* Left Column: White Canvas with Micro-Dot Watermark Pattern (approx 50% width) */}
        <aside
          className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6 relative border-r border-slate-200/80"
          style={{
            backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          {/* Top Floating Chevron Polygon Cutout Frame */}
          <div className="relative pt-2">
            <div
              className="relative p-2 bg-white shadow-xl inline-block"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)",
              }}
            >
              <div className="w-36 h-36 bg-slate-200 overflow-hidden flex items-center justify-center">
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
          </div>

          {/* Name & Job Title */}
          <div className="space-y-1">
            <h1
              className="text-2xl sm:text-3xl font-black uppercase tracking-wider leading-none"
              style={{ color: petrolBlue }}
            >
              {personalInfo.fullName || "Your Full Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500 font-semibold pt-1">
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Bio / Summary */}
          {personalInfo.summary && (
            <div className="space-y-1">
              <p className="text-xs text-slate-600 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <h2
              className="text-xs font-black uppercase tracking-[0.2em]"
              style={{ color: petrolBlue }}
            >
              Contact
            </h2>

            <div className="space-y-2 text-xs text-slate-600">
              {personalInfo.phone && (
                <div className="flex items-center gap-2.5">
                  <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: oceanTeal }} />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: oceanTeal }} />
                  <span className="truncate">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: oceanTeal }} />
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
                  <Linkedin className="h-3.5 w-3.5 shrink-0" style={{ color: oceanTeal }} />
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
                  <Github className="h-3.5 w-3.5 shrink-0" style={{ color: oceanTeal }} />
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
                  <Globe className="h-3.5 w-3.5 shrink-0" style={{ color: oceanTeal }} />
                  <span>Portfolio</span>
                </a>
              )}
            </div>
          </div>

          {/* Languages or Soft Skills if present */}
          {skills?.languages && skills.languages.length > 0 && (
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-bold mb-1.5">
                Languages
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs">
                {skills.languages.map((l) => (
                  <span key={l.id} className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium text-[11px]">
                    {l.language} ({l.proficiency})
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Column: Mediterranean Ocean Teal Canvas (approx 50% width) */}
        <main
          className="md:col-span-6 p-6 sm:p-8 text-white space-y-6"
          style={{ backgroundColor: oceanTeal }}
        >
          {/* Education */}
          {education && education.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <div className="flex items-center gap-2 border-b border-white/20 pb-1.5">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                  Education
                </h2>
              </div>

              <div className="space-y-3 pt-1">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5 cv-break-avoid text-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="font-bold text-white text-xs">
                        {edu.degree} in {edu.fieldOfStudy}
                      </h3>
                      <span className="text-sky-200 font-mono text-[11px]">
                        {edu.startDate ? `${edu.startDate} – ` : ""}{edu.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-sky-100 font-medium">
                      {edu.institution} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <p className="text-sky-100/90 leading-relaxed text-[11px] pt-0.5">
                        {edu.achievements.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <div className="flex items-center gap-2 border-b border-white/20 pb-1.5">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                  Experience
                </h2>
              </div>

              <div className="space-y-4 pt-1">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1 cv-break-avoid text-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="font-bold text-white text-xs uppercase tracking-wide">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-sky-200 font-mono text-[11px]">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                      </span>
                    </div>
                    <div className="text-sky-100 font-medium">
                      {exp.company} {exp.location && `| ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-1 space-y-1 text-sky-100/90 text-[11px]">
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

          {/* Skills with Petrol Blue Bar Sliders on White Track */}
          {skills?.technical && skills.technical.length > 0 && (
            <section className="cv-break-avoid space-y-3">
              <div className="flex items-center gap-2 border-b border-white/20 pb-1.5">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                  Skills & Specialties
                </h2>
              </div>

              {settings.skillDisplayStyle === "text" ? (
                <div className="flex flex-wrap gap-2 pt-1 text-xs text-sky-100">
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
                      primaryColor={petrolBlue}
                      primaryLightColor="#ffffff"
                      borderColor="#e0f2fe"
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-2.5 pt-1">
                  {skills.technical.map((tech) => (
                    <SkillItemRenderer
                      key={tech}
                      name={tech}
                      rating={skills.ratings?.[tech] ?? 4}
                      style={settings.skillDisplayStyle}
                      showIcon={settings.skillShowIcons}
                      primaryColor={petrolBlue}
                      primaryLightColor="rgba(255,255,255,0.2)"
                      borderColor="rgba(255,255,255,0.4)"
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Projects if present */}
          {projects && projects.length > 0 && (
            <section className="cv-break-avoid space-y-2 border-t border-white/20 pt-3">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">
                Key Initiatives
              </h2>
              <div className="space-y-2 pt-1 text-xs">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <span className="font-bold text-white block">{proj.name}</span>
                    <p className="text-sky-100/90 text-[11px] leading-relaxed">{proj.description}</p>
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
