import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Check, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing | CVGen",
  description: "Transparent, honest pricing for job seekers. Free tier forever, affordable Pro upgrades.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans antialiased">
      <Navbar />

      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-16 text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Pricing Policy
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight mt-2">
              Transparent, honest pricing.
            </h1>
            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
              No hidden recurring fees, no dark patterns, and no paywalls when trying to download your own resume.
            </p>
          </div>

          <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Free */}
            <div className="rounded-xl border border-zinc-200 bg-white p-8 flex flex-col justify-between shadow-2xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 px-2 py-0.5 rounded bg-zinc-100">
                  Community Tier
                </span>
                <div className="text-4xl font-bold text-zinc-950 my-5">
                  $0 <span className="text-xs font-normal text-zinc-500 font-mono">/ lifetime</span>
                </div>
                <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
                  Everything you need to build, preview, and download a publication-grade CV.
                </p>

                <ul className="space-y-3 text-xs text-zinc-700 mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-zinc-900 stroke-[2.5]" />
                    <span>Access to Classic & Modern layouts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-zinc-900 stroke-[2.5]" />
                    <span>Unlimited vector A4 PDF downloads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-zinc-900 stroke-[2.5]" />
                    <span>Offline local draft auto-saving</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-zinc-900 stroke-[2.5]" />
                    <span>JSON data backup and restore</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-zinc-900 stroke-[2.5]" />
                    <span>Full Khmer Unicode (Kantumruy Pro)</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/builder"
                className="w-full text-center py-2.5 rounded-lg border border-zinc-300 hover:bg-zinc-50 text-zinc-900 font-medium text-xs transition-colors"
              >
                Start Free
              </Link>
            </div>

            {/* Pro */}
            <div className="rounded-xl border border-zinc-950 bg-white p-8 flex flex-col justify-between shadow-sm relative">
              <div>
                <span className="text-[10px] font-mono text-white uppercase px-2 py-0.5 rounded bg-zinc-950">
                  Career Pro
                </span>
                <div className="text-4xl font-bold text-zinc-950 my-5">
                  $5 <span className="text-xs font-normal text-zinc-500 font-mono">/ month (or ABA KHQR)</span>
                </div>
                <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
                  Designed for active job applicants requiring role-specific variations and job tailoring.
                </p>

                <ul className="space-y-3 text-xs text-zinc-800 mb-8">
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                    <span>All 4 templates (Technical, Graduate, Modern, Classic)</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                    <span>AI Job Description Matcher & Keyword Gap Analysis</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                    <span>Cloud sync across devices</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                    <span>Unlimited CV duplicates for different positions</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                    <span>Local Cambodia KHQR direct checkout support</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/builder"
                className="w-full text-center py-2.5 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs transition-colors"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
