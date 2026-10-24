"use client";

import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const ZenTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.slate;

  return (
    <div className="min-h-full bg-[#faf8f5] text-stone-800 font-sans p-8 sm:p-12 leading-relaxed relative selection:bg-rose-100 selection:text-rose-900">
      {/* Serene Watermark Kanji / Circle Motif in Background */}
      <div className="absolute top-12 right-12 text-[120px] font-serif text-stone-900/[0.02] pointer-events-none select-none">
        道
      </div>

      {/* Header Area with Red Cinnabar Seal (Hanko Stamp) */}
      <header className="relative pb-8 mb-8 border-b border-stone-200/80">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-stone-400 font-semibold">
                CURRICULUM VITAE
              </span>
              <span className="h-1 w-1 rounded-full bg-stone-300" />
              <span className="text-xs text-rose-800 font-serif font-bold tracking-wider">
                侘寂 · ZEN
              </span>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-light tracking-wide text-stone-900 font-serif">
                {personalInfo.fullName || "Candidate Name"}
              </h1>

              {/* Japanese Cinnabar Vermilion Hanko Stamp */}
              <div className="shrink-0 w-8 h-8 rounded-sm border-2 border-red-700 bg-red-600/10 flex items-center justify-center text-red-700 text-[10px] font-serif font-black shadow-2xs rotate-2">
                印
              </div>
            </div>

            <p className="mt-1 text-xs tracking-widest text-stone-500 font-medium uppercase">
              {personalInfo.jobTitle || "Professional Focus"}
            </p>

            {/* Contact Line */}
            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-stone-600">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-stone-400" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-stone-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-stone-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedinUrl && (
                <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                  <Linkedin className="h-3 w-3 text-stone-400" />
                  <span>LinkedIn</span>
                </div>
              )}
              {personalInfo.githubUrl && (
                <div className="flex items-center gap-1.5 text-stone-700 font-medium">
                  <Github className="h-3 w-3 text-stone-400" />
                  <span>GitHub</span>
                </div>
              )}
            </div>
          </div>

          {/* Asymmetric Organic Pebble Photo Frame */}
          {personalInfo.photoUrl && (
            <div className="shrink-0">
              <div className="w-22 h-24 rounded-[38%_62%_63%_37%/41%_44%_56%_59%] overflow-hidden border-2 border-stone-300 p-0.5 bg-stone-100 shadow-sm transition-all">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover filter contrast-105"
                />
              </div>
            </div>
          )}
        </div>

        {/* Quiet Meditative Summary */}
        {personalInfo.summary && (
          <div className="mt-5 p-4 rounded-xl bg-white/70 border border-stone-200/60 text-xs text-stone-600 font-serif italic leading-relaxed">
            "{personalInfo.summary}"
          </div>
        )}
      </header>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Career History) */}
        <div className="md:col-span-2 space-y-8">
          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-xs font-serif font-bold text-stone-900 tracking-wider uppercase border-b border-stone-200 pb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-700" />
                <span>Experience & Pathways</span>
              </div>

              <div className="space-y-6 pl-2 border-l border-stone-200">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-4 cv-break-avoid">
                    {/* Bamboo Node Marker */}
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-stone-400 ring-2 ring-[#faf8f5]" />

                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-sm font-semibold text-stone-900 font-serif">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-[11px] font-sans text-stone-400">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                      </span>
                    </div>

                    <div className="text-xs text-stone-600 font-medium mt-0.5">
                      {exp.company} {exp.location && `· ${exp.location}`}
                    </div>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1.5 text-xs text-stone-600 leading-relaxed">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-stone-300 mt-1">―</span>
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

          {/* Featured Works */}
          {projects && projects.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-xs font-serif font-bold text-stone-900 tracking-wider uppercase border-b border-stone-200 pb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-700" />
                <span>Selected Creations</span>
              </div>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3.5 rounded-xl bg-white/60 border border-stone-200/70 cv-break-avoid"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-stone-900 font-serif">
                        {proj.name}
                      </h4>
                      {proj.url && (
                        <span className="text-[10px] text-stone-400 hover:text-stone-700">Link</span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="mt-1 text-xs text-stone-600">{proj.description}</p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {proj.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[10px]"
                          >
                            {tech}
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

        {/* Right Column (Craft & Foundations) */}
        <div className="space-y-7">
          {/* Skills / Craft */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-serif font-bold text-stone-900 tracking-wider uppercase border-b border-stone-200 pb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-700" />
              <span>Technical Craft</span>
            </div>

            {skills.technical && skills.technical.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {skills.technical.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-xs text-stone-800 shadow-2xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-serif font-bold text-stone-900 tracking-wider uppercase border-b border-stone-200 pb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-700" />
                <span>Foundations</span>
              </div>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-break-avoid">
                    <div className="text-xs font-semibold text-stone-900 font-serif">
                      {edu.degree} in {edu.fieldOfStudy}
                    </div>
                    <div className="text-xs text-stone-600">{edu.institution}</div>
                    <div className="text-[11px] text-stone-400">
                      {edu.startDate} – {edu.endDate} {edu.gpa && `· GPA ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {skills.languages && skills.languages.length > 0 && (
            <div>
              <div className="text-xs font-serif font-bold text-stone-900 tracking-wider uppercase border-b border-stone-200 pb-1 mb-2">
                Languages
              </div>
              <div className="space-y-1">
                {skills.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between text-xs py-0.5">
                    <span className="text-stone-700">{lang.language}</span>
                    <span className="text-stone-400 text-[11px]">{lang.proficiency}</span>
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
