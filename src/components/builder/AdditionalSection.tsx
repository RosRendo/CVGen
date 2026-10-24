"use client";

import React from "react";
import { CVData, CertificationItem, VolunteerItem, AwardItem } from "@/lib/types/cv";
import { Award, Plus, Trash2, HeartHandshake, ShieldCheck, Terminal } from "lucide-react";

interface Props {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export const AdditionalSection: React.FC<Props> = ({ data, onChange }) => {
  const { additional } = data;

  // Certifications
  const addCert = () => {
    const newCert: CertificationItem = {
      id: "cert-" + Math.random().toString(36).substring(2, 7),
      name: "",
      issuer: "",
      date: "",
      url: "",
    };
    onChange({
      ...data,
      additional: {
        ...additional,
        certifications: [...additional.certifications, newCert],
      },
    });
  };

  const updateCert = (id: string, updates: Partial<CertificationItem>) => {
    onChange({
      ...data,
      additional: {
        ...additional,
        certifications: additional.certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)),
      },
    });
  };

  const removeCert = (id: string) => {
    onChange({
      ...data,
      additional: {
        ...additional,
        certifications: additional.certifications.filter((c) => c.id !== id),
      },
    });
  };

  // Volunteer
  const addVolunteer = () => {
    const newVol: VolunteerItem = {
      id: "vol-" + Math.random().toString(36).substring(2, 7),
      role: "",
      organization: "",
      period: "",
      description: "",
    };
    onChange({
      ...data,
      additional: {
        ...additional,
        volunteer: [...additional.volunteer, newVol],
      },
    });
  };

  const updateVolunteer = (id: string, updates: Partial<VolunteerItem>) => {
    onChange({
      ...data,
      additional: {
        ...additional,
        volunteer: additional.volunteer.map((v) => (v.id === id ? { ...v, ...updates } : v)),
      },
    });
  };

  const removeVolunteer = (id: string) => {
    onChange({
      ...data,
      additional: {
        ...additional,
        volunteer: additional.volunteer.filter((v) => v.id !== id),
      },
    });
  };

  // Awards
  const addAward = () => {
    const newAward: AwardItem = {
      id: "award-" + Math.random().toString(36).substring(2, 7),
      title: "",
      issuer: "",
      date: "",
      description: "",
    };
    onChange({
      ...data,
      additional: {
        ...additional,
        awards: [...additional.awards, newAward],
      },
    });
  };

  const updateAward = (id: string, updates: Partial<AwardItem>) => {
    onChange({
      ...data,
      additional: {
        ...additional,
        awards: additional.awards.map((a) => (a.id === id ? { ...a, ...updates } : a)),
      },
    });
  };

  const removeAward = (id: string) => {
    onChange({
      ...data,
      additional: {
        ...additional,
        awards: additional.awards.filter((a) => a.id !== id),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <Award className="h-5 w-5 text-indigo-600" />
        <h2 className="text-base font-bold text-slate-900">Certifications & Leadership</h2>
      </div>

      {/* Certifications */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            Licenses & Certifications
          </label>
          <button
            type="button"
            onClick={addCert}
            className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-0.5"
          >
            <Plus className="h-3 w-3" /> Add Certificate
          </button>
        </div>

        {additional.certifications.map((cert) => (
          <div key={cert.id} className="rounded-lg border border-slate-200 bg-white p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">
                {cert.name || "Untitled Certificate"}
              </span>
              <button
                type="button"
                onClick={() => removeCert(cert.id)}
                className="text-slate-400 hover:text-rose-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCert(cert.id, { name: e.target.value })}
                placeholder="Certificate Name (e.g. AWS Cloud Practitioner)"
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:col-span-2"
              />
              <input
                type="text"
                value={cert.issuer}
                onChange={(e) => updateCert(cert.id, { issuer: e.target.value })}
                placeholder="Issuer (e.g. Amazon Web Services)"
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Volunteer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <HeartHandshake className="h-4 w-4 text-indigo-600" />
            Volunteering & Community Leadership
          </label>
          <button
            type="button"
            onClick={addVolunteer}
            className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-0.5"
          >
            <Plus className="h-3 w-3" /> Add Volunteering
          </button>
        </div>

        {additional.volunteer.map((vol) => (
          <div key={vol.id} className="rounded-lg border border-slate-200 bg-white p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">{vol.role || "Volunteer Role"}</span>
              <button
                type="button"
                onClick={() => removeVolunteer(vol.id)}
                className="text-slate-400 hover:text-rose-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                value={vol.role}
                onChange={(e) => updateVolunteer(vol.id, { role: e.target.value })}
                placeholder="Role (e.g. Coding Instructor)"
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="text"
                value={vol.organization}
                onChange={(e) => updateVolunteer(vol.id, { organization: e.target.value })}
                placeholder="Organization (e.g. PNC Cambodia)"
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="text"
                value={vol.description || ""}
                onChange={(e) => updateVolunteer(vol.id, { description: e.target.value })}
                placeholder="Brief description of impact / community service..."
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:col-span-2"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Awards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-amber-500" />
            Honors & Awards
          </label>
          <button
            type="button"
            onClick={addAward}
            className="text-xs font-semibold text-indigo-600 hover:underline flex items-center gap-0.5"
          >
            <Plus className="h-3 w-3" /> Add Award
          </button>
        </div>

        {additional.awards.map((award) => (
          <div key={award.id} className="rounded-lg border border-slate-200 bg-white p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800">{award.title || "Award Title"}</span>
              <button
                type="button"
                onClick={() => removeAward(award.id)}
                className="text-slate-400 hover:text-rose-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                value={award.title}
                onChange={(e) => updateAward(award.id, { title: e.target.value })}
                placeholder="Award Title (e.g. MPTC Innovation Grant)"
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="text"
                value={award.issuer}
                onChange={(e) => updateAward(award.id, { issuer: e.target.value })}
                placeholder="Issuing Body / Organization"
                className="rounded-lg border border-slate-300 px-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Interests, Sports & Hobbies */}
      <div className="space-y-3 pt-3 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Award className="h-4 w-4 text-emerald-500" />
            Interests, Sports & Activities
          </label>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed">
          Add hobbies, athletic pursuits, and personal interests (e.g. Football, Fitness, Trading Analytics, Chess).
        </p>

        <div className="flex flex-wrap gap-1.5">
          {(additional.interests || []).map((interest, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800"
            >
              <span>{interest}</span>
              <button
                type="button"
                onClick={() => {
                  const updated = (additional.interests || []).filter((_, i) => i !== idx);
                  onChange({
                    ...data,
                    additional: {
                      ...additional,
                      interests: updated,
                    },
                  });
                }}
                className="text-slate-400 hover:text-rose-500 ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Input to add new interest */}
        <div className="flex gap-2">
          <input
            id="new-interest-input"
            type="text"
            placeholder="Add new interest (e.g. ⚽ Football, 🏋️ Fitness)..."
            className="flex-1 text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.currentTarget;
                const val = input.value.trim();
                if (val) {
                  onChange({
                    ...data,
                    additional: {
                      ...additional,
                      interests: [...(additional.interests || []), val],
                    },
                  });
                  input.value = "";
                }
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById("new-interest-input") as HTMLInputElement;
              if (input && input.value.trim()) {
                onChange({
                  ...data,
                  additional: {
                    ...additional,
                    interests: [...(additional.interests || []), input.value.trim()],
                  },
                });
                input.value = "";
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 flex items-center gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Technical Tools & Environments Section */}
      <div className="space-y-3 pt-2 border-t border-slate-200">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Terminal className="h-4 w-4 text-amber-500" />
          Technical Tools & Infrastructure
        </label>
        <p className="text-[11px] text-slate-500">
          Tools, developer utilities, and deployment environments (e.g. Postman, Docker, Vercel, Nginx).
        </p>

        <div className="flex flex-wrap gap-1.5">
          {(additional.technicalTools || []).map((tool, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-xs font-medium text-amber-950"
            >
              <span>{tool}</span>
              <button
                type="button"
                onClick={() => {
                  const updated = (additional.technicalTools || []).filter((_, i) => i !== idx);
                  onChange({
                    ...data,
                    additional: {
                      ...additional,
                      technicalTools: updated,
                    },
                  });
                }}
                className="text-amber-500 hover:text-rose-500 ml-0.5"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Input to add new technical tool */}
        <div className="flex gap-2">
          <input
            id="new-tool-input"
            type="text"
            placeholder="Add tool (e.g. Git & GitHub, Postman, Vercel)..."
            className="flex-1 text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-amber-500 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.currentTarget;
                const val = input.value.trim();
                if (val) {
                  onChange({
                    ...data,
                    additional: {
                      ...additional,
                      technicalTools: [...(additional.technicalTools || []), val],
                    },
                  });
                  input.value = "";
                }
              }
            }}
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById("new-tool-input") as HTMLInputElement;
              if (input && input.value.trim()) {
                onChange({
                  ...data,
                  additional: {
                    ...additional,
                    technicalTools: [...(additional.technicalTools || []), input.value.trim()],
                  },
                });
                input.value = "";
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-semibold hover:bg-amber-600 flex items-center gap-1"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
