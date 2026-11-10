"use client";

import { FRAMES, getFrame } from "@/components/frames/registry";
import { Field } from "@/components/ui/Field";
import { Section } from "@/components/ui/Section";
import { Segmented } from "@/components/ui/Segmented";
import { TextInput } from "@/components/ui/TextInput";
import type { FrameTheme } from "@/lib/types";
import { useEditorStore } from "@/store/editor";

const THEMES: { value: FrameTheme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const FRAME_OPTIONS = FRAMES.map(({ id, label }) => ({ value: id, label }));

export function FramePanel() {
  const frame = useEditorStore((state) => state.settings.frame);
  const update = useEditorStore((state) => state.update);
  const { titleLabel } = getFrame(frame.id);

  return (
    <Section title="Frame">
      <Segmented label="Frame style" value={frame.id} options={FRAME_OPTIONS} onChange={(id) => update("frame", { id })} />
      {frame.id !== "none" && (
        <>
          <Field label="Theme">
            <Segmented label="Frame theme" value={frame.theme} options={THEMES} onChange={(theme) => update("frame", { theme })} />
          </Field>
          <Field label={titleLabel}>
            <TextInput
              aria-label={titleLabel}
              value={frame.title}
              placeholder={frame.id === "browser" ? "localhost:3000" : "Optional"}
              onChange={(event) => update("frame", { title: event.target.value })}
            />
          </Field>
        </>
      )}
    </Section>
  );
}
