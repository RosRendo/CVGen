import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hashPassword, signToken, setSessionCookie } from "@/lib/auth/auth-service";

const RegisterSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z.string().min(1, "Name is required").max(100),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = RegisterSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const { name, password } = parsed.data;

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this email address already exists. Please sign in." },
        { status: 409 }
      );
    }

    // Hash password & create user
    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        plan: "free",
      },
      select: {
        id: true,
        email: true,
        name: true,
        plan: true,
        createdAt: true,
      },
    });

    // Create session token
    const token = await signToken({
      userId: user.id,
      email: user.email,
      name: user.name ?? undefined,
      plan: user.plan,
    });

    const response = NextResponse.json({
      message: "Account created successfully",
      user,
    });

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Failed to create account. Please ensure database connection is active." },
      { status: 500 }
    );
  }
}
