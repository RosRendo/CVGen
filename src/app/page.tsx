"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { CVRenderer } from "@/components/templates/CVRenderer";
import { SOKHA_CHAN_CV, ALEX_RIVERA_CV } from "@/lib/constants/sample-data";
import { TEMPLATES_CONFIG } from "@/lib/constants/themes";
import { TemplateId, CVData } from "@/lib/types/cv";
import {
  ArrowUpRight,
  Check,
  FileText,
  Sliders,
  ShieldCheck,
  Code2,
  GraduationCap,
  Briefcase,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export default function HomePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("modern");

  const previewData: CVData = {
    ...SOKHA_CHAN_CV,
    settings: {
      ...SOKHA_CHAN_CV.settings,
      templateId: selectedTemplate,
    },
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-zinc-900 selection:text-white font-sans antialiased">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 border-b border-zinc-200/70 overflow-hidden">
          {/* Subtle architectural grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Typography & Intent */}
              <div className="lg:col-span-6 space-y-6 text-left">
                {/* Minimalist Engineering Badge */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-[11px] font-mono text-zinc-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>A4 Vector Standard / Zero Fluff</span>
                </div>

                {/* Primary Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-zinc-950 leading-[1.08]">
                  The CV builder designed for precision.
                </h1>

                {/* Supporting Copy */}
                <p className="text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed font-normal">
                  No bloated graphic templates, no AI hallucinations, and no broken Microsoft Word margins. Enter your background, select a recruiter-tested typography layout, and download a true vector PDF in minutes.
                </p>

                {/* Direct Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                  <Link
                    href="/builder"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold tracking-tight shadow-xs active:scale-95 transition-all"
                  >
                    <span>Start Building — Free</span>
                    <ArrowUpRight className="h-4 w-4 text-zinc-400" />
                  </Link>

                  <Link
                    href="/templates"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-medium transition-all"
                  >
                    <span>Inspect 4 Templates</span>
                  </Link>
                </div>

                {/* Technical Trust Strip */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] font-mono text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-zinc-800 stroke-[2.5]" />
                    <span>Vector A4 PDF</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-zinc-800 stroke-[2.5]" />
                    <span>No Login Wall</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-zinc-800 stroke-[2.5]" />
                    <span>ATS Verified</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-zinc-800 stroke-[2.5]" />
                    <span>Khmer Unicode</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Live A4 Document Interactive Preview */}
              <div className="lg:col-span-6 relative flex flex-col items-center">
                {/* Template Segmented Switcher */}
                <div className="flex items-center gap-1 bg-zinc-100/90 p-1 rounded-full border border-zinc-200 mb-4 text-xs font-medium max-w-full overflow-x-auto">
                  {(
                    [
                      "modern",
                      "classic",
                      "technical",
                      "graduate",
                      "executive",
                      "minimal",
                      "compact",
                      "creative",
                      "nordic",
                      "startup",
                      "corporate",
                      "infographic",
                      "floral",
                      "boho",
                      "artisan",
                      "pastel",
                      "ribbon",
                      "portal",
                      "midnight",
                      "colorblock",
                      "axis",
                      "ocean",
                      "diamond",
                      "horizon",
                    ] as TemplateId[]
                  ).map((tplId) => (
                    <button
                      key={tplId}
                      onClick={() => setSelectedTemplate(tplId)}
                      className={`px-3 py-1 rounded-full transition-all capitalize text-[11px] whitespace-nowrap shrink-0 ${
                        selectedTemplate === tplId
                          ? "bg-white text-zinc-950 shadow-xs font-semibold"
                          : "text-zinc-500 hover:text-zinc-900"
                      }`}
                    >
                      {tplId}
                    </button>
                  ))}
                </div>

                {/* Minimalist Document Sheet Frame */}
                <div className="relative w-full max-w-md sm:max-w-lg rounded-2xl border border-zinc-200/90 bg-zinc-50/60 p-3 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3 mb-3 px-1 text-xs font-mono">
                    <span className="text-[11px] text-zinc-400">
                      a4_sheet_{selectedTemplate}.pdf
                    </span>
                    <Link
                      href="/builder"
                      className="text-[11px] font-sans font-medium text-zinc-900 hover:underline flex items-center gap-1"
                    >
                      <span>Open in Editor</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>

                  {/* Scaled Preview Sheet */}
                  <div className="w-full overflow-hidden rounded-lg bg-zinc-100 flex justify-center p-2 sm:p-4 border border-zinc-200/40">
                    <div className="origin-top transition-transform transform scale-[0.48] sm:scale-[0.56] h-[480px] sm:h-[550px] -mb-40 sm:-mb-32">
                      <CVRenderer data={previewData} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURAL STANDARDS (NOT AI BUZZWORDS) */}
        <section id="how-it-works" className="py-20 md:py-28 bg-white border-b border-zinc-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-16 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                01 / Philosophy
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl mt-2">
                Built to be read by human recruiters and parsed by machines.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
                Most CV builders produce decorative graphics that fail ATS parsers or print awkwardly. CVGen is built on publishing-grade typesetting standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="border border-zinc-200 rounded-xl p-6 bg-white space-y-3">
                <div className="text-xs font-mono text-zinc-400">SPEC 01</div>
                <h3 className="text-base font-semibold text-zinc-900">
                  True Vector Print Pipeline
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  Export directly through browser vector print engines calibrated to exact 210 × 297 mm A4 dimensions. Text stays 100% crisp, selectable, and searchable at 500% zoom.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="border border-zinc-200 rounded-xl p-6 bg-white space-y-3">
                <div className="text-xs font-mono text-zinc-400">SPEC 02</div>
                <h3 className="text-base font-semibold text-zinc-900">
                  Grounded Phrasing Assistant
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  Our rewrite algorithm converts passive duty descriptions into active, quantified statements. It prompts for your real metrics (`[X%]`) rather than inventing fake data.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="border border-zinc-200 rounded-xl p-6 bg-white space-y-3">
                <div className="text-xs font-mono text-zinc-400">SPEC 03</div>
                <h3 className="text-base font-semibold text-zinc-900">
                  Local-First Draft Privacy
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  You are never forced into a paywall after typing your experience. Your draft persists locally in your browser storage. Export JSON backups or vector PDFs freely.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 TEMPLATES SHOWCASE */}
        <section className="py-20 md:py-28 bg-zinc-50 border-b border-zinc-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                  02 / Formats
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl mt-2">
                  Four purpose-built layouts
                </h2>
                <p className="mt-2 text-sm text-zinc-600 max-w-xl">
                  Each template targets a distinct hiring culture — from conservative corporate institutions to modern engineering teams.
                </p>
              </div>
              <Link
                href="/templates"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-900 hover:text-zinc-600 transition-colors"
              >
                <span>View specification & guidelines</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEMPLATES_CONFIG.map((tpl) => (
                <div
                  key={tpl.id}
                  className="rounded-xl border border-zinc-200 bg-white p-5 flex flex-col justify-between hover:border-zinc-300 transition-all shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-zinc-500">
                        {tpl.id}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700">
                        {tpl.thumbnailBadge}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-zinc-950">
                      {tpl.name}
                    </h3>
                    <p className="text-xs text-zinc-600 leading-relaxed">
                      {tpl.tagline}
                    </p>
                    <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-100">
                      <span className="font-medium text-zinc-700">Best for:</span> {tpl.bestFor}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-zinc-100">
                    <Link
                      href="/builder"
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-950 hover:bg-zinc-800 text-white font-medium text-xs transition-colors"
                    >
                      <span>Select Template</span>
                      <ArrowUpRight className="h-3 w-3 text-zinc-400" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE & AFTER PHRASING COMPARISON */}
        <section id="features" className="py-20 md:py-28 bg-white border-b border-zinc-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-14 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                03 / Phrasing Engine
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl mt-2">
                Honest bullet point elevation.
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                Weak bullet points read like job duties. Strong bullet points communicate impact and scope without exaggeration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Before */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                  <span className="text-xs font-mono uppercase text-zinc-500">
                    Before / Duty-Focused
                  </span>
                  <span className="text-[10px] text-zinc-400 font-mono">Passive</span>
                </div>
                <div className="space-y-3 text-xs text-zinc-600">
                  <div className="p-3 rounded-lg bg-white border border-zinc-200 font-mono text-[11px]">
                    &quot;Helped with the company checkout page and fixed some bugs in React.&quot;
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-zinc-200 font-mono text-[11px]">
                    &quot;Responsible for database queries and making APIs.&quot;
                  </div>
                  <div className="p-3 rounded-lg bg-white border border-zinc-200 font-mono text-[11px]">
                    &quot;Good student who knows how to code and work in a team.&quot;
                  </div>
                </div>
              </div>

              {/* After */}
              <div className="rounded-xl border border-zinc-900 bg-white p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                  <span className="text-xs font-mono uppercase text-zinc-900 font-semibold">
                    After / Impact & Metrics
                  </span>
                  <span className="text-[10px] text-emerald-600 font-mono font-medium">Quantified</span>
                </div>
                <div className="space-y-3 text-xs text-zinc-800">
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 font-mono text-[11px]">
                    &quot;Refactored customer checkout flow with Next.js and Tailwind CSS, reducing page load latency by 38% and cart abandonment by 14%.&quot;
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 font-mono text-[11px]">
                    &quot;Engineered RESTful backend microservices in Node.js and PostgreSQL handling 40,000+ daily transactions with 99.9% uptime.&quot;
                  </div>
                  <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 font-mono text-[11px]">
                    &quot;Computer Science graduate from RUPP with hands-on full-stack project experience, recognized with 1st Place National Hackathon honors.&quot;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="py-20 md:py-28 bg-zinc-50 border-b border-zinc-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mb-14 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                04 / Pricing
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl mt-2">
                Transparent & accessible.
              </h2>
              <p className="mt-2 text-sm text-zinc-600">
                You will never be surprised by a paywall when attempting to download your own resume.
              </p>
            </div>

            <div className="max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Free Plan */}
              <div className="rounded-xl border border-zinc-200 bg-white p-7 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-zinc-900">Community / Free</h3>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-0.5 rounded bg-zinc-100">
                      Standard
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-zinc-950 my-4">
                    $0 <span className="text-xs font-normal text-zinc-500 font-mono">/ lifetime</span>
                  </div>
                  <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
                    Everything you need to create, preview, and download a professional vector CV.
                  </p>

                  <ul className="space-y-2.5 text-xs text-zinc-700 mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-zinc-900 stroke-[2.5]" />
                      <span>Classic & Modern template access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-zinc-900 stroke-[2.5]" />
                      <span>Unlimited vector A4 PDF downloads</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-zinc-900 stroke-[2.5]" />
                      <span>Local browser autosave & JSON backup</span>
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
                  Start Building Free
                </Link>
              </div>

              {/* Pro Plan */}
              <div className="rounded-xl border border-zinc-950 bg-white p-7 flex flex-col justify-between shadow-sm relative">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-zinc-950">Pro Career</h3>
                    <span className="text-[10px] font-mono text-white uppercase px-2 py-0.5 rounded bg-zinc-950">
                      Extended
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-zinc-950 my-4">
                    $5 <span className="text-xs font-normal text-zinc-500 font-mono">/ mo (or ABA KHQR)</span>
                  </div>
                  <p className="text-xs text-zinc-600 mb-6 leading-relaxed">
                    Designed for active candidates tailoring resumes across multiple company applications.
                  </p>

                  <ul className="space-y-2.5 text-xs text-zinc-800 mb-8">
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                      <span>All 4 templates (Technical, Graduate, Modern, Classic)</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                      <span>AI Job Description Tailoring & Match Analysis</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                      <span>Cloud account sync across multiple devices</span>
                    </li>
                    <li className="flex items-center gap-2 font-medium">
                      <Check className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5]" />
                      <span>One-click CV duplication for role variations</span>
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
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-20 md:py-28 bg-white border-b border-zinc-200/70">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="mb-14 text-left">
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                05 / FAQ
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              <div className="border border-zinc-200 rounded-xl p-5 bg-white">
                <h4 className="font-semibold text-zinc-950 text-xs sm:text-sm mb-2">
                  Does CVGen invent qualifications or fake credentials?
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Never. We follow a strict zero-hallucination constraint. Our AI bullet enhancer strengthens grammar, highlights measurable outcomes, and eliminates passive voice, but will never fabricate companies, degrees, or certifications you did not achieve.
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-5 bg-white">
                <h4 className="font-semibold text-zinc-950 text-xs sm:text-sm mb-2">
                  Is the downloaded PDF selectable text or an image capture?
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  It is a true vector PDF rendered via the browser&apos;s native A4 print engine. Text can be searched, highlighted, and parsed cleanly by human hiring managers and applicant tracking systems (ATS).
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-5 bg-white">
                <h4 className="font-semibold text-zinc-950 text-xs sm:text-sm mb-2">
                  Does it properly support Khmer language characters?
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Yes. We use Google Kantumruy Pro with complete Unicode coverage, ensuring Khmer consonants, subscript vowels, and diacritics render cleanly with zero broken glyphs.
                </p>
              </div>

              <div className="border border-zinc-200 rounded-xl p-5 bg-white">
                <h4 className="font-semibold text-zinc-950 text-xs sm:text-sm mb-2">
                  Can I create and download without an account?
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Yes. You can draft, preview, and download your CV immediately in your browser. Account registration is only required if you want cloud sync across devices and multi-resume management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CLEAN CALL TO ACTION */}
        <section className="py-20 md:py-24 bg-zinc-950 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Start drafting your CV now.
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              No registration barrier. No design expertise required. Clean, publication-grade results.
            </p>
            <div className="pt-2">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-semibold shadow-xs active:scale-95 transition-all"
              >
                <span>Open CV Builder</span>
                <ArrowUpRight className="h-4 w-4 text-zinc-500" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
