"use client";

import React, { useRef, useState, useEffect } from "react";
import { CVData, TemplateId } from "@/lib/types/cv";
import { SOKHA_CHAN_CV } from "@/lib/constants/sample-data";
import { CVRenderer } from "./CVRenderer";

interface TemplateThumbnailProps {
  templateId: TemplateId;
  data?: CVData;
  className?: string;
}

// Standard A4 dimensions in pixels at 96 DPI (210mm x 297mm)
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({
  templateId,
  data = SOKHA_CHAN_CV,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number>(0.35); // initial fallback scale for SSR / before mount

  useEffect(() => {
    if (!containerRef.current) return;

    const updateScale = () => {
      if (containerRef.current) {
        const clientWidth = containerRef.current.clientWidth;
        if (clientWidth > 0) {
          setScale(clientWidth / A4_WIDTH_PX);
        }
      }
    };

    updateScale();

    // Use ResizeObserver for responsive recalculation
    const observer = new ResizeObserver(() => {
      updateScale();
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[210/297] bg-white overflow-hidden select-none ${className}`}
    >
      <div
        style={{
          width: A4_WIDTH_PX,
          height: A4_HEIGHT_PX,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        className="pointer-events-none"
      >
        <CVRenderer
          data={{
            ...data,
            settings: {
              ...data.settings,
              templateId,
            },
          }}
          isPrintOnly={true}
          scale={1}
        />
      </div>
    </div>
  );
};
