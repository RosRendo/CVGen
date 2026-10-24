import { NextRequest, NextResponse } from "next/server";
import { generateSummaryText } from "@/lib/ai/ai-service";
import { CVDataSchema } from "@/lib/types/cv";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CVDataSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid CV data structure provided." },
        { status: 400 }
      );
    }

    const result = await generateSummaryText(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Summary Error:", error);
    return NextResponse.json(
      { error: "Failed to generate summary. Please try again." },
      { status: 500 }
    );
  }
}
