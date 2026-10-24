"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Shield, ArrowLeft, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string; email: string; plan: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (!data.user) {
          router.push("/login");
          return;
        }
        setUser(data.user);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-950" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 py-10 px-4 sm:px-8 font-sans antialiased">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 pb-6 border-b border-zinc-100">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950 mb-3 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">
            Account Settings
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            Manage your profile details and membership tier.
          </p>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-2xs">
            <h2 className="text-sm font-semibold text-zinc-950 flex items-center gap-2 mb-4">
              <User className="h-4 w-4 text-zinc-600" />
              <span>Profile Credentials</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-400 uppercase text-[10px] mb-1 font-sans">Full Name</label>
                <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-800">
                  {user?.name}
                </div>
              </div>
              <div>
                <label className="block text-zinc-400 uppercase text-[10px] mb-1 font-sans">Email Address</label>
                <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-800">
                  {user?.email}
                </div>
              </div>
            </div>
          </div>

          {/* Membership Tier Card */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-zinc-950 flex items-center gap-2">
                <Shield className="h-4 w-4 text-zinc-600" />
                <span>Subscription Plan</span>
              </h2>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 text-zinc-800">
                {user?.plan} Tier
              </span>
            </div>

            <p className="text-xs text-zinc-600 mb-4 leading-relaxed">
              Your account currently has access to core publishing-grade templates and unlimited vector A4 PDF exports.
            </p>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-medium transition-colors shadow-2xs"
            >
              <span>View Upgrade Options</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
