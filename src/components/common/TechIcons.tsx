import React from "react";

export interface TechItem {
  id: string;
  name: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "Design" | "Mobile";
}

export const POPULAR_TECH_LIBRARY: TechItem[] = [
  // Frontend
  { id: "react", name: "React", category: "Frontend" },
  { id: "typescript", name: "TypeScript", category: "Frontend" },
  { id: "javascript", name: "JavaScript", category: "Frontend" },
  { id: "nextjs", name: "Next.js", category: "Frontend" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend" },
  { id: "vue", name: "Vue.js", category: "Frontend" },
  { id: "html", name: "HTML5 / CSS3", category: "Frontend" },

  // Backend
  { id: "nodejs", name: "Node.js", category: "Backend" },
  { id: "express", name: "Express.js", category: "Backend" },
  { id: "nestjs", name: "NestJS", category: "Backend" },
  { id: "python", name: "Python", category: "Backend" },
  { id: "java", name: "Java", category: "Backend" },
  { id: "graphql", name: "GraphQL", category: "Backend" },
  { id: "rest", name: "REST APIs", category: "Backend" },

  // Database
  { id: "postgresql", name: "PostgreSQL", category: "Database" },
  { id: "mongodb", name: "MongoDB", category: "Database" },
  { id: "prisma", name: "Prisma ORM", category: "Database" },
  { id: "redis", name: "Redis", category: "Database" },

  // DevOps & Cloud
  { id: "docker", name: "Docker", category: "DevOps" },
  { id: "git", name: "Git", category: "DevOps" },
  { id: "aws", name: "AWS", category: "DevOps" },
  { id: "nginx", name: "Nginx", category: "DevOps" },
  { id: "pm2", name: "PM2", category: "DevOps" },
  { id: "linux", name: "Linux", category: "DevOps" },

  // Design & Mobile
  { id: "figma", name: "Figma", category: "Design" },
  { id: "flutter", name: "Flutter", category: "Mobile" },
  { id: "reactnative", name: "React Native", category: "Mobile" },
];

/**
 * Slug mapper to query the global Simple Icons internet CDN.
 */
export function getTechSlug(name: string): string {
  const clean = name.toLowerCase().trim().replace(/[\s\.\-_/]/g, "");

  if (clean.includes("express")) return "express";
  if (clean.includes("nest")) return "nestjs";
  if (clean.includes("next")) return "nextdotjs";
  if (clean.includes("node")) return "nodedotjs";
  if (clean.includes("reactnative")) return "react";
  if (clean.includes("react")) return "react";
  if (clean.includes("typescript") || clean === "ts") return "typescript";
  if (clean.includes("javascript") || clean === "js") return "javascript";
  if (clean.includes("tailwind")) return "tailwindcss";
  if (clean.includes("postgres") || clean.includes("psql") || clean === "sql") return "postgresql";
  if (clean.includes("mongo")) return "mongodb";
  if (clean.includes("prisma")) return "prisma";
  if (clean.includes("redis")) return "redis";
  if (clean.includes("docker")) return "docker";
  if (clean.includes("github")) return "github";
  if (clean.includes("git")) return "git";
  if (clean.includes("aws") || clean.includes("ec2") || clean.includes("s3")) return "amazonwebservices";
  if (clean.includes("nginx")) return "nginx";
  if (clean.includes("pm2")) return "pm2";
  if (clean.includes("python")) return "python";
  if (clean.includes("graphql")) return "graphql";
  if (clean.includes("vue")) return "vuedotjs";
  if (clean.includes("angular")) return "angular";
  if (clean.includes("svelte")) return "svelte";
  if (clean.includes("flutter")) return "flutter";
  if (clean.includes("figma")) return "figma";
  if (clean.includes("linux") || clean.includes("ubuntu")) return "linux";
  if (clean.includes("java")) return "openjdk";
  if (clean.includes("go") || clean.includes("golang")) return "go";
  if (clean.includes("rust")) return "rust";
  if (clean.includes("cplusplus") || clean.includes("cpp") || clean.includes("c++")) return "cplusplus";
  if (clean.includes("csharp") || clean.includes("c#")) return "csharp";
  if (clean.includes("rest") || clean.includes("api")) return "fastapi";
  if (clean.includes("supabase")) return "supabase";
  if (clean.includes("firebase")) return "firebase";
  if (clean.includes("kubernetes") || clean.includes("k8s")) return "kubernetes";
  if (clean.includes("stripe")) return "stripe";

  return clean;
}

/**
 * CDN image loader for a single icon slug.
 * Calls onError if the CDN request fails so the parent can render a fallback.
 */
const TechIconCDN: React.FC<{
  slug: string;
  name: string;
  className: string;
  color?: string;
  onError: () => void;
}> = ({ slug, name, className, color, onError }) => {
  const cleanColor = color ? color.replace("#", "") : "";
  const src = cleanColor
    ? `https://cdn.simpleicons.org/${slug}/${cleanColor}`
    : `https://cdn.simpleicons.org/${slug}`;

  return (
    <img
      src={src}
      alt={name}
      crossOrigin="anonymous"
      className={`${className} object-contain inline-block shrink-0`}
      loading="eager"
      decoding="sync"
      onError={onError}
    />
  );
};

/**
 * CDN-first icon component.
 * 1. Tries the Simple Icons CDN (always the official logo).
 * 2. Falls back to the bundled inline SVG if the CDN is unreachable.
 * 3. Falls back to a monogram pill as a last resort.
 */
export const TechIconImage: React.FC<{
  name: string;
  className?: string;
  color?: string;
}> = ({ name, className = "h-3.5 w-3.5", color }) => {
  const [cdnFailed, setCdnFailed] = React.useState(false);

  // 1. Prioritize bundled inline SVGs: 100% offline, zero network requests, instant, sharp vector
  const bundled = getBundledIcon(name, className, color);
  if (bundled) {
    return <>{bundled}</>;
  }

  const slug = getTechSlug(name);

  // Last resort: monogram pill
  const monogram = (
    <span className="font-mono text-[9px] font-bold px-1 rounded bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-white/80 shrink-0 select-none">
      {name.slice(0, 3).toUpperCase()}
    </span>
  );

  if (!slug) return monogram;

  if (!cdnFailed) {
    return (
      <TechIconCDN
        slug={slug}
        name={name}
        className={className}
        color={color}
        onError={() => setCdnFailed(true)}
      />
    );
  }

  return monogram;
};

/**
 * Official Brand Color Palette for Developer Technologies
 */
export function getTechBrandColor(name: string): string {
  const n = name.toLowerCase().replace(/[\s\.\-_/]/g, "");
  if (n.includes("react")) return "#61DAFB";
  if (n.includes("typescript") || n === "ts") return "#3178C6";
  if (n.includes("javascript") || n === "js") return "#F7DF1E";
  if (n.includes("next")) return "#000000";
  if (n.includes("tailwind")) return "#06B6D4";
  if (n.includes("node")) return "#5FA04E";
  if (n.includes("nest")) return "#E0234E";
  if (n.includes("express")) return "#000000";
  if (n.includes("rest") || n.includes("api")) return "#FF6C37";
  if (n.includes("python")) return "#3776AB";
  if (n.includes("postgres") || n.includes("psql") || n === "sql") return "#4169E1";
  if (n.includes("prisma")) return "#5A67D8";
  if (n.includes("mongo")) return "#47A248";
  if (n.includes("redis")) return "#DC382D";
  if (n.includes("docker")) return "#2496ED";
  if (n.includes("linux") || n.includes("ubuntu")) return "#FCC624";
  if (n.includes("aws") || n.includes("ec2") || n.includes("s3")) return "#FF9900";
  if (n.includes("nginx")) return "#009639";
  if (n.includes("pm2")) return "#2B037A";
  if (n.includes("figma")) return "#F24E1E";
  if (n.includes("graphql")) return "#E10098";
  if (n.includes("git") || n.includes("github")) return "#F05032";
  if (n.includes("java")) return "#ED8B00";
  if (n.includes("html")) return "#E34F26";
  if (n.includes("css")) return "#1572B6";
  return "#c59837";
}

export function getBundledIcon(
  name: string,
  className: string = "h-3.5 w-3.5",
  color?: string
): React.ReactNode {
  const normalized = name.toLowerCase().replace(/[\s\.\-_/]/g, "");
  const brand = color || getTechBrandColor(name);

  // 1. React / React Native
  if (normalized.includes("react")) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill={brand}>
        <circle cx="0" cy="0" r="2.05" fill={brand} />
        <g stroke={brand} strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // 2. TypeScript (Official Simple Icons badge — exact letterforms)
  if (normalized.includes("typescript") || normalized === "ts") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="2" fill={color || "#3178C6"} />
        <path
          fill="#ffffff"
          d="M13.47 15.566V17c.344.192.753.338 1.228.437s.964.148 1.47.148c.494 0 .963-.05 1.407-.151.444-.101.834-.263 1.17-.487.337-.223.604-.514.8-.872.197-.357.296-.79.296-1.298 0-.365-.056-.688-.168-.969a2.413 2.413 0 0 0-.482-.756 3.473 3.473 0 0 0-.751-.597 8.167 8.167 0 0 0-.987-.494 7.47 7.47 0 0 1-.635-.305 2.332 2.332 0 0 1-.45-.308 1.168 1.168 0 0 1-.27-.355.976.976 0 0 1-.09-.421c0-.146.03-.278.092-.396a.869.869 0 0 1 .263-.308 1.263 1.263 0 0 1 .416-.199 1.924 1.924 0 0 1 .54-.07c.136 0 .282.01.44.032.157.022.316.057.476.106.161.049.314.11.46.185.147.074.28.161.4.26v-1.32a4.47 4.47 0 0 0-.952-.27 6.396 6.396 0 0 0-1.148-.092c-.49 0-.955.057-1.394.17a3.33 3.33 0 0 0-1.138.52 2.47 2.47 0 0 0-.764.886c-.186.355-.279.772-.279 1.25 0 .618.179 1.14.537 1.567.358.428.907.787 1.645 1.077l.692.277c.22.088.408.179.564.272.157.093.278.197.363.312.085.115.128.248.128.4 0 .15-.033.288-.099.413a.874.874 0 0 1-.285.32 1.4 1.4 0 0 1-.452.206 2.278 2.278 0 0 1-.594.07c-.386 0-.773-.074-1.162-.223a3.814 3.814 0 0 1-1.054-.645zm-3.558-5.21H12V9H7v1.356h2.088V17H9.912v-6.644z"
        />
      </svg>
    );
  }

  // 3. JavaScript (Official Simple Icons badge — exact letterforms)
  if (normalized.includes("javascript") || normalized === "js") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="2" fill={color || "#F7DF1E"} />
        <path
          fill="#000000"
          d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
        />
      </svg>
    );
  }

  // 4. Next.js (Official Black Circle with White 'N' Letterform)
  if (normalized.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="12" fill={color || "#000000"} />
        <path
          d="M14.992 17.485L9.62 10.27v5.992H8.4V7.728h1.248l5.344 7.21V7.728h1.224v9.757h-1.224z"
          fill="#ffffff"
        />
        <path
          d="M17.41 19.14a11.96 11.96 0 0 1-1.65 1.14l-4.14-5.55 1.02-.76 4.77 5.17z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  // 5. Express / Express.js (Official 'ex' brandmark)
  if (normalized.includes("express")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#000000"}>
        <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
      </svg>
    );
  }

  // 6. NestJS / Nest.js (Official ruby shield mark)
  if (normalized.includes("nest")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#E0234E"}>
        <path d="M14.131.047c-.173 0-.334.037-.483.087.316.21.49.49.576.806.007.043.019.074.025.117a.681.681 0 0 1 .013.112c.024.545-.143.614-.26.936-.18.415-.13.861.086 1.22a.74.74 0 0 0 .074.137c-.235-1.568 1.073-1.803 1.314-2.293.019-.428-.334-.713-.613-.911a1.37 1.37 0 0 0-.732-.21zM16.102.4c-.024.143-.006.106-.012.18-.006.05-.006.112-.012.161-.013.05-.025.1-.044.149-.012.05-.03.1-.05.149l-.067.142c-.02.025-.031.05-.05.075l-.037.055a2.152 2.152 0 0 1-.093.124c-.037.038-.068.081-.112.112v.006c-.037.031-.074.068-.118.1-.13.099-.278.173-.415.266-.043.03-.087.056-.124.093a.906.906 0 0 0-.118.099c-.043.037-.074.074-.111.118-.031.037-.068.08-.093.124a1.582 1.582 0 0 0-.087.13c-.025.05-.043.093-.068.142-.019.05-.037.093-.05.143a2.007 2.007 0 0 0-.043.155c-.006.025-.006.056-.012.08-.007.025-.007.05-.013.075 0 .05-.006.105-.006.155 0 .037 0 .074.006.111 0 .05.006.1.019.155.006.05.018.1.03.15.02.049.032.098.05.148.013.03.031.062.044.087l-1.426-.552c-.241-.068-.477-.13-.719-.186l-.39-.093c-.372-.074-.75-.13-1.128-.167-.013 0-.019-.006-.031-.006A11.082 11.082 0 0 0 8.9 2.855c-.378.025-.756.074-1.134.136a12.45 12.45 0 0 0-.837.174l-.279.074c-.092.037-.18.08-.266.118l-.205.093c-.012.006-.024.006-.03.012-.063.031-.118.056-.174.087a2.738 2.738 0 0 0-.236.118c-.043.018-.086.043-.124.062a.559.559 0 0 1-.055.03c-.056.032-.112.063-.162.094a1.56 1.56 0 0 0-.148.093c-.044.03-.087.055-.124.086-.006.007-.013.007-.019.013-.037.025-.08.056-.118.087l-.012.012-.093.074c-.012.007-.025.019-.037.025-.031.025-.062.056-.093.08-.006.013-.019.02-.025.025-.037.038-.074.069-.111.106-.007 0-.007.006-.013.012a1.742 1.742 0 0 0-.111.106c-.007.006-.007.012-.013.012a1.454 1.454 0 0 0-.093.1c-.012.012-.03.024-.043.036a1.374 1.374 0 0 1-.106.112c-.006.012-.018.019-.024.03-.05.05-.093.1-.143.15l-.018.018c-.1.106-.205.211-.317.304-.111.1-.229.192-.347.273a3.777 3.777 0 0 1-.762.421c-.13.056-.267.106-.403.149-.26.056-.527.161-.756.18-.05 0-.105.012-.155.018l-.155.037-.149.056c-.05.019-.099.044-.148.068-.044.031-.093.056-.137.087a1.011 1.011 0 0 0-.124.106c-.043.03-.087.074-.124.111-.037.043-.074.08-.105.124-.031.05-.068.093-.093.143a1.092 1.092 0 0 0-.087.142c-.025.056-.05.106-.068.161-.019.05-.037.106-.056.161-.012.05-.025.1-.03.15 0 .005-.007.012-.007.018-.012.056-.012.13-.019.167C.006 7.95 0 7.986 0 8.03a.657.657 0 0 0 .074.31v.006c.019.037.044.075.069.112.024.037.05.074.08.111.031.031.068.069.106.1a.906.906 0 0 0 .117.099c.149.13.186.173.378.272.031.019.062.031.1.05.006 0 .012.006.018.006 0 .013 0 .019.006.031a1.272 1.272 0 0 0 .08.298c.02.037.032.074.05.111.007.013.013.025.02.031.024.05.049.093.073.137l.093.13c.031.037.069.08.106.118.037.037.074.068.118.105 0 0 .006.006.012.006.037.031.074.062.112.087a.986.986 0 0 0 .136.08c.043.025.093.05.142.069a.73.73 0 0 0 .124.043c.007.006.013.006.025.012.025.007.056.013.08.019-.018.335-.024.65.026.762.055.124.328-.254.6-.688-.036.428-.061.93 0 1.079.069.155.44-.329.763-.862 4.395-1.016 8.405 2.02 8.826 6.31-.08-.67-.905-1.041-1.283-.948-.186.458-.502 1.047-1.01 1.413.043-.41.025-.83-.062-1.24a4.009 4.009 0 0 1-.769 1.562c-.588.043-1.177-.242-1.487-.67-.025-.018-.031-.055-.05-.08-.018-.043-.037-.087-.05-.13a.515.515 0 0 1-.037-.13c-.006-.044-.006-.087-.006-.137v-.093a.992.992 0 0 1 .031-.13c.013-.043.025-.086.044-.13.024-.043.043-.087.074-.13.105-.298.105-.54-.087-.682a.706.706 0 0 0-.118-.062c-.024-.006-.055-.018-.08-.025l-.05-.018a.847.847 0 0 0-.13-.031.472.472 0 0 0-.13-.019 1.01 1.01 0 0 0-.136-.012c-.031 0-.062.006-.093.006a.484.484 0 0 0-.137.019c-.043.006-.086.012-.13.024a1.068 1.068 0 0 0-.13.044c-.043.018-.08.037-.124.056-.037.018-.074.043-.118.062-1.444.942-.582 3.148.403 3.787-.372.068-.75.148-.855.229l-.013.012c.267.161.546.298.837.416.397.13.818.247 1.004.297v.006a5.996 5.996 0 0 0 1.562.112c2.746-.192 4.996-2.281 5.405-5.033l.037.161c.019.112.043.23.056.347v.006c.012.056.018.112.025.162v.024c.006.056.012.112.012.162.006.068.012.136.012.204v.1c0 .03.007.067.007.098 0 .038-.007.075-.007.112v.087c0 .043-.006.08-.006.124 0 .025 0 .05-.006.08 0 .044-.006.087-.006.137-.006.018-.006.037-.006.055l-.02.143c0 .019 0 .037-.005.056-.007.062-.019.118-.025.18v.012l-.037.174v.018l-.037.167c0 .007-.007.02-.007.025a1.663 1.663 0 0 1-.043.168v.018c-.019.062-.037.118-.05.174-.006.006-.006.012-.006.012l-.056.186c-.024.062-.043.118-.068.18-.025.062-.043.124-.068.18-.025.062-.05.117-.074.18h-.007c-.024.055-.05.117-.08.173a.302.302 0 0 1-.019.043c-.006.006-.006.013-.012.019a5.867 5.867 0 0 1-1.742 2.082c-.05.031-.099.069-.149.106-.012.012-.03.018-.043.03a2.603 2.603 0 0 1-.136.094l.018.037h.007l.26-.037h.006c.161-.025.322-.056.483-.087.044-.006.093-.019.137-.031l.087-.019c.043-.006.086-.018.13-.024.037-.013.074-.02.111-.031.62-.15 1.221-.354 1.798-.595a9.926 9.926 0 0 1-3.85 3.142c.714-.05 1.426-.167 2.114-.366a9.903 9.903 0 0 0 5.857-4.68 9.893 9.893 0 0 1-1.667 3.986 9.758 9.758 0 0 0 1.655-1.376 9.824 9.824 0 0 0 2.61-5.268c.21.98.272 1.99.18 2.987 4.474-6.241.371-12.712-1.346-14.416-.006-.013-.012-.019-.012-.031-.006.006-.006.006-.006.012 0-.006 0-.006-.007-.012 0 .074-.006.148-.012.223a8.34 8.34 0 0 1-.062.415c-.03.136-.068.273-.105.41-.044.13-.093.266-.15.396a5.322 5.322 0 0 1-.185.378 4.735 4.735 0 0 1-.477.688c-.093.111-.192.21-.292.31a3.994 3.994 0 0 1-.18.155l-.142.124a3.459 3.459 0 0 1-.347.241 4.295 4.295 0 0 1-.366.211c-.13.062-.26.118-.39.174a4.364 4.364 0 0 1-.818.223c-.143.025-.285.037-.422.05a4.914 4.914 0 0 1-.297.012 4.66 4.66 0 0 1-.422-.025 3.137 3.137 0 0 1-.421-.062 3.136 3.136 0 0 1-.415-.105h-.007c.137-.013.273-.025.41-.05a4.493 4.493 0 0 0 .818-.223c.136-.05.266-.112.39-.174.13-.062.248-.13.372-.204.118-.08.235-.161.347-.248.112-.087.217-.18.316-.279.105-.093.198-.198.291-.304.093-.111.18-.223.26-.334.013-.019.026-.044.038-.062.062-.1.124-.199.18-.298a4.272 4.272 0 0 0 .334-.775c.044-.13.075-.266.106-.403.025-.142.05-.278.062-.415.012-.142.025-.285.025-.421 0-.1-.007-.199-.013-.298a6.726 6.726 0 0 0-.05-.415 4.493 4.493 0 0 0-.092-.415c-.044-.13-.087-.267-.137-.397-.05-.13-.111-.26-.173-.384-.069-.124-.137-.248-.211-.366a6.843 6.843 0 0 0-.248-.34c-.093-.106-.186-.212-.285-.317a3.878 3.878 0 0 0-.161-.155c-.28-.217-.57-.421-.862-.607a1.154 1.154 0 0 0-.124-.062 2.415 2.415 0 0 0-.589-.26Z" />
      </svg>
    );
  }

  // 7. Node.js (Official "N" wordmark from Simple Icons)
  if (normalized.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#5FA04E"}>
        <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.28.28 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68C2.99 6.729 2.936 6.825 2.936 6.921v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L2.28 18.675c-.57-.329-.922-.945-.922-1.604V6.921c0-.659.353-1.275.922-1.603l8.795-5.082c.557-.315 1.296-.315 1.848 0l8.794 5.082c.57.329.924.944.924 1.603v10.15c0 .659-.354 1.273-.924 1.604l-8.794 5.078c-.28.163-.6.247-.922.247zM19.099 13.993c0-1.9-1.284-2.406-3.987-2.763-2.731-.361-3.009-.548-3.009-1.187 0-.528.235-1.233 2.258-1.233 1.807 0 2.473.389 2.747 1.607.024.115.129.199.247.199h1.141c.071 0 .138-.031.186-.081.048-.054.074-.123.064-.195-.322-2.181-1.842-2.853-4.375-2.853-2.33 0-3.666 1.052-3.666 2.682 0 1.758 1.258 2.308 3.961 2.671 2.785.368 3.035.617 3.035 1.267 0 .594-.374 1.305-2.43 1.305-1.939 0-2.675-.443-2.936-1.761-.015-.078-.079-.136-.157-.145l-1.157-.143c-.092-.011-.173.05-.192.141-.269 1.39 1.03 2.923 4.437 2.923 2.475 0 3.743-1.047 3.743-2.775z" />
      </svg>
    );
  }

  // 8. Python (Authentic Two-Tone Blue & Yellow Snake)
  if (normalized.includes("python")) {
    return (
      <svg className={className} viewBox="0 0 24 24">
        <path
          fill={color || "#3776AB"}
          d="M11.917 0C5.666 0 6.02 2.688 6.02 2.688l.007 2.784h5.986v.854H3.72s-3.72-.42-3.72 5.952c0 6.37 3.25 6.136 3.25 6.136h1.94v-2.73s-.105-3.25 3.21-3.25h5.485s3.093.05 3.093-3.003V3.09S17.478 0 11.917 0zM8.98 1.834a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1z"
        />
        <path
          fill={color || "#FFD43B"}
          d="M12.083 24c6.251 0 5.897-2.688 5.897-2.688l-.007-2.784h-5.986v-.854h8.293s3.72.42 3.72-5.952c0-6.37-3.25-6.136-3.25-6.136h-1.94v2.73s.105 3.25-3.21 3.25h-5.485s-3.093-.05-3.093 3.003v6.332s-.494 3.09 5.067 3.09zm2.937-1.834a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z"
        />
      </svg>
    );
  }

  // 9. Prisma ORM
  if (normalized.includes("prisma")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#5A67D8"}>
        <path d="M23.515 17.587L13.918.423a1.44 1.44 0 00-2.484 0L.485 19.986a1.44 1.44 0 001.242 2.134h19.546a1.44 1.44 0 001.242-2.134l-1.077-1.927.077-.472zm-10.84-13.43l7.632 13.666h-15.264l7.632-13.666z" />
      </svg>
    );
  }

  // 10. PostgreSQL (Official Simple Icons — Slonik elephant, clean 24x24)
  if (normalized.includes("postgres") || normalized.includes("psql")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#4169E1"}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.128 0a10.134 10.134 0 0 0-2.755.403l-.063.02A10.922 10.922 0 0 0 12.6.258C11.422.238 10.41.524 9.594 1 8.79.721 7.122.24 5.364.26 4.236.275 3.02.521 2.102 1.329.63 2.606-.1 4.63.013 7.28c.03.675.242 1.398.49 2.144.249.748.567 1.52.753 2.1a.37.37 0 0 0 .02.056c.213.511.455.894.746 1.141.158.136.337.228.537.257.197.028.405-.01.618-.1a.372.372 0 0 0 .157-.133c.345.329.735.502 1.127.603.64.163 1.29.135 1.8.07.195-.025.37-.057.527-.09-.03.21-.056.44-.082.68-.07.637-.13 1.279-.13 1.75 0 .065.005.129.012.192-.023.17-.033.345-.033.52 0 1.3.42 2.401 1.258 3.272.838.87 2.047 1.455 3.566 1.743C12 23.878 13.22 24 14.418 24c.966 0 1.845-.085 2.563-.224 1.185-.23 2.136-.643 2.786-1.273.65-.63.985-1.455.985-2.44 0-.062-.002-.131-.005-.205.146-.047.282-.1.407-.16.68-.332 1.102-.862 1.102-1.574v-.012c-.007-.622-.32-1.102-.782-1.414l.013-.013c.42-.498.94-1.361.94-2.885 0-.868-.23-1.59-.568-2.207.249-.405.42-.865.52-1.388.17-.9.096-1.843-.023-2.728l-.024-.165-.05-.316a9.167 9.167 0 0 0-.639-2.195C20.738 2.961 19.498.471 17.128 0zM13.012 23.14c-1.072 0-2.188-.11-3.14-.33-1.337-.317-2.388-.847-3.095-1.59-.707-.742-1.052-1.705-1.052-2.885 0-.182.013-.37.038-.558.282.126.618.238 1.014.33a9.709 9.709 0 0 0 2.088.218c.428 0 .86-.03 1.278-.085.1.244.242.47.43.665.586.614 1.473.937 2.63.937.566 0 1.19-.069 1.814-.22.624-.152 1.218-.417 1.715-.815.028.188.043.372.043.549 0 1.07-.315 1.84-.981 2.33-.688.504-1.74.769-3.182.769l.4.685zm5.027-10.502c.077.391.117.802.117 1.233 0 1.524-.524 2.07-.744 2.228-.375-.11-.8-.195-1.258-.25a19.924 19.924 0 0 0-.612-.06 1.726 1.726 0 0 0-.112-.355 2.29 2.29 0 0 0-.305-.516l-.012-.018c-.106-.146-.224-.286-.353-.42.3-.046.598-.102.878-.17.994-.243 1.802-.645 2.401-1.672zm-9.471 1.993c.37-.067.737-.113 1.096-.133-.113.264-.176.566-.176.892 0 .395.082.746.233 1.057a4.2 4.2 0 0 0-.535-.033c-1.287 0-2.33-.452-3.07-1.172-.123-.119-.235-.244-.336-.375.277.04.56.08.846.108a19.37 19.37 0 0 0 1.942.056zm4.25 2.858c-.638 0-1.102-.16-1.414-.49-.312-.33-.452-.773-.452-1.37 0-.64.172-1.114.504-1.428.33-.312.84-.48 1.542-.48.665 0 1.228.147 1.573.432.346.284.517.74.517 1.476 0 .647-.19 1.11-.558 1.4-.368.287-.888.46-1.713.46zm7.25-10.818c.049.397.072.814.055 1.224-.03.73-.17 1.408-.48 1.924a2.818 2.818 0 0 0-.278-.453c-.225-.303-.516-.563-.855-.794.038-.086.073-.173.104-.261.244-.704.293-1.312.277-1.782a4.2 4.2 0 0 0-.013-.197c.071.067.142.14.21.218.308.343.566.75.753 1.185l.228-.064zM7.044 6.5c.095-.07.192-.137.293-.2 1.003-.625 2.286-.905 3.65-.802.247.019.49.05.726.093a3.555 3.555 0 0 0-.6.63c-.24.33-.41.714-.49 1.14a5.655 5.655 0 0 0-.8-.22 5.19 5.19 0 0 0-1.555-.07c-.46.05-.914.17-1.333.37a3.57 3.57 0 0 1 .109-1.14zm-1.638 7.072c-.363-.48-.618-.985-.748-1.411-.25-.82-.297-1.57-.195-2.237.072-.482.236-.914.476-1.258.238-.343.556-.613.952-.793a3.966 3.966 0 0 1 1.624-.318c.634 0 1.287.136 1.886.397a4.9 4.9 0 0 1 1.517 1.065 4.513 4.513 0 0 1 .98 1.72c.197.657.237 1.396.085 2.153-.106.52-.3.964-.562 1.33-.516-.19-1.11-.362-1.771-.498-.656-.135-1.24-.198-1.713-.198-.627 0-1.19.095-1.667.274a4.3 4.3 0 0 1-.865-.225zm12.04-2.012c.071.455.065.925-.022 1.374-.093.481-.277.887-.538 1.19a3.63 3.63 0 0 0-.993-1.054 5.712 5.712 0 0 0-1.49-.737c.065-.293.082-.6.047-.915a3.983 3.983 0 0 0-.225-.893c.42.213.787.46 1.096.735.496.439.84.933 1.049 1.46l.076-.16zm-7.59-6.9c.168-.134.35-.25.546-.345.546-.264 1.141-.363 1.72-.29.286.036.548.12.774.248a3.14 3.14 0 0 1 .555.398 3.03 3.03 0 0 1 .605.903c.148.339.237.72.237 1.14v.015c0 .307-.047.6-.141.876a3.52 3.52 0 0 1-.395.787c-.376-.26-.813-.48-1.303-.643a7.59 7.59 0 0 0-1.698-.326 7.137 7.137 0 0 0-1.78.07 5.33 5.33 0 0 0-.724.19 3.517 3.517 0 0 1 .05-1.027c.095-.48.283-.9.555-1.228.1-.12.21-.23.333-.325l-.334-.643z"
        />
      </svg>
    );
  }

  // 11. SQL
  if (normalized.includes("sql")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#00758F"}>
        <path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 2c4.42 0 8 1.57 8 3s-3.58 3-8 3-8-1.57-8-3 3.58-3 8-3zm0 16c-4.42 0-8-1.57-8-3v-2.2c1.78 1.34 4.7 2.2 8 2.2s6.22-.86 8-2.2V17c0 1.43-3.58 3-8 3zm0-5c-4.42 0-8-1.57-8-3v-2.2c1.78 1.34 4.7 2.2 8 2.2s6.22-.86 8-2.2V12c0 1.43-3.58 3-8 3z" />
      </svg>
    );
  }

  // 11. MongoDB
  if (normalized.includes("mongo")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={brand}>
        <path d="M17.193 9.555c-1.264-5.38-4.708-8.28-4.87-8.413a.62.62 0 00-.646 0C11.515 1.275 8.07 4.175 6.807 9.555c-1.396 5.942.868 10.978 4.708 13.111a.63.63 0 00.97-.282c.404-1.631.597-4.118.597-4.118s.226 2.487.63 4.118a.63.63 0 00.97.282c3.84-2.133 6.104-7.169 4.708-13.111zM12 16.592c-.226 0-.824-3.116-.824-6.398 0-3.282.824-6.398.824-6.398s.824 3.116.824 6.398c0 3.282-.6 6.398-.824 6.398z" />
      </svg>
    );
  }

  // 12. Redis
  if (normalized.includes("redis")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={brand}>
        <path d="M21.848 7.375L12.54.081a1.075 1.075 0 00-1.08 0L2.152 7.375A1.076 1.076 0 001.6 8.318v8.364c0 .387.21.742.552.943l9.308 7.294a1.075 1.075 0 001.08 0l9.308-7.294a1.076 1.076 0 00.552-.943V8.318a1.076 1.076 0 00-.552-.943zM12 2.213l7.636 5.983L12 14.18 4.364 8.196 12 2.213zm-8.4 7.644l7.4 5.798v7.412L3.6 17.269V9.857zm16.8 7.412l-7.4 5.798v-7.412l7.4-5.798v7.412z" />
      </svg>
    );
  }

  // 13. Docker (Official Whale & Containers Mark)
  if (normalized.includes("docker")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#2496ED"}>
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.955 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.145a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.93 0h2.12a.187.187 0 00.184-.186V6.29a.185.185 0 00-.185-.185H2.215a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m11.77 0h2.119a.186.186 0 00.186-.186V6.29a.185.185 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-8.84 2.714h2.12a.186.186 0 00.184-.186V9.006a.185.185 0 00-.185-.186H5.145a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m2.955 0h2.12a.186.186 0 00.184-.186V9.006a.185.185 0 00-.185-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m2.954 0h2.118a.187.187 0 00.186-.186V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m10.825-1.077c-.413-.263-1.326-.398-2.32-.095-.316-.763-.988-1.37-1.92-1.743l-.391-.151-.25.334c-.404.541-.639 1.208-.676 1.912-.43.15-.813.345-1.124.582-.294.225-.494.506-.596.837H.186A.186.186 0 000 12.062c.074 1.233.402 2.37.957 3.328.708 1.218 1.745 2.155 3.003 2.71 1.26.554 2.748.775 4.305.638 1.488-.13 3.01-.655 4.402-1.52.887-.55 1.706-1.24 2.433-2.052.866-.967 1.54-2.114 1.954-3.32.742.14 1.48.066 2.072-.212.793-.374 1.344-1.01 1.55-1.79.055-.21-.052-.416-.248-.484z" />
      </svg>
    );
  }

  // 14. Git / GitHub (Official Git Branch Mark)
  if (normalized.includes("git")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#F05032"}>
        <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.125 0L8.835 2.56a1.5 1.5 0 0 0 0 2.125l2.107 2.108L4.62 13.116a1.5 1.5 0 0 0 0 2.124l8.32 8.32a1.5 1.5 0 0 0 2.124 0l8.482-8.482a1.5 1.5 0 0 0 0-2.148zm-10.48 8.423a2.25 2.25 0 0 1-2.92-2.123c0-.68.307-1.314.832-1.74l-2.073-2.072a2.247 2.247 0 0 1-1.424.512 2.25 2.25 0 1 1 2.25-2.25c0 .484-.155.932-.418 1.303l2.008 2.007a2.247 2.247 0 0 1 1.745-.832 2.25 2.25 0 1 1 0 4.5z" />
      </svg>
    );
  }

  // 15. AWS / Cloud (Official Amazon Web Services Mark)
  if (normalized.includes("aws") || normalized.includes("ec2") || normalized.includes("s3")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#FF9900"}>
        <path d="M19.04 14.93c-2.73 2.01-6.7 3.09-10.1 3.09-4.78 0-9.09-1.78-12.35-4.76-.26-.24-.03-.56.28-.38 3.53 2.05 7.84 3.28 12.33 3.28 3.02 0 6.57-.76 9.77-2.34.48-.24.87.35.07.71v.4zm1.26-1.15c-.35-.45-2.29-.21-3.17-.11-.27.03-.31-.19-.07-.35 1.55-1.1 4.1-.78 4.41-.39.31.4-.82 2.94-2.29 4.14-.23.19-.44.09-.34-.16.33-.8 1.81-2.68 1.46-3.13z" />
      </svg>
    );
  }

  // 16. Nginx
  if (normalized.includes("nginx")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#009639"}>
        <path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm5.2 16.5l-2.4-3.5v3.5h-2.1V7.5h2.1l2.4 3.5V7.5h2.1v9h-2.1zM9.3 16.5H7.2V7.5h2.1v9z" />
      </svg>
    );
  }

  // 17. PM2 (Official Simple Icons stacked-trapezoids mark)
  if (normalized.includes("pm2")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#2B037A"}>
        <path d="M10.43 3.223c-.83 1.386-.906 1.499-1.21 2.223h4.56c-.304-.724-.38-.837-1.21-2.223-.701-1.171-1.265-1.121-2.14 0zM5.385 5.539c-.93 1.552-1.268 2.378-1.748 3.511h13.726c-.48-1.133-.818-1.959-1.748-3.511-.837-1.396-1.428-1.537-2.525-1.539H7.91c-1.097.002-1.688.143-2.525 1.539zM2.083 10.74c-.604 1.424-.962 2.658-1.385 4.175h22.604c-.423-1.517-.781-2.751-1.385-4.175-.487-1.148-1.162-1.54-2.42-1.54H4.503c-1.258 0-1.933.392-2.42 1.54zM0 16.993c.394 1.43.754 2.894 1.155 4.314.39 1.383 1.096 1.47 2.457 1.47h15.776c1.361 0 2.067-.087 2.457-1.47.401-1.42.761-2.884 1.155-4.314z" />
      </svg>
    );
  }

  // 18. Tailwind CSS
  if (normalized.includes("tailwind")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={brand}>
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
      </svg>
    );
  }

  // 19. GraphQL (Official Simple Icons — stylised hexagonal star)
  if (normalized.includes("graphql")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#E10098"}>
        <path d="M12.001 2.085L2.001 7.671v11.172l10 5.586 10-5.586V7.671l-10-5.586zM3.501 8.521l8.5-4.75 8.5 4.75v9.5l-8.5 4.75-8.5-4.75v-9.5zm8.5 1.73a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5zM6.751 7.771a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm10.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM6.751 13.271a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm10.5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12.001 16.271a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12.001 4.771a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
      </svg>
    );
  }

  // 20. REST / APIs
  if (normalized.includes("rest") || normalized.includes("api")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={brand}>
        <path d="M4 6h16a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm0 8h16a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 012-2zm2-6v2h2V8H6zm0 8v2h2v-2H6z" />
      </svg>
    );
  }

  // 21. Linux
  if (normalized.includes("linux") || normalized.includes("ubuntu")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#FCC624"}>
        <path d="M12.002 0c-3.15 0-5.71 2.56-5.71 5.71v.79C4.85 7.4 3.75 9.07 3.75 11c0 1.25.46 2.4 1.22 3.28-.24.72-.4 1.5-.47 2.32-.12 1.42.15 2.83.78 4.07.24.47.7.77 1.23.81 1.05.07 2.16-.31 3.1-1.07 1.4.38 2.87.38 4.27 0 .94.76 2.05 1.14 3.1 1.07.53-.04.99-.34 1.23-.81.63-1.24.9-2.65.78-4.07-.07-.82-.23-1.6-.47-2.32.76-.88 1.22-2.03 1.22-3.28 0-1.93-1.1-3.6-2.54-4.5v-.79C17.712 2.56 15.152 0 12.002 0zm-2.01 4.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zm4.02 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z" />
      </svg>
    );
  }

  // 22. Figma (Official Simple Icons — 24x24 interlocking circles/squares mark)
  if (normalized.includes("figma")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#F24E1E"}>
        <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zM4 20a4 4 0 0 1 4-4h4v4a4 4 0 1 1-8 0zM12 0v8h4a4 4 0 1 0 0-8h-4zM4 4a4 4 0 0 0 4 4h4V0H8a4 4 0 0 0-4 4zM4 12a4 4 0 0 0 4 4h4V8H8a4 4 0 0 0-4 4z" />
      </svg>
    );
  }

  // 23. Unknown — return null so the caller (TechIconImage) can try CDN or show monogram
  return null;
}

/**
 * CDN-first icon resolver.
 * Always tries the Simple Icons CDN first (official, always up-to-date).
 * Falls back to the bundled inline SVG if CDN is unreachable.
 * Falls back to a monogram pill as a last resort.
 * Use this everywhere in templates and UI components.
 */
export function getTechIcon(
  name: string,
  className: string = "h-3.5 w-3.5",
  color?: string
): React.ReactNode {
  return (
    <TechIconImage
      name={name}
      className={className}
      color={color || getTechBrandColor(name)}
    />
  );
}

interface SkillItemRendererProps {
  name: string;
  rating?: number; // 1-5 or 20-100
  style?: "pills" | "bars" | "stars" | "dots" | "text";
  bulletStyle?: "dot" | "dash" | "list" | "none" | "check" | "pipe";
  showIcon?: boolean;
  primaryColor?: string;
  primaryLightColor?: string;
  borderColor?: string;
  textColor?: string;
}

export const SkillItemRenderer: React.FC<SkillItemRendererProps> = ({
  name,
  rating = 4, // Default 4 stars or 80%
  style = "pills",
  bulletStyle = "dot",
  showIcon = true,
  primaryColor = "#1e3a8a",
  primaryLightColor = "#eff6ff",
  borderColor = "#cbd5e1",
  textColor,
}) => {
  // Normalize rating between 1 and 5
  const starsCount = rating > 5 ? Math.round((rating / 100) * 5) : Math.max(1, Math.min(5, rating));
  const percentage = rating <= 5 ? rating * 20 : Math.max(20, Math.min(100, rating));
  const textClass = textColor ? "" : "text-slate-800";

  // 1. Bar Chart / Progress Meter
  if (style === "bars") {
    return (
      <div className="w-full space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span
            className={`flex items-center gap-1.5 font-medium ${textClass}`}
            style={{ color: textColor }}
          >
            {showIcon && getTechIcon(name, "h-3.5 w-3.5", textColor)}
            <span>{name}</span>
          </span>
          <span
            className="font-mono text-[10px] font-semibold opacity-75"
            style={{ color: textColor || "#94a3b8" }}
          >
            {percentage}%
          </span>
        </div>
        <div
          className="h-1.5 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: primaryLightColor || "rgba(255, 255, 255, 0.15)" }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${percentage}%`, backgroundColor: primaryColor }}
          />
        </div>
      </div>
    );
  }

  // 2. 5-Star Rating
  if (style === "stars") {
    return (
      <div
        className="flex items-center justify-between gap-2 p-1.5 rounded-lg border text-xs"
        style={{
          borderColor: borderColor || "rgba(255, 255, 255, 0.2)",
          backgroundColor: primaryLightColor || "rgba(255, 255, 255, 0.05)",
        }}
      >
        <span
          className={`flex items-center gap-1.5 font-medium ${textClass}`}
          style={{ color: textColor }}
        >
          {showIcon && getTechIcon(name, "h-3.5 w-3.5", textColor)}
          <span>{name}</span>
        </span>
        <div className="flex items-center gap-0.5 text-xs select-none">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{ color: star <= starsCount ? primaryColor : "rgba(255, 255, 255, 0.3)" }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    );
  }

  // 3. Dot Meter
  if (style === "dots") {
    return (
      <div
        className="flex items-center justify-between gap-2 p-1.5 rounded-lg border text-xs"
        style={{
          borderColor: borderColor || "rgba(255, 255, 255, 0.2)",
          backgroundColor: primaryLightColor || "rgba(255, 255, 255, 0.05)",
        }}
      >
        <span
          className={`flex items-center gap-1.5 font-medium ${textClass}`}
          style={{ color: textColor }}
        >
          {showIcon && getTechIcon(name, "h-3.5 w-3.5", textColor)}
          <span>{name}</span>
        </span>
        <div className="flex items-center gap-1 select-none">
          {[1, 2, 3, 4, 5].map((dot) => (
            <span
              key={dot}
              className="w-2 h-2 rounded-full inline-block"
              style={{
                backgroundColor: dot <= starsCount ? primaryColor : "rgba(255, 255, 255, 0.3)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // 4. Clean Minimalist Text
  if (style === "text") {
    let bulletSymbol: React.ReactNode = null;
    if (bulletStyle === "dot") bulletSymbol = <span className="opacity-60">•</span>;
    else if (bulletStyle === "dash") bulletSymbol = <span className="opacity-60">–</span>;
    else if (bulletStyle === "check") bulletSymbol = <span className="text-emerald-600 font-bold text-[11px]">✓</span>;
    else if (bulletStyle === "pipe") bulletSymbol = <span className="opacity-40">|</span>;
    else if (bulletStyle === "list") bulletSymbol = <span className="w-1.5 h-1.5 rounded-xs bg-current inline-block opacity-75" />;

    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs ${textClass}`}
        style={{ color: textColor }}
      >
        {bulletSymbol}
        {showIcon && getTechIcon(name, "h-3.5 w-3.5", textColor)}
        <span>{name}</span>
      </span>
    );
  }

  // 5. Default Pill Badges
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border shadow-2xs"
      style={{
        backgroundColor: primaryLightColor,
        borderColor: borderColor,
        color: primaryColor,
      }}
    >
      {showIcon && getTechIcon(name, "h-3.5 w-3.5", primaryColor || textColor)}
      <span>{name}</span>
    </span>
  );
};
