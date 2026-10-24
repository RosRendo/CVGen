import React from "react";
import { CVData } from "@/lib/types/cv";
import { Phone, Mail, Building2 } from "lucide-react";
import { LinkedinIcon, GithubIcon, FacebookIcon, getHobbyIconComponent } from "@/components/common/Icons";

interface CamTechTemplateProps {
  data: CVData;
}

export const CamTechTemplate: React.FC<CamTechTemplateProps> = ({ data }) => {
  const { personalInfo, education, experience, skills, additional, projects } = data;

  // Exact Brand Colors from Ros Rendo's uploaded CV
  const SIDEBAR_BG = "#212A38"; // Slate Navy
  const BADGE_YELLOW = "#FACC15"; // Bright Golden Yellow
  const BADGE_TEXT = "#111827"; // Dark Slate for badge typography

  // Default fallbacks from user's authentic CV
  const phone = personalInfo.phone || "+855 81272720";
  const email = personalInfo.email || "rousrendo@gmail.com";
  const facebook = personalInfo.facebookUrl || "Rous Rendo";
  const linkedin = personalInfo.linkedinUrl || "https://www.linkedin.com/in/ros-rendo-ab94572b1";
  const github = personalInfo.githubUrl || "https://github.com/ROS-RENDO";

  // Technical tools list
  const tools =
    additional.technicalTools && additional.technicalTools.length > 0
      ? additional.technicalTools
      : [
          "Git & GitHub",
          "Docker & Docker Compose",
          "Postman (API Testing)",
          "Linux / Bash",
          "Prisma ORM",
          "pgAdmin / DBeaver",
          "Nginx Reverse Proxy",
          "Vercel Deployment",
          "Figma (UI/UX)",
        ];

  // Hobbies / Interests (default 3x2 grid)
  const hobbies =
    additional.interests && additional.interests.length > 0
      ? additional.interests
      : ["SPORT", "LEARNING", "AI RESEARCH", "EDITING", "TRAVELLING", "GAMING"];

  // Technical skills
  const technicalSkills =
    skills.technical && skills.technical.length > 0
      ? skills.technical
      : [
          "HTML / NEXT.JS",
          "CSS / TAILWIND",
          "JAVASCRIPT / TYPESCRIPT",
          "SQL DATABASE MANAGEMENT",
          "REACT / REACT EXPO",
          "FIGMA (UX/UI)",
          "JAVA",
          "PYTHON",
          "NODE.JS",
        ];

  // Languages with proficiency bars
  const languages =
    skills.languages && skills.languages.length > 0
      ? skills.languages
      : [
          { id: "lang-1", language: "ENGLISH", proficiency: "75%" },
          { id: "lang-2", language: "KHMER", proficiency: "100%" },
        ];

  return (
    <div className="flex w-full min-h-[1120px] bg-white font-sans text-slate-800 antialiased shadow-sm print:min-h-0">
      {/* ================= LEFT SIDEBAR (SLATE NAVY) ================= */}
      <aside
        className="w-[36%] shrink-0 p-6 flex flex-col justify-between text-white"
        style={{ backgroundColor: SIDEBAR_BG }}
      >
        <div className="space-y-6">
          {/* Circular Photo */}
          <div className="text-center">
            <div className="relative w-32 h-32 mx-auto rounded-full border-2 border-white overflow-hidden shadow-md bg-slate-800 flex items-center justify-center">
              {personalInfo.photoUrl ? (
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 18%" }}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-700 to-slate-900 text-white">
                  <span className="text-3xl font-extrabold tracking-widest text-[#FACC15]">
                    {personalInfo.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() || "RR"}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 mt-1">
                    Software Eng.
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="mt-3.5 text-[11px] font-extrabold tracking-[0.22em] uppercase text-slate-100">
              {personalInfo.jobTitle || "SOFTWARE ENGINEER"}
            </h1>
          </div>

          {/* CONTACTS */}
          <div className="space-y-2.5">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.18em] text-white">
              CONTACTS
            </h2>
            <div className="space-y-2 text-[10px] text-slate-200">
              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                  <Phone className="w-2.5 h-2.5 text-white stroke-[2.5]" />
                </div>
                <span className="font-medium tracking-wide">{phone}</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                  <Mail className="w-2.5 h-2.5 text-white stroke-[2.5]" />
                </div>
                <span className="font-medium tracking-wide truncate">{email}</span>
              </div>

              {/* Facebook / Social */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center shrink-0">
                  <FacebookIcon className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="font-medium tracking-wide">{facebook}</span>
              </div>
            </div>
          </div>

          {/* EDUCATION */}
          <div className="space-y-3">
            <div className="flex justify-center">
              <span
                className="px-6 py-1 rounded-full text-[10.5px] font-black uppercase tracking-[0.16em] shadow-xs"
                style={{ backgroundColor: BADGE_YELLOW, color: BADGE_TEXT }}
              >
                EDUCATION
              </span>
            </div>

            {education && education.length > 0 ? (
              education.map((edu) => (
                <div key={edu.id} className="text-center space-y-1.5">
                  <p className="text-[10px] font-extrabold uppercase tracking-wider text-white leading-tight">
                    {edu.degree} {edu.startDate && edu.endDate ? `${edu.startDate}-${edu.endDate}` : ""}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-[9.5px] text-slate-300">
                    <Building2 className="w-3.5 h-3.5 shrink-0 text-[#FACC15]" />
                    <span className="font-medium">{edu.institution}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center space-y-1.5">
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-white leading-tight">
                  BACHELOR DEGREE OF SCIENCE IN COMPUTER SCIENCE 2023-2027
                </p>
                <div className="flex items-center justify-center gap-1.5 text-[9.5px] text-slate-300">
                  <Building2 className="w-3.5 h-3.5 shrink-0 text-[#FACC15]" />
                  <span className="font-medium">Cambodia University of Technology and Science</span>
                </div>
              </div>
            )}
          </div>

          {/* SKILLS */}
          <div className="space-y-3">
            <div className="flex justify-center">
              <span
                className="px-7 py-1 rounded-full text-[10.5px] font-black uppercase tracking-[0.16em] shadow-xs"
                style={{ backgroundColor: BADGE_YELLOW, color: BADGE_TEXT }}
              >
                SKILLS
              </span>
            </div>

            <ul className="space-y-1.5 text-[10.5px] font-semibold text-slate-100 pl-2">
              {technicalSkills.map((skill, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                  <span className="tracking-wide uppercase">{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* INTEREST HOBBY */}
          <div className="space-y-3">
            <div className="flex justify-center">
              <span
                className="px-5 py-1 rounded-full text-[10.5px] font-black uppercase tracking-[0.16em] shadow-xs"
                style={{ backgroundColor: BADGE_YELLOW, color: BADGE_TEXT }}
              >
                INTEREST HOBBY
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {hobbies.map((hobby, idx) => {
                const cleanHobby = hobby.replace(/^[^\w\s]+/, "").trim();
                const IconComp = getHobbyIconComponent(cleanHobby);

                return (
                  <div
                    key={idx}
                    className="relative overflow-hidden rounded border border-white/50 bg-white/5 min-h-[46px] p-1 flex items-center justify-center text-center group hover:border-[#FACC15] hover:bg-white/10 transition-all shadow-xs"
                  >
                    {/* Background Watermark Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-[#FACC15] group-hover:opacity-35 group-hover:scale-115 transition-all duration-300">
                      <IconComp className="w-8 h-8" />
                    </div>

                    {/* Text Foreground */}
                    <span className="relative z-10 text-[8px] font-black tracking-wider uppercase text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] leading-tight px-0.5">
                      {cleanHobby}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* LANGUAGES (Clean Professional Work-Ready Rows) */}
        <div className="mt-4 pt-3 border-t border-white/15 space-y-1.5">
          {languages.map((lang, idx) => {
            const isKhmer = lang.language.toLowerCase().includes("khmer");
            const level = isKhmer ? "Native / Bilingual" : "Professional Working";
            const percent = isKhmer ? "100%" : "75%";

            return (
              <div
                key={idx}
                className="flex items-center justify-between py-1 px-2 rounded border border-white/15 bg-white/5"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-100">
                    {lang.language}
                  </span>
                  <p className="text-[8.5px] font-medium text-amber-300">
                    {level}
                  </p>
                </div>
                <span className="text-[9px] font-mono font-bold text-slate-300">{percent}</span>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ================= RIGHT MAIN CONTENT ================= */}
      <main className="w-[64%] p-8 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          {/* Header Name */}
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 uppercase">
              {personalInfo.fullName || "ROS RENDO"}
            </h1>
          </div>

          {/* PROFILE SECTION */}
          <section className="space-y-2">
            <div className="flex items-center">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-slate-900 shrink-0">
                PROFILE
              </h2>
              <div className="h-[1.5px] bg-slate-900 flex-1 ml-2" />
            </div>

            <p className="text-[11.5px] leading-relaxed text-slate-700 font-normal">
              {personalInfo.summary ||
                "I am a software engineer with experience in a variety of programming language and track record of delivering high-quality code. I am skilled in problem-solving and have a strong communicator and enjoy working collaboratively with other"}
            </p>
          </section>

          {/* WORK EXPERIENCE SECTION */}
          <section className="space-y-3">
            <div className="flex items-center">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-slate-900 shrink-0">
                WORK EXPERIENCE
              </h2>
              <div className="h-[1.5px] bg-slate-900 flex-1 ml-2" />
            </div>

            {/* Lead Role Description */}
            <p className="text-[11.5px] leading-relaxed text-slate-700 font-normal">
              Full-Stack Developer specializing in building scalable web applications using React,
              Next.js, Node.js, and MongoDB. Experienced in building real-world systems including
              dashboard management, eCommerce platforms, Social Media and automation tools.
            </p>

            {/* Academic Project Highlights */}
            <div className="pt-1 space-y-1.5">
              <h3 className="text-[11.5px] font-bold text-slate-900 underline underline-offset-2">
                Academic Project
              </h3>
              <ul className="space-y-1 text-[11px] text-slate-700 pl-1">
                <li className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold">•</span>
                  <span>Designed Database with 35+ tables</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold">•</span>
                  <span>Implemented booking and room management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold">•</span>
                  <span>Built backend API using Node.js</span>
                </li>
              </ul>
            </div>

            {/* Additional Project Vertical Slices if any */}
            {projects && projects.length > 0 && (
              <div className="pt-2 space-y-2">
                {projects.slice(0, 2).map((proj) => (
                  <div key={proj.id} className="text-[11px] text-slate-700 space-y-0.5">
                    <span className="font-bold text-slate-900">{proj.name}: </span>
                    <span className="text-slate-600">{proj.description}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* PORTFOLIO SECTION */}
          <section className="space-y-2.5">
            <div className="flex items-center">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-slate-900 shrink-0">
                PORTFOLIO
              </h2>
              <div className="h-[1.5px] bg-slate-900 flex-1 ml-2" />
            </div>

            <div className="space-y-2 text-[11px]">
              {/* LinkedIn */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-[#0A66C2] flex items-center justify-center shrink-0">
                  <LinkedinIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-800 hover:text-blue-600 transition-colors tracking-wide truncate font-medium"
                >
                  {linkedin.replace(/^https?:\/\//, "")}
                </a>
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded bg-slate-900 flex items-center justify-center shrink-0">
                  <GithubIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-800 hover:text-slate-900 transition-colors tracking-wide truncate font-medium"
                >
                  {github}
                </a>
              </div>
            </div>
          </section>

          {/* TECHNICAL TOOLS SECTION */}
          <section className="space-y-3">
            <div className="flex items-center">
              <h2 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-slate-900 shrink-0">
                Technical Tools Section
              </h2>
              <div className="h-[1.5px] bg-slate-900 flex-1 ml-2" />
            </div>

            <div className="space-y-2 pl-2">
              {tools.map((tool, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: BADGE_YELLOW }}
                  />
                  <span className="text-[11.5px] font-medium text-slate-800 tracking-wide">
                    {tool}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
