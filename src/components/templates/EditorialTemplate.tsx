"use client";

import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const EditorialTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.slate;

  return (
    <div className="min-h-full bg-white text-stone-900 font-serif p-10 sm:p-14 leading-relaxed relative selection:bg-stone-200">
      {/* Refined Double Outer Border */}
      <div className="absolute inset-4 border border-stone-200 pointer-events-none" />
      <div className="absolute inset-5 border border-stone-100 pointer-events-none" />

      {/* Haute Couture Magazine Masthead */}
      <header className="relative text-center pb-8 mb-8 border-b border-stone-300">
        <div className="text-[10px] font-sans uppercase tracking-[0.35em] text-stone-400 font-medium mb-3">
          Curriculum Vitae ◆ Portfolio & Experience
        </div>

        {/* Headshot in circular luxury frame if provided */}
        {personalInfo.photoUrl && (
          <div className="mx-auto mb-4 w-20 h-20 rounded-full overflow-hidden border-2 border-stone-300 p-1 bg-stone-50 shadow-sm">
            <img
              src={personalInfo.photoUrl}
              alt={personalInfo.fullName}
              className="w-full h-full object-cover rounded-full filter grayscale contrast-110"
            />
          </div>
        )}

        <h1 className="text-3xl sm:text-4xl font-normal tracking-[0.18em] text-stone-900 uppercase">
          {personalInfo.fullName || "Candidate Name"}
        </h1>

        <div className="mt-2 text-xs sm:text-sm italic text-stone-500 font-sans tracking-widest uppercase">
          — {personalInfo.jobTitle || "Professional Title"} —
        </div>

        {/* Contact Strip with Diamond Separators */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-sans text-stone-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && (
            <>
              <span className="text-stone-300">◆</span>
              <span>{personalInfo.phone}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span className="text-stone-300">◆</span>
              <span>{personalInfo.location}</span>
            </>
          )}
          {personalInfo.linkedinUrl && (
            <>
              <span className="text-stone-300">◆</span>
              <span>LinkedIn</span>
            </>
          )}
          {personalInfo.githubUrl && (
            <>
              <span className="text-stone-300">◆</span>
              <span>GitHub</span>
            </>
          )}
          {personalInfo.websiteUrl && (
            <>
              <span className="text-stone-300">◆</span>
              <span>Portfolio</span>
            </>
          )}
        </div>

        {/* Summary as Editorial Lead Paragraph */}
        {personalInfo.summary && (
          <div className="mt-6 max-w-2xl mx-auto text-xs sm:text-[13px] text-stone-700 italic leading-relaxed text-justify px-4">
            <span className="font-serif text-2xl float-left mr-2 leading-none text-stone-900 font-normal">
              {personalInfo.summary.charAt(0)}
            </span>
            {personalInfo.summary.slice(1)}
          </div>
        )}
      </header>

      {/* Two-Column Editorial Layout */}
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Editorial Column (Main Career Narrative) */}
        <div className="md:col-span-8 space-y-8 md:pr-4 md:border-r md:border-stone-200">
          {/* Experience */}
          {experience && experience.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-sans font-bold text-stone-400 tracking-[0.25em] uppercase">
                  SECTION 01
                </span>
                <div className="h-px bg-stone-300 flex-1" />
                <h2 className="text-sm font-normal text-stone-900 tracking-[0.15em] uppercase">
                  Professional Experience
                </h2>
              </div>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="cv-break-avoid space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-sm font-medium text-stone-900">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-[11px] font-sans italic text-stone-500">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                      </span>
                    </div>

                    <div className="text-xs font-sans text-stone-600 font-medium">
                      {exp.company} {exp.location && `· ${exp.location}`}
                    </div>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1.5 text-xs font-sans text-stone-700 leading-relaxed">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-stone-400 text-[10px] mt-1 shrink-0">—</span>
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

          {/* Featured Projects */}
          {projects && projects.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-sans font-bold text-stone-400 tracking-[0.25em] uppercase">
                  SECTION 02
                </span>
                <div className="h-px bg-stone-300 flex-1" />
                <h2 className="text-sm font-normal text-stone-900 tracking-[0.15em] uppercase">
                  Selected Work & Initiatives
                </h2>
              </div>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="cv-break-avoid space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-medium text-stone-900">{proj.name}</h4>
                      {proj.url && (
                        <span className="text-[10px] font-sans italic text-stone-400">View</span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="text-xs font-sans text-stone-600 leading-relaxed">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <p className="text-[11px] font-sans text-stone-500 italic">
                        {proj.technologies.join(" · ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Editorial Column (Credentials, Expertise, Education) */}
        <div className="md:col-span-4 space-y-7">
          {/* Academic Background */}
          {education && education.length > 0 && (
            <section>
              <h3 className="text-xs font-normal text-stone-900 tracking-[0.2em] uppercase border-b border-stone-200 pb-1 mb-3">
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-break-avoid">
                    <div className="text-xs font-medium text-stone-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </div>
                    <div className="text-[11px] font-sans text-stone-600">{edu.institution}</div>
                    <div className="text-[10px] font-sans italic text-stone-400">
                      {edu.startDate} – {edu.endDate} {edu.gpa && `· GPA ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Core Competencies */}
          <section>
            <h3 className="text-xs font-normal text-stone-900 tracking-[0.2em] uppercase border-b border-stone-200 pb-1 mb-3">
              Areas of Expertise
            </h3>

            {skills.technical && skills.technical.length > 0 && (
              <div className="space-y-1 text-xs font-sans text-stone-700">
                {skills.technical.map((skill, idx) => (
                  <div key={idx} className="flex items-center justify-between py-0.5 border-b border-stone-100">
                    <span>{skill}</span>
                    <span className="text-[10px] text-stone-400 font-serif italic">Expert</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Languages */}
          {skills.languages && skills.languages.length > 0 && (
            <section>
              <h3 className="text-xs font-normal text-stone-900 tracking-[0.2em] uppercase border-b border-stone-200 pb-1 mb-3">
                Languages
              </h3>
              <div className="space-y-1 text-xs font-sans text-stone-700">
                {skills.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between py-0.5">
                    <span>{lang.language}</span>
                    <span className="italic text-stone-500 text-[11px]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {additional.certifications && additional.certifications.length > 0 && (
            <section>
              <h3 className="text-xs font-normal text-stone-900 tracking-[0.2em] uppercase border-b border-stone-200 pb-1 mb-3">
                Accreditations
              </h3>
              <div className="space-y-2 text-xs font-sans">
                {additional.certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-medium text-stone-800">{cert.name}</div>
                    <div className="text-[10px] text-stone-500 italic">{cert.issuer}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
