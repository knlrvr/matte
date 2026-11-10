"use client";

import { useEffect, useRef } from "react";
import { Sidebar } from "@/components/panels/Sidebar";
import { useExport } from "@/hooks/useExport";
import { useImageInput } from "@/hooks/useImageInput";
import { useEditorStore } from "@/store/editor";
import { Stage } from "./Stage";
import { Toolbar } from "./Toolbar";

/** Top-level shell: wires image input and export to the stage, toolbar and sidebar. */
export function Editor() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const hasImage = useEditorStore((state) => state.image !== null);
  const { inputRef, onInputChange, openPicker, loadSample, isDragging } = useImageInput();
  const exporter = useExport(canvasRef);

  // Saved settings load after mount so the first client render matches the server's.
  useEffect(() => {
    void useEditorStore.persist.rehydrate();
  }, []);

  return (
    <div className="flex h-dvh flex-col">
      <Toolbar
        hasImage={hasImage}
        canExport={exporter.canExport}
        isExporting={exporter.isExporting}
        format={exporter.format}
        onChooseImage={openPicker}
        onCopy={exporter.copy}
        onDownload={exporter.download}
      />
      <main className="flex min-h-0 flex-1 flex-col wide:flex-row">
        <Stage
          canvasRef={canvasRef}
          isDragging={isDragging}
          onChooseImage={openPicker}
          onUseSample={loadSample}
        />
        <Sidebar />
      </main>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        tabIndex={-1}
        aria-hidden
        onChange={onInputChange}
      />
    </div>
  );
}
