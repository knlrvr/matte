"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ColorField } from "@/components/ui/ColorField";
import { Field } from "@/components/ui/Field";
import { Section } from "@/components/ui/Section";
import { Segmented } from "@/components/ui/Segmented";
import { Slider } from "@/components/ui/Slider";
import { Swatch } from "@/components/ui/Swatch";
import { firstImageFile, revokeIfObjectUrl } from "@/lib/image";
import { BACKGROUND_PRESETS, SOLID_SWATCHES } from "@/lib/presets/backgrounds";
import type { BackgroundType } from "@/lib/types";
import { useEditorStore } from "@/store/editor";
import { useNoticeStore } from "@/store/notice";

const TYPES: { value: BackgroundType; label: string }[] = [
  { value: "preset", label: "Preset" },
  { value: "solid", label: "Solid" },
  { value: "gradient", label: "Custom" },
  { value: "image", label: "Image" },
  { value: "transparent", label: "None" },
];

export function BackgroundPanel() {
  const background = useEditorStore((state) => state.settings.background);
  const update = useEditorStore((state) => state.update);
  const notify = useNoticeStore((state) => state.notify);
  const fileRef = useRef<HTMLInputElement>(null);

  const setBackdropImage = (file: File | null) => {
    if (!file) return notify("That isn't an image. Try a PNG, JPEG or WebP.", "error");
    revokeIfObjectUrl(background.imageUrl);
    update("background", { type: "image", imageUrl: URL.createObjectURL(file) });
  };

  return (
    <Section title="Background">
      <Segmented
        label="Background type"
        value={background.type}
        options={TYPES}
        onChange={(type) => update("background", { type })}
      />

      {background.type === "preset" && (
        <div className="grid grid-cols-6 gap-2">
          {BACKGROUND_PRESETS.map((preset) => (
            <Swatch
              key={preset.id}
              name={preset.name}
              background={preset.css}
              selected={background.presetId === preset.id}
              onSelect={() => update("background", { presetId: preset.id })}
            />
          ))}
        </div>
      )}

      {background.type === "solid" && (
        <>
          <div className="grid grid-cols-10 gap-1.5">
            {SOLID_SWATCHES.map((color) => (
              <Swatch
                key={color}
                name={color}
                background={color}
                selected={background.solid === color}
                onSelect={() => update("background", { solid: color })}
              />
            ))}
          </div>
          <Field label="Colour">
            <ColorField label="Background" value={background.solid} onChange={(solid) => update("background", { solid })} />
          </Field>
        </>
      )}

      {background.type === "gradient" && (
        <>
          <Field label="Colours">
            <div className="grid grid-cols-2 gap-2">
              <ColorField
                label="Gradient start"
                value={background.gradient.from}
                onChange={(from) => update("background", { gradient: { ...background.gradient, from } })}
              />
              <ColorField
                label="Gradient end"
                value={background.gradient.to}
                onChange={(to) => update("background", { gradient: { ...background.gradient, to } })}
              />
            </div>
          </Field>
          <Slider
            label="Angle"
            min={0}
            max={360}
            step={5}
            value={background.gradient.angle}
            format={(value) => `${value}°`}
            onChange={(angle) => update("background", { gradient: { ...background.gradient, angle } })}
          />
        </>
      )}

      {background.type === "image" && (
        <div className="flex items-center gap-3">
          <Button onClick={() => fileRef.current?.click()}>
            {background.imageUrl ? "Replace backdrop" : "Choose backdrop"}
          </Button>
          {!background.imageUrl && <span className="text-muted">Fills the canvas, cropped to fit.</span>}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            onChange={(event) => {
              setBackdropImage(firstImageFile(event.target.files));
              event.target.value = "";
            }}
          />
        </div>
      )}

      {background.type === "transparent" && (
        <p className="text-muted">Exports with no backdrop. Use PNG or WebP to keep the transparency.</p>
      )}
    </Section>
  );
}
