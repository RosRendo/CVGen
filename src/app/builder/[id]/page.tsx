"use client";

import React, { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { CVData } from "@/lib/types/cv";
import { SOKHA_CHAN_CV } from "@/lib/constants/sample-data";
import { BuilderHeader } from "@/components/builder/BuilderHeader";
import { PersonalInfoSection } from "@/components/builder/PersonalInfoSection";
import { ExperienceSection } from "@/components/builder/ExperienceSection";
import { EducationSection } from "@/components/builder/EducationSection";
import { SkillsSection } from "@/components/builder/SkillsSection";
import { ProjectsSection } from "@/components/builder/ProjectsSection";
import { AdditionalSection } from "@/components/builder/AdditionalSection";
import { AITailorModal } from "@/components/builder/AITailorModal";
import { CVRenderer } from "@/components/templates/CVRenderer";
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
  Loader2,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

type SectionTab = "personal" | "experience" | "education" | "skills" | "projects" | "additional";

const SECTIONS: { id: SectionTab; label: string; icon: React.ElementType }[] = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills & Languages", icon: Wrench },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "additional", label: "Certifications", icon: Award },
];

export default function CloudBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const cvId = resolvedParams.id;
  const router = useRouter();

  const [data, setData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<SectionTab>("personal");
  const [activeMobileTab, setActiveMobileTab] = useState<"edit" | "preview">("edit");
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [zoom, setZoom] = useState(0.85);
  const [isTailorOpen, setIsTailorOpen] = useState(false);

  // Load CV from cloud API
  useEffect(() => {
    async function loadCV() {
      try {
        const res = await fetch(`/api/cvs/${cvId}`);
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (!res.ok) {
          throw new Error("Could not find this CV or you do not have permission.");
        }
        const json = await res.json();
        const loadedData = (json.cv.data as CVData) || SOKHA_CHAN_CV;
        setData({
          ...loadedData,
          id: json.cv.id,
          title: json.cv.title,
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error loading CV");
      } finally {
        setLoading(false);
      }
    }

    loadCV();
  }, [cvId, router]);

  // Debounced cloud save
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDataChange = (newData: CVData) => {
    setData(newData);
    setSaveStatus("saving");

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cvs/${cvId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newData.title,
            data: newData,
          }),
        });
        if (!res.ok) throw new Error("Cloud save failed");
        setSaveStatus("saved");
      } catch (err) {
        console.error("Autosave error:", err);
        setSaveStatus("unsaved");
      }
    }, 700);
  };

  const handleApplyTailoredSummary = (newSummary: string) => {
    if (!data) return;
    handleDataChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        summary: newSummary,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-2" />
          <p className="text-xs text-slate-500 font-medium">Loading cloud resume...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-slate-50 p-4 text-center">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg max-w-md">
          <h2 className="text-base font-bold text-slate-900 mb-2">Resume Not Found</h2>
          <p className="text-xs text-slate-500 mb-6">{error || "The requested resume could not be loaded."}</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
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

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Form Sections */}
        <div
          className={`w-full lg:w-[48%] xl:w-[45%] flex flex-col bg-white border-r border-slate-200 overflow-y-auto ${
            activeMobileTab === "preview" ? "hidden lg:flex" : "flex"
          }`}
          style={{ maxHeight: "calc(100vh - 58px)" }}
        >
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

          <div className="flex-1 flex justify-center p-6 sm:p-10 pb-24">
            <CVRenderer data={data} scale={zoom} />
          </div>
        </div>
      </div>

      <AITailorModal
        isOpen={isTailorOpen}
        onClose={() => setIsTailorOpen(false)}
        cvData={data}
        onApplySummary={handleApplyTailoredSummary}
      />
    </div>
  );
}
