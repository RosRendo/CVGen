import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionFromRequest } from "@/lib/auth/auth-service";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const original = await prisma.cV.findUnique({
      where: { id },
    });

    if (!original) {
      return NextResponse.json({ error: "CV not found" }, { status: 404 });
    }

    if (original.userId !== session.userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const duplicated = await prisma.cV.create({
      data: {
        userId: session.userId,
        title: `${original.title} (Copy)`,
        templateId: original.templateId,
        colorTheme: original.colorTheme,
        fontFamily: original.fontFamily,
        fontSize: original.fontSize,
        spacing: original.spacing,
        data: original.data as object,
      },
    });

    return NextResponse.json({ cv: duplicated }, { status: 201 });
  } catch (error) {
    console.error("Duplicate CV Error:", error);
    return NextResponse.json({ error: "Failed to duplicate CV" }, { status: 500 });
  }
}
