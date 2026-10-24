import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | CVGen SaaS",
  description: "CVGen Privacy Policy: How we protect, store, and respect your personal career data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs">
          <h1 className="text-3xl font-extrabold text-slate-950 mb-6">Privacy Policy</h1>
          <p className="text-xs text-slate-500 mb-8">Last Updated: October 23, 2026</p>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">1. Overview & Core Commitment</h2>
              <p>
                CVGen (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) treats your curriculum vitae, employment history, and personal contact details with the highest degree of confidentiality. We do not sell your personal data or distribute your resume to third-party recruiters without your explicit instruction.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. Local Storage & Draft Privacy</h2>
              <p>
                When creating a CV in the builder without an account, your work is saved locally in your browser&apos;s localStorage. We do not transmit your unauthenticated drafts to external tracking servers.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. AI Processing & Zero-Hallucination Policy</h2>
              <p>
                When you choose to use the AI bullet enhancement or summary generation features, only the specific text snippet you request to improve is processed. Our AI prompts are strictly designed to improve phrasing and structure without fabricating false credentials.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">4. Data Deletion Rights</h2>
              <p>
                You retain complete ownership over your data. You may clear your browser draft at any time using the Reset option in the builder, or delete your account and associated CV records.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">5. Contact Us</h2>
              <p>
                For privacy inquiries or data requests, please contact our privacy officer at <a href="mailto:privacy@cvgen.app" className="text-indigo-600 underline">privacy@cvgen.app</a>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
