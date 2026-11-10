"use client";

import { Button } from "@/components/ui/Button";
import { useEditorStore } from "@/store/editor";
import { BackgroundPanel } from "./BackgroundPanel";
import { CanvasPanel } from "./CanvasPanel";
import { ExportPanel } from "./ExportPanel";
import { FramePanel } from "./FramePanel";
import { ShotPanel } from "./ShotPanel";

/** The controls column. New panels slot in here. */
export function Sidebar() {
  const resetSettings = useEditorStore((state) => state.resetSettings);

  return (
    <aside
      aria-label="Image settings"
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-t border-line bg-panel wide:flex-none wide:border-t-0 wide:border-l wide:max-lg:w-[300px] lg:max-2xl:w-[320px] 2xl:w-[360px]"
    >
      {/* Stacked under the stage on a wide-ish window, controls stay a comfortable width. */}
      <div className="mx-auto max-w-[520px] wide:max-w-none">
      <BackgroundPanel />
      <FramePanel />
      <ShotPanel />
      <CanvasPanel />
      <ExportPanel />
      <div className="px-4 py-4">
        <Button variant="ghost" className="-ml-3" onClick={resetSettings}>
          Reset all settings
        </Button>
      </div>
      </div>
    </aside>
  );
}
