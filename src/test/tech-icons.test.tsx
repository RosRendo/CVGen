import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import {
  getTechIcon,
  getBundledIcon,
  getTechSlug,
  getTechBrandColor,
  POPULAR_TECH_LIBRARY,
} from "@/components/common/TechIcons";

describe("TechIcons and Internet CDN Resolver", () => {
  it("should map tech slugs accurately for Simple Icons CDN", () => {
    expect(getTechSlug("Express.js")).toBe("express");
    expect(getTechSlug("Express")).toBe("express");
    expect(getTechSlug("PostgreSQL")).toBe("postgresql");
    expect(getTechSlug("Postgres")).toBe("postgresql");
    expect(getTechSlug("NestJS")).toBe("nestjs");
    expect(getTechSlug("Nest.js")).toBe("nestjs");
    expect(getTechSlug("Prisma ORM")).toBe("prisma");
    expect(getTechSlug("MongoDB")).toBe("mongodb");
    expect(getTechSlug("Redis")).toBe("redis");
    expect(getTechSlug("AWS EC2")).toBe("amazonwebservices");
    expect(getTechSlug("Kubernetes")).toBe("kubernetes");
    expect(getTechSlug("FastAPI")).toBe("fastapi");
  });

  it("should return official brand colors", () => {
    expect(getTechBrandColor("Express.js")).toBe("#000000");
    expect(getTechBrandColor("PostgreSQL")).toBe("#4169E1");
    expect(getTechBrandColor("TypeScript")).toBe("#3178C6");
    expect(getTechBrandColor("JavaScript")).toBe("#F7DF1E");
    expect(getTechBrandColor("Node.js")).toBe("#5FA04E");
    expect(getTechBrandColor("PM2")).toBe("#2B037A");
    expect(getTechBrandColor("GraphQL")).toBe("#E10098");
    expect(getTechBrandColor("Figma")).toBe("#F24E1E");
  });

  // ─── getTechIcon: Bundled-first, CDN fallback ─────────────────────────────

  it("getTechIcon should render bundled inline SVG for Express.js (Bundled-first)", () => {
    const { container } = render(<div>{getTechIcon("Express.js")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
  });

  it("getTechIcon should render bundled inline SVG for TypeScript (Bundled-first)", () => {
    const { container } = render(<div>{getTechIcon("TypeScript")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
  });

  it("getTechIcon should render bundled inline SVG for JavaScript (Bundled-first)", () => {
    const { container } = render(<div>{getTechIcon("JavaScript")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
  });

  it("getTechIcon should render bundled inline SVG for PostgreSQL (Bundled-first)", () => {
    const { container } = render(<div>{getTechIcon("PostgreSQL")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
  });

  it("getTechIcon should render a CDN <img> for unbundled Kubernetes (CDN fallback)", () => {
    const { container } = render(<div>{getTechIcon("Kubernetes")}</div>);
    const img = container.querySelector("img");
    expect(img).toBeDefined();
    expect(img?.getAttribute("src")).toContain("simpleicons.org/kubernetes");
  });

  // ─── getBundledIcon: offline SVG fallbacks ────────────────────────────────

  it("getBundledIcon should render SVG for Express.js with official path and dark fill", () => {
    const { container } = render(<div>{getBundledIcon("Express.js")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
    expect(svg?.getAttribute("fill")).toBe("#000000");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("d")).toContain("M24 18.588");
  });

  it("getBundledIcon should render SVG for PostgreSQL with Slonik mark and brand fill", () => {
    const { container } = render(<div>{getBundledIcon("PostgreSQL")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
    expect(svg?.getAttribute("fill")).toBe("#4169E1");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("d")).toContain("M17.128 0");
    expect(path?.getAttribute("d")).not.toContain("A12 12");
  });

  it("getBundledIcon should render SVG for TypeScript with official badge letterforms", () => {
    const { container } = render(<div>{getBundledIcon("TypeScript")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
    const rect = svg?.querySelector("rect");
    expect(rect?.getAttribute("fill")).toBe("#3178C6");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("fill")).toBe("#ffffff");
    expect(path?.getAttribute("d")).toContain("M13.47 15.566");
  });

  it("getBundledIcon should render SVG for JavaScript with official badge letterforms", () => {
    const { container } = render(<div>{getBundledIcon("JavaScript")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
    const rect = svg?.querySelector("rect");
    expect(rect?.getAttribute("fill")).toBe("#F7DF1E");
    const path = svg?.querySelector("path");
    expect(path?.getAttribute("fill")).toBe("#000000");
    expect(path?.getAttribute("d")).toContain("M22.034 18.276");
  });

  it("getBundledIcon should render SVG for NestJS with official brand color", () => {
    const { container } = render(<div>{getBundledIcon("NestJS")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("fill")).toBe("#E0234E");
  });

  it("getBundledIcon should return null for unknown techs (CDN handles them)", () => {
    const result = getBundledIcon("Kubernetes");
    expect(result).toBeNull();
  });

  // ─── Library ──────────────────────────────────────────────────────────────

  it("should include Express.js and NestJS in POPULAR_TECH_LIBRARY", () => {
    const expressItem = POPULAR_TECH_LIBRARY.find((item) => item.id === "express");
    const nestItem = POPULAR_TECH_LIBRARY.find((item) => item.id === "nestjs");
    expect(expressItem).toBeDefined();
    expect(expressItem?.name).toBe("Express.js");
    expect(nestItem).toBeDefined();
    expect(nestItem?.name).toBe("NestJS");
  });
});
