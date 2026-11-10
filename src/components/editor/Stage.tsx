"use client";

import { type RefObject, useRef } from "react";
import { useElementSize } from "@/hooks/useElementSize";
import { useLayout } from "@/hooks/useLayout";
import { computeExportSize } from "@/lib/layout";
import { useEditorStore } from "@/store/editor";
import { Canvas } from "./Canvas";
import { EmptyState } from "./EmptyState";
import { Notice } from "./Notice";

/** Breathing room around the canvas; tighter on small stages where every pixel counts. */
const marginFor = (stageWidth: number) => (stageWidth < 560 ? 16 : 40);
const CAPTION = 28;

interface StageProps {
  canvasRef: RefObject<HTMLDivElement | null>;
  isDragging: boolean;
  onChooseImage: () => void;
  onUseSample: () => void;
}

/** The work surface. Scales the full-size canvas down to fit the space available. */
export function Stage({ canvasRef, isDragging, onChooseImage, onUseSample }: StageProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const size = useElementSize(hostRef);
  const image = useEditorStore((state) => state.image);
  const settings = useEditorStore((state) => state.settings);
  const layout = useLayout();

  const margin = marginFor(size.width);
  const scale = layout
    ? Math.max(
        0.02,
        Math.min(
          (size.width - margin * 2) / layout.canvasWidth,
          (size.height - margin * 2 - CAPTION) / layout.canvasHeight,
          1,
        ),
      )
    : 1;
  const output = layout ? computeExportSize(layout, settings.export.scale) : null;

  return (
    <div
      ref={hostRef}
      className="stage relative flex h-[44dvh] min-h-[200px] shrink-0 flex-col items-center justify-center overflow-hidden wide:h-auto wide:min-h-0 wide:min-w-0 wide:flex-1"
    >
      <Notice />

      {image && layout && output ? (
        // Hidden until the stage has been measured, so the canvas never flashes at the wrong size.
        <div className={`flex flex-col items-center ${size.width ? "" : "invisible"}`}>
          <div
            className={`relative shadow-[0_2px_24px_rgba(0,0,0,0.14)] ${
              settings.background.type === "transparent" ? "checkerboard" : ""
            }`}
            style={{ width: layout.canvasWidth * scale, height: layout.canvasHeight * scale }}
          >
            <div style={{ transform: `scale(${scale})`, transformOrigin: "0 0", width: layout.canvasWidth }}>
              <Canvas ref={canvasRef} image={image} settings={settings} layout={layout} />
            </div>
          </div>
          <p className="mt-2 h-5 text-[12px] text-muted tabular-nums">
            {output.width.toLocaleString()} × {output.height.toLocaleString()} px
          </p>
        </div>
      ) : (
        <EmptyState onChooseImage={onChooseImage} onUseSample={onUseSample} />
      )}

      {isDragging && (
        <div className="absolute inset-3 z-10 flex items-center justify-center rounded-xl border-2 border-dashed border-accent bg-panel/85 text-[15px] font-medium">
          Drop to use this image
        </div>
      )}
    </div>
  );
}
