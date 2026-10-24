"use client";

import React, { useState, useRef, useSyncExternalStore } from "react";
import { CVData, TemplateId } from "@/lib/types/cv";
import { ROS_RENDO_CV, SOKHA_CHAN_CV } from "@/lib/constants/sample-data";
import { TEMPLATES_CONFIG } from "@/lib/constants/themes";
import { BuilderHeader } from "./BuilderHeader";
import { PersonalInfoSection } from "./PersonalInfoSection";
import { ExperienceSection } from "./ExperienceSection";
import { EducationSection } from "./EducationSection";
import { SkillsSection } from "./SkillsSection";
import { ProjectsSection } from "./ProjectsSection";
import { AdditionalSection } from "./AdditionalSection";
import { AITailorModal } from "./AITailorModal";
import { CVRenderer } from "../templates/CVRenderer";
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  Eye,
  Edit3,
} from "lucide-react";

const STORAGE_KEY = "cvgen_active_draft_v1";

const emptySubscribe = () => () => {};

type SectionTab = "personal" | "experience" | "education" | "skills" | "projects" | "additional";

const SECTIONS: { id: SectionTab; label: string; icon: React.ElementType }[] = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills & Languages", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "additional", label: "Certifications", icon: Award },
];

export const BuilderLayout: React.FC = () => {
  const isLoaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [data, setData] = useState<CVData>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (
            (parsed?.id === "sample-ros-rendo" || parsed?.personalInfo?.fullName === "ROS RENDO") &&
            !parsed?.personalInfo?.photoUrl
          ) {
            parsed.personalInfo.photoUrl = "/images/ros-rendo.png";
          }

          // Auto-migrate any cached projects holding "Trading" to TechTune Healer
          if (Array.isArray(parsed?.projects)) {
            let changed = false;
            parsed.projects = parsed.projects.map((proj: any) => {
              if (proj.name && proj.name.toLowerCase().includes("trading")) {
                changed = true;
                const fresh = ROS_RENDO_CV.projects.find((p) => p.name.includes("TechTune"));
                return fresh
                  ? { ...fresh, id: proj.id }
                  : {
                      ...proj,
                      name: "TechTune Healer — System Diagnostics & Performance Optimization",
                      description:
                        "Developing a system diagnostics and optimization utility designed to monitor hardware health, automate system troubleshooting, and perform performance tuning. Built diagnostic routines for memory management, startup optimization, and process inspection. Integrated automated health-check scripts and visual performance metrics to detect system bottlenecks and streamline maintenance workflows.",
                      technologies: ["TypeScript", "Node.js", "React", "Next.js", "Tailwind CSS", "Python"],
                      githubUrl: "https://github.com/ROS-RENDO/techtune-healer",
                    };
              }
              return proj;
            });
            if (changed) {
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
              } catch (_) {}
            }
          }

          return parsed;
        }
      } catch (e) {
        console.warn("Failed to read draft from localStorage:", e);
      }
    }
    return ROS_RENDO_CV;
  });

  const [activeTab, setActiveTab] = useState<SectionTab>("personal");
  const [activeMobileTab, setActiveMobileTab] = useState<"edit" | "preview">("edit");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [zoom, setZoom] = useState(0.85);
  const [isTailorOpen, setIsTailorOpen] = useState(false);

  // Detect ?template=... or ?preset=... query parameters from URL & ensure migration
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const presetParam = params.get("preset");
      const tplParam = params.get("template") as TemplateId | null;

      if (presetParam === "rendo") {
        setData(ROS_RENDO_CV);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(ROS_RENDO_CV));
        } catch (_) {}
        return;
      }

      setData((prev) => {
        let updated = prev;
        if (tplParam && TEMPLATES_CONFIG.some((t) => t.id === tplParam)) {
          updated = {
            ...updated,
            settings: {
              ...updated.settings,
              templateId: tplParam,
            },
          };
        }

        // Migrate any project holding trading
        if (Array.isArray(updated.projects)) {
          const hasTrading = updated.projects.some((p) => p.name?.toLowerCase().includes("trading"));
          if (hasTrading) {
            const fresh = ROS_RENDO_CV.projects.find((p) => p.name.includes("TechTune"));
            const nextProjects = updated.projects.map((p) =>
              p.name?.toLowerCase().includes("trading")
                ? fresh
                  ? { ...fresh, id: p.id }
                  : p
                : p
            );
            updated = { ...updated, projects: nextProjects };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            } catch (_) {}
          }
        }

        return updated;
      });
    }
  }, []);

  // Debounced auto-save to localStorage
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDataChange = (newData: CVData) => {
    setData(newData);
    setSaveStatus("saving");

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
        setSaveStatus("saved");
      } catch (err) {
        console.error("Autosave error:", err);
        setSaveStatus("unsaved");
      }
    }, 600);
  };

  const handleApplyTailoredSummary = (newSummary: string) => {
    handleDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        summary: newSummary,
      },
    });
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading CV Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* Builder Top Navigation Bar */}
      <BuilderHeader
        data={data}
        onChange={handleDataChange}
        saveStatus={saveStatus}
        onOpenTailorModal={() => setIsTailorOpen(true)}
        activeMobileTab={activeMobileTab}
        onTabChange={setActiveMobileTab}
        zoom={zoom}
        onZoomChange={setZoom}
      />

      {/* Main 2-Panel Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Form Sections */}
        <div
          className={`w-full lg:w-[48%] xl:w-[45%] flex flex-col bg-white border-r border-slate-200 overflow-y-auto ${
            activeMobileTab === "preview" ? "hidden lg:flex" : "flex"
          }`}
          style={{ maxHeight: "calc(100vh - 58px)" }}
        >
          {/* Section Navigation Tabs */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-3 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeTab === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveTab(sec.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-zinc-950 text-white shadow-2xs"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Section Form Body */}
          <div className="p-4 sm:p-6 pb-20">
            {activeTab === "personal" && (
              <PersonalInfoSection data={data} onChange={handleDataChange} />
            )}
            {activeTab === "experience" && (
              <ExperienceSection data={data} onChange={handleDataChange} />
            )}
            {activeTab === "education" && (
              <EducationSection data={data} onChange={handleDataChange} />
            )}
            {activeTab === "skills" && (
              <SkillsSection data={data} onChange={handleDataChange} />
            )}
            {activeTab === "projects" && (
              <ProjectsSection data={data} onChange={handleDataChange} />
            )}
            {activeTab === "additional" && (
              <AdditionalSection data={data} onChange={handleDataChange} />
            )}

            {/* Next Section Flow Button */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-400">Section {SECTIONS.findIndex((s) => s.id === activeTab) + 1} of {SECTIONS.length}</span>
              {activeTab !== "additional" && (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = SECTIONS.findIndex((s) => s.id === activeTab);
                    if (currentIndex < SECTIONS.length - 1) {
                      setActiveTab(SECTIONS[currentIndex + 1].id);
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 font-semibold"
                >
                  <span>Next Section</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Live A4 Preview */}
        <div
          className={`flex-1 flex-col bg-zinc-100/80 overflow-y-auto relative ${
            activeMobileTab === "edit" ? "hidden lg:flex" : "flex"
          }`}
          style={{ maxHeight: "calc(100vh - 58px)" }}
        >
          {/* Zoom & View Controls Overlay */}
          <div className="sticky top-3 z-10 mx-auto mt-3 flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1 shadow-xs border border-zinc-200 text-xs font-medium text-zinc-700">
            <button
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
              className="p-1 hover:text-zinc-950 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="min-w-10 text-center font-mono text-[11px]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.min(1.2, zoom + 0.1))}
              className="p-1 hover:text-zinc-950 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <div className="h-3 w-px bg-zinc-200 mx-1" />
            <button
              onClick={() => setZoom(0.85)}
              className="px-1.5 py-0.5 text-[10px] text-zinc-500 hover:text-zinc-950 font-mono"
            >
              Reset
            </button>
          </div>

          {/* Rendered Live CV Sheet */}
          <div className="flex-1 flex justify-center p-6 sm:p-10 pb-24">
            <CVRenderer data={data} scale={zoom} />
          </div>
        </div>
      </div>

      {/* Floating Mobile/Tablet Quick-Switch Button */}
      <div className="fixed bottom-5 right-5 z-40 lg:hidden">
        <button
          onClick={() =>
            setActiveMobileTab(activeMobileTab === "edit" ? "preview" : "edit")
          }
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-950 text-white font-bold text-xs shadow-2xl hover:bg-zinc-800 transition-all border border-white/20 active:scale-95"
        >
          {activeMobileTab === "edit" ? (
            <>
              <Eye className="h-4 w-4 text-emerald-400" />
              <span>View CV Preview</span>
            </>
          ) : (
            <>
              <Edit3 className="h-4 w-4 text-amber-400" />
              <span>Back to Editor</span>
            </>
          )}
        </button>
      </div>

      {/* AI Tailor Modal */}
      <AITailorModal
        isOpen={isTailorOpen}
        onClose={() => setIsTailorOpen(false)}
        cvData={data}
        onApplySummary={handleApplyTailoredSummary}
      />
    </div>
  );
};
