"use client";

import React, { useState } from "react";
import { CVData, ColorTheme, FontFamily, FontSize, Spacing, TemplateId } from "@/lib/types/cv";
import { COLOR_THEMES, FONT_CONFIG, TEMPLATES_CONFIG } from "@/lib/constants/themes";
import { triggerVectorPrint, downloadDirectPDF } from "@/lib/pdf/export-pdf";
import { ROS_RENDO_CV, ROS_RENDO_CAMTECH_CV, SOKHA_CHAN_CV, ALEX_RIVERA_CV, EMPTY_CV } from "@/lib/constants/sample-data";
import Link from "next/link";
import {
  Printer,
  Download,
  Wand2,
  SlidersHorizontal,
  RotateCcw,
  Check,
  Clock,
  ChevronDown,
  LayoutGrid,
} from "lucide-react";
import { TemplateGalleryModal } from "./TemplateGalleryModal";

interface BuilderHeaderProps {
  data: CVData;
  onChange: (newData: CVData) => void;
  saveStatus: "saved" | "saving" | "unsaved";
  onOpenTailorModal: () => void;
  activeMobileTab: "edit" | "preview";
  onTabChange: (tab: "edit" | "preview") => void;
  zoom?: number;
  onZoomChange?: (z: number) => void;
}

export const BuilderHeader: React.FC<BuilderHeaderProps> = ({
  data,
  onChange,
  saveStatus,
  onOpenTailorModal,
  activeMobileTab,
  onTabChange,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showSampleMenu, setShowSampleMenu] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleTemplateChange = (templateId: TemplateId) => {
    onChange({
      ...data,
      settings: { ...data.settings, templateId },
    });
  };

  const handleColorChange = (colorTheme: ColorTheme) => {
    onChange({
      ...data,
      settings: { ...data.settings, colorTheme },
    });
  };

  const handleFontChange = (fontFamily: FontFamily) => {
    onChange({
      ...data,
      settings: { ...data.settings, fontFamily },
    });
  };

  const handleSizeChange = (fontSize: FontSize) => {
    onChange({
      ...data,
      settings: { ...data.settings, fontSize },
    });
  };

  const handleSpacingChange = (spacing: Spacing) => {
    onChange({
      ...data,
      settings: { ...data.settings, spacing },
    });
  };

  const handleDirectDownload = async () => {
    try {
      setIsExporting(true);
      await downloadDirectPDF("cv-preview-sheet", data);
    } catch (err) {
      console.error(err);
      alert("Direct download encountered an issue. Opening Vector Print as alternative.");
      triggerVectorPrint(data);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `${data.personalInfo.fullName || "CV"}_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        onChange(parsed);
      } catch {
        alert("Invalid JSON file format.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200/80 bg-white/90 backdrop-blur-md px-4 py-2 shadow-2xs">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Product Brand & Document Title */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-950 text-white font-semibold text-xs group-hover:bg-zinc-800 transition-colors">
              CV
            </div>
            <span className="font-semibold text-zinc-950 tracking-tight text-sm hidden sm:inline">
              CVGen
            </span>
          </Link>

          <div className="h-4 w-px bg-zinc-200 hidden sm:block" />

          {/* Editable Document Title */}
          <input
            type="text"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            className="text-xs sm:text-sm font-medium text-zinc-900 bg-transparent border-b border-transparent hover:border-zinc-300 focus:border-zinc-950 focus:outline-none px-1 py-0.5 max-w-36 sm:max-w-xs transition-colors"
            placeholder="Document Name"
          />

          {/* Auto-save Status Indicator */}
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hidden md:flex">
            {saveStatus === "saving" && (
              <>
                <Clock className="h-3 w-3 animate-spin text-amber-500" />
                <span>Saving...</span>
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-zinc-500">Saved</span>
              </>
            )}
            {saveStatus === "unsaved" && (
              <span className="text-amber-600 font-medium">• Unsaved</span>
            )}
          </div>
        </div>

        {/* Center: Mobile View Switcher */}
        <div className="flex lg:hidden bg-zinc-100 p-0.5 rounded-lg text-xs font-medium">
          <button
            onClick={() => onTabChange("edit")}
            className={`px-3 py-1 rounded-md transition-all text-xs ${
              activeMobileTab === "edit"
                ? "bg-white text-zinc-950 shadow-xs font-semibold"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Edit
          </button>
          <button
            onClick={() => onTabChange("preview")}
            className={`px-3 py-1 rounded-md transition-all text-xs ${
              activeMobileTab === "preview"
                ? "bg-white text-zinc-950 shadow-xs font-semibold"
                : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            Preview
          </button>
        </div>

        {/* Right: Actions, Template Switcher, Customization, & Export */}
        <div className="flex items-center gap-2">
          {/* AI Tailor Tool */}
          <button
            onClick={onOpenTailorModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 text-zinc-800 hover:bg-zinc-100 text-xs font-medium transition-all border border-zinc-200"
          >
            <Wand2 className="h-3.5 w-3.5 text-zinc-600" />
            <span className="hidden sm:inline">Job Match</span>
          </button>

          {/* Visual Template Gallery Button */}
          <button
            type="button"
            onClick={() => setIsGalleryOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-semibold shadow-xs transition-all"
            title="Browse all 24 templates visually"
          >
            <LayoutGrid className="h-3.5 w-3.5 text-zinc-300" />
            <span className="hidden md:inline">Browse Visuals</span>
          </button>

          {/* Templates Selector Dropdown */}
          <div className="relative">
            <select
              value={data.settings.templateId}
              onChange={(e) => handleTemplateChange(e.target.value as TemplateId)}
              className="text-xs font-medium text-zinc-800 bg-white border border-zinc-200 rounded-lg px-2.5 py-1.5 pr-7 appearance-none cursor-pointer hover:bg-zinc-50 focus:outline-none focus:border-zinc-900"
            >
              {TEMPLATES_CONFIG.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.category === "creative" ? "🎨 " : "📄 "}
                  {tpl.name}
                </option>
              ))}
            </select>
            <ChevronDown className="h-3 w-3 text-zinc-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          {/* Design Customizer (Theme, Font, Spacing) */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              title="Design & Typography"
            >
              <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-600" />
              <span className="hidden xl:inline">Design</span>
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-zinc-200 bg-white p-3.5 shadow-xl z-50">
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
                  Accent Color
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(Object.keys(COLOR_THEMES) as ColorTheme[]).map((themeKey) => (
                    <button
                      key={themeKey}
                      onClick={() => handleColorChange(themeKey)}
                      className={`h-5 w-5 rounded-full border-2 transition-transform hover:scale-110 ${
                        data.settings.colorTheme === themeKey
                          ? "border-zinc-950 ring-2 ring-zinc-300"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: COLOR_THEMES[themeKey].hex }}
                      title={COLOR_THEMES[themeKey].name}
                    />
                  ))}
                </div>

                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
                  Typography
                </div>
                <div className="space-y-1 mb-4">
                  {(Object.keys(FONT_CONFIG) as FontFamily[]).map((fontKey) => (
                    <button
                      key={fontKey}
                      onClick={() => handleFontChange(fontKey)}
                      className={`w-full text-left px-2 py-1 text-xs rounded transition-colors ${
                        data.settings.fontFamily === fontKey
                          ? "bg-zinc-100 text-zinc-950 font-semibold"
                          : "text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {FONT_CONFIG[fontKey].name}
                    </button>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
                  Spacing
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs mb-4">
                  {(["compact", "normal", "spacious"] as Spacing[]).map((sp) => (
                    <button
                      key={sp}
                      onClick={() => handleSpacingChange(sp)}
                      className={`py-1 text-center capitalize rounded border text-[11px] font-medium ${
                        data.settings.spacing === sp
                          ? "border-zinc-950 bg-zinc-950 text-white"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
                  Scale
                </div>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  {(["compact", "normal", "relaxed"] as FontSize[]).map((fs) => (
                    <button
                      key={fs}
                      onClick={() => handleSizeChange(fs)}
                      className={`py-1 text-center capitalize rounded border text-[11px] font-medium ${
                        data.settings.fontSize === fs
                          ? "border-zinc-950 bg-zinc-950 text-white"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {fs}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sample Data & Reset Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSampleMenu(!showSampleMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              title="Presets & Backups"
            >
              <RotateCcw className="h-3.5 w-3.5 text-zinc-600" />
              <span className="hidden xl:inline">Presets</span>
            </button>

            {showSampleMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-zinc-200 bg-white p-2 shadow-xl z-50 text-xs">
                <div className="px-2 py-1 font-mono text-zinc-400 uppercase text-[10px]">
                  Sample Data
                </div>
                <button
                  onClick={() => {
                    onChange(ROS_RENDO_CV);
                    setShowSampleMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-amber-50 font-bold text-amber-900 border border-amber-200 bg-amber-50/50 mb-1"
                >
                  💎 ROS RENDO (Diamond Rhombus)
                </button>
                <button
                  onClick={() => {
                    onChange(ROS_RENDO_CAMTECH_CV);
                    setShowSampleMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-amber-50 font-bold text-amber-900 border border-amber-200 bg-amber-50/30 mb-1"
                >
                  🎓 ROS RENDO (CamTech Navy & Gold)
                </button>
                <button
                  onClick={() => {
                    onChange(SOKHA_CHAN_CV);
                    setShowSampleMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-zinc-100 font-medium text-zinc-800"
                >
                  🇰🇭 Sokha Chan (Tech Graduate)
                </button>
                <button
                  onClick={() => {
                    onChange(ALEX_RIVERA_CV);
                    setShowSampleMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-zinc-100 font-medium text-zinc-800"
                >
                  🌐 Alex Rivera (Product Designer)
                </button>
                <button
                  onClick={() => {
                    onChange(EMPTY_CV);
                    setShowSampleMenu(false);
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-zinc-100 text-zinc-500 font-medium"
                >
                  Clear all fields
                </button>

                <div className="my-1 border-t border-zinc-100" />
                <div className="px-2 py-1 font-mono text-zinc-400 uppercase text-[10px]">
                  JSON Backup
                </div>
                <button
                  onClick={handleExportJSON}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-zinc-100 text-zinc-700"
                >
                  Export Data (.json)
                </button>
                <label className="w-full block text-left px-2 py-1.5 rounded hover:bg-zinc-100 text-zinc-700 cursor-pointer">
                  Import Data (.json)
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Primary Action: Print / Vector PDF */}
          <button
            onClick={() => triggerVectorPrint(data)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-medium shadow-xs active:scale-95 transition-all"
            title="Generates selectable, high-resolution vector PDF"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Vector PDF</span>
          </button>

          {/* Direct Download fallback */}
          <button
            onClick={handleDirectDownload}
            disabled={isExporting}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-all disabled:opacity-50"
            title="Download direct file"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden md:inline">{isExporting ? "..." : "Direct"}</span>
          </button>
        </div>
      </div>

      {/* Visual Template Gallery Modal */}
      <TemplateGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        data={data}
        onSelectTemplate={handleTemplateChange}
      />
    </header>
  );
};
