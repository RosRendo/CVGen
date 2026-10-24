import { describe, it, expect } from "vitest";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { ClassicTemplate } from "@/components/templates/ClassicTemplate";
import { ModernTemplate } from "@/components/templates/ModernTemplate";
import { TechnicalTemplate } from "@/components/templates/TechnicalTemplate";
import { GraduateTemplate } from "@/components/templates/GraduateTemplate";
import { ExecutiveTemplate } from "@/components/templates/ExecutiveTemplate";
import { MinimalTemplate } from "@/components/templates/MinimalTemplate";
import { CompactTemplate } from "@/components/templates/CompactTemplate";
import { CreativeTemplate } from "@/components/templates/CreativeTemplate";
import { NordicTemplate } from "@/components/templates/NordicTemplate";
import { StartupTemplate } from "@/components/templates/StartupTemplate";
import { CorporateTemplate } from "@/components/templates/CorporateTemplate";
import { InfographicTemplate } from "@/components/templates/InfographicTemplate";
import { FloralTemplate } from "@/components/templates/FloralTemplate";
import { BohoTemplate } from "@/components/templates/BohoTemplate";
import { ArtisanTemplate } from "@/components/templates/ArtisanTemplate";
import { PastelTemplate } from "@/components/templates/PastelTemplate";
import { RibbonTemplate } from "@/components/templates/RibbonTemplate";
import { PortalTemplate } from "@/components/templates/PortalTemplate";
import { MidnightTemplate } from "@/components/templates/MidnightTemplate";
import { ColorblockTemplate } from "@/components/templates/ColorblockTemplate";
import { AxisTemplate } from "@/components/templates/AxisTemplate";
import { OceanTemplate } from "@/components/templates/OceanTemplate";
import { DiamondTemplate } from "@/components/templates/DiamondTemplate";
import { HorizonTemplate } from "@/components/templates/HorizonTemplate";
import { CyberpunkTemplate } from "@/components/templates/CyberpunkTemplate";
import { EditorialTemplate } from "@/components/templates/EditorialTemplate";
import { ZenTemplate } from "@/components/templates/ZenTemplate";
import { BentoTemplate } from "@/components/templates/BentoTemplate";
import { OxfordTemplate } from "@/components/templates/OxfordTemplate";
import { BauhausTemplate } from "@/components/templates/BauhausTemplate";
import { CamTechTemplate } from "@/components/templates/CamTechTemplate";
import { CVRenderer } from "@/components/templates/CVRenderer";
import { SOKHA_CHAN_CV } from "@/lib/constants/sample-data";

describe("CV Templates & Khmer Unicode Rendering", () => {
  it("renders ClassicTemplate with candidate information and Khmer text", () => {
    render(<ClassicTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Junior Full-Stack Software Engineer/i)).toBeInTheDocument();
    expect(screen.getByText(/Mekong Tech Solutions/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Royal University of Phnom Penh/i).length).toBeGreaterThan(0);
  });

  it("renders ModernTemplate with accent borders and skill tags", () => {
    render(<ModernTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    expect(screen.getByText(/Mekong Tech Solutions/i)).toBeInTheDocument();
  });

  it("renders TechnicalTemplate with engineering focus and projects", () => {
    render(<TechnicalTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/> Technical Competencies/i)).toBeInTheDocument();
    expect(screen.getByText(/KhmerEdu LMS Platform/i)).toBeInTheDocument();
  });

  it("renders GraduateTemplate prioritizing education and honors", () => {
    render(<GraduateTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Education & Academic Credentials/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Royal University of Phnom Penh/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Leadership, Volunteering & Awards/i)).toBeInTheDocument();
  });

  it("renders ExecutiveTemplate with leadership competencies matrix", () => {
    render(<ExecutiveTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Executive Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Competencies & Strategic Capabilities/i)).toBeInTheDocument();
  });

  it("renders MinimalTemplate with Swiss grid layout and numbered sections", () => {
    render(<MinimalTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/01 \/ Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/02 \/ Experience/i)).toBeInTheDocument();
  });

  it("renders CompactTemplate with dense finance format and pipe delimiters", () => {
    render(<CompactTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
  });

  it("renders CreativeTemplate with asymmetric sidebar and timeline", () => {
    render(<CreativeTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills & Disciplines/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience Timeline/i)).toBeInTheDocument();
  });

  it("renders NordicTemplate with centered editorial title and works", () => {
    render(<NordicTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Education & Research/i)).toBeInTheDocument();
    expect(screen.getByText(/Expertise & Tools/i)).toBeInTheDocument();
  });

  it("renders StartupTemplate with monospace tags and build sections", () => {
    render(<StartupTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/\/\/ Track Record & Employment/i)).toBeInTheDocument();
    expect(screen.getByText(/\/\/ Core Stack & Tools/i)).toBeInTheDocument();
  });

  it("renders CorporateTemplate with dedicated photo placement and executive hierarchy", () => {
    render(
      <CorporateTemplate
        data={{
          ...SOKHA_CHAN_CV,
          personalInfo: {
            ...SOKHA_CHAN_CV.personalInfo,
            photoUrl: "https://example.com/portrait.jpg",
          },
        }}
      />
    );
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Executive Profile/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Sokha Chan/i })).toBeInTheDocument();
  });

  it("renders InfographicTemplate with circular avatar and competency meters", () => {
    render(
      <InfographicTemplate
        data={{
          ...SOKHA_CHAN_CV,
          personalInfo: {
            ...SOKHA_CHAN_CV.personalInfo,
            photoUrl: "https://example.com/avatar.jpg",
          },
        }}
      />
    );
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Competency Meters/i)).toBeInTheDocument();
    expect(screen.getByText(/Career History/i)).toBeInTheDocument();
  });

  it("renders FloralTemplate with botanical flourishes and leaf dividers", () => {
    render(<FloralTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional Journey & Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Artisan Skills & Specialties/i)).toBeInTheDocument();
  });

  it("renders BohoTemplate with terracotta styling and organic arch", () => {
    render(<BohoTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Creative Ethos & Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience & Journey/i)).toBeInTheDocument();
  });

  it("renders ArtisanTemplate with luxury gold filigree frame", () => {
    render(<ArtisanTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional Engagements/i)).toBeInTheDocument();
    expect(screen.getByText(/Disciplines & Expertise/i)).toBeInTheDocument();
  });

  it("renders PastelTemplate with playful micro-badges and pastel aura", () => {
    render(<PastelTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Creative Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Work Experience & Projects/i)).toBeInTheDocument();
  });

  it("renders RibbonTemplate with teal & gold wave ribbon header", () => {
    render(<RibbonTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/^Experience$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Education$/i)).toBeInTheDocument();
  });

  it("renders PortalTemplate with monochrome arched dome portal", () => {
    render(<PortalTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Job Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Skills & Capabilities/i)).toBeInTheDocument();
  });

  it("renders MidnightTemplate with midnight arch and gold gradient banners", () => {
    render(<MidnightTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getByText(/Sokha Chan \(សូខា ចាន់\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
  });

  it("renders ColorblockTemplate with saffron gold & navy geometric split", () => {
    render(<ColorblockTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
  });

  it("renders AxisTemplate with charcoal & yellow timeline axis", () => {
    render(<AxisTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Job Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/^Education$/i)).toBeInTheDocument();
  });

  it("renders OceanTemplate with ocean teal & polygon cutout", () => {
    render(<OceanTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/^Experience$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Education$/i)).toBeInTheDocument();
  });

  it("renders DiamondTemplate with obsidian & gold diamond timeline", () => {
    render(<DiamondTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/^Experience$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Education$/i)).toBeInTheDocument();
  });

  it("renders HorizonTemplate with slate horizon and trailing rules", () => {
    render(<HorizonTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/^Work Experience$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Education$/i)).toBeInTheDocument();
  });

  it("renders CyberpunkTemplate with neon HUD terminal styling", () => {
    render(<CyberpunkTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/STATUS: ONLINE/i)).toBeInTheDocument();
    expect(screen.getByText(/MISSION RECORD/i)).toBeInTheDocument();
  });

  it("renders EditorialTemplate with high-fashion magazine typography", () => {
    render(<EditorialTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Curriculum Vitae ◆ Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Professional Experience/i)).toBeInTheDocument();
  });

  it("renders ZenTemplate with Japanese Wabi-Sabi calligraphy and Hanko seal", () => {
    render(<ZenTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/侘寂 · ZEN/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience & Pathways/i)).toBeInTheDocument();
  });

  it("renders BentoTemplate with Apple-grade modular bento cards", () => {
    render(<BentoTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/1.5\+ Yrs/i)).toBeInTheDocument();
    expect(screen.getByText(/Experience History/i)).toBeInTheDocument();
  });

  it("renders OxfordTemplate with British scholarly jurist rules", () => {
    render(<OxfordTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/I\. Executive Summary/i)).toBeInTheDocument();
    expect(screen.getByText(/II\. Professional Record/i)).toBeInTheDocument();
  });

  it("renders BauhausTemplate with 1920s German modernist typography", () => {
    render(<BauhausTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/FORM FOLLOWS FUNCTION/i)).toBeInTheDocument();
    expect(screen.getByText(/WORK EXPERIENCE/i)).toBeInTheDocument();
  });

  it("switches templates dynamically via CVRenderer across all 30 templates", () => {
    const templates = [
      "classic",
      "modern",
      "technical",
      "graduate",
      "executive",
      "minimal",
      "compact",
      "creative",
      "nordic",
      "startup",
      "corporate",
      "infographic",
      "floral",
      "boho",
      "artisan",
      "pastel",
      "ribbon",
      "portal",
      "midnight",
      "colorblock",
      "axis",
      "ocean",
      "diamond",
      "horizon",
      "cyberpunk",
      "editorial",
      "zen",
      "bento",
      "oxford",
      "bauhaus",
      "camtech",
    ] as const;

    const { rerender } = render(
      <CVRenderer data={{ ...SOKHA_CHAN_CV, settings: { ...SOKHA_CHAN_CV.settings, templateId: "classic" } }} />
    );
    expect(screen.getByText(/Professional Summary/i)).toBeInTheDocument();

    for (const tplId of templates) {
      rerender(
        <CVRenderer data={{ ...SOKHA_CHAN_CV, settings: { ...SOKHA_CHAN_CV.settings, templateId: tplId } }} />
      );
      expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    }
  });

  it("renders CamTechTemplate with golden badges, trailing rules, and technical tools", () => {
    render(<CamTechTemplate data={SOKHA_CHAN_CV} />);
    expect(screen.getAllByText(/Sokha/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/EDUCATION/i)).toBeInTheDocument();
    expect(screen.getByText(/SKILLS/i)).toBeInTheDocument();
    expect(screen.getByText(/INTEREST HOBBY/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical Tools Section/i)).toBeInTheDocument();
  });
});
