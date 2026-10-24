"use client";

import React from "react";
import { CVData, EducationItem } from "@/lib/types/cv";
import { GraduationCap, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface Props {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export const EducationSection: React.FC<Props> = ({ data, onChange }) => {
  const { education } = data;

  const addEducation = () => {
    const newItem: EducationItem = {
      id: "edu-" + Math.random().toString(36).substring(2, 9),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      gpa: "",
      achievements: [""],
    };
    onChange({
      ...data,
      education: [newItem, ...education],
    });
  };

  const updateItem = (id: string, updates: Partial<EducationItem>) => {
    onChange({
      ...data,
      education: education.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    });
  };

  const removeItem = (id: string) => {
    onChange({
      ...data,
      education: education.filter((item) => item.id !== id),
    });
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= education.length) return;
    const items = [...education];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    onChange({ ...data, education: items });
  };

  const updateAchievement = (eduId: string, achIndex: number, value: string) => {
    const item = education.find((e) => e.id === eduId);
    if (!item) return;
    const newAch = [...item.achievements];
    newAch[achIndex] = value;
    updateItem(eduId, { achievements: newAch });
  };

  const addAchievement = (eduId: string) => {
    const item = education.find((e) => e.id === eduId);
    if (!item) return;
    updateItem(eduId, { achievements: [...item.achievements, ""] });
  };

  const removeAchievement = (eduId: string, achIndex: number) => {
    const item = education.find((e) => e.id === eduId);
    if (!item) return;
    updateItem(eduId, { achievements: item.achievements.filter((_, i) => i !== achIndex) });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Education</h2>
        </div>
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Education</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-dashed border-slate-300 p-4">
          <p className="text-xs text-slate-500 mb-2">No education history added yet.</p>
          <button
            type="button"
            onClick={addEducation}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            + Add degree or school
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800">
                  #{index + 1} {item.degree ? `${item.degree} in ${item.fieldOfStudy}` : "Degree"} —{" "}
                  {item.institution || "School"}
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
                    disabled={index === education.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                    title="Move Down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 ml-1"
                    title="Delete Education"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Institution / University <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.institution}
                    onChange={(e) => updateItem(item.id, { institution: e.target.value })}
                    placeholder="e.g. Royal University of Phnom Penh (RUPP)"
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Degree / Qualification <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.degree}
                    onChange={(e) => updateItem(item.id, { degree: e.target.value })}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Field of Study <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.fieldOfStudy}
                    onChange={(e) => updateItem(item.id, { fieldOfStudy: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Start Year
                    </label>
                    <input
                      type="text"
                      value={item.startDate || ""}
                      onChange={(e) => updateItem(item.id, { startDate: e.target.value })}
                      placeholder="e.g. 2020"
                      className="w-full text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Graduation Year
                    </label>
                    <input
                      type="text"
                      value={item.endDate || ""}
                      onChange={(e) => updateItem(item.id, { endDate: e.target.value })}
                      placeholder="e.g. 2024"
                      className="w-full text-xs rounded-lg border border-slate-300 px-2 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    GPA / Honors (Optional)
                  </label>
                  <input
                    type="text"
                    value={item.gpa || ""}
                    onChange={(e) => updateItem(item.id, { gpa: e.target.value })}
                    placeholder="e.g. 3.85 / 4.0 (Honor Roll)"
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Achievements & Relevant Coursework */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    Honors & Relevant Coursework
                  </label>
                  <button
                    type="button"
                    onClick={() => addAchievement(item.id)}
                    className="text-[11px] font-semibold text-indigo-600 hover:underline flex items-center gap-0.5"
                  >
                    <Plus className="h-3 w-3" /> Add Item
                  </button>
                </div>

                <div className="space-y-1.5">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-center gap-1.5">
                      <span className="text-slate-400 text-xs">•</span>
                      <input
                        type="text"
                        value={ach}
                        onChange={(e) => updateAchievement(item.id, aIdx, e.target.value)}
                        placeholder="e.g. President of Coding Club / 1st Place National Hackathon"
                        className="w-full text-xs rounded-lg border border-slate-300 px-2.5 py-1.5 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => removeAchievement(item.id, aIdx)}
                        className="p-1 text-slate-400 hover:text-rose-500"
                        title="Remove"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
