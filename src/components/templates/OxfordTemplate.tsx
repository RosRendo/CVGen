"use client";

import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const OxfordTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.slate;

  return (
    <div className="min-h-full bg-white text-zinc-900 font-serif p-10 sm:p-14 leading-relaxed selection:bg-zinc-200">
      {/* Formal Header with Double Classical Rules */}
      <header className="border-t-2 border-b border-zinc-900 py-6 mb-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-normal tracking-[0.15em] text-zinc-950 uppercase font-serif">
          {personalInfo.fullName || "Candidate Name"}
        </h1>

        <div className="mt-1 text-xs sm:text-sm italic font-serif text-zinc-600">
          {personalInfo.jobTitle || "Professional Focus"}
        </div>

        {/* Refined Formal Contact Strip */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-sans text-zinc-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && (
            <>
              <span className="text-zinc-400">|</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span className="text-zinc-400">|</span>
              <span>{personalInfo.location}</span>
            </>
          )}
          {personalInfo.linkedinUrl && (
            <>
              <span className="text-zinc-400">|</span>
              <span>LinkedIn</span>
            </>
          )}
          {personalInfo.githubUrl && (
            <>
              <span className="text-zinc-400">|</span>
              <span>GitHub</span>
            </>
          )}
          {personalInfo.websiteUrl && (
            <>
              <span className="text-zinc-400">|</span>
              <span>Portfolio</span>
            </>
          )}
        </div>
      </header>

      {/* Main Single-Column Jurisprudential Body */}
      <div className="space-y-7">
        {/* I. Executive Statement */}
        {personalInfo.summary && (
          <section className="cv-break-avoid">
            <h2 className="text-xs font-bold text-zinc-950 tracking-[0.2em] uppercase font-sans border-b border-zinc-300 pb-1 mb-2.5">
              I. Executive Summary
            </h2>
            <p className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed text-justify font-serif">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* II. Record of Employment / Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs font-bold text-zinc-950 tracking-[0.2em] uppercase font-sans border-b border-zinc-300 pb-1 mb-3">
              II. Professional Record & Appointments
            </h2>

            <div className="space-y-5">
              {experience.map((exp) => (
                <div key={exp.id} className="cv-break-avoid space-y-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-sm font-semibold text-zinc-950 font-serif">
                      {exp.jobTitle}
                    </h3>
                    <span className="text-xs font-sans italic text-zinc-600">
                      {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                    </span>
                  </div>

                  <div className="text-xs font-sans text-zinc-700 italic">
                    {exp.company} {exp.location && `— ${exp.location}`}
                  </div>

                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul className="mt-2 space-y-1.5 text-xs text-zinc-800 font-serif leading-relaxed">
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-zinc-500 text-[10px] mt-1 shrink-0">▪</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* III. Academic Credentials */}
        {education && education.length > 0 && (
          <section className="cv-break-avoid">
            <h2 className="text-xs font-bold text-zinc-950 tracking-[0.2em] uppercase font-sans border-b border-zinc-300 pb-1 mb-3">
              III. Academic Qualifications & Honors
            </h2>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-zinc-950 font-serif">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <span className="text-xs font-sans italic text-zinc-600">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="text-xs font-sans text-zinc-700">
                    {edu.institution} {edu.gpa && `(GPA: ${edu.gpa})`}
                  </div>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="mt-1 space-y-0.5 text-xs text-zinc-700 font-serif">
                      {edu.achievements.map((ach, idx) => (
                        <li key={idx}>— {ach}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* IV. Areas of Specialization & Skills */}
        <section className="cv-break-avoid">
          <h2 className="text-xs font-bold text-zinc-950 tracking-[0.2em] uppercase font-sans border-b border-zinc-300 pb-1 mb-3">
            IV. Specialized Competencies & Governance
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            {skills.technical && skills.technical.length > 0 && (
              <div>
                <span className="font-bold text-zinc-900 block mb-1">
                  Core Technologies & Tools:
                </span>
                <p className="text-zinc-700 leading-relaxed font-serif">
                  {skills.technical.join(", ")}.
                </p>
              </div>
            )}

            {skills.languages && skills.languages.length > 0 && (
              <div>
                <span className="font-bold text-zinc-900 block mb-1">Languages of Record:</span>
                <p className="text-zinc-700 leading-relaxed font-serif">
                  {skills.languages.map((l) => `${l.language} (${l.proficiency})`).join("; ")}.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* V. Selected Works & Projects */}
        {projects && projects.length > 0 && (
          <section className="cv-break-avoid">
            <h2 className="text-xs font-bold text-zinc-950 tracking-[0.2em] uppercase font-sans border-b border-zinc-300 pb-1 mb-3">
              V. Published Projects & Works
            </h2>

            <div className="space-y-3 text-xs">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="font-semibold text-zinc-950 font-serif">{proj.name}</div>
                  {proj.description && (
                    <p className="text-zinc-700 font-serif">{proj.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
