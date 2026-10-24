"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-14">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-white font-semibold text-xs shadow-xs group-hover:bg-zinc-800 transition-colors">
            CV
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-900 tracking-tight text-sm">
              CVGen
            </span>
            <span className="text-[10px] font-mono text-zinc-400 font-medium">
              / craft
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-7 text-xs font-medium text-zinc-600">
          <Link
            href="/templates"
            className="hover:text-zinc-950 transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/#how-it-works"
            className="hover:text-zinc-950 transition-colors"
          >
            Workflow
          </Link>
          <Link
            href="/#features"
            className="hover:text-zinc-950 transition-colors"
          >
            Standards
          </Link>
          <Link
            href="/pricing"
            className="hover:text-zinc-950 transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* CTAs */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/login"
            className="text-xs font-medium text-zinc-600 hover:text-zinc-950 px-3 py-1.5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/builder"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-medium shadow-xs active:scale-95 transition-all"
          >
            <span>Open Builder</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white px-5 pt-3 pb-6 space-y-3">
          <Link
            href="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-zinc-700 py-2 hover:text-zinc-950"
          >
            Templates
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-zinc-700 py-2 hover:text-zinc-950"
          >
            Workflow
          </Link>
          <Link
            href="/#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-zinc-700 py-2 hover:text-zinc-950"
          >
            Standards
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-zinc-700 py-2 hover:text-zinc-950"
          >
            Pricing
          </Link>
          <div className="pt-2 border-t border-zinc-100 flex items-center gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2 text-xs font-medium text-zinc-700 rounded-lg border border-zinc-200"
            >
              Sign In
            </Link>
            <Link
              href="/builder"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-950 text-white text-xs font-medium"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Open Builder</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
