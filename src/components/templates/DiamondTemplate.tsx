import React from "react";
import { CVData } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_SIZE_CONFIG, SPACING_CONFIG, FONT_CONFIG } from "@/lib/constants/themes";
import { Mail, Phone, MapPin, Globe, User, Building2 } from "lucide-react";
import {
  LinkedinIcon as Linkedin,
  GithubIcon as Github,
  FacebookIcon as Facebook,
  getHobbyIconComponent,
} from "@/components/common/Icons";
import { SkillItemRenderer, getTechIcon } from "@/components/common/TechIcons";

interface TemplateProps {
  data: CVData;
}

const parseLanguagePercent = (prof?: string, name?: string): number => {
  if (!prof) {
    if (name?.toLowerCase().includes("khmer")) return 100;
    return 75;
  }
  const match = prof.match(/(\d+)/);
  if (match) return Math.min(100, Math.max(0, parseInt(match[1], 10)));
  const p = prof.toLowerCase();
  if (p.includes("native") || p.includes("fluent") || p.includes("bilingual")) return 100;
  if (p.includes("advanced") || p.includes("proficient") || p.includes("professional")) return 80;
  if (p.includes("intermediate")) return 65;
  if (p.includes("basic") || p.includes("elementary") || p.includes("beginner")) return 40;
  return 75;
};

export const DiamondTemplate: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experience, education, skills, projects, additional, settings } = data;
  const theme = COLOR_THEMES[settings.colorTheme] || COLOR_THEMES.amber;
  const font = FONT_CONFIG[settings.fontFamily] || FONT_CONFIG.sans;
  const size = FONT_SIZE_CONFIG[settings.fontSize] || FONT_SIZE_CONFIG.normal;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  const goldAccent = "#c59837";
  const darkObsidian = "#161719";

  // Categorized Developer Tools & Platforms Helper
  const getToolCategories = () => {
    if (!additional?.technicalTools || additional.technicalTools.length === 0) {
      return [
        { category: "Development & Version Control", items: ["VS Code", "Git", "GitHub"] },
        { category: "API & Database", items: ["Postman", "pgAdmin / DBeaver", "Prisma Studio"] },
        { category: "Containers & Server Operations", items: ["Docker", "Docker Compose", "Linux / Bash", "Nginx", "PM2"] },
        { category: "Cloud & Deployment", items: ["AWS EC2", "Vercel"] },
        { category: "UI/UX & Testing", items: ["Figma", "Playwright"] },
      ];
    }

    const catMap: Record<string, string[]> = {
      "Development & Version Control": [],
      "API & Database": [],
      "Containers & Server Operations": [],
      "Cloud & Deployment": [],
      "UI/UX & Testing": [],
    };

    additional.technicalTools.forEach((rawTool) => {
      const t = rawTool.toLowerCase();
      if (t.includes("vs code") || t.includes("code") || t.includes("git") || t.includes("github") || t.includes("terminal")) {
        catMap["Development & Version Control"].push(rawTool);
      } else if (t.includes("postman") || t.includes("dbeaver") || t.includes("pgadmin") || t.includes("prisma") || t.includes("sql") || t.includes("redis")) {
        catMap["API & Database"].push(rawTool);
      } else if (t.includes("docker") || t.includes("linux") || t.includes("bash") || t.includes("nginx") || t.includes("pm2")) {
        catMap["Containers & Server Operations"].push(rawTool);
      } else if (t.includes("aws") || t.includes("ec2") || t.includes("vercel") || t.includes("cloud")) {
        catMap["Cloud & Deployment"].push(rawTool);
      } else if (t.includes("figma") || t.includes("playwright") || t.includes("swagger") || t.includes("openapi") || t.includes("testing")) {
        catMap["UI/UX & Testing"].push(rawTool);
      } else {
        catMap["Development & Version Control"].push(rawTool);
      }
    });

    return Object.entries(catMap)
      .filter(([_, items]) => items.length > 0)
      .map(([category, items]) => ({ category, items }));
  };

  const toolCategories = getToolCategories();

  // Hard Skills Grouping: Frontend, Backend, Database, Infrastructure (Only Icons)
  const hardSkillsGroups = [
    {
      name: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript"],
    },
    {
      name: "Backend",
      skills: ["Node.js", "NestJS", "Express.js", "REST APIs", "Python"],
    },
    {
      name: "Database",
      skills: ["PostgreSQL", "Prisma ORM", "SQL", "MongoDB"],
    },
    {
      name: "Infrastructure",
      skills: ["Docker", "Linux", "AWS EC2", "Nginx", "PM2"],
    },
  ];

  // Soft Skills with Radar & Metric Chart Visuals
  const softSkillsList =
    skills?.soft && skills.soft.length > 0
      ? skills.soft.map((s, idx) => {
          const defaults = [95, 96, 90, 88, 94];
          const shorts = ["ARCH", "DEBUG", "TEAM", "DOCS", "LEARN"];
          return {
            name: s,
            short: shorts[idx % shorts.length] || `S${idx + 1}`,
            score: defaults[idx % defaults.length] || 90,
          };
        })
      : [
          { name: "Product Architecture", short: "ARCH", score: 95 },
          { name: "Problem Solving & Debug", short: "DEBUG", score: 96 },
          { name: "Team Collaboration", short: "TEAM", score: 90 },
          { name: "Technical Documentation", short: "DOCS", score: 88 },
          { name: "Continuous Learning", short: "LEARN", score: 94 },
        ];

  // 5-Axis Radar Chart Mathematical Geometry
  const radarRadius = 42;
  const radarCx = 95;
  const radarCy = 55;
  const radarAxes = softSkillsList.slice(0, 5);
  const radarCount = Math.max(3, radarAxes.length);

  const getRadarPoint = (percent: number, idx: number) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * idx) / radarCount;
    return {
      x: radarCx + radarRadius * percent * Math.cos(angle),
      y: radarCy + radarRadius * percent * Math.sin(angle),
    };
  };

  const radarPolygonPoints = radarAxes
    .map((item, idx) => {
      const pt = getRadarPoint(item.score / 100, idx);
      return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    })
    .join(" ");

  // Hobbies / Interests (default 3x2 grid)
  const hobbies =
    additional?.interests && additional.interests.length > 0
      ? additional.interests
      : ["SPORT", "LEARNING", "AI RESEARCH", "EDITING", "TRAVELLING", "GAMING"];

  // Languages with proficiency bars
  const languages =
    skills?.languages && skills.languages.length > 0
      ? skills.languages
      : [
          { id: "lang-1", language: "English", proficiency: "75%" },
          { id: "lang-2", language: "Khmer", proficiency: "100%" },
        ];

  return (
    <div
      className={`w-full text-zinc-900 bg-white ${font.fontFamilyClass} ${size.body} relative overflow-hidden shadow-xs flex flex-col justify-between min-h-[1120px] print:min-h-0`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 flex-1">
        {/* ================= LEFT COLUMN: MATTE OBSIDIAN WITH DIAMOND AVATAR (~36% WIDTH) ================= */}
        <aside
          style={{ backgroundColor: darkObsidian, borderColor: goldAccent }}
          className="md:col-span-4 text-white p-6 sm:p-7 space-y-6 border-r-2 flex flex-col justify-between"
        >
          <div className="space-y-6">
            {/* 45-Degree Rotated Diamond Rhombus Photo Frame (◆) */}
            <div className="flex flex-col items-center pt-2 pb-2">
              <div
                className="w-28 h-28 rotate-45 border-2 p-1 flex items-center justify-center overflow-hidden shadow-xl bg-zinc-800"
                style={{ borderColor: goldAccent }}
              >
                <div className="w-full h-full overflow-hidden flex items-center justify-center">
                  {personalInfo.photoUrl ? (
                    <img
                      src={personalInfo.photoUrl}
                      alt={personalInfo.fullName || "Candidate"}
                      className="w-full h-full object-cover"
                      style={{
                        transform: "rotate(-45deg) scale(1.45)",
                        objectPosition: "center 20%",
                      }}
                    />
                  ) : (
                    <div className="-rotate-45 flex flex-col items-center justify-center">
                      <User className="w-10 h-10 text-amber-200/80 mb-0.5" />
                      <span className="text-[9px] font-black tracking-widest text-[#c59837]">
                        {personalInfo.fullName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase() || "RR"}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Title Under Photo */}
              <p
                className="mt-4 text-[10.5px] font-extrabold uppercase tracking-[0.22em] text-center"
                style={{ color: goldAccent }}
              >
                {personalInfo.jobTitle || "SOFTWARE ENGINEER"}
              </p>
            </div>

            {/* Contacts Section with Diamond Icon Badges */}
            <div className="space-y-2.5">
              <div
                className="flex items-center gap-2 pb-1 border-b"
                style={{ borderColor: `${goldAccent}40` }}
              >
                <div className="w-2 h-2 rotate-45" style={{ backgroundColor: goldAccent }} />
                <h2
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: goldAccent }}
                >
                  Contacts
                </h2>
              </div>

              <div className="space-y-2 text-xs text-zinc-300">
                {personalInfo.phone && (
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: goldAccent }} />
                    <span className="tracking-wide">{personalInfo.phone}</span>
                  </div>
                )}
                {personalInfo.email && (
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: goldAccent }} />
                    <span className="truncate">{personalInfo.email}</span>
                  </div>
                )}
                {personalInfo.location && (
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: goldAccent }} />
                    <span>{personalInfo.location}</span>
                  </div>
                )}
                {personalInfo.facebookUrl && (
                  <div className="flex items-center gap-2.5">
                    <Facebook className="h-3.5 w-3.5 shrink-0" style={{ color: goldAccent }} />
                    <span className="truncate">{personalInfo.facebookUrl}</span>
                  </div>
                )}
                {personalInfo.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-amber-300 transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5 shrink-0" style={{ color: goldAccent }} />
                    <span className="truncate">LinkedIn</span>
                  </a>
                )}
                {personalInfo.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 hover:text-amber-300 transition-colors"
                  >
                    <Github className="h-3.5 w-3.5 shrink-0" style={{ color: goldAccent }} />
                    <span className="truncate">GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Education Highlight in Sidebar */}
            {education && education.length > 0 && (
              <div className="space-y-2.5">
                <div
                  className="flex items-center gap-2 pb-1 border-b"
                  style={{ borderColor: `${goldAccent}40` }}
                >
                  <div className="w-2 h-2 rotate-45" style={{ backgroundColor: goldAccent }} />
                  <h2
                    className="text-[11px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: goldAccent }}
                  >
                    Academic Background
                  </h2>
                </div>

                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <p className="text-[10.5px] font-extrabold uppercase tracking-wide text-white leading-tight">
                        {edu.degree}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-300">
                        <Building2 className="w-3 h-3 shrink-0" style={{ color: goldAccent }} />
                        <span className="font-medium">{edu.institution}</span>
                      </div>
                      <div className="text-[9.5px] font-mono text-zinc-400">
                        {edu.startDate} – {edu.endDate || "Present"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Hard Skills (Grouped: Frontend, Backend, Database, Infrastructure - Only Icons) */}
            <div className="space-y-2.5">
              <div
                className="flex items-center gap-2 pb-1 border-b"
                style={{ borderColor: `${goldAccent}40` }}
              >
                <div className="w-2 h-2 rotate-45" style={{ backgroundColor: goldAccent }} />
                <h2
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: goldAccent }}
                >
                  Hard Skills
                </h2>
              </div>

              <div className="space-y-2">
                {hardSkillsGroups.map((group, gIdx) => (
                  <div key={gIdx} className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[8.5px] font-extrabold uppercase tracking-widest text-amber-300/90">
                      <span className="w-1 h-1 rotate-45 bg-[#c59837]" />
                      <span>{group.name}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pl-0.5">
                      {group.skills.map((skill, sIdx) => (
                        <div
                          key={sIdx}
                          title={skill}
                          className="w-7 h-7 rounded-md bg-white/[0.06] border border-white/15 flex items-center justify-center hover:border-[#c59837] hover:bg-white/[0.14] transition-all group relative cursor-default shadow-xs"
                        >
                          <span className="w-4 h-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {getTechIcon(skill, "w-4 h-4")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills with Mathematical Radar Chart & Visual Progress Gauges */}
            <div className="space-y-2.5">
              <div
                className="flex items-center gap-2 pb-1 border-b"
                style={{ borderColor: `${goldAccent}40` }}
              >
                <div className="w-2 h-2 rotate-45" style={{ backgroundColor: goldAccent }} />
                <h2
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: goldAccent }}
                >
                  Soft Skills
                </h2>
              </div>

              {/* 5-Axis SVG Radar Chart */}
              <div className="flex justify-center py-1">
                <svg
                  viewBox="0 0 190 125"
                  className="w-full max-w-[210px] h-[125px] overflow-visible drop-shadow-md select-none"
                >
                  <defs>
                    <linearGradient id="softRadarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#c59837" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>

                  {/* Concentric Pentagon Grid Rings (100%, 75%, 50%, 25%) */}
                  {[1, 0.75, 0.5, 0.25].map((scale, rIdx) => {
                    const ringPts = radarAxes
                      .map((_, idx) => {
                        const pt = getRadarPoint(scale, idx);
                        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
                      })
                      .join(" ");
                    return (
                      <polygon
                        key={rIdx}
                        points={ringPts}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Spoke Axis Lines */}
                  {radarAxes.map((_, idx) => {
                    const edgePt = getRadarPoint(1, idx);
                    return (
                      <line
                        key={idx}
                        x1={radarCx}
                        y1={radarCy}
                        x2={edgePt.x}
                        y2={edgePt.y}
                        stroke="rgba(255, 255, 255, 0.16)"
                        strokeWidth="1"
                        strokeDasharray="2,2"
                      />
                    );
                  })}

                  {/* Data Filled Polygon */}
                  <polygon
                    points={radarPolygonPoints}
                    fill="url(#softRadarGradient)"
                    stroke="#c59837"
                    strokeWidth="1.75"
                  />

                  {/* Axis Vertex Nodes (Golden Diamonds) */}
                  {radarAxes.map((item, idx) => {
                    const pt = getRadarPoint(item.score / 100, idx);
                    return (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r="2.5"
                        fill="#fde68a"
                        stroke="#c59837"
                        strokeWidth="1.5"
                      />
                    );
                  })}

                  {/* Axis Text Labels */}
                  {radarAxes.map((item, idx) => {
                    const labelPt = getRadarPoint(1.28, idx);
                    const angle = -Math.PI / 2 + (2 * Math.PI * idx) / radarCount;
                    const cosA = Math.cos(angle);
                    const anchor = cosA > 0.3 ? "start" : cosA < -0.3 ? "end" : "middle";

                    return (
                      <text
                        key={idx}
                        x={labelPt.x}
                        y={labelPt.y + 3}
                        textAnchor={anchor}
                        fill="#fde68a"
                        fontSize="7"
                        fontWeight="800"
                        letterSpacing="0.05em"
                        className="select-none"
                      >
                        {item.short}
                      </text>
                    );
                  })}
                </svg>
              </div>

              {/* Visual Horizontal Progress Bars with Exact Scores */}
              <div className="space-y-1.5 pt-1">
                {softSkillsList.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between items-center text-[9px]">
                      <span className="font-semibold text-zinc-300 tracking-wide truncate max-w-[140px]">
                        {item.name}
                      </span>
                      <span className="font-mono font-bold text-amber-300 text-[8.5px]">
                        {item.score}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-600 via-[#c59837] to-amber-300 transition-all"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interest & Hobby Grid with Decorative Background Watermark Icons */}
            <div className="space-y-2.5">
              <div
                className="flex items-center gap-2 pb-1 border-b"
                style={{ borderColor: `${goldAccent}40` }}
              >
                <div className="w-2 h-2 rotate-45" style={{ backgroundColor: goldAccent }} />
                <h2
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: goldAccent }}
                >
                  Interest Hobby
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                {hobbies.map((hobby, idx) => {
                  const cleanHobby = hobby.replace(/^[^\w\s]+/, "").trim();
                  const IconComp = getHobbyIconComponent(cleanHobby);

                  return (
                    <div
                      key={idx}
                      className="relative overflow-hidden rounded-md border border-[#c59837]/45 bg-gradient-to-br from-white/[0.08] to-white/[0.02] min-h-[46px] p-1.5 flex items-center justify-center text-center group hover:border-[#c59837] hover:bg-white/[0.12] transition-all shadow-xs"
                    >
                      {/* Decorative Gold Icon Watermark DIRECTLY BEHIND THE TEXT */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 text-[#c59837] group-hover:opacity-35 group-hover:scale-115 transition-all duration-300">
                        <IconComp className="w-8 h-8" />
                      </div>

                      {/* Foreground Bold Text with Crisp Drop Shadow for 100% Readability */}
                      <span className="relative z-10 text-[8px] font-black tracking-wider uppercase text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)] leading-tight px-0.5">
                        {cleanHobby}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Languages Section - Clean, Professional & Work-Ready */}
          <div className="mt-4 pt-3 border-t border-white/15 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: goldAccent }} />
              <h2
                className="text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: goldAccent }}
              >
                Languages
              </h2>
            </div>

            <div className="space-y-1.5">
              {languages.map((l, idx) => {
                const isKhmer = l.language.toLowerCase().includes("khmer");
                const levelLabel = isKhmer ? "Native / Bilingual" : "Professional Working";
                const dotsFilled = isKhmer ? 5 : 4;

                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-1 px-2 rounded bg-white/[0.04] border border-white/10"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                        {l.language}
                      </span>
                      <p className="text-[8.5px] font-medium text-amber-200/80">
                        {levelLabel}
                      </p>
                    </div>

                    {/* Clean 5-Diamond Pips ◆ ◆ ◆ ◆ ◇ */}
                    <div className="flex items-center gap-1.5" title={`${dotsFilled}/5`}>
                      {[1, 2, 3, 4, 5].map((step) => (
                        <span
                          key={step}
                          className={`w-1.5 h-1.5 rotate-45 transition-all ${
                            step <= dotsFilled
                              ? "bg-[#c59837] shadow-[0_0_3px_#c59837]"
                              : "bg-white/20"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ================= RIGHT MAIN COLUMN WITH GOLD MILESTONE TIMELINE (~64% WIDTH) ================= */}
        <main className="md:col-span-8 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header with Candidate Name & Professional Positioning */}
            <header className="space-y-1.5 border-b pb-3" style={{ borderColor: `${goldAccent}30` }}>
              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-zinc-950">
                {personalInfo.fullName || "ROS RENDO"}
              </h1>
              {personalInfo.jobTitle && (
                <p
                  className="text-xs font-bold uppercase tracking-[0.25em]"
                  style={{ color: goldAccent }}
                >
                  {personalInfo.jobTitle}
                </p>
              )}
            </header>

            {/* Profile / About Me Section with Trailing Rule */}
            {personalInfo.summary && (
              <section className="space-y-2 cv-break-avoid">
                <div className="flex items-center">
                  <h2
                    className="text-xs font-black uppercase tracking-[0.25em] shrink-0"
                    style={{ color: goldAccent }}
                  >
                    Profile
                  </h2>
                  <div className="h-[1.5px] flex-1 ml-3" style={{ backgroundColor: `${goldAccent}40` }} />
                </div>
                <p className="text-xs text-zinc-700 leading-relaxed font-sans">
                  {personalInfo.summary}
                </p>
              </section>
            )}

            {/* Work Experience Section with Golden Milestone Timeline Spine */}
            {experience && experience.length > 0 && (
              <section className="space-y-4 cv-break-avoid">
                <div className="flex items-center">
                  <h2
                    className="text-xs font-black uppercase tracking-[0.25em] shrink-0"
                    style={{ color: goldAccent }}
                  >
                    Experience
                  </h2>
                  <div className="h-[1.5px] flex-1 ml-3" style={{ backgroundColor: `${goldAccent}40` }} />
                </div>

                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#c59837]/40">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative space-y-1 cv-break-avoid text-xs">
                      {/* Golden Circle Milestone Node */}
                      <span
                        className="w-3 h-3 rounded-full absolute -left-7 sm:-left-9 top-1 ring-4 ring-white shadow-xs"
                        style={{ backgroundColor: goldAccent }}
                      />
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <span className="font-bold text-xs font-mono" style={{ color: goldAccent }}>
                          {exp.startDate} – {exp.isCurrent ? "Present" : exp.endDate || "Present"}
                        </span>
                      </div>
                      <div className="font-bold text-zinc-900 text-sm">
                        {exp.company}
                      </div>
                      <div className="text-zinc-600 font-semibold italic">
                        {exp.jobTitle} {exp.location && `• ${exp.location}`}
                      </div>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="mt-1 space-y-1 text-zinc-600">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx} className="leading-relaxed flex items-start gap-1.5">
                              <span style={{ color: goldAccent }} className="font-bold">›</span>
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

            {/* Key Engineering Projects & Academic Project Showcase */}
            {projects && projects.length > 0 && (
              <section className="space-y-4 cv-break-avoid pt-1">
                <div className="flex items-center">
                  <h2
                    className="text-xs font-black uppercase tracking-[0.25em] shrink-0"
                    style={{ color: goldAccent }}
                  >
                    Engineering & Academic Projects
                  </h2>
                  <div className="h-[1.5px] flex-1 ml-3" style={{ backgroundColor: `${goldAccent}40` }} />
                </div>

                <div className="space-y-4">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-1.5 text-xs cv-break-avoid">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <span className="font-bold text-sm text-zinc-950 tracking-tight">
                          {proj.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {proj.url && (
                            <a
                              href={proj.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] font-mono font-semibold underline hover:text-amber-600 transition-colors"
                              style={{ color: goldAccent }}
                            >
                              Live Demo ↗
                            </a>
                          )}
                          {proj.githubUrl && (
                            <a
                              href={proj.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[10px] font-mono text-zinc-500 hover:text-zinc-950 transition-colors"
                            >
                              GitHub ↗
                            </a>
                          )}
                        </div>
                      </div>

                      <p className="text-zinc-600 leading-relaxed text-xs">
                        {proj.description}
                      </p>

                      {proj.technologies && proj.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10px] font-mono font-medium border"
                              style={{
                                borderColor: "rgba(197, 152, 55, 0.3)",
                                backgroundColor: "rgba(197, 152, 55, 0.08)",
                                color: "#846118",
                              }}
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

            {/* Engineering Competencies */}
            <section className="space-y-2 cv-break-avoid pt-1">
              <div className="flex items-center">
                <h2
                  className="text-xs font-black uppercase tracking-[0.25em] shrink-0"
                  style={{ color: goldAccent }}
                >
                  Engineering Competencies
                </h2>
                <div className="h-[1.5px] flex-1 ml-3" style={{ backgroundColor: `${goldAccent}40` }} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-lg border border-zinc-200 bg-zinc-50/70 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: goldAccent }} />
                    <h3 className="text-[10px] font-black uppercase text-zinc-900 tracking-wide">
                      Database Engineering
                    </h3>
                  </div>
                  <p className="text-[9.5px] text-zinc-600 leading-snug">
                    Relational data modeling, PostgreSQL, foreign key constraints, Prisma schema and migrations.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg border border-zinc-200 bg-zinc-50/70 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: goldAccent }} />
                    <h3 className="text-[10px] font-black uppercase text-zinc-900 tracking-wide">
                      Backend Development
                    </h3>
                  </div>
                  <p className="text-[9.5px] text-zinc-600 leading-snug">
                    REST APIs, Node.js, NestJS, JWT authentication, role-based access control, request validation.
                  </p>
                </div>

                <div className="p-2.5 rounded-lg border border-zinc-200 bg-zinc-50/70 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rotate-45 shrink-0" style={{ backgroundColor: goldAccent }} />
                    <h3 className="text-[10px] font-black uppercase text-zinc-900 tracking-wide">
                      Cloud & Deployment
                    </h3>
                  </div>
                  <p className="text-[9.5px] text-zinc-600 leading-snug">
                    Docker, Linux, Nginx, PM2, AWS EC2, Vercel.
                  </p>
                </div>
              </div>
            </section>

            {/* Developer Tools & Platforms (Categorized & Compact) */}
            {toolCategories && toolCategories.length > 0 && (
              <section className="space-y-2 cv-break-avoid pt-1">
                <div className="flex items-center">
                  <h2
                    className="text-xs font-black uppercase tracking-[0.25em] shrink-0"
                    style={{ color: goldAccent }}
                  >
                    Developer Tools & Platforms
                  </h2>
                  <div className="h-[1.5px] flex-1 ml-3" style={{ backgroundColor: `${goldAccent}40` }} />
                </div>

                <div className="space-y-1.5 pl-1 text-xs">
                  {toolCategories.map((group, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-0.5 border-b border-zinc-100 last:border-b-0"
                    >
                      <span className="font-extrabold text-[9.5px] uppercase tracking-wider text-zinc-950 sm:w-56 shrink-0 flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rotate-45 shrink-0"
                          style={{ backgroundColor: goldAccent }}
                        />
                        {group.category}
                      </span>
                      <span className="text-[11px] text-zinc-700 font-medium tracking-wide">
                        {group.items.join("  ·  ")}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education in Main Flow */}
            {education && education.length > 0 && (
              <section className="space-y-2 cv-break-avoid pt-1">
                <div className="flex items-center">
                  <h2
                    className="text-xs font-black uppercase tracking-[0.25em] shrink-0"
                    style={{ color: goldAccent }}
                  >
                    Education
                  </h2>
                  <div className="h-[1.5px] flex-1 ml-3" style={{ backgroundColor: `${goldAccent}40` }} />
                </div>

                <div className="space-y-1.5 text-xs pl-1">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-0.5">
                      <div className="flex flex-wrap items-baseline justify-between gap-1">
                        <span className="font-bold text-sm text-zinc-950">
                          {edu.degree}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-zinc-500">
                          {edu.startDate} – {edu.endDate || "Expected 2027"}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-zinc-700">
                        {edu.institution}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* References Section */}
            {additional?.references && additional.references.length > 0 && (
              <section className="space-y-2 cv-break-avoid pt-1">
                <div className="flex items-center">
                  <h2
                    className="text-xs font-black uppercase tracking-[0.25em] shrink-0"
                    style={{ color: goldAccent }}
                  >
                    References
                  </h2>
                  <div className="h-[1.5px] flex-1 ml-3" style={{ backgroundColor: `${goldAccent}40` }} />
                </div>

                <div className="space-y-1.5 text-xs pl-1">
                  {additional.references.map((ref) => (
                    <div
                      key={ref.id}
                      className="p-2 rounded-lg border border-zinc-200 bg-zinc-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs"
                    >
                      <div>
                        <div className="font-bold text-zinc-950 text-[11px]">{ref.name}</div>
                        <div className="text-[10px] text-zinc-600 font-medium">
                          {ref.role} • {ref.institution}
                        </div>
                      </div>
                      {ref.contact && (
                        <div className="text-[9.5px] font-mono text-zinc-500 italic">
                          {ref.contact}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Links & Mobile Verification QR */}
            <section className="space-y-2 cv-break-avoid pt-1">
              <div className="flex items-center">
                <h2
                  className="text-xs font-black uppercase tracking-[0.25em] shrink-0"
                  style={{ color: goldAccent }}
                >
                  Links
                </h2>
                <div className="h-[1.5px] flex-1 ml-3" style={{ backgroundColor: `${goldAccent}40` }} />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-2.5 rounded-lg border border-zinc-200 bg-gradient-to-r from-zinc-50 to-white">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {personalInfo.githubUrl && (
                      <a
                        href={personalInfo.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-300 bg-white hover:bg-zinc-50 font-bold text-[11px] text-zinc-900 shadow-xs transition-colors"
                      >
                        <Github className="w-3.5 h-3.5 text-zinc-900" />
                        <span>github.com/ROS-RENDO</span>
                        <span className="text-[10px] text-amber-600 font-bold">↗</span>
                      </a>
                    )}
                    {personalInfo.linkedinUrl && (
                      <a
                        href={personalInfo.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-zinc-300 bg-white hover:bg-zinc-50 font-bold text-[11px] text-zinc-900 shadow-xs transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                        <span>LinkedIn Profile</span>
                        <span className="text-[10px] text-[#0A66C2] font-bold">↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Scannable QR Code for Recruiters */}
                <div className="flex items-center gap-2 shrink-0 bg-white p-1.5 rounded-md border border-zinc-300 shadow-xs">
                  <img
                    src="/images/github-qr.svg"
                    alt="Scan for GitHub"
                    className="w-11 h-11 object-contain"
                  />
                  <div className="text-[8.5px] leading-tight space-y-0.5">
                    <span className="font-extrabold uppercase tracking-wider text-zinc-900 block">
                      Scan on Mobile
                    </span>
                    <span className="text-zinc-500 block">Instant GitHub</span>
                    <span className="font-mono text-[8px] font-bold text-[#c59837] block">
                      @ROS-RENDO
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Solid Gold Full-Width Grounding Base Bar */}
      <div className="h-3 w-full" style={{ backgroundColor: goldAccent }} />
    </div>
  );
};
