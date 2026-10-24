"use client";

import React, { useState } from "react";
import { CVData, PersonalInfo } from "@/lib/types/cv";
import { User, Mail, Phone, MapPin, Globe, Sparkles, Loader2 } from "lucide-react";
import { LinkedinIcon as Linkedin, GithubIcon as Github, FacebookIcon as Facebook } from "@/components/common/Icons";

interface Props {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export const PersonalInfoSection: React.FC<Props> = ({ data, onChange }) => {
  const { personalInfo } = data;
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [summarySuggestion, setSummarySuggestion] = useState<string | null>(null);

  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...personalInfo,
        [field]: value,
      },
    });
  };

  const handleGenerateSummary = async () => {
    try {
      setIsGeneratingSummary(true);
      const res = await fetch("/api/ai/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to generate summary");
      const result = await res.json();
      setSummarySuggestion(result.summary);
    } catch (err) {
      console.error(err);
      alert("Failed to connect to AI service. Please check your network.");
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const applySummary = () => {
    if (summarySuggestion) {
      updateField("summary", summarySuggestion);
      setSummarySuggestion(null);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image under 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      updateField("photoUrl", result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
        <User className="h-5 w-5 text-zinc-900" />
        <h2 className="text-base font-bold text-zinc-950">Personal Information & Headshot</h2>
      </div>

      {/* Profile Photo / Headshot Manager */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Avatar Thumbnail */}
          <div className="relative shrink-0">
            {personalInfo.photoUrl ? (
              <div className="relative group">
                <img
                  src={personalInfo.photoUrl}
                  alt={personalInfo.fullName || "Profile"}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-zinc-300 shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => updateField("photoUrl", "")}
                  className="absolute -top-1.5 -right-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full p-1 shadow-sm transition-colors"
                  title="Remove photo"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-xl border-2 border-dashed border-zinc-300 bg-white flex flex-col items-center justify-center text-zinc-400">
                <User className="w-6 h-6 stroke-[1.5]" />
                <span className="text-[9px] font-mono mt-0.5">No Photo</span>
              </div>
            )}
          </div>

          {/* Photo Actions & Guidance */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium cursor-pointer transition-colors shadow-2xs">
                <span>Upload Headshot</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>

              {personalInfo.photoUrl && (
                <button
                  type="button"
                  onClick={() => updateField("photoUrl", "")}
                  className="px-2.5 py-1.5 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-100 text-xs text-zinc-600 font-medium transition-colors"
                >
                  Clear Photo
                </button>
              )}
            </div>

            <div className="text-[11px] text-zinc-500 leading-normal">
              <strong>Where it appears:</strong> Placed at top-right or sidebar header in photo-enabled templates.
              <span className="block text-zinc-400 mt-0.5">Recommended: 2×2 passport ratio or square portrait (JPG/PNG &lt; 2MB). Optional for ATS resumes.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="e.g. Sokha Chan / Alex Rivera"
            className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Target Job Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={personalInfo.jobTitle}
            onChange={(e) => updateField("jobTitle", e.target.value)}
            placeholder="e.g. Full-Stack Engineer / Product Designer"
            className="w-full text-xs rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Mail className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="sokha.chan@example.com"
              className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Phone className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="tel"
              value={personalInfo.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              placeholder="+855 12 345 678"
              className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Location (City, Country) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={personalInfo.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Phnom Penh, Cambodia"
              className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">LinkedIn Profile</label>
          <div className="relative">
            <Linkedin className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="url"
              value={personalInfo.linkedinUrl || ""}
              onChange={(e) => updateField("linkedinUrl", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Portfolio / Website</label>
          <div className="relative">
            <Globe className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="url"
              value={personalInfo.websiteUrl || ""}
              onChange={(e) => updateField("websiteUrl", e.target.value)}
              placeholder="https://yourportfolio.dev"
              className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub / Code Repository</label>
          <div className="relative">
            <Github className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="url"
              value={personalInfo.githubUrl || ""}
              onChange={(e) => updateField("githubUrl", e.target.value)}
              placeholder="https://github.com/username"
              className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Facebook / Social</label>
          <div className="relative">
            <Facebook className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={personalInfo.facebookUrl || ""}
              onChange={(e) => updateField("facebookUrl", e.target.value)}
              placeholder="Rous Rendo or profile link"
              className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary with AI Generator */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold text-slate-700">
            Professional Summary / Career Objective
          </label>
          <button
            type="button"
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
            className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
          >
            {isGeneratingSummary ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
            <span>Generate with AI</span>
          </button>
        </div>

        <textarea
          rows={4}
          value={personalInfo.summary || ""}
          onChange={(e) => updateField("summary", e.target.value)}
          placeholder="Brief 2-4 sentence summary of your experience, key strengths, and career goals..."
          className="w-full text-xs rounded-lg border border-slate-300 p-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* AI Suggestion Preview Box (shows before applying!) */}
        {summarySuggestion && (
          <div className="mt-2.5 rounded-lg border border-indigo-200 bg-indigo-50/70 p-3 text-xs">
            <div className="flex items-center justify-between font-semibold text-indigo-900 mb-1">
              <span className="flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
                AI Suggested Summary:
              </span>
              <button
                onClick={() => setSummarySuggestion(null)}
                className="text-slate-400 hover:text-slate-600 text-[10px]"
              >
                Dismiss
              </button>
            </div>
            <p className="text-slate-800 leading-relaxed italic">{summarySuggestion}</p>
            <div className="mt-2.5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSummarySuggestion(null)}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-600 hover:bg-white rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applySummary}
                className="px-3 py-1 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded shadow-xs"
              >
                Apply to CV
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
