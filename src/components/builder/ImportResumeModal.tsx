"use client";

import React, { useState } from "react";
import { CVData } from "@/lib/types/cv";
import { ROS_RENDO_CV, SOKHA_CHAN_CV, ALEX_RIVERA_CV } from "@/lib/constants/sample-data";
import { parseResumeTextToCV } from "@/lib/utils/resume-parser";
import { extractText } from "unpdf";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  Clipboard,
  FileCheck,
} from "lucide-react";

interface ImportResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: CVData;
  onApplyCV: (newData: CVData) => void;
}

export const ImportResumeModal: React.FC<ImportResumeModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onApplyCV,
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "paste" | "presets">("upload");
  const [pastedText, setPastedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | "info";
    text: string;
  } | null>(null);
  const [parsedPreview, setParsedPreview] = useState<Partial<CVData> | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setStatusMessage(null);
    setParsedPreview(null);

    try {
      const fileName = file.name.toLowerCase();

      // Case 1: JSON Backup
      if (fileName.endsWith(".json")) {
        const text = await file.text();
        const json = JSON.parse(text);
        if (!json.personalInfo) {
          throw new Error("Invalid CVGen JSON backup format.");
        }
        setParsedPreview(json);
        setStatusMessage({
          type: "success",
          text: `Valid CVGen backup loaded: ${json.personalInfo.fullName || "Candidate"}`,
        });
        return;
      }

      // Case 2: PDF File
      if (fileName.endsWith(".pdf")) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await extractText(new Uint8Array(arrayBuffer));
        const extracted = Array.isArray(result.text) ? result.text.join("\n\n") : String(result.text || "");

        if (!extracted.trim()) {
          setStatusMessage({
            type: "info",
            text: "This PDF contains scanned or flattened artwork without selectable text (common with Canva exports). Please paste your resume text in the 'Paste Text' tab or load the candidate preset below.",
          });
          return;
        }

        const parsed = parseResumeTextToCV(extracted, currentData);
        setParsedPreview(parsed);
        setStatusMessage({
          type: "success",
          text: `Successfully parsed text from ${file.name}! Detected: ${parsed.personalInfo?.fullName || "Candidate profile"}`,
        });
        return;
      }

      // Case 3: Plain text / Markdown (.txt, .md)
      if (fileName.endsWith(".txt") || fileName.endsWith(".md")) {
        const text = await file.text();
        const parsed = parseResumeTextToCV(text, currentData);
        setParsedPreview(parsed);
        setStatusMessage({
          type: "success",
          text: `Parsed resume document: ${parsed.personalInfo?.fullName || "Candidate"}`,
        });
        return;
      }

      throw new Error("Unsupported file format. Please upload a .pdf, .json, .txt, or .md file.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to process file.";
      setStatusMessage({
        type: "error",
        text: message,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleParsePastedText = () => {
    if (!pastedText.trim()) {
      setStatusMessage({ type: "error", text: "Please paste your resume text or markdown first." });
      return;
    }

    try {
      const parsed = parseResumeTextToCV(pastedText, currentData);
      setParsedPreview(parsed);
      setStatusMessage({
        type: "success",
        text: `Parsed successfully! Detected: ${parsed.personalInfo?.fullName || "Candidate profile"}`,
      });
    } catch {
      setStatusMessage({ type: "error", text: "Could not parse text. Ensure standard headings are present." });
    }
  };

  const handleApply = () => {
    if (!parsedPreview) return;

    const merged: CVData = {
      ...currentData,
      personalInfo: {
        ...currentData.personalInfo,
        ...(parsedPreview.personalInfo || {}),
      },
      experience: parsedPreview.experience && parsedPreview.experience.length ? parsedPreview.experience : currentData.experience,
      education: parsedPreview.education && parsedPreview.education.length ? parsedPreview.education : currentData.education,
      skills: {
        ...currentData.skills,
        ...(parsedPreview.skills || {}),
      },
      projects: parsedPreview.projects && parsedPreview.projects.length ? parsedPreview.projects : currentData.projects,
    };

    onApplyCV(merged);
    onClose();
  };

  const handleLoadPreset = (presetCV: CVData) => {
    onApplyCV({
      ...presetCV,
      settings: currentData.settings, // Preserve current template choice
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white">
              <Upload className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900">Import Resume / PDF</h2>
              <p className="text-[11px] text-zinc-500">
                Upload your existing resume PDF, JSON draft, or paste markdown text
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-zinc-100 px-6 pt-2 bg-zinc-50/50">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "upload"
                ? "border-zinc-950 text-zinc-950"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload File (PDF/JSON)</span>
          </button>
          <button
            onClick={() => setActiveTab("paste")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "paste"
                ? "border-zinc-950 text-zinc-950"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <Clipboard className="h-3.5 w-3.5" />
            <span>Paste Text / Markdown</span>
          </button>
          <button
            onClick={() => setActiveTab("presets")}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === "presets"
                ? "border-zinc-950 text-zinc-950"
                : "border-transparent text-zinc-500 hover:text-zinc-800"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Candidate Presets</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* TAB 1: UPLOAD */}
          {activeTab === "upload" && (
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer hover:bg-zinc-50 hover:border-zinc-400 transition-all p-4 text-center">
                <div className="flex flex-col items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-zinc-100 flex items-center justify-center mb-2 text-zinc-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold text-zinc-800">
                    Click to browse or drag & drop your resume
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-1">
                    Supports <span className="font-mono font-medium text-zinc-700">.pdf, .json, .txt, .md</span>
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf,.json,.txt,.md"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <div className="rounded-lg bg-zinc-50 p-3 text-[11px] text-zinc-600 space-y-1 border border-zinc-200/60">
                <p className="font-semibold text-zinc-900 flex items-center gap-1">
                  <span>💡 Note on PDF Formats:</span>
                </p>
                <p>
                  Text-based PDFs (from Word, Google Docs, or LaTeX) extract automatically. For flattened graphic PDFs (such as Canva), use the <strong>Paste Text</strong> tab or the <strong>ROS RENDO</strong> preset.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PASTE TEXT */}
          {activeTab === "paste" && (
            <div className="space-y-3">
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste your resume markdown or plain text here (e.g., # Full Name, ## Experience, ## Education, ## Skills, ## Projects)..."
                rows={8}
                className="w-full rounded-xl border border-zinc-300 p-3 font-mono text-xs text-zinc-800 focus:border-zinc-950 focus:outline-hidden"
              />
              <button
                onClick={handleParsePastedText}
                className="w-full py-2 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-semibold transition-all"
              >
                Parse & Extract Resume Fields
              </button>
            </div>
          )}

          {/* TAB 3: CANDIDATE PRESETS */}
          {activeTab === "presets" && (
            <div className="space-y-2.5">
              <div
                onClick={() => handleLoadPreset(ROS_RENDO_CV)}
                className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50/80 cursor-pointer transition-all group"
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 group-hover:text-black">
                    ROS RENDO — Full-Stack Developer
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    Cambodia University of Technology and Science (CamTech) • ServiceFinder, SafeDeal, TechTune Healer
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-bold">
                  Recommended
                </span>
              </div>

              <div
                onClick={() => handleLoadPreset(SOKHA_CHAN_CV)}
                className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50/80 cursor-pointer transition-all group"
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 group-hover:text-black">
                    Sokha Chan — Senior Frontend Engineer
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    Royal University of Phnom Penh • KhmerEdu LMS, AgriTrack IoT
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                  Preset
                </span>
              </div>

              <div
                onClick={() => handleLoadPreset(ALEX_RIVERA_CV)}
                className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50/80 cursor-pointer transition-all group"
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 group-hover:text-black">
                    Alex Rivera — Staff Product Designer
                  </h4>
                  <p className="text-[11px] text-zinc-500">
                    San Francisco, CA • Design systems, UX architecture
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                  Preset
                </span>
              </div>
            </div>
          )}

          {/* Status Message */}
          {statusMessage && (
            <div
              className={`flex items-start gap-2 p-3 rounded-xl text-xs ${
                statusMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                  : statusMessage.type === "error"
                  ? "bg-rose-50 text-rose-900 border border-rose-200"
                  : "bg-blue-50 text-blue-900 border border-blue-200"
              }`}
            >
              {statusMessage.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : statusMessage.type === "error" ? (
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 text-[11px] leading-relaxed">{statusMessage.text}</div>
            </div>
          )}

          {/* Parsed Preview Card */}
          {parsedPreview && (
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-3.5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-900 flex items-center gap-1">
                  <FileCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Detected Profile Elements
                </span>
                <span className="text-[10px] font-mono text-zinc-400">Ready to Apply</span>
              </div>
              <div className="text-xs space-y-1 text-zinc-700">
                <p>
                  <strong>Name:</strong> {parsedPreview.personalInfo?.fullName || "Not detected"}
                </p>
                {parsedPreview.personalInfo?.jobTitle && (
                  <p>
                    <strong>Title:</strong> {parsedPreview.personalInfo.jobTitle}
                  </p>
                )}
                {parsedPreview.personalInfo?.email && (
                  <p>
                    <strong>Email:</strong> {parsedPreview.personalInfo.email}
                  </p>
                )}
                {parsedPreview.experience && parsedPreview.experience.length > 0 && (
                  <p>
                    <strong>Experience:</strong> {parsedPreview.experience.length} roles parsed
                  </p>
                )}
                {parsedPreview.projects && parsedPreview.projects.length > 0 && (
                  <p>
                    <strong>Projects:</strong> {parsedPreview.projects.length} projects parsed
                  </p>
                )}
                {parsedPreview.skills?.technical && parsedPreview.skills.technical.length > 0 && (
                  <p>
                    <strong>Skills:</strong> {parsedPreview.skills.technical.join(", ")}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2 border-t border-zinc-100 px-6 py-3 bg-zinc-50/80">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-zinc-200 bg-white text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!parsedPreview || isProcessing}
            className="px-4 py-1.5 rounded-lg bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          >
            Apply to CV Builder
          </button>
        </div>
      </div>
    </div>
  );
};
