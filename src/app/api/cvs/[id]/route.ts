import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth/auth-service";
import { CVDataSchema } from "@/lib/types/cv";

// GET /api/cvs/[id] - Fetch single CV with ownership check (IDOR defense)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const cv = await prisma.cV.findUnique({
      where: { id },
    });

    if (!cv) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    // Tenancy authorization check
    if (cv.userId !== session.userId) {
      return NextResponse.json({ error: "Forbidden: You do not have permission to view this CV" }, { status: 403 });
    }

    return NextResponse.json({ cv });
  } catch (error) {
    console.error("Fetch CV Error:", error);
    return NextResponse.json({ error: "Failed to load CV" }, { status: 500 });
  }
}

// PUT /api/cvs/[id] - Update CV with ownership check
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.cV.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    if (existing.userId !== session.userId) {
      return NextResponse.json({ error: "Forbidden: You cannot modify this CV" }, { status: 403 });
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
    const title = body.title || cvData.title || existing.title;

    const updated = await prisma.cV.update({
      where: { id },
      data: {
        title,
        templateId: cvData.settings.templateId,
        colorTheme: cvData.settings.colorTheme,
        fontFamily: cvData.settings.fontFamily,
        fontSize: cvData.settings.fontSize,
        spacing: cvData.settings.spacing,
        data: cvData as unknown as object,
      },
    });

    return NextResponse.json({ cv: updated });
  } catch (error) {
    console.error("Update CV Error:", error);
    return NextResponse.json({ error: "Failed to update CV" }, { status: 500 });
  }
}

// DELETE /api/cvs/[id] - Delete CV with ownership check
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await prisma.cV.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    if (existing.userId !== session.userId) {
      return NextResponse.json({ error: "Forbidden: You cannot delete this CV" }, { status: 403 });
    }

    await prisma.cV.delete({
      where: { id },
    });

    return NextResponse.json({ message: "CV deleted successfully" });
  } catch (error) {
    console.error("Delete CV Error:", error);
    return NextResponse.json({ error: "Failed to delete CV" }, { status: 500 });
  }
}
