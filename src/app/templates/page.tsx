"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { TEMPLATES_CONFIG, TemplateMeta, TemplateCategory } from "@/lib/constants/themes";
import { SOKHA_CHAN_CV } from "@/lib/constants/sample-data";
import { TemplateThumbnail } from "@/components/templates/TemplateThumbnail";
import { CVRenderer } from "@/components/templates/CVRenderer";
import { ArrowUpRight, Sparkles, FileText, Search, LayoutGrid, Eye, X, Columns2, Grid3X3, Grid2X2 } from "lucide-react";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | TemplateCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateMeta | null>(null);
  const [gridColumns, setGridColumns] = useState<"2" | "3" | "4">("3");

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

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans antialiased">
      <Navbar />

      <main className="flex-1 py-10 md:py-16 bg-zinc-50/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Header */}
          <div className="max-w-3xl mb-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-white text-xs font-semibold mb-3">
              <LayoutGrid className="h-3.5 w-3.5 text-zinc-300" />
              <span>Visual Template Showcase</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight">
              Thirty visual typography systems
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Explore live previews of all 30 publishing-grade layouts. Compare our vibrant <strong>Colorful & Creative</strong> designs with our conservative <strong>Classic & Corporate</strong> formats, and choose your favorite with one click.
            </p>
          </div>

          {/* Filtering, Search & Layout Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-2xl bg-white border border-zinc-200 shadow-xs mb-8">
            {/* Category Segmented Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === "all"
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                }`}
              >
                <span>All Templates</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/20 font-mono">
                  {counts.all}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory("creative")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === "creative"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>🎨 Colorful & Creative</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/15 font-mono">
                  {counts.creative}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory("classic")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === "classic"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-slate-400" />
                <span>📄 Classic & Clean (Normal)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/15 font-mono">
                  {counts.classic}
                </span>
              </button>
            </div>

            {/* Right: Search & Grid Density Controls */}
            <div className="flex items-center gap-3">
              {/* Live Search */}
              <div className="relative w-full md:w-64">
                <Search className="h-4 w-4 text-zinc-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search templates, roles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-10 pr-4 py-2 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:bg-white transition-all"
                />
              </div>

              {/* Grid Column Selector (Desktop) */}
              <div className="hidden lg:flex items-center bg-zinc-100 p-1 rounded-xl border border-zinc-200">
                <button
                  type="button"
                  onClick={() => setGridColumns("2")}
                  className={`p-1.5 rounded-lg transition-all ${
                    gridColumns === "2"
                      ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                  title="2 Columns (Large Readable Preview)"
                >
                  <Columns2 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setGridColumns("3")}
                  className={`p-1.5 rounded-lg transition-all ${
                    gridColumns === "3"
                      ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                  title="3 Columns (Balanced Showcase)"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setGridColumns("4")}
                  className={`p-1.5 rounded-lg transition-all ${
                    gridColumns === "4"
                      ? "bg-white text-zinc-950 shadow-2xs font-semibold"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                  title="4 Columns (Compact Overview)"
                >
                  <Grid2X2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Templates Visual Grid */}
          <div
            className={`grid gap-6 ${
              gridColumns === "2"
                ? "grid-cols-1 md:grid-cols-2"
                : gridColumns === "4"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {filteredTemplates.map((tpl) => {
              const isCreative = tpl.category === "creative";

              return (
                <div
                  key={tpl.id}
                  className="rounded-2xl border border-zinc-200/90 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-zinc-400 transition-all flex flex-col justify-between group"
                >
                  {/* Clean Card Header with Badges - ABOVE the template, NEVER ON TOP of CV header */}
                  <div className="px-4 py-3 bg-white border-b border-zinc-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          isCreative ? "bg-amber-500" : "bg-slate-700"
                        }`}
                      />
                      <h2 className="text-sm font-bold text-zinc-950 group-hover:text-indigo-600 transition-colors truncate">
                        {tpl.name}
                      </h2>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isCreative
                            ? "bg-amber-100 text-amber-900 font-semibold"
                            : "bg-slate-100 text-slate-800 font-semibold"
                        }`}
                      >
                        {isCreative ? "Creative" : "Classic"}
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 font-semibold">
                        {tpl.thumbnailBadge}
                      </span>
                    </div>
                  </div>

                  {/* Visual A4 Document Sheet - 100% UNOBSTRUCTED, NO BADGES OVERLAYING HEADER */}
                  <div className="relative w-full bg-zinc-100/70 p-3 sm:p-4 border-b border-zinc-100 flex items-center justify-center">
                    <div className="w-full rounded-md overflow-hidden shadow-sm border border-zinc-200 bg-white">
                      <TemplateThumbnail templateId={tpl.id} data={SOKHA_CHAN_CV} />
                    </div>

                    {/* Subtle Hover Action Bar - Doesn't obscure the CV text */}
                    <div className="absolute inset-x-4 bottom-6 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 flex items-center justify-center gap-2">
                      <Link
                        href={`/builder?template=${tpl.id}`}
                        className="px-4 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-xs shadow-xl transition-all flex items-center gap-1.5"
                      >
                        <span>Use in Builder</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(tpl)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white text-zinc-900 font-semibold text-xs shadow-lg hover:bg-zinc-100 border border-zinc-200 transition-all"
                      >
                        <Eye className="h-3.5 w-3.5 text-zinc-600" />
                        <span>Zoom</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Footer Details */}
                  <div className="p-4 bg-white flex flex-col justify-between gap-3 flex-1">
                    <div>
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {tpl.tagline}
                      </p>
                      <div className="mt-2 text-[11px] text-zinc-500 font-medium truncate">
                        <strong>Target:</strong> {tpl.bestFor}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewTemplate(tpl)}
                        className="text-xs text-zinc-500 hover:text-zinc-950 font-medium inline-flex items-center gap-1 transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Preview Full Page</span>
                      </button>

                      <Link
                        href={`/builder?template=${tpl.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs transition-colors shadow-2xs"
                      >
                        <span>Select</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="py-24 text-center text-zinc-500 space-y-2">
              <p className="text-base font-bold text-zinc-800">No templates found</p>
              <p className="text-xs text-zinc-500">
                Try searching with another keyword or select "All Templates".
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Full-Screen High-Resolution Zoom Preview Modal */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setPreviewTemplate(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden border border-zinc-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-2">
                <span
                  className={`w-3 h-3 rounded-full ${
                    previewTemplate.category === "creative" ? "bg-amber-500" : "bg-slate-700"
                  }`}
                />
                <div>
                  <h3 className="text-base font-bold text-zinc-950">{previewTemplate.name}</h3>
                  <p className="text-xs text-zinc-500">{previewTemplate.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewTemplate(null)}
                className="p-1.5 rounded-lg hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors"
                title="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Document Preview Container */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-zinc-200/80 flex justify-center">
              <div className="w-[794px] max-w-full shadow-2xl bg-white rounded-sm">
                <CVRenderer
                  data={{
                    ...SOKHA_CHAN_CV,
                    settings: {
                      ...SOKHA_CHAN_CV.settings,
                      templateId: previewTemplate.id,
                    },
                  }}
                  isPrintOnly={true}
                  scale={1}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-zinc-200 bg-white flex items-center justify-between">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 rounded-lg border border-zinc-300 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                Close Preview
              </button>
              <Link
                href={`/builder?template=${previewTemplate.id}`}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-xs shadow-md transition-all"
              >
                <span>Use this template in Builder</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-400" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
