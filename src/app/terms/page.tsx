import React from "react";
import { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | CVGen SaaS",
  description: "CVGen Terms of Service and acceptable use policies.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xs">
          <h1 className="text-3xl font-extrabold text-slate-950 mb-6">Terms of Service</h1>
          <p className="text-xs text-slate-500 mb-8">Last Updated: October 23, 2026</p>

          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
              <p>
                By accessing or using CVGen, you agree to be bound by these Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">2. Accuracy of User Information</h2>
              <p>
                You are solely responsible for ensuring that all professional experience, academic degrees, and certifications entered into the service are truthful and accurate. CVGen provides assistive tools but does not verify the truthfulness of user inputs.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">3. Intellectual Property & Export Rights</h2>
              <p>
                You retain full intellectual property ownership of all resume and CV content you produce. You are granted an irrevocable, royalty-free license to use, download, and distribute your generated PDFs for employment applications.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-slate-900 mb-2">4. Service Availability</h2>
              <p>
                While we strive for high uptime and continuous service, CVGen is provided on an &quot;as-is&quot; basis. We recommend maintaining local backups of your resume using our export feature.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
