import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";

interface TemplateProps {
  data: CVData;
}

export const CompactTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.serif;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.compact;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.compact;

  return (
    <div className={`w-full text-black ${font.fontFamilyClass} ${size.body} leading-tight`}>
      {/* Wall Street Harvard Centered Header */}
      <header className="text-center pb-2 border-b border-black">
        <h1 className="text-2xl font-bold tracking-normal uppercase text-black">
          {personalInfo.fullName || "YOUR FULL NAME"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-[12px] font-semibold text-neutral-800 tracking-wide mt-0.5">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Dense Inline Pipe-Separated Contacts */}
        <div className="mt-1 flex flex-wrap items-center justify-center gap-x-2 text-[11px] text-neutral-800">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.email && (
            <span>
              | <a href={`mailto:${personalInfo.email}`} className="hover:underline">{personalInfo.email}</a>
            </span>
          )}
          {personalInfo.linkedinUrl && (
            <span>
              | <a href={personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a>
            </span>
          )}
          {personalInfo.websiteUrl && (
            <span>
              | <a href={personalInfo.websiteUrl} target="_blank" rel="noreferrer" className="hover:underline">Portfolio</a>
            </span>
          )}
          {personalInfo.githubUrl && (
            <span>
              | <a href={personalInfo.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            </span>
          )}
        </div>
      </header>

      <div className={`mt-3 ${spacing.sectionGap}`}>
        {/* Objective / Summary if provided */}
        {personalInfo.summary && (
          <section className="cv-break-avoid">
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-[12px] text-neutral-800 leading-normal text-justify">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Education (Often placed high in finance/Wall St formats) */}
        {education && education.length > 0 && (
          <section className="cv-break-avoid">
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="text-[12px]">
                  <div className="flex justify-between font-bold text-black">
                    <span>{edu.institution}</span>
                    <span>
                      {edu.startDate ? `${edu.startDate} – ` : ""}
                      {edu.endDate || "Present"}
                    </span>
                  </div>
                  <div className="flex justify-between italic text-neutral-800">
                    <span>
                      {edu.degree} in {edu.fieldOfStudy}
                      {edu.gpa && `, GPA: ${edu.gpa}`}
                    </span>
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="text-[11px] text-neutral-700 mt-0.5">
                      Honors & Awards: {edu.achievements.join(", ")}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Professional Experience
            </h2>
            <div className="space-y-2.5">
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid text-[12px]">
                  <div className="flex justify-between font-bold text-black">
                    <span>{exp.company}</span>
                    <span>{exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}</span>
                  </div>
                  <div className="flex justify-between italic text-neutral-800">
                    <span>{exp.jobTitle}</span>
                    {exp.location && <span>{exp.location}</span>}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-1 list-disc list-outside pl-4 space-y-0.5 text-[11.5px] leading-tight text-neutral-900">
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

        {/* Projects & Leadership */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
              Key Projects & Initiatives
            </h2>
            <div className="space-y-2 text-[12px]">
              {projects.map((proj) => (
                <div key={proj.id} className="cv-break-avoid">
                  <div className="flex justify-between font-semibold text-black">
                    <span>{proj.name}</span>
                    {proj.url && (
                      <span className="text-[11px] font-normal underline">{proj.url}</span>
                    )}
                  </div>
                  {proj.description && (
                    <p className="text-[11.5px] text-neutral-800">{proj.description}</p>
                  )}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <p className="text-[10.5px] text-neutral-600">
                      Technologies: {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills, Certifications & Additional */}
        <section className="cv-break-avoid">
          <h2 className="text-[12px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
            Skills, Languages & Certifications
          </h2>
          <div className="space-y-1 text-[11.5px] text-neutral-900">
            {skills?.technical && skills.technical.length > 0 && (
              <div>
                <strong>Technical Skills: </strong>
                <span>{skills.technical.join(", ")}</span>
              </div>
            )}
            {skills?.languages && skills.languages.length > 0 && (
              <div>
                <strong>Languages: </strong>
                <span>
                  {skills.languages
                    .map((l) => `${l.language} (${l.proficiency})`)
                    .join(", ")}
                </span>
              </div>
            )}
            {additional?.certifications && additional.certifications.length > 0 && (
              <div>
                <strong>Certifications: </strong>
                <span>
                  {additional.certifications
                    .map((c) => `${c.name} (${c.issuer})`)
                    .join(", ")}
                </span>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
