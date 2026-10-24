"use client";

import React, { useState } from "react";
import { CVData, LanguageItem, SkillDisplayStyle } from "@/lib/types/cv";
import { Wrench, Plus, X, Globe2, Trash2, Star, BarChart3, Tag, Type, Check, Sparkles } from "lucide-react";
import { POPULAR_TECH_LIBRARY, getTechIcon } from "@/components/common/TechIcons";

interface Props {
  data: CVData;
  onChange: (newData: CVData) => void;
}

const COMMON_SOFT_SUGGESTIONS = [
  "Problem Solving",
  "Communication",
  "Agile / Scrum",
  "Cross-functional Collaboration",
  "Time Management",
  "Strategic Leadership",
  "Critical Thinking",
  "Client Presentation",
];

export const SkillsSection: React.FC<Props> = ({ data, onChange }) => {
  const { skills, settings } = data;
  const [techInput, setTechInput] = useState("");
  const [softInput, setSoftInput] = useState("");

  const currentStyle: SkillDisplayStyle = settings.skillDisplayStyle || "pills";
  const showIcons: boolean = settings.skillShowIcons ?? true;

  const setStyle = (style: SkillDisplayStyle) => {
    onChange({
      ...data,
      settings: {
        ...settings,
        skillDisplayStyle: style,
      },
    });
  };

  const toggleIcons = () => {
    onChange({
      ...data,
      settings: {
        ...settings,
        skillShowIcons: !showIcons,
      },
    });
  };

  const addTechSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || skills.technical.includes(trimmed)) return;
    onChange({
      ...data,
      skills: {
        ...skills,
        technical: [...skills.technical, trimmed],
      },
    });
    setTechInput("");
  };

  const removeTechSkill = (skill: string) => {
    const newRatings = { ...(skills.ratings || {}) };
    delete newRatings[skill];
    onChange({
      ...data,
      skills: {
        ...skills,
        technical: skills.technical.filter((s) => s !== skill),
        ratings: newRatings,
      },
    });
  };

  const toggleTechSkill = (skillName: string) => {
    if (skills.technical.includes(skillName)) {
      removeTechSkill(skillName);
    } else {
      addTechSkill(skillName);
    }
  };

  const updateSkillRating = (skillName: string, rating: number) => {
    onChange({
      ...data,
      skills: {
        ...skills,
        ratings: {
          ...(skills.ratings || {}),
          [skillName]: rating,
        },
      },
    });
  };

  const addSoftSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || skills.soft.includes(trimmed)) return;
    onChange({
      ...data,
      skills: {
        ...skills,
        soft: [...skills.soft, trimmed],
      },
    });
    setSoftInput("");
  };

  const removeSoftSkill = (skill: string) => {
    onChange({
      ...data,
      skills: {
        ...skills,
        soft: skills.soft.filter((s) => s !== skill),
      },
    });
  };

  const addLanguage = () => {
    const newLang: LanguageItem = {
      id: "lang-" + Math.random().toString(36).substring(2, 7),
      language: "",
      proficiency: "Fluent",
    };
    onChange({
      ...data,
      skills: {
        ...skills,
        languages: [...skills.languages, newLang],
      },
    });
  };

  const updateLanguage = (id: string, updates: Partial<LanguageItem>) => {
    onChange({
      ...data,
      skills: {
        ...skills,
        languages: skills.languages.map((l) => (l.id === id ? { ...l, ...updates } : l)),
      },
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      skills: {
        ...skills,
        languages: skills.languages.filter((l) => l.id !== id),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
        <Wrench className="h-5 w-5 text-zinc-900" />
        <h2 className="text-base font-bold text-zinc-950">Skills, Competencies & Visual Styles</h2>
      </div>

      {/* Visual Customization Controls: Style & Icons */}
      <div className="rounded-xl border border-zinc-200 bg-zinc-50/70 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <span className="text-xs font-semibold text-zinc-900 block">
              Skill Visual Representation
            </span>
            <span className="text-[11px] text-zinc-500">
              Customize how technical skills render on your generated CV
            </span>
          </div>

          {/* Icon Toggle */}
          <button
            type="button"
            onClick={toggleIcons}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              showIcons
                ? "bg-zinc-950 text-white border-zinc-950"
                : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-100"
            }`}
          >
            <span>{showIcons ? "✓ With Tech Icons" : "Text Only"}</span>
          </button>
        </div>

        {/* Style Segmented Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1">
          {[
            { id: "pills", label: "Pill Badges", icon: Tag },
            { id: "bars", label: "Bar Chart", icon: BarChart3 },
            { id: "stars", label: "5 Stars", icon: Star },
            { id: "dots", label: "Dot Levels", icon: Sparkles },
            { id: "text", label: "Plain Text", icon: Type },
          ].map((item) => {
            const Icon = item.icon;
            const isSelected = currentStyle === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStyle(item.id as SkillDisplayStyle)}
                className={`flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? "bg-white border-zinc-900 text-zinc-950 shadow-xs font-semibold"
                    : "bg-white/60 border-zinc-200/80 text-zinc-600 hover:bg-white hover:text-zinc-900"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-zinc-950" : "text-zinc-400"}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clickable Tech Icon Library (Instant Click to Add/Remove) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-zinc-800">
            Clickable Tech Icon Library
          </label>
          <span className="text-[11px] text-zinc-500">
            Click any icon to toggle on/off
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 p-3 rounded-xl border border-zinc-200 bg-white">
          {POPULAR_TECH_LIBRARY.map((item) => {
            const isActive = skills.technical.includes(item.name);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleTechSkill(item.name)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isActive
                    ? "bg-zinc-950 text-white border-zinc-950 shadow-2xs font-semibold"
                    : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300"
                }`}
              >
                {getTechIcon(item.name, "h-3.5 w-3.5 shrink-0")}
                <span>{item.name}</span>
                {isActive && <Check className="h-3 w-3 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Manual Input for Custom Skills */}
      <div>
        <label className="block text-xs font-semibold text-zinc-800 mb-1">
          Add Custom Technical Skills
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addTechSkill(techInput);
              }
            }}
            placeholder="Type custom skill & press Enter (e.g. Kubernetes, Swift, Rust)"
            className="w-full text-xs rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <button
            type="button"
            onClick={() => addTechSkill(techInput)}
            className="px-4 py-2 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Selected Skills List with Interactive Ratings */}
        <div className="space-y-2 mt-3">
          <span className="text-xs font-semibold text-zinc-700 block">
            Active Technical Skills ({skills.technical.length})
          </span>

          {skills.technical.length === 0 ? (
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 text-center text-xs text-zinc-400">
              No technical skills added yet. Click from the library above or type your own.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skills.technical.map((tech) => {
                const currentRating = skills.ratings?.[tech] ?? 4;
                return (
                  <div
                    key={tech}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-lg border border-zinc-200 bg-white shadow-2xs"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {showIcons && getTechIcon(tech)}
                      <span className="text-xs font-medium text-zinc-900 truncate">
                        {tech}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* Rating Control (Stars / Bar level) */}
                      {(currentStyle === "bars" || currentStyle === "stars" || currentStyle === "dots") && (
                        <div className="flex items-center gap-0.5 select-none" title="Set proficiency (1-5)">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => updateSkillRating(tech, star)}
                              className={`text-xs transition-colors hover:scale-125 ${
                                star <= currentRating ? "text-amber-500 font-bold" : "text-zinc-300"
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => removeTechSkill(tech)}
                        className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove skill"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Soft Skills Section */}
      <div className="pt-2 border-t border-zinc-200">
        <label className="block text-xs font-semibold text-zinc-800 mb-1">
          Professional Strengths & Soft Skills
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") {
                e.preventDefault();
                addSoftSkill(softInput);
              }
            }}
            placeholder="Type skill & press Enter (e.g. Communication, Agile/Scrum)"
            className="w-full text-xs rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
          />
          <button
            type="button"
            onClick={() => addSoftSkill(softInput)}
            className="px-4 py-2 rounded-lg bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Selected Soft Skills */}
        <div className="flex flex-wrap gap-1.5 min-h-8 p-2 rounded-lg bg-zinc-50 border border-zinc-200">
          {skills.soft.length === 0 ? (
            <span className="text-xs text-zinc-400">No soft skills added yet.</span>
          ) : (
            skills.soft.map((soft) => (
              <span
                key={soft}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-white border border-zinc-200 text-zinc-800 shadow-2xs"
              >
                {soft}
                <button
                  type="button"
                  onClick={() => removeSoftSkill(soft)}
                  className="text-zinc-400 hover:text-rose-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Quick Add Soft Suggestions */}
        <div className="mt-2 flex flex-wrap items-center gap-1 text-[11px] text-zinc-500">
          <span className="font-semibold text-zinc-600">Suggestions:</span>
          {COMMON_SOFT_SUGGESTIONS.filter((s) => !skills.soft.includes(s)).slice(0, 6).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addSoftSkill(s)}
              className="px-2 py-0.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      </div>

      {/* Languages Section */}
      <div className="pt-2 border-t border-zinc-200">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-zinc-800 flex items-center gap-1.5">
            <Globe2 className="h-4 w-4 text-zinc-600" />
            <span>Languages & Proficiencies</span>
          </label>
          <button
            type="button"
            onClick={addLanguage}
            className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:text-zinc-700"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Language</span>
          </button>
        </div>

        <div className="space-y-2">
          {skills.languages.map((lang) => (
            <div
              key={lang.id}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-zinc-200 bg-white"
            >
              <input
                type="text"
                value={lang.language}
                onChange={(e) => updateLanguage(lang.id, { language: e.target.value })}
                placeholder="e.g. Khmer / English / French"
                className="flex-1 text-xs rounded border border-zinc-300 px-2.5 py-1.5 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900"
              />
              <select
                value={lang.proficiency}
                onChange={(e) => updateLanguage(lang.id, { proficiency: e.target.value })}
                className="text-xs rounded border border-zinc-300 px-2.5 py-1.5 text-zinc-900 bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900"
              >
                <option value="Native / Bilingual">Native / Bilingual</option>
                <option value="Fluent / Full Professional">Fluent</option>
                <option value="Professional Working">Professional Working</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Elementary / Basic">Basic</option>
              </select>
              <button
                type="button"
                onClick={() => removeLanguage(lang.id)}
                className="text-zinc-400 hover:text-rose-600 transition-colors p-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
