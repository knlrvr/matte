"use client";

import { Field } from "@/components/ui/Field";
import { Section } from "@/components/ui/Section";
import { Segmented } from "@/components/ui/Segmented";
import { Slider } from "@/components/ui/Slider";
import { DEFAULT_SETTINGS } from "@/lib/defaults";
import { SHADOWS } from "@/lib/presets/shadows";
import { useEditorStore } from "@/store/editor";

const SHADOW_OPTIONS = SHADOWS.map(({ id, label }) => ({ value: id, label }));
const degrees = (value: number) => `${value}°`;

export function ShotPanel() {
  const shot = useEditorStore((state) => state.settings.shot);
  const update = useEditorStore((state) => state.update);

  const isTransformed = shot.scale !== 1 || shot.tiltX !== 0 || shot.tiltY !== 0 || shot.rotate !== 0;
  const { scale, tiltX, tiltY, rotate } = DEFAULT_SETTINGS.shot;

  return (
    <Section
      title="Image"
      action={
        isTransformed && (
          <button
            type="button"
            className="text-[12px] text-muted underline-offset-2 hover:text-ink hover:underline"
            onClick={() => update("shot", { scale, tiltX, tiltY, rotate })}
          >
            Straighten
          </button>
        )
      }
    >
      <Slider label="Corners" min={0} max={48} value={shot.radius} onChange={(radius) => update("shot", { radius })} />
      <Field label="Shadow" stacked>
        <Segmented label="Shadow" value={shot.shadow} options={SHADOW_OPTIONS} onChange={(shadow) => update("shot", { shadow })} />
      </Field>
      <Slider
        label="Size"
        min={0.5}
        max={1.5}
        step={0.01}
        value={shot.scale}
        format={(value) => `${Math.round(value * 100)}%`}
        onChange={(value) => update("shot", { scale: value })}
      />
      <Slider label="Tilt up/down" min={-30} max={30} value={shot.tiltX} format={degrees} onChange={(value) => update("shot", { tiltX: value })} />
      <Slider label="Tilt side" min={-30} max={30} value={shot.tiltY} format={degrees} onChange={(value) => update("shot", { tiltY: value })} />
      <Slider label="Rotate" min={-20} max={20} value={shot.rotate} format={degrees} onChange={(value) => update("shot", { rotate: value })} />
    </Section>
  );
}
