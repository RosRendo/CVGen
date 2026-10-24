"use client";

import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, Terminal, Cpu, ShieldCheck, Zap } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github } from "@/components/common/Icons";

interface TemplateProps {
  data: CVData;
}

export const CyberpunkTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.slate;

  return (
    <div className="min-h-full bg-slate-950 text-slate-200 font-mono text-[13px] leading-relaxed relative overflow-hidden p-8 sm:p-10 selection:bg-cyan-500 selection:text-black">
      {/* Background Matrix / Circuit Grid Subtle Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative Cyberpunk Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-cyan-400 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-cyan-400 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-purple-500 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-purple-500 pointer-events-none" />

      {/* Top HUD Telemetry Status Bar */}
      <div className="flex items-center justify-between border-b border-cyan-900/60 pb-2 mb-6 text-[10px] text-cyan-400/80 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>STATUS: ONLINE</span>
          <span className="text-slate-600">//</span>
          <span>SECURITY CLEARANCE: LEVEL-4</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <Cpu className="h-3 w-3 text-cyan-400" />
          <span>NODE: KH-PP-01</span>
          <span className="text-slate-600">//</span>
          <span className="text-purple-400">SYS_VER 4.2</span>
        </div>
      </div>

      {/* Hero Header HUD Card */}
      <div className="relative rounded-xl border border-cyan-500/30 bg-slate-900/90 p-6 mb-8 backdrop-blur-md shadow-2xl shadow-cyan-950/40">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Headshot with Chamfered Tech Frame */}
          {personalInfo.photoUrl && (
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-cyan-400 p-0.5 bg-slate-950 shadow-lg shadow-cyan-500/20">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover rounded-md filter contrast-105"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded bg-cyan-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider">
                DEV
              </div>
            </div>
          )}

          {/* Identity & Cyberpunk Title */}
          <div className="flex-1 text-center sm:text-left min-w-0">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-purple-400 mb-1">
              <Terminal className="h-3.5 w-3.5" />
              <span className="tracking-widest uppercase font-bold text-[11px]">
                {personalInfo.jobTitle || "SOFTWARE ENGINEER"}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase font-sans">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
                {personalInfo.fullName || "ANONYMOUS OPERATIVE"}
              </span>
            </h1>

            {/* Quick Contact HUD Grid */}
            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2 text-xs text-slate-300">
              {personalInfo.email && (
                <div className="flex items-center gap-1.5 text-cyan-300">
                  <Mail className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.linkedinUrl && (
                <div className="flex items-center gap-1.5 text-purple-300">
                  <Linkedin className="h-3.5 w-3.5 text-purple-400" />
                  <span>LinkedIn</span>
                </div>
              )}
              {personalInfo.githubUrl && (
                <div className="flex items-center gap-1.5 text-cyan-300">
                  <Github className="h-3.5 w-3.5 text-cyan-400" />
                  <span>GitHub</span>
                </div>
              )}
              {personalInfo.websiteUrl && (
                <div className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Portfolio</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Professional Summary Terminal Output */}
        {personalInfo.summary && (
          <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-300 font-sans leading-relaxed">
            <span className="text-cyan-400 font-mono font-bold mr-2">&gt;&gt; LOG:</span>
            {personalInfo.summary}
          </div>
        )}
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column (Main Experience & Projects) */}
        <div className="md:col-span-2 space-y-8">
          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-bold uppercase tracking-wider text-xs border-b border-cyan-900/60 pb-1.5">
                <Zap className="h-4 w-4" />
                <span>[ 01 // MISSION RECORD & WORK EXPERIENCE ]</span>
              </div>

              <div className="space-y-6 relative pl-4 border-l-2 border-cyan-500/30">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative group cv-break-avoid">
                    {/* Glowing node dot */}
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-slate-950" />

                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <h3 className="text-sm font-bold text-white tracking-wide font-sans">
                        {exp.jobTitle}
                      </h3>
                      <span className="text-[11px] font-mono text-purple-400 font-semibold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                        {exp.startDate} – {exp.isCurrent ? "ACTIVE" : exp.endDate}
                      </span>
                    </div>

                    <div className="text-xs text-cyan-300 font-medium mt-0.5">
                      {exp.company} {exp.location && `// ${exp.location}`}
                    </div>

                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300 font-sans">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-cyan-400 font-mono font-bold text-[10px] mt-0.5">
                              &gt;
                            </span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Featured Projects */}
          {projects && projects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4 text-cyan-400 font-bold uppercase tracking-wider text-xs border-b border-cyan-900/60 pb-1.5">
                <Terminal className="h-4 w-4" />
                <span>[ 02 // ARCHITECTED DEPLOYMENTS & CODE ]</span>
              </div>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:border-cyan-500/40 transition-colors cv-break-avoid"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white tracking-wide font-sans">
                        {proj.name}
                      </h4>
                      {proj.url && (
                        <span className="text-[10px] text-cyan-400 font-mono">LIVE_LINK</span>
                      )}
                    </div>
                    {proj.description && (
                      <p className="mt-1 text-xs text-slate-400 font-sans">{proj.description}</p>
                    )}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {proj.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[10px] font-mono border border-cyan-900/50"
                          >
                            #{tech}
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

        {/* Right Column (Skills, Education, Certs) */}
        <div className="space-y-8">
          {/* Skills Matrix */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-purple-400 font-bold uppercase tracking-wider text-xs border-b border-purple-900/60 pb-1.5">
              <Cpu className="h-4 w-4" />
              <span>[ TECH_CAPABILITIES ]</span>
            </div>

            {skills.technical && skills.technical.length > 0 && (
              <div className="mb-4">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  // PRIMARY RUNTIME
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.technical.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-cyan-950/70 text-cyan-300 text-xs font-mono font-semibold border border-cyan-500/30 hover:border-cyan-400 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.soft && skills.soft.length > 0 && (
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  // CORE PROTOCOLS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.soft.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 text-[11px] font-mono border border-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Education */}
          {education && education.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4 text-purple-400 font-bold uppercase tracking-wider text-xs border-b border-purple-900/60 pb-1.5">
                <ShieldCheck className="h-4 w-4" />
                <span>[ ACADEMIC CREDENTIALS ]</span>
              </div>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-break-avoid border-l-2 border-purple-500/40 pl-3">
                    <h4 className="text-xs font-bold text-white font-sans">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h4>
                    <div className="text-xs text-purple-300 mt-0.5">{edu.institution}</div>
                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {edu.startDate} – {edu.endDate} {edu.gpa && `// GPA: ${edu.gpa}`}
                    </div>
                    {edu.achievements && edu.achievements.length > 0 && (
                      <ul className="mt-1.5 space-y-1 text-xs text-slate-400 font-sans">
                        {edu.achievements.map((ach, idx) => (
                          <li key={idx}>• {ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {skills.languages && skills.languages.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                // LANGUAGE PROTOCOLS
              </div>
              <div className="space-y-1.5">
                {skills.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex justify-between items-center text-xs py-1 border-b border-slate-800/80"
                  >
                    <span className="text-slate-300">{lang.language}</span>
                    <span className="text-cyan-400 font-mono text-[11px]">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications & Awards */}
          {additional.certifications && additional.certifications.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                // VERIFIED CERTIFICATES
              </div>
              <div className="space-y-2">
                {additional.certifications.map((cert) => (
                  <div key={cert.id} className="text-xs">
                    <div className="text-slate-200 font-bold font-sans">{cert.name}</div>
                    <div className="text-slate-500 text-[11px]">
                      {cert.issuer} {cert.date && `(${cert.date})`}
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
