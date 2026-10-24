"use client";

import React, { useState } from "react";
import { CVData } from "@/lib/types/cv";
import { TailorCvResult } from "@/lib/ai/ai-service";
import { Wand2, X, Check, Loader2, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  onApplySummary: (newSummary: string) => void;
}

export const AITailorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  cvData,
  onApplySummary,
}) => {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<TailorCvResult | null>(null);
  const [appliedSummary, setAppliedSummary] = useState(false);

  if (!isOpen) return null;

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || jobDescription.length < 20) {
      alert("Please paste a meaningful job description (at least 20 characters).");
      return;
    }

    try {
      setIsAnalyzing(true);
      const res = await fetch("/api/ai/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          cvData,
        }),
      });

      if (!res.ok) throw new Error("Analysis failed");
      const data: TailorCvResult = await res.json();
      setResult(data);
      setAppliedSummary(false);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze job description. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApply = () => {
    if (result?.suggestedSummary) {
      onApplySummary(result.suggestedSummary);
      setAppliedSummary(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl border border-zinc-200 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-zinc-100 text-zinc-900">
              <Wand2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-950">Job Description Alignment</h2>
              <p className="text-xs text-zinc-500 font-normal">
                Compare your current CV keywords against a target job posting.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">
              Paste Target Job Description
            </label>
            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job responsibilities and technical requirements here to inspect keyword alignment..."
              className="w-full text-xs rounded-xl border border-zinc-200 p-3 text-zinc-900 focus:outline-none focus:border-zinc-950 transition-colors"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={isAnalyzing || !jobDescription.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 text-white text-xs font-medium hover:bg-zinc-800 disabled:opacity-50 transition-all shadow-xs"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Analyzing Alignment...</span>
                </>
              ) : (
                <>
                  <Wand2 className="h-3.5 w-3.5" />
                  <span>Inspect Alignment</span>
                </>
              )}
            </button>
          </div>

          {/* Results Display */}
          {result && (
            <div className="mt-4 space-y-4 rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 text-xs">
              {/* Skills Match */}
              <div>
                <h3 className="font-semibold text-zinc-900 flex items-center gap-1.5 mb-2 text-xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Present in your CV:</span>
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {result.matchingSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-800 text-[11px] font-mono"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Missing Skills Warning */}
              {result.missingKeywords.length > 0 && (
                <div>
                  <h3 className="font-semibold text-zinc-900 flex items-center gap-1.5 mb-2 text-xs">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600" />
                    <span>Keywords in job posting not found in your CV:</span>
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingKeywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-mono"
                      >
                        + {kw}
                      </span>
                    ))}
                  </div>
                  <p className="mt-1 text-[11px] text-zinc-500 italic">
                    Note: Only include these keywords if you have verified hands-on experience.
                  </p>
                </div>
              )}

              {/* Targeted Advice */}
              <div>
                <h3 className="font-semibold text-zinc-900 mb-1 text-xs">Editorial Feedback</h3>
                <ul className="list-disc pl-4 space-y-1 text-zinc-700">
                  {result.targetedAdvice.map((adv, idx) => (
                    <li key={idx}>{adv}</li>
                  ))}
                </ul>
              </div>

              {/* Suggested Tailored Summary */}
              <div className="rounded-lg border border-zinc-200 bg-white p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-zinc-950 text-xs">
                    Aligned Summary Proposal:
                  </span>
                  {appliedSummary ? (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                      <Check className="h-3 w-3" /> Applied to CV
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApply}
                      className="flex items-center gap-1 px-3 py-1 rounded-md bg-zinc-950 text-white font-medium text-[11px] hover:bg-zinc-800 transition-colors shadow-2xs"
                    >
                      <span>Apply to CV</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
                <p className="text-zinc-800 leading-relaxed italic text-xs font-mono">
                  {result.suggestedSummary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
