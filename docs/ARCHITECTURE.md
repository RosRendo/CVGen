# CVGen: Production-Ready AI CV Generator SaaS Architecture

**Date:** 2026-10-23
**Status:** Approved & Implemented (Phase 1 MVP)

---

## 1. Executive Summary & Value Proposition
CVGen is a high-performance, mobile-responsive AI CV Generator SaaS designed for students, fresh graduates, and job seekers (starting with Cambodia and expanding internationally). It provides a frictionless workflow: enter experience, select a template, polish phrasing with AI, preview live in real-time, and download a publication-grade, selectable A4 PDF.

---

## 2. Core Architectural Decisions

### 2.1 Technology Stack
- **Framework:** Next.js 16 App Router (React 19, Turbopack, TypeScript strict)
- **Styling:** Tailwind CSS v4, custom Apple-grade UI system (frosted glass vibrancy, spring animations, accessible contrast)
- **Validation & Forms:** Zod schemas (`src/lib/types/cv.ts`) + React Hook Form
- **Data Persistence Strategy (Dual-Tier):**
  - **Tier 1 (Client/MVP):** Instant offline-first `localStorage` draft saving with 500ms debouncing, autosave status indicator, and JSON import/export disaster recovery.
  - **Tier 2 (Server/Production):** Prisma ORM with PostgreSQL database schema (`User`, `CV`, `AIUsage`).
- **Icons & Visuals:** `lucide-react`, canvas confetti for milestone completion.

### 2.2 Template Architecture
Four strictly distinct, production-tested templates sharing a single validated `CVData` contract:
1. **Classic:** Conservative single-column format, serif headers, timeless divider rules, corporate recruiters' favorite.
2. **Modern:** Contemporary sans-serif, colored accent header banner, crisp tags, high visual scannability.
3. **Technical:** Developer-first layout, technical skills matrix, GitHub/demo links, system impact bullets.
4. **Graduate:** Student-first structure, education & GPA on top, honors, academic projects, leadership/volunteer highlights.

### 2.3 Publication-Grade PDF & Print Pipeline
- **Vector-First Print Engine:** Leverages `@media print` and `@page { size: A4; margin: 0; }` with CSS page-break avoidance (`break-inside: avoid`). Produces 100% crisp, selectable, searchable vector text with zero raster blur.
- **Client-Side One-Click Download:** Integrated `jspdf` + `html2canvas` fallback engine generating direct `[FirstName]_[LastName]_CV.pdf`.
- **Khmer Unicode Compatibility:** Uses Google Font `Kantumruy Pro` / `Noto Sans Khmer` with fallback to `Plus Jakarta Sans` / `Inter`, ensuring zero tofu characters or broken vowels.

### 2.4 Server-Side AI Abstraction
- Endpoints: `/api/ai/improve`, `/api/ai/summary`, `/api/ai/tailor`.
- Multi-tier provider abstraction: Primary Gemini API / OpenAI API behind server credentials.
- **Zero-Breakage Fallback:** Robust local heuristic rewriting engine guarantees that if API keys are absent or network is degraded, the user still receives actionable CV enhancements without failure.
- **Safety Policy:** Never hallucinates or fabricates fake work experiences. Only strengthens user-supplied data with active verbs and impact framing.

---

## 3. Route Map
- `/` — High-converting landing page (Hero, live interactive CV mockup, template gallery, interactive FAQ, CTA).
- `/builder` — Two-panel desktop editor (Form + Live zoomable A4 preview), responsive mobile tab switcher.
- `/templates` — Interactive template showcase with "Use Template" direct links.
- `/pricing` — Transparent free vs. pro tiers with FAQ.
- `/privacy` & `/terms` — Comprehensive user privacy & data retention terms.
