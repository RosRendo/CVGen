import React from "react";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white pt-12 pb-8 text-zinc-600 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-950 text-white font-semibold text-xs">
                CV
              </div>
              <span className="font-semibold text-zinc-950 tracking-tight text-sm">
                CVGen
              </span>
            </Link>
            <p className="text-zinc-500 leading-relaxed text-xs">
              A distraction-free CV builder engineered for precision, publication-grade typography, and ATS compliance.
            </p>
            <div className="text-zinc-400 font-mono text-[11px]">
              Engineered for Cambodia & Global Job Seekers
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-mono text-zinc-400 uppercase tracking-widest text-[10px] mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/builder" className="hover:text-zinc-950 transition-colors">
                  CV Builder
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-zinc-950 transition-colors">
                  Templates Catalog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-zinc-950 transition-colors">
                  Pricing & Tiers
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-zinc-950 transition-colors">
                  Phrasing Engine
                </Link>
              </li>
            </ul>
          </div>

          {/* Templates */}
          <div>
            <h4 className="font-mono text-zinc-400 uppercase tracking-widest text-[10px] mb-3">
              Typography Layouts
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/builder" className="hover:text-zinc-950 transition-colors">
                  Modern Layout
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-zinc-950 transition-colors">
                  Classic Corporate
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-zinc-950 transition-colors">
                  Technical Engineer
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-zinc-950 transition-colors">
                  Academic Graduate
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h4 className="font-mono text-zinc-400 uppercase tracking-widest text-[10px] mb-3">
              Standards & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-zinc-950 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-zinc-950 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-zinc-400">Zero Hallucination Guarantee</span>
              </li>
              <li>
                <span className="text-zinc-400">Selectable Vector PDF Output</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 font-mono text-[11px]">
          <p>© 2026 CVGen. All rights reserved.</p>
          <p>Export print-ready vector A4 PDFs without watermarks.</p>
        </div>
      </div>
    </footer>
  );
};
