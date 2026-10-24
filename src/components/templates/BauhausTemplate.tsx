"use client";

import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const BauhausTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.slate;

  return (
    <div className="min-h-full bg-[#f8f7f2] text-zinc-950 font-sans p-8 sm:p-12 leading-relaxed selection:bg-red-500 selection:text-white">
      {/* Bauhaus Geometric Accent Header */}
      <header className="mb-8 relative">
        <div className="flex flex-col md:flex-row items-stretch gap-6">
          {/* Black Geometric Block with Name */}
          <div className="bg-zinc-950 text-white p-6 sm:p-8 flex-1 flex flex-col justify-between relative overflow-hidden">
            {/* Primary Red Bauhaus Square Accent */}
            <div className="absolute top-0 right-0 w-8 h-8 bg-red-600" />

            <div>
              <div className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-400 mb-2">
                FORM FOLLOWS FUNCTION · 1925
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tighter uppercase leading-none">
                {personalInfo.fullName || "Candidate Name"}
              </h1>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {personalInfo.jobTitle || "Creative Technologist"}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">DESSAU // 01</span>
            </div>
          </div>

          {/* Side Graphic Pod with Photo & Primary Geometry */}
          <div className="w-full md:w-56 flex flex-col justify-between gap-4">
            {personalInfo.photoUrl ? (
              <div className="relative h-40 overflow-hidden bg-zinc-900 border-2 border-zinc-950">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover filter grayscale contrast-125"
                />
                {/* Cobalt Blue Circle Accent */}
                <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-blue-600" />
              </div>
            ) : (
              <div className="h-40 bg-zinc-200 border-2 border-zinc-950 p-4 flex flex-col justify-between relative overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-blue-600" />
                <div className="w-12 h-12 bg-amber-400 rotate-12" />
                <div className="text-[11px] font-mono font-bold">BAUHAUS_GRID</div>
              </div>
            )}

            {/* Contact Grid */}
            <div className="bg-white border-2 border-zinc-950 p-3 space-y-1 text-[11px] font-mono">
              {personalInfo.email && <div className="truncate">{personalInfo.email}</div>}
              {personalInfo.phone && <div>{personalInfo.phone}</div>}
              {personalInfo.location && <div>{personalInfo.location}</div>}
            </div>
          </div>
        </div>

        {/* Statement Bar */}
        {personalInfo.summary && (
          <div className="mt-4 p-4 bg-white border-2 border-zinc-950 text-xs font-medium leading-relaxed">
            <span className="font-black bg-zinc-950 text-white px-1.5 py-0.5 mr-2 text-[10px]">
              THESIS
            </span>
            {personalInfo.summary}
          </div>
        )}
      </header>

      {/* Main Asymmetric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Experience (8 cols) */}
        <div className="md:col-span-8 space-y-8">
          {experience && experience.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  01
                </div>
                <h2 className="text-sm font-black uppercase tracking-tight text-zinc-950 border-b-2 border-zinc-950 flex-1 pb-1">
                  WORK EXPERIENCE
                </h2>
              </div>

              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="cv-break-avoid border-l-4 border-zinc-950 pl-4 space-y-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-sm font-black uppercase text-zinc-950">{exp.jobTitle}</h3>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-zinc-200 text-zinc-800">
                        {exp.startDate} — {exp.isCurrent ? "PRESENT" : exp.endDate}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-blue-700">
                      {exp.company} {exp.location && `// ${exp.location}`}
                    </div>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1.5 text-xs text-zinc-700">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-none bg-zinc-950 mt-1.5 shrink-0" />
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

          {/* Selected Projects */}
          {projects && projects.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                  02
                </div>
                <h2 className="text-sm font-black uppercase tracking-tight text-zinc-950 border-b-2 border-zinc-950 flex-1 pb-1">
                  SELECTED ARCHITECTURES
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 bg-white border-2 border-zinc-950 cv-break-avoid">
                    <div className="text-xs font-black uppercase text-zinc-950">{proj.name}</div>
                    {proj.description && (
                      <p className="mt-1 text-xs text-zinc-600">{proj.description}</p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {proj.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono px-1.5 py-0.5 bg-zinc-100 font-bold border border-zinc-300"
                          >
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
        </div>

        {/* Right Column: Skills, Education (4 cols) */}
        <div className="md:col-span-4 space-y-8">
          {/* Skills */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-amber-400 text-zinc-950 font-mono font-bold text-xs flex items-center justify-center">
                03
              </div>
              <h2 className="text-xs font-black uppercase tracking-tight text-zinc-950 border-b-2 border-zinc-950 flex-1 pb-1">
                SKILLS & MATRICES
              </h2>
            </div>

            {skills.technical && skills.technical.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {skills.technical.map((s, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-white border border-zinc-950 text-xs font-bold text-zinc-900 shadow-[2px_2px_0px_#000]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-zinc-950 text-white font-mono font-bold text-xs flex items-center justify-center">
                  04
                </div>
                <h2 className="text-xs font-black uppercase tracking-tight text-zinc-950 border-b-2 border-zinc-950 flex-1 pb-1">
                  ACADEMICS
                </h2>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-break-avoid bg-white p-3 border border-zinc-950">
                    <div className="text-xs font-black uppercase text-zinc-950">
                      {edu.degree}
                    </div>
                    <div className="text-xs text-blue-700 font-semibold">{edu.fieldOfStudy}</div>
                    <div className="text-[11px] text-zinc-600 mt-1">{edu.institution}</div>
                    <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                      {edu.startDate} – {edu.endDate} {edu.gpa && `// GPA ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
