import { describe, it, expect, vi } from "vitest";
import { GET as getCv, DELETE as deleteCv } from "@/app/api/cvs/[id]/route";
import { NextRequest } from "next/server";
import * as authService from "@/lib/auth/auth-service";
import { prisma } from "@/lib/db";

describe("Backend Tenancy Isolation & IDOR Security", () => {
  it("rejects unauthenticated requests with 401 Unauthorized", async () => {
    vi.spyOn(authService, "getSessionFromRequest").mockResolvedValue(null);

    const req = new NextRequest("http://localhost:3000/api/cvs/cv_123");
    const res = await getCv(req, { params: Promise.resolve({ id: "cv_123" }) });

    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("Unauthorized");
  });

  it("blocks User B from accessing User A's private CV (IDOR Prevention)", async () => {
    // User B is signed in
    vi.spyOn(authService, "getSessionFromRequest").mockResolvedValue({
      userId: "user_b_attacker",
      email: "attacker@example.com",
    });

    // But the CV belongs to User A
    vi.spyOn(prisma.cV, "findUnique").mockResolvedValue({
      id: "cv_victim_456",
      userId: "user_a_victim",
      title: "Confidential Executive CV",
      templateId: "classic",
      colorTheme: "navy",
      fontFamily: "sans",
      fontSize: "normal",
      spacing: "normal",
      data: {},
      isPublished: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as Awaited<ReturnType<typeof prisma.cV.findUnique>>);

    const req = new NextRequest("http://localhost:3000/api/cvs/cv_victim_456");
    const res = await getCv(req, { params: Promise.resolve({ id: "cv_victim_456" }) });

    // Expect 403 Forbidden
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toContain("Forbidden");
  });

  it("blocks User B from deleting User A's private CV", async () => {
    vi.spyOn(authService, "getSessionFromRequest").mockResolvedValue({
      userId: "user_b_attacker",
      email: "attacker@example.com",
    });

    vi.spyOn(prisma.cV, "findUnique").mockResolvedValue({
      id: "cv_victim_456",
      userId: "user_a_victim",
    } as unknown as Awaited<ReturnType<typeof prisma.cV.findUnique>>);

    const req = new NextRequest("http://localhost:3000/api/cvs/cv_victim_456", {
      method: "DELETE",
    });
    const res = await deleteCv(req, { params: Promise.resolve({ id: "cv_victim_456" }) });

    expect(res.status).toBe(403);
  });
});
