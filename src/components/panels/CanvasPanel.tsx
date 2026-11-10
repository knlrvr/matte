"use client";

import { Section } from "@/components/ui/Section";
import { Slider } from "@/components/ui/Slider";
import { ASPECT_RATIOS } from "@/lib/presets/ratios";
import { useEditorStore } from "@/store/editor";

export function CanvasPanel() {
  const canvas = useEditorStore((state) => state.settings.canvas);
  const update = useEditorStore((state) => state.update);

  return (
    <Section title="Canvas">
      <div role="radiogroup" aria-label="Aspect ratio" className="grid grid-cols-4 gap-1.5">
        {ASPECT_RATIOS.map((ratio) => {
          const selected = canvas.ratioId === ratio.id;
          return (
            <button
              key={ratio.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => update("canvas", { ratioId: ratio.id })}
              title={ratio.hint}
              className={`h-8 truncate pointer-coarse:h-10 rounded-md px-1 text-[12px] transition-colors ${
                selected ? "bg-ink font-medium text-panel" : "bg-field text-muted hover:text-ink"
              }`}
            >
              {ratio.label}
            </button>
          );
        })}
      </div>
      <Slider label="Padding" min={0} max={240} step={4} value={canvas.padding} onChange={(padding) => update("canvas", { padding })} />
    </Section>
  );
}
