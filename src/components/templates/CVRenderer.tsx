"use client";

import React from "react";
import { CVData } from "@/lib/types/cv";
import { SPACING_CONFIG } from "@/lib/constants/themes";
import { ClassicTemplate } from "./ClassicTemplate";
import { ModernTemplate } from "./ModernTemplate";
import { TechnicalTemplate } from "./TechnicalTemplate";
import { GraduateTemplate } from "./GraduateTemplate";
import { ExecutiveTemplate } from "./ExecutiveTemplate";
import { MinimalTemplate } from "./MinimalTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { CreativeTemplate } from "./CreativeTemplate";
import { NordicTemplate } from "./NordicTemplate";
import { StartupTemplate } from "./StartupTemplate";
import { CorporateTemplate } from "./CorporateTemplate";
import { InfographicTemplate } from "./InfographicTemplate";
import { FloralTemplate } from "./FloralTemplate";
import { BohoTemplate } from "./BohoTemplate";
import { ArtisanTemplate } from "./ArtisanTemplate";
import { PastelTemplate } from "./PastelTemplate";
import { RibbonTemplate } from "./RibbonTemplate";
import { PortalTemplate } from "./PortalTemplate";
import { MidnightTemplate } from "./MidnightTemplate";
import { ColorblockTemplate } from "./ColorblockTemplate";
import { AxisTemplate } from "./AxisTemplate";
import { OceanTemplate } from "./OceanTemplate";
import { DiamondTemplate } from "./DiamondTemplate";
import { HorizonTemplate } from "./HorizonTemplate";
import { CyberpunkTemplate } from "./CyberpunkTemplate";
import { EditorialTemplate } from "./EditorialTemplate";
import { ZenTemplate } from "./ZenTemplate";
import { BentoTemplate } from "./BentoTemplate";
import { OxfordTemplate } from "./OxfordTemplate";
import { BauhausTemplate } from "./BauhausTemplate";
import { CamTechTemplate } from "./CamTechTemplate";

interface CVRendererProps {
  data: CVData;
  scale?: number;
  className?: string;
  isPrintOnly?: boolean;
}

export const CVRenderer: React.FC<CVRendererProps> = ({
  data,
  scale = 1,
  className = "",
  isPrintOnly = false,
}) => {
  const { settings } = data;
  const spacing = SPACING_CONFIG[settings.spacing] || SPACING_CONFIG.normal;

  const renderTemplate = () => {
    switch (settings.templateId) {
      case "classic":
        return <ClassicTemplate data={data} />;
      case "modern":
        return <ModernTemplate data={data} />;
      case "technical":
        return <TechnicalTemplate data={data} />;
      case "graduate":
        return <GraduateTemplate data={data} />;
      case "executive":
        return <ExecutiveTemplate data={data} />;
      case "minimal":
        return <MinimalTemplate data={data} />;
      case "compact":
        return <CompactTemplate data={data} />;
      case "creative":
        return <CreativeTemplate data={data} />;
      case "nordic":
        return <NordicTemplate data={data} />;
      case "startup":
        return <StartupTemplate data={data} />;
      case "corporate":
        return <CorporateTemplate data={data} />;
      case "infographic":
        return <InfographicTemplate data={data} />;
      case "floral":
        return <FloralTemplate data={data} />;
      case "boho":
        return <BohoTemplate data={data} />;
      case "artisan":
        return <ArtisanTemplate data={data} />;
      case "pastel":
        return <PastelTemplate data={data} />;
      case "ribbon":
        return <RibbonTemplate data={data} />;
      case "portal":
        return <PortalTemplate data={data} />;
      case "midnight":
        return <MidnightTemplate data={data} />;
      case "colorblock":
        return <ColorblockTemplate data={data} />;
      case "axis":
        return <AxisTemplate data={data} />;
      case "ocean":
        return <OceanTemplate data={data} />;
      case "diamond":
        return <DiamondTemplate data={data} />;
      case "horizon":
        return <HorizonTemplate data={data} />;
      case "cyberpunk":
        return <CyberpunkTemplate data={data} />;
      case "editorial":
        return <EditorialTemplate data={data} />;
      case "zen":
        return <ZenTemplate data={data} />;
      case "bento":
        return <BentoTemplate data={data} />;
      case "oxford":
        return <OxfordTemplate data={data} />;
      case "bauhaus":
        return <BauhausTemplate data={data} />;
      case "camtech":
        return <CamTechTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div
      className={`transition-transform duration-200 origin-top flex justify-center ${className}`}
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
    >
      <div
        id="cv-preview-sheet"
        className={`a4-sheet ${spacing.pagePadding} bg-white shadow-2xl rounded-sm transition-all text-slate-800 ${
          isPrintOnly ? "border-0 shadow-none p-0" : "border border-slate-200"
        }`}
      >
        {renderTemplate()}
      </div>
    </div>
  );
};
