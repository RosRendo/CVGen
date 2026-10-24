import { NextRequest, NextResponse } from "next/server";
import { improveBulletText } from "@/lib/ai/ai-service";
import { z } from "zod";

const RequestSchema = z.object({
  text: z.string().min(1).max(1000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input. Please provide a text string between 1 and 1000 characters." },
        { status: 400 }
      );
    }

    const result = await improveBulletText(parsed.data.text);
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Improve Error:", error);
    return NextResponse.json(
      { error: "Failed to process text enhancement. Please try again." },
      { status: 500 }
    );
  }
}
