"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function NewBuilderPage() {
  const router = useRouter();

  useEffect(() => {
    async function createAndRedirect() {
      try {
        const res = await fetch("/api/cvs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "My Professional Resume" }),
        });

        if (res.ok) {
          const json = await res.json();
          router.replace(`/builder/${json.cv.id}`);
          return;
        }
      } catch {
        // Fallback
      }

      router.replace("/builder");
    }

    createAndRedirect();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600 mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-medium">Initializing new resume...</p>
      </div>
    </div>
  );
}
