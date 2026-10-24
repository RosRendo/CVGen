import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth/auth-service";
import { prisma } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ user: user ?? null });
  } catch (error) {
    console.error("Auth Me Error:", error);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}
