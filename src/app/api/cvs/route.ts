import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth/auth-service";
import { CVDataSchema } from "@/lib/types/cv";

// GET /api/cvs - List user's saved CVs
export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const cvs = await prisma.cV.findMany({
      where: { userId: session.userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        templateId: true,
        colorTheme: true,
        fontFamily: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ cvs });
  } catch (error) {
    console.error("List CVs Error:", error);
    return NextResponse.json({ error: "Failed to fetch CVs" }, { status: 500 });
  }
}

// POST /api/cvs - Create a new saved CV
export async function POST(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const body = await req.json();
    const parsed = CVDataSchema.safeParse(body.data ?? body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid CV data structure", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const cvData = parsed.data;
    const title = body.title || cvData.title || "Untitled Resume";

    const newCv = await prisma.cV.create({
      data: {
        userId: session.userId,
        title,
        templateId: cvData.settings.templateId,
        colorTheme: cvData.settings.colorTheme,
        fontFamily: cvData.settings.fontFamily,
        fontSize: cvData.settings.fontSize,
        spacing: cvData.settings.spacing,
        data: cvData as unknown as object,
      },
    });

    return NextResponse.json({ cv: newCv }, { status: 201 });
  } catch (error) {
    console.error("Create CV Error:", error);
    return NextResponse.json({ error: "Failed to save CV" }, { status: 500 });
  }
}
