import { type RefObject, useCallback, useState } from "react";
import { copyBlobToClipboard, downloadBlob, exportFilename, renderNode } from "@/lib/export";
import { computeExportSize } from "@/lib/layout";
import type { ExportFormat } from "@/lib/types";
import { useEditorStore } from "@/store/editor";
import { useNoticeStore } from "@/store/notice";
import { useHotkey } from "./useHotkey";
import { useLayout } from "./useLayout";

const message = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong while exporting.";

/** Download and copy actions for the canvas node, plus their shortcuts. */
export function useExport(canvasRef: RefObject<HTMLDivElement | null>) {
  const imageName = useEditorStore((state) => state.image?.name);
  const { format, scale } = useEditorStore((state) => state.settings.export);
  const notify = useNoticeStore((state) => state.notify);
  const layout = useLayout();
  const [isExporting, setExporting] = useState(false);

  const canExport = Boolean(layout && imageName);

  const render = useCallback(
    (as: ExportFormat) => {
      const node = canvasRef.current;
      if (!node || !layout) return Promise.reject(new Error("Add an image first."));
      return renderNode(node, { format: as, pixelRatio: computeExportSize(layout, scale).pixelRatio });
    },
    [canvasRef, layout, scale],
  );

  const download = useCallback(async () => {
    if (!canExport || !imageName) return;
    setExporting(true);
    try {
      const filename = exportFilename(imageName, format);
      downloadBlob(await render(format), filename);
      notify(`Downloaded ${filename}`);
    } catch (error) {
      notify(message(error), "error");
    } finally {
      setExporting(false);
    }
  }, [canExport, format, imageName, notify, render]);

  const copy = useCallback(async () => {
    if (!canExport) return;
    setExporting(true);
    try {
      // Clipboards only reliably take PNG, whatever the download format is.
      await copyBlobToClipboard(render("png"));
      notify("Copied to clipboard");
    } catch (error) {
      notify(message(error), "error");
    } finally {
      setExporting(false);
    }
  }, [canExport, notify, render]);

  useHotkey({ key: "s" }, download);
  useHotkey({ key: "c", shift: true }, copy);

  return { download, copy, canExport, isExporting, format };
}
