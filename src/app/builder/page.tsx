import { Metadata } from "next";
import { BuilderLayout } from "@/components/builder/BuilderLayout";

export const metadata: Metadata = {
  title: "CV Builder | CVGen SaaS",
  description: "Create, customize, and export a professional CV in minutes with live preview and AI writing assistance.",
};

export default function BuilderPage() {
  return <BuilderLayout />;
}
