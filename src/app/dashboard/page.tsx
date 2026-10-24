"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  Copy,
  ArrowUpRight,
  LogOut,
  Clock,
  Loader2,
  FolderOpen,
} from "lucide-react";

interface SavedCV {
  id: string;
  title: string;
  templateId: string;
  colorTheme: string;
  fontFamily: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  plan: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [cvs, setCvs] = useState<SavedCV[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (!userData.user) {
          router.push("/login");
          return;
        }

        setUser(userData.user);

        const cvRes = await fetch("/api/cvs");
        const cvData = await cvRes.json();
        setCvs(cvData.cvs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const handleDuplicate = async (id: string) => {
    try {
      setActionId(id);
      const res = await fetch(`/api/cvs/${id}/duplicate`, { method: "POST" });
      if (!res.ok) throw new Error("Duplication failed");
      const data = await res.json();
      setCvs([data.cv, ...cvs]);
    } catch {
      alert("Failed to duplicate CV.");
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      setActionId(id);
      const res = await fetch(`/api/cvs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Deletion failed");
      setCvs(cvs.filter((c) => c.id !== id));
    } catch {
      alert("Failed to delete CV.");
    } finally {
      setActionId(null);
    }
  };

  const handleCreateNew = async () => {
    try {
      setActionId("new");
      const res = await fetch("/api/cvs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "My New Resume",
        }),
      });

      if (!res.ok) throw new Error("Failed to create CV");
      const data = await res.json();
      router.push(`/builder/${data.cv.id}`);
    } catch {
      router.push("/builder");
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="text-center">
          <Loader2 className="h-6 w-6 animate-spin text-zinc-950 mx-auto mb-2" />
          <p className="text-xs text-zinc-500 font-mono">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans antialiased">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md px-4 sm:px-8 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-950 text-white font-semibold text-xs group-hover:bg-zinc-800 transition-colors">
                CV
              </div>
              <span className="font-semibold text-zinc-950 tracking-tight text-sm hidden sm:inline">
                CVGen
              </span>
            </Link>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-medium text-zinc-900">{user?.name}</div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase">{user?.plan} Tier</div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-50 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 py-10 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Header & Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-100">
            <div>
              <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">
                Saved Resumes
              </h1>
              <p className="mt-1 text-xs text-zinc-500">
                Manage, duplicate, and export your role-specific resumes.
              </p>
            </div>

            <button
              onClick={handleCreateNew}
              disabled={actionId === "new"}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs shadow-xs active:scale-95 transition-all"
            >
              {actionId === "new" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Plus className="h-3.5 w-3.5" />
              )}
              <span>Create New CV</span>
            </button>
          </div>

          {/* CVs Grid */}
          {cvs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-12 text-center max-w-md mx-auto my-12">
              <div className="h-10 w-10 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center mx-auto mb-3">
                <FolderOpen className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-900 mb-1">No resumes saved yet</h3>
              <p className="text-xs text-zinc-500 mb-5 leading-relaxed">
                Create your first cloud-backed CV. Select from 4 calibrated templates and edit with live preview.
              </p>
              <button
                onClick={handleCreateNew}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 text-white font-medium text-xs hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create CV</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cvs.map((cv) => (
                <div
                  key={cv.id}
                  className="rounded-xl border border-zinc-200 bg-white p-5 shadow-2xs hover:border-zinc-300 transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Template Badge & Menu */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase text-zinc-500 px-2 py-0.5 rounded bg-zinc-100">
                        {cv.templateId}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDuplicate(cv.id)}
                          disabled={actionId === cv.id}
                          className="p-1.5 rounded text-zinc-400 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
                          title="Duplicate"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(cv.id, cv.title)}
                          disabled={actionId === cv.id}
                          className="p-1.5 rounded text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <h2 className="text-base font-semibold text-zinc-950 group-hover:text-zinc-700 transition-colors line-clamp-1 mb-1">
                      {cv.title}
                    </h2>

                    <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 mb-5">
                      <Clock className="h-3 w-3" />
                      <span>Updated {new Date(cv.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-zinc-100 pt-4 flex items-center justify-between gap-2">
                    <Link
                      href={`/builder/${cv.id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs transition-colors shadow-2xs"
                    >
                      <span>Open Editor</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
