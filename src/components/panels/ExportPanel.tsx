"use client";

import { Field } from "@/components/ui/Field";
import { Section } from "@/components/ui/Section";
import { Segmented } from "@/components/ui/Segmented";
import { useLayout } from "@/hooks/useLayout";
import { computeExportSize } from "@/lib/layout";
import type { ExportFormat } from "@/lib/types";
import { useEditorStore } from "@/store/editor";

const FORMATS: { value: ExportFormat; label: string }[] = [
  { value: "png", label: "PNG" },
  { value: "jpeg", label: "JPEG" },
  { value: "webp", label: "WebP" },
];

const SCALES = [1, 2, 3].map((value) => ({ value, label: `${value}×` }));

export function ExportPanel() {
  const settings = useEditorStore((state) => state.settings.export);
  const isTransparent = useEditorStore((state) => state.settings.background.type === "transparent");
  const update = useEditorStore((state) => state.update);
  const layout = useLayout();
  const output = layout ? computeExportSize(layout, settings.scale) : null;

  return (
    <Section title="Export">
      <Field label="Format">
        <Segmented label="File format" value={settings.format} options={FORMATS} onChange={(format) => update("export", { format })} />
      </Field>
      <Field label="Resolution">
        <Segmented label="Resolution" value={settings.scale} options={SCALES} onChange={(scale) => update("export", { scale })} />
      </Field>
      <p className="text-muted">
        {output
          ? `1× matches your image's own resolution. This export is ${output.width.toLocaleString()} × ${output.height.toLocaleString()} px.`
          : "1× matches your image's own resolution."}
        {output?.capped && " That's the largest size browsers can reliably export."}
        {isTransparent && settings.format === "jpeg" && " JPEG can't be transparent, so the backdrop will be white."}
      </p>
    </Section>
  );
}
