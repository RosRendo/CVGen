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
  if (clean.includes("supabase")) return "supabase";
  if (clean.includes("firebase")) return "firebase";
  if (clean.includes("kubernetes") || clean.includes("k8s")) return "kubernetes";
  if (clean.includes("stripe")) return "stripe";

  return clean;
}

/**
 * Internet Icon component that loads official SVG branding directly from Simple Icons CDN
 * with automatic fallback to monogram pill if offline or not found.
 */
export const TechIconImage: React.FC<{
  name: string;
  className?: string;
  color?: string;
}> = ({ name, className = "h-3.5 w-3.5", color }) => {
  const [error, setError] = React.useState(false);
  const slug = getTechSlug(name);

  if (error || !slug) {
    return (
      <span className="font-mono text-[9px] font-bold px-1 rounded bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-white/80 shrink-0 select-none">
        {name.slice(0, 3).toUpperCase()}
      </span>
    );
  }

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
      loading="lazy"
      onError={() => setError(true)}
    />
  );
};

/**
 * Official Brand Color Palette for Developer Technologies
 */
export function getTechBrandColor(name: string): string {
  const n = name.toLowerCase().replace(/[\s\.\-_/]/g, "");
  if (n.includes("react")) return "#61DAFB";
  if (n.includes("typescript") || n === "ts") return "#3178C6";
  if (n.includes("javascript") || n === "js") return "#F7DF1E";
  if (n.includes("next")) return "#FFFFFF";
  if (n.includes("tailwind")) return "#06B6D4";
  if (n.includes("node")) return "#5FA04E";
  if (n.includes("nest")) return "#E0234E";
  if (n.includes("express")) return "#FFFFFF";
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
  if (n.includes("pm2")) return "#9933FF";
  if (n.includes("figma")) return "#F24E1E";
  if (n.includes("graphql")) return "#E10098";
  if (n.includes("git") || n.includes("github")) return "#F05032";
  if (n.includes("java")) return "#ED8B00";
  if (n.includes("html")) return "#E34F26";
  if (n.includes("css")) return "#1572B6";
  return "#c59837";
}

export function getTechIcon(
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

  // 2. TypeScript (Official Blue Badge)
  if (normalized.includes("typescript") || normalized === "ts") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3.5" fill={color || "#3178C6"} />
        <path
          d="M11.75 13.5H8.75V20.25H6.25V13.5H2.75V11.25H11.75V13.5ZM15.85 20.44C14.25 20.44 12.95 20.05 11.95 19.28L13.1 17.25C13.88 17.85 14.8 18.25 15.8 18.25C16.65 18.25 17.15 17.9 17.15 17.3C17.15 16.75 16.7 16.45 15.35 15.95C13.5 15.3 12.35 14.5 12.35 12.8C12.35 11.2 13.6 10.05 15.5 10.05C16.85 10.05 18.05 10.45 18.9 11.05L17.85 13C17.1 12.5 16.3 12.2 15.5 12.2C14.75 12.2 14.35 12.55 14.35 13.05C14.35 13.55 14.7 13.8 16.1 14.35C18.05 15.05 19.15 15.85 19.15 17.5C19.15 19.3 17.75 20.44 15.85 20.44Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 3. JavaScript (Official Yellow Badge)
  if (normalized.includes("javascript") || normalized === "js") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="3.5" fill={color || "#F7DF1E"} />
        <path
          d="M6.5 17.2c0 1.2.9 2 2.2 2 1.2 0 2-.8 2-2V11H8.7v6.2c0 .3-.2.5-.5.5s-.5-.2-.5-.5V13H6.5v4.2zm6.7.7c.6.4 1.3.6 2 .6 1.1 0 1.7-.5 1.7-1.2 0-.8-.5-1.1-1.5-1.5l-.5-.2c-1.3-.5-2.2-1.2-2.2-2.4 0-1.4 1.1-2.4 2.7-2.4.8 0 1.6.2 2.2.6l-.6 1.4c-.5-.3-1-.5-1.6-.5-.7 0-1.2.4-1.2 1 0 .6.4.9 1.3 1.3l.5.2c1.4.6 2.3 1.2 2.3 2.5 0 1.5-1.1 2.5-2.9 2.5-.9 0-1.8-.3-2.5-.7l.6-1.5z"
          fill="#000000"
        />
      </svg>
    );
  }

  // 4. Next.js
  if (normalized.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="11" fill="#000000" stroke={color || "#FFFFFF"} strokeWidth="1" />
        <path d="M15.5 16.5L9 8h-1.5v8h1.6v-5.6l6 7.6c.15-.09.3-.18.4-.28v-.22z" fill="#FFFFFF" />
        <rect x="14" y="8" width="1.6" height="5.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 5. Express / Express.js
  if (normalized.includes("express")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#FFFFFF"}>
        <path d="M12.262 16.666h1.146l6.975-9.325H19.22zm9.778 1.441v.004l-4.334-5.706-.557.74 4.873 6.682H.945V4.173h9.505l5.026 6.7.574-.772-4.374-5.928h.003l-.719-.945H0v17.544h24zM10.917 8.705a3.8 3.8 0 0 0-1.292-1.183q-.796-.45-1.916-.45c-.746 0-1.37.14-1.906.424a3.76 3.76 0 0 0-1.31 1.12 4.9 4.9 0 0 0-.75 1.581 7.17 7.17 0 0 0 0 3.696c.148.567.402 1.101.75 1.573a3.5 3.5 0 0 0 1.31 1.066q.803.39 1.906.389 1.77 0 2.739-.868.966-.867 1.328-2.457h-1.139q-.271 1.084-.977 1.734-.704.651-1.952.65-.812 0-1.392-.342a3.1 3.1 0 0 1-.957-.869 3.5 3.5 0 0 1-.551-1.182 5 5 0 0 1-.17-1.133 9 9 0 0 0-.015-.286 4.5 4.5 0 0 1 .015-.829c.047-.418.147-.83.296-1.223A3.7 3.7 0 0 1 5.54 9.05a2.9 2.9 0 0 1 .922-.742q.541-.28 1.246-.28c.47 0 .869.093 1.23.28q.541.281.922.742.379.461.587 1.057t.225 1.246H5.625l.004.957h6.182a7.3 7.3 0 0 0-.18-1.924 4.9 4.9 0 0 0-.715-1.68z" />
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

  // 7. Node.js
  if (normalized.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 32 32" fill={color || "#5FA04E"}>
        <path d="M16 2.5L3 10v12l13 7.5 13-7.5V10L16 2.5zm10.5 18L16 26.5 5.5 20.5V11.5L16 5.5l10.5 6v9z" />
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

  // 10. PostgreSQL (Official Elephant Mark)
  if (normalized.includes("postgres") || normalized.includes("psql")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#4169E1"}>
        <path d="M11.996 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 11.996 0zm5.66 6.79c.47.01.91.22 1.22.58.62.74.56 1.84-.13 2.51l-.22.21c.21.64.29 1.32.22 2.01-.15 1.48-.97 2.8-2.22 3.59-.28.18-.58.32-.89.44-.04.22-.11.43-.2.64l.97.97c.42.42.42 1.11 0 1.53-.42.42-1.11.42-1.53 0l-.82-.82c-.67.33-1.42.52-2.22.53-.28 0-.55-.03-.82-.07l-.46.77c-.32.53-.99.73-1.53.44-.54-.29-.75-.95-.47-1.49l.48-.82c-.79-.37-1.46-.94-1.93-1.66-.99-1.51-1.1-3.41-.31-5.02.16-.33.36-.64.6-.92l-.51-.51a1.08 1.08 0 0 1 0-1.53c.42-.42 1.11-.42 1.53 0l.47.47c.72-.45 1.54-.73 2.41-.81.33-.03.66-.03.99 0 .25-.33.64-.54 1.08-.55zm-.21 1.79c-.24 0-.44.15-.5.37-.17.65-.54 1.22-1.04 1.64-.4.34-.89.56-1.41.65-.21.04-.37.21-.38.43-.01.21.13.41.34.47.78.22 1.62.16 2.37-.17.61-.27 1.13-.71 1.5-1.27.17-.26.17-.6-.02-.85a.99.99 0 0 0-.86-.27z" />
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

  // 17. PM2
  if (normalized.includes("pm2")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#9933FF"}>
        <path d="M2 5h10a5 5 0 015 5 5 5 0 01-5 5H6v4H2V5zm4 6h6a1 1 0 001-1 1 1 0 00-1-1H6v2zm13 8h3v-8h-3v8z" />
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

  // 19. GraphQL
  if (normalized.includes("graphql")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill={color || "#E10098"}>
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2zm0 2.31L5.34 8.15v7.7L12 19.69l6.66-3.85v-7.7L12 4.31zM12 7a2 2 0 110 4 2 2 0 010-4zm-4.33 7.5a2 2 0 110 4 2 2 0 010-4zm8.66 0a2 2 0 110 4 2 2 0 010-4z" />
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

  // 22. Figma
  if (normalized.includes("figma")) {
    return (
      <svg className={className} viewBox="0 0 38 57" fill={brand}>
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0zM0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0zM0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5zM0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5zM19 0h9.5a9.5 9.5 0 1 1 0 19H19V0z" />
      </svg>
    );
  }

  // 23. Dynamic Internet CDN Resolver (Simple Icons) for ANY other technology
  return <TechIconImage name={name} className={className} color={color || getTechBrandColor(name)} />;
}

interface SkillItemRendererProps {
  name: string;
  rating?: number; // 1-5 or 20-100
  style?: "pills" | "bars" | "stars" | "dots" | "text";
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
    return (
      <span
        className={`inline-flex items-center gap-1 text-xs ${textClass}`}
        style={{ color: textColor }}
      >
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
