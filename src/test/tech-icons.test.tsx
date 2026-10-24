import { describe, it, expect } from "vitest";
import React from "react";
import { render } from "@testing-library/react";
import { getTechIcon, getTechSlug, POPULAR_TECH_LIBRARY } from "@/components/common/TechIcons";

describe("TechIcons and Internet CDN Resolver", () => {
  it("should map tech slugs accurately for Simple Icons CDN", () => {
    expect(getTechSlug("Express.js")).toBe("express");
    expect(getTechSlug("Express")).toBe("express");
    expect(getTechSlug("NestJS")).toBe("nestjs");
    expect(getTechSlug("Nest.js")).toBe("nestjs");
    expect(getTechSlug("Prisma ORM")).toBe("prisma");
    expect(getTechSlug("MongoDB")).toBe("mongodb");
    expect(getTechSlug("Redis")).toBe("redis");
    expect(getTechSlug("AWS EC2")).toBe("amazonwebservices");
    expect(getTechSlug("Kubernetes")).toBe("kubernetes");
    expect(getTechSlug("FastAPI")).toBe("fastapi");
  });

  it("should render dedicated SVG for Express and Express.js", () => {
    const { container } = render(<div>{getTechIcon("Express.js")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
  });

  it("should render dedicated SVG for NestJS with official brand color", () => {
    const { container } = render(<div>{getTechIcon("NestJS")}</div>);
    const svg = container.querySelector("svg");
    expect(svg).toBeDefined();
    expect(svg?.getAttribute("fill")).toBe("#E0234E");
  });

  it("should render dynamic internet CDN img for non-bundled technologies", () => {
    const { container } = render(<div>{getTechIcon("Kubernetes")}</div>);
    const img = container.querySelector("img");
    expect(img).toBeDefined();
    expect(img?.getAttribute("src")).toContain("https://cdn.simpleicons.org/kubernetes");
  });

  it("should include Express.js and NestJS in POPULAR_TECH_LIBRARY", () => {
    const expressItem = POPULAR_TECH_LIBRARY.find((item) => item.id === "express");
    const nestItem = POPULAR_TECH_LIBRARY.find((item) => item.id === "nestjs");
    expect(expressItem).toBeDefined();
    expect(expressItem?.name).toBe("Express.js");
    expect(nestItem).toBeDefined();
    expect(nestItem?.name).toBe("NestJS");
  });
});
