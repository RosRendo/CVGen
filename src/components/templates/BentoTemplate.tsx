"use client";

import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, Sparkles, Briefcase, GraduationCap, Code2, Award, Zap } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const BentoTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.indigo;

  return (
    <div className="min-h-full bg-white text-zinc-900 font-sans p-6 sm:p-8 leading-relaxed selection:bg-indigo-100 selection:text-indigo-900">
      {/* Bento Top Header Pod */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        {/* Main Profile Card (8 cols) */}
        <div className="md:col-span-8 rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 via-white to-zinc-50/50 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-start gap-5">
            {personalInfo.photoUrl && (
              <div className="w-20 h-20 rounded-2xl overflow-hidden border border-zinc-200 p-0.5 bg-white shadow-sm shrink-0">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[11px] font-bold mb-1.5">
                <Sparkles className="h-3 w-3" />
                <span>{personalInfo.jobTitle || "Software Engineer"}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
                {personalInfo.fullName || "Candidate Name"}
              </h1>

              {/* Contact Icons */}
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-600">
                {personalInfo.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-zinc-400" />
                    {personalInfo.email}
                  </span>
                )}
                {personalInfo.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-zinc-400" />
                    {personalInfo.phone}
                  </span>
                )}
                {personalInfo.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                    {personalInfo.location}
                  </span>
                )}
                {personalInfo.linkedinUrl && (
                  <span className="flex items-center gap-1.5 text-indigo-600 font-medium">
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </span>
                )}
                {personalInfo.githubUrl && (
                  <span className="flex items-center gap-1.5 text-zinc-900 font-medium">
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </span>
                )}
              </div>
            </div>
          </div>

          {personalInfo.summary && (
            <p className="mt-4 pt-3 border-t border-zinc-100 text-xs text-zinc-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Highlight Metrics Pods (4 cols) */}
        <div className="md:col-span-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 flex flex-col justify-between shadow-2xs">
            <Zap className="h-5 w-5 text-amber-500" />
            <div>
              <div className="text-xl font-black text-zinc-950">1.5+ Yrs</div>
              <div className="text-[11px] text-zinc-500 font-medium">Engineering Track</div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 flex flex-col justify-between shadow-2xs">
            <Award className="h-5 w-5 text-indigo-600" />
            <div>
              <div className="text-xl font-black text-zinc-950">40k+</div>
              <div className="text-[11px] text-zinc-500 font-medium">Daily Txns Scale</div>
            </div>
          </div>

          <div className="col-span-2 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 p-3.5 flex items-center justify-between">
            <div className="text-xs">
              <span className="font-bold text-indigo-950 block">National Hackathon 2023</span>
              <span className="text-[11px] text-indigo-700">1st Place AgriTech Champion</span>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
              #1
            </span>
          </div>
        </div>
      </div>

      {/* Main Bento Body Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Column: Experience (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          {experience && experience.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-zinc-900 text-white">
                  <Briefcase className="h-3.5 w-3.5" />
                </div>
                <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide">
                  Experience History
                </h2>
              </div>

              <div className="space-y-5">
                {experience.map((exp) => (
                  <div key={exp.id} className="cv-break-avoid border-l-2 border-zinc-200 pl-3.5 relative">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-zinc-900 ring-2 ring-white" />

                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-xs font-bold text-zinc-950">{exp.jobTitle}</h3>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600">
                        {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate}
                      </span>
                    </div>

                    <div className="text-xs text-indigo-600 font-semibold mt-0.5">
                      {exp.company} {exp.location && `· ${exp.location}`}
                    </div>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-2 space-y-1 text-xs text-zinc-600">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-zinc-400 mt-1">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Projects */}
          {projects && projects.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-zinc-900 text-white">
                  <Code2 className="h-3.5 w-3.5" />
                </div>
                <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide">
                  Featured Projects
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3 rounded-xl border border-zinc-100 bg-zinc-50/70 cv-break-avoid"
                  >
                    <div className="text-xs font-bold text-zinc-950">{proj.name}</div>
                    {proj.description && (
                      <p className="mt-1 text-[11px] text-zinc-600 line-clamp-2">
                        {proj.description}
                      </p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {proj.technologies.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.2 rounded bg-white text-[9px] font-mono text-zinc-700 border border-zinc-200"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Skills, Education & Certs (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          {/* Skills Bento Card */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-1.5 rounded-lg bg-zinc-900 text-white">
                <Code2 className="h-3.5 w-3.5" />
              </div>
              <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide">
                Competencies
              </h2>
            </div>

            {skills.technical && skills.technical.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {skills.technical.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            {skills.languages && skills.languages.length > 0 && (
              <div className="pt-3 border-t border-zinc-100 space-y-1.5">
                <div className="text-[11px] font-bold text-zinc-400 uppercase">Languages</div>
                {skills.languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-xs">
                    <span className="text-zinc-700 font-medium">{l.language}</span>
                    <span className="text-zinc-500 text-[11px] font-mono">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Education Bento Card */}
          {education && education.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-zinc-900 text-white">
                  <GraduationCap className="h-3.5 w-3.5" />
                </div>
                <h2 className="text-sm font-bold text-zinc-950 uppercase tracking-wide">
                  Education
                </h2>
              </div>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-break-avoid">
                    <div className="text-xs font-bold text-zinc-950">
                      {edu.degree} in {edu.fieldOfStudy}
                    </div>
                    <div className="text-xs text-zinc-600">{edu.institution}</div>
                    <div className="text-[10px] font-mono text-zinc-400">
                      {edu.startDate} – {edu.endDate} {edu.gpa && `• GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Certifications */}
          {additional.certifications && additional.certifications.length > 0 && (
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 shadow-2xs">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2">
                Certifications
              </div>
              <div className="space-y-1.5">
                {additional.certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="font-semibold text-zinc-900">{cert.name}</div>
                    <div className="text-[10px] text-zinc-500">{cert.issuer}</div>
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
