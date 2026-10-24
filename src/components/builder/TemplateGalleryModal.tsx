"use client";

import React, { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import { CVData, TemplateId } from "@/lib/types/cv";
import { TEMPLATES_CONFIG, TemplateCategory } from "@/lib/constants/themes";
import { TemplateThumbnail } from "@/components/templates/TemplateThumbnail";
import { X, Search, Check, Sparkles, FileText, LayoutGrid, Columns2, Grid3X3, ArrowRight } from "lucide-react";

interface TemplateGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CVData;
  onSelectTemplate: (templateId: TemplateId) => void;
}

export const TemplateGalleryModal: React.FC<TemplateGalleryModalProps> = ({
  isOpen,
  onClose,
  data,
  onSelectTemplate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<"all" | TemplateCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewDensity, setViewDensity] = useState<"large" | "compact">("compact");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filteredTemplates = useMemo(() => {
    return TEMPLATES_CONFIG.filter((tpl) => {
      const matchesCategory =
        selectedCategory === "all" || tpl.category === selectedCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        tpl.name.toLowerCase().includes(q) ||
        tpl.tagline.toLowerCase().includes(q) ||
        tpl.bestFor.toLowerCase().includes(q) ||
        tpl.thumbnailBadge.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const counts = useMemo(() => {
    const creativeCount = TEMPLATES_CONFIG.filter((t) => t.category === "creative").length;
    const classicCount = TEMPLATES_CONFIG.filter((t) => t.category === "classic").length;
    return {
      all: TEMPLATES_CONFIG.length,
      creative: creativeCount,
      classic: classicCount,
    };
  }, []);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-zinc-50 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden border border-zinc-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-zinc-950 text-white">
                <LayoutGrid className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold text-zinc-950 tracking-tight">
                Visual Template Gallery
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 font-medium">
                {TEMPLATES_CONFIG.length} Designs
              </span>
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              Select any publishing-grade visual layout to immediately transform your CV.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-56">
              <Search className="h-3.5 w-3.5 text-zinc-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search styles, roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
              />
            </div>

            {/* View Density Toggle */}
            <div className="hidden sm:flex items-center bg-zinc-100 p-0.5 rounded-lg border border-zinc-200">
              <button
                type="button"
                onClick={() => setViewDensity("large")}
                className={`p-1.5 rounded-md transition-all ${
                  viewDensity === "large"
                    ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
                title="Large preview (readable documents)"
              >
                <Columns2 className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setViewDensity("compact")}
                className={`p-1.5 rounded-md transition-all ${
                  viewDensity === "compact"
                    ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
                title="Grid preview (compact comparison)"
              >
                <Grid3X3 className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-zinc-900 transition-colors"
              title="Close gallery (Esc)"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Navigation */}
        <div className="px-6 py-2.5 border-b border-zinc-200 bg-white flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-white text-zinc-950 shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <span>All Templates</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-200/70 font-mono">
                {counts.all}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory("creative")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === "creative"
                  ? "bg-white text-amber-800 shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>🎨 Colorful & Creative</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-mono">
                {counts.creative}
              </span>
            </button>

            <button
              onClick={() => setSelectedCategory("classic")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedCategory === "classic"
                  ? "bg-white text-slate-800 shadow-xs"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <FileText className="h-3.5 w-3.5 text-slate-500" />
              <span>📄 Classic & Corporate (Normal)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200/70 font-mono">
                {counts.classic}
              </span>
            </button>
          </div>

          <span className="text-xs text-zinc-400 font-medium hidden md:inline">
            Showing {filteredTemplates.length} layouts
          </span>
        </div>

        {/* Scrollable Templates Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-100/70">
          <div
            className={`grid gap-5 ${
              viewDensity === "large"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {filteredTemplates.map((tpl) => {
              const isActive = data.settings.templateId === tpl.id;
              const isCreative = tpl.category === "creative";

              return (
                <div
                  key={tpl.id}
                  onClick={() => {
                    onSelectTemplate(tpl.id);
                    onClose();
                  }}
                  className={`group relative rounded-xl bg-white border overflow-hidden flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 ${
                    isActive
                      ? "border-zinc-950 ring-2 ring-zinc-950 shadow-md"
                      : "border-zinc-200/90 hover:border-zinc-400"
                  }`}
                >
                  {/* Clean Visual Preview Container - NO BADGES ON TOP OF CV HEADER */}
                  <div className="relative w-full bg-zinc-50 p-2.5 sm:p-3 border-b border-zinc-100">
                    <div className="relative w-full rounded-md overflow-hidden shadow-xs border border-zinc-200/60 bg-white">
                      <TemplateThumbnail templateId={tpl.id} data={data} />
                    </div>

                    {/* Subtle selection prompt bar that slides in on hover without blocking the CV */}
                    <div className="absolute inset-x-3 bottom-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                      <div className="w-full py-2 px-3 rounded-lg bg-zinc-950/90 backdrop-blur-xs text-white text-xs font-semibold flex items-center justify-between shadow-lg">
                        <span>{isActive ? "Currently Active" : "Apply Template"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Metadata Footer - Clean, below preview */}
                  <div className="p-3.5 space-y-2 bg-white">
                    <div className="flex items-center justify-between gap-1">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            isCreative ? "bg-amber-500" : "bg-slate-700"
                          }`}
                        />
                        <h3 className="text-xs font-bold text-zinc-950 group-hover:text-indigo-600 transition-colors truncate">
                          {tpl.name}
                        </h3>
                      </div>

                      {/* Active Status or Badge */}
                      {isActive ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-950 text-white shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider shrink-0">
                          {tpl.thumbnailBadge}
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                      {tpl.tagline}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-zinc-100 text-[10px] text-zinc-400">
                      <span className="truncate">
                        <strong>For:</strong> {tpl.bestFor}
                      </span>
                      <span
                        className={`font-semibold shrink-0 ${
                          isCreative ? "text-amber-700" : "text-slate-600"
                        }`}
                      >
                        {isCreative ? "Creative" : "Classic"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="py-20 text-center text-zinc-500 space-y-2">
              <p className="text-sm font-semibold text-zinc-700">No templates match your search</p>
              <p className="text-xs text-zinc-400">
                Try searching for another keyword or switch categories.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-zinc-200 bg-white flex items-center justify-between text-xs text-zinc-500 shrink-0">
          <span>Click any template card to instantly apply it to your CV draft</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 font-semibold transition-colors shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
