"use client";

import React from "react";
import { CVData, ProjectItem } from "@/lib/types/cv";
import { FolderGit2, Plus, Trash2, ArrowUp, ArrowDown, Globe } from "lucide-react";
import { GithubIcon as Github } from "@/components/common/Icons";

interface Props {
  data: CVData;
  onChange: (newData: CVData) => void;
}

export const ProjectsSection: React.FC<Props> = ({ data, onChange }) => {
  const { projects } = data;

  const addProject = () => {
    const newItem: ProjectItem = {
      id: "proj-" + Math.random().toString(36).substring(2, 9),
      name: "",
      description: "",
      technologies: [],
      url: "",
      githubUrl: "",
    };
    onChange({
      ...data,
      projects: [newItem, ...projects],
    });
  };

  const updateItem = (id: string, updates: Partial<ProjectItem>) => {
    onChange({
      ...data,
      projects: projects.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    });
  };

  const removeItem = (id: string) => {
    onChange({
      ...data,
      projects: projects.filter((item) => item.id !== id),
    });
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const items = [...projects];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    onChange({ ...data, projects: items });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2">
          <FolderGit2 className="h-5 w-5 text-indigo-600" />
          <h2 className="text-base font-bold text-slate-900">Featured Projects</h2>
        </div>
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 rounded-xl border border-dashed border-slate-300 p-4">
          <p className="text-xs text-slate-500 mb-2">No projects added yet.</p>
          <button
            type="button"
            onClick={addProject}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            + Add your first project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((item, index) => (
            <div
              key={item.id}
              className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-slate-800">
                  #{index + 1} {item.name || "Untitled Project"}
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
                    disabled={index === projects.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                    title="Move Down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 ml-1"
                    title="Delete Project"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Project Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, { name: e.target.value })}
                    placeholder="e.g. KhmerEdu LMS Platform"
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Project Description <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) => updateItem(item.id, { description: e.target.value })}
                    placeholder="Describe what the project does, key features, and your individual contribution..."
                    className="w-full text-xs rounded-lg border border-slate-300 p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Technologies Used (comma separated)
                  </label>
                  <input
                    type="text"
                    value={item.technologies.join(", ")}
                    onChange={(e) =>
                      updateItem(item.id, {
                        technologies: e.target.value
                          .split(",")
                          .map((t) => t.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="e.g. Next.js, PostgreSQL, Tailwind CSS, Prisma"
                    className="w-full text-xs rounded-lg border border-slate-300 px-3 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Live URL (Optional)
                    </label>
                    <div className="relative">
                      <Globe className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2" />
                      <input
                        type="url"
                        value={item.url || ""}
                        onChange={(e) => updateItem(item.id, { url: e.target.value })}
                        placeholder="https://myproject.com"
                        className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      GitHub / Repo URL (Optional)
                    </label>
                    <div className="relative">
                      <Github className="h-3.5 w-3.5 text-slate-400 absolute left-2.5 top-2" />
                      <input
                        type="url"
                        value={item.githubUrl || ""}
                        onChange={(e) => updateItem(item.id, { githubUrl: e.target.value })}
                        placeholder="https://github.com/..."
                        className="w-full text-xs rounded-lg border border-slate-300 pl-8 pr-2.5 py-1.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
