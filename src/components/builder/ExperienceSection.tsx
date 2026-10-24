"use client";

import React, { useState } from "react";
import { CVData, ExperienceItem } from "@/lib/types/cv";
import { Briefcase, Plus, Trash2, ArrowUp, ArrowDown, Sparkles, Loader2, Check } from "lucide-react";

interface Props {
  data: CVData;
  onChange: (newData: CVData) => void;
}

interface BulletImprovementState {
  expId: string;
  bulletIndex: number;
  original: string;
  improved: string;
  explanation: string;
  metricTip?: string;
}

export const ExperienceSection: React.FC<Props> = ({ data, onChange }) => {
  const { experience } = data;
  const [loadingBulletKey, setLoadingBulletKey] = useState<string | null>(null);
  const [activeImprovement, setActiveImprovement] = useState<BulletImprovementState | null>(null);

  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: "exp-" + Math.random().toString(36).substring(2, 9),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      bullets: [""],
    };
    onChange({
      ...data,
      experience: [newItem, ...experience],
    });
  };

  const updateItem = (id: string, updates: Partial<ExperienceItem>) => {
    onChange({
      ...data,
      experience: experience.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    });
  };

  const removeItem = (id: string) => {
    onChange({
      ...data,
      experience: experience.filter((item) => item.id !== id),
    });
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experience.length) return;
    const items = [...experience];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    onChange({ ...data, experience: items });
  };

  // Bullet management
  const addBullet = (expId: string) => {
    const item = experience.find((e) => e.id === expId);
    if (!item) return;
    updateItem(expId, { bullets: [...item.bullets, ""] });
  };

  const updateBullet = (expId: string, index: number, value: string) => {
    const item = experience.find((e) => e.id === expId);
    if (!item) return;
    const newBullets = [...item.bullets];
    newBullets[index] = value;
    updateItem(expId, { bullets: newBullets });
  };

  const removeBullet = (expId: string, index: number) => {
    const item = experience.find((e) => e.id === expId);
    if (!item) return;
    updateItem(expId, { bullets: item.bullets.filter((_, i) => i !== index) });
  };

  // AI Bullet Enhancement
  const handleImproveBullet = async (expId: string, bulletIndex: number, text: string) => {
    if (!text.trim()) return;
    const key = `${expId}-${bulletIndex}`;
    try {
      setLoadingBulletKey(key);
      const res = await fetch("/api/ai/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Improvement failed");
      const result = await res.json();
      setActiveImprovement({
        expId,
        bulletIndex,
        original: text,
        improved: result.improved,
        explanation: result.explanation,
        metricTip: result.metricTip,
      });
    } catch (err) {
      console.error(err);
      alert("Could not connect to AI assistant.");
    } finally {
      setLoadingBulletKey(null);
    }
  };

  const applyBulletImprovement = () => {
    if (!activeImprovement) return;
    updateBullet(activeImprovement.expId, activeImprovement.bulletIndex, activeImprovement.improved);
    setActiveImprovement(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Work Experience</h2>
        </div>
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Position</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-dashed border-slate-300 p-4">
          <p className="text-xs text-slate-500 mb-2">No work experience added yet.</p>
          <button
            type="button"
            onClick={addExperience}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            + Add your first work experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-3"
            >
              {/* Item Top Controls */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800">
                  #{index + 1} {item.jobTitle ? item.jobTitle : "Untitled Role"}{" "}
                  {item.company ? `at ${item.company}` : ""}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                    title="Move Up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === experience.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                    title="Move Down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 ml-1"
                    title="Delete Role"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Job Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.jobTitle}
                    onChange={(e) => updateItem(item.id, { jobTitle: e.target.value })}
                    placeholder="e.g. Associate Software Engineer"
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Company / Organization <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.company}
                    onChange={(e) => updateItem(item.id, { company: e.target.value })}
                    placeholder="e.g. Mekong Tech Solutions"
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={item.location || ""}
                    onChange={(e) => updateItem(item.id, { location: e.target.value })}
                    placeholder="e.g. Phnom Penh, Cambodia"
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={item.startDate}
                      onChange={(e) => updateItem(item.id, { startDate: e.target.value })}
                      placeholder="e.g. 2024-06"
                      className="w-full text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      disabled={item.isCurrent}
                      value={item.isCurrent ? "Present" : item.endDate || ""}
                      onChange={(e) => updateItem(item.id, { endDate: e.target.value })}
                      placeholder="e.g. 2025-01"
                      className="w-full text-xs rounded-lg border border-slate-300 px-2 py-1.5 disabled:bg-slate-100 disabled:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 flex items-center gap-2 pt-0.5">
                  <input
                    type="checkbox"
                    id={`current-${item.id}`}
                    checked={item.isCurrent}
                    onChange={(e) =>
                      updateItem(item.id, {
                        isCurrent: e.target.checked,
                        endDate: e.target.checked ? "" : item.endDate,
                      })
                    }
                    className="h-3.5 w-3.5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor={`current-${item.id}`} className="text-xs text-slate-700 font-medium cursor-pointer">
                    I currently work in this role
                  </label>
                </div>
              </div>

              {/* Bullet Points Management */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Accomplishments & Responsibilities
                  </label>
                  <button
                    type="button"
                    onClick={() => addBullet(item.id)}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-0.5"
                  >
                    <Plus className="h-3 w-3" /> Add Bullet
                  </button>
                </div>

                <div className="space-y-2">
                  {item.bullets.map((bullet, bIdx) => {
                    const bulletKey = `${item.id}-${bIdx}`;
                    const isLoading = loadingBulletKey === bulletKey;

                    return (
                      <div key={bIdx} className="space-y-1">
                        <div className="flex items-start gap-1.5">
                          <span className="text-slate-400 text-xs mt-2">•</span>
                          <textarea
                            rows={2}
                            value={bullet}
                            onChange={(e) => updateBullet(item.id, bIdx, e.target.value)}
                            placeholder="State an action, context, and result (e.g. Engineered microservice handling 40k daily transactions...)"
                            className="w-full text-xs rounded-lg border border-slate-300 p-2 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                          />
                          <div className="flex flex-col gap-1">
                            {/* AI Polish Button */}
                            <button
                              type="button"
                              onClick={() => handleImproveBullet(item.id, bIdx, bullet)}
                              disabled={isLoading || !bullet.trim()}
                              className="p-1.5 rounded-md bg-indigo-50 text-indigo-700 hover:bg-indigo-100 disabled:opacity-40 transition-colors"
                              title="Improve phrasing with AI"
                            >
                              {isLoading ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Sparkles className="h-3.5 w-3.5" />
                              )}
                            </button>
                            {/* Delete Bullet Button */}
                            <button
                              type="button"
                              onClick={() => removeBullet(item.id, bIdx)}
                              className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 transition-colors"
                              title="Remove bullet"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Modal/Preview of AI Suggestion for this specific bullet */}
                        {activeImprovement &&
                          activeImprovement.expId === item.id &&
                          activeImprovement.bulletIndex === bIdx && (
                            <div className="ml-4 rounded-lg border border-indigo-200 bg-indigo-50/80 p-2.5 text-xs">
                              <div className="font-semibold text-indigo-900 mb-1 flex items-center justify-between">
                                <span className="flex items-center gap-1">
                                  <Sparkles className="h-3 w-3 text-indigo-600" />
                                  Suggested Enhancement:
                                </span>
                                <span className="text-[10px] text-indigo-600 font-normal">
                                  {activeImprovement.explanation}
                                </span>
                              </div>
                              <p className="text-slate-900 font-medium leading-relaxed bg-white/80 p-2 rounded border border-indigo-100">
                                {activeImprovement.improved}
                              </p>
                              {activeImprovement.metricTip && (
                                <p className="mt-1 text-[11px] text-amber-700 italic">
                                  💡 {activeImprovement.metricTip}
                                </p>
                              )}
                              <div className="mt-2 flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setActiveImprovement(null)}
                                  className="px-2 py-0.5 text-[11px] font-medium text-slate-600 hover:bg-white rounded"
                                >
                                  Keep Original
                                </button>
                                <button
                                  type="button"
                                  onClick={applyBulletImprovement}
                                  className="px-2.5 py-0.5 text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded flex items-center gap-1 shadow-xs"
                                >
                                  <Check className="h-3 w-3" /> Apply
                                </button>
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
