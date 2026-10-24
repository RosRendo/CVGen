import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword, signToken, verifyToken } from "@/lib/auth/auth-service";

describe("Backend Auth & Cryptography Service", () => {
  it("securely hashes and verifies passwords using bcrypt", async () => {
    const plain = "mySecretPassword2026!";
    const hash = await hashPassword(plain);

    expect(hash).not.toBe(plain);
    expect(hash.startsWith("$2")).toBe(true);

    const isMatch = await verifyPassword(plain, hash);
    expect(isMatch).toBe(true);

    const isMismatch = await verifyPassword("wrongPassword", hash);
    expect(isMismatch).toBe(false);
  });

  it("signs and verifies JWT session tokens with jose", async () => {
    const payload = {
      userId: "user_clerk_123",
      email: "test@cvgen.com",
      name: "Sokha Test",
      plan: "free",
    };

    const token = await signToken(payload);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3); // Standard header.payload.signature

    const decoded = await verifyToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe("user_clerk_123");
    expect(decoded?.email).toBe("test@cvgen.com");
  });

  it("returns null for malformed or tampered tokens", async () => {
    const tampered = "eyJhbGciOiJIUzI1NiJ9.invalidpayload.invalidsignature";
    const result = await verifyToken(tampered);
    expect(result).toBeNull();
  });
});
