import React from "react";

export const LinkedinIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = "h-4 w-4",
  style,
}) => (
  <svg
    className={className}
    style={style}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const GithubIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = "h-4 w-4",
  style,
}) => (
  <svg
    className={className}
    style={style}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const FacebookIcon: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = "h-4 w-4",
  style,
}) => (
  <svg
    className={className}
    style={style}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

import {
  Trophy,
  BookOpen,
  Cpu,
  Film,
  Compass,
  Gamepad2,
  Music,
  Code2,
  Palette,
  Coffee,
  Sparkles,
  Activity,
  Heart,
  Camera,
  Plane,
} from "lucide-react";

export type HobbyIconComponentType = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

export const getHobbyIconComponent = (name: string): HobbyIconComponentType => {
  const n = (name || "").toLowerCase().trim();
  if (
    n.includes("sport") ||
    n.includes("fitness") ||
    n.includes("gym") ||
    n.includes("run") ||
    n.includes("football") ||
    n.includes("soccer") ||
    n.includes("badminton") ||
    n.includes("workout")
  ) {
    return Trophy;
  }
  if (
    n.includes("learn") ||
    n.includes("study") ||
    n.includes("read") ||
    n.includes("book") ||
    n.includes("education")
  ) {
    return BookOpen;
  }
  if (
    n.includes("ai") ||
    n.includes("research") ||
    n.includes("machine") ||
    n.includes("data") ||
    n.includes("robot") ||
    n.includes("deep") ||
    n.includes("intel")
  ) {
    return Cpu;
  }
  if (
    n.includes("edit") ||
    n.includes("video") ||
    n.includes("film") ||
    n.includes("photo") ||
    n.includes("media") ||
    n.includes("photoshop") ||
    n.includes("premiere")
  ) {
    return Film;
  }
  if (
    n.includes("travel") ||
    n.includes("trip") ||
    n.includes("explore") ||
    n.includes("flight") ||
    n.includes("adventure") ||
    n.includes("hiking")
  ) {
    return Compass;
  }
  if (
    n.includes("game") ||
    n.includes("gaming") ||
    n.includes("play") ||
    n.includes("esport") ||
    n.includes("steam")
  ) {
    return Gamepad2;
  }
  if (n.includes("music") || n.includes("song") || n.includes("audio") || n.includes("guitar")) {
    return Music;
  }
  if (n.includes("code") || n.includes("program") || n.includes("dev")) {
    return Code2;
  }
  if (n.includes("art") || n.includes("draw") || n.includes("paint") || n.includes("design")) {
    return Palette;
  }
  if (n.includes("coffee") || n.includes("tea") || n.includes("cafe")) {
    return Coffee;
  }
  if (n.includes("photo") || n.includes("camera")) {
    return Camera;
  }
  if (n.includes("flight") || n.includes("plane")) {
    return Plane;
  }
  if (n.includes("health") || n.includes("care") || n.includes("life")) {
    return Heart;
  }
  return Sparkles;
};

