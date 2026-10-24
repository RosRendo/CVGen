import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CVGen — AI CV Generator SaaS | Professional Resumes in Minutes",
  description:
    "Build a professional, recruiter-friendly CV in minutes with live preview, AI assistance, 4 polished templates, and selectable vector A4 PDF export. Built for Cambodia and global job seekers.",
  keywords: [
    "CV Generator",
    "Resume Builder",
    "AI CV",
    "Cambodia CV",
    "Khmer CV",
    "A4 PDF Resume",
    "Tech Resume",
    "Graduate CV",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
