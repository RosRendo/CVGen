import { NextRequest, NextResponse } from "next/server";
import { tailorCvToJob } from "@/lib/ai/ai-service";
import { CVDataSchema } from "@/lib/types/cv";
import { z } from "zod";

const TailorRequestSchema = z.object({
  jobDescription: z.string().min(10, "Job description must be at least 10 characters long").max(5000),
  cvData: CVDataSchema,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = TailorRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload. Please provide a valid job description and CV data." },
        { status: 400 }
      );
    }

    const result = await tailorCvToJob(parsed.data.jobDescription, parsed.data.cvData);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Tailor Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze job description. Please try again." },
      { status: 500 }
    );
  }
}
