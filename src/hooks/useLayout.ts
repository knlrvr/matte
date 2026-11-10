import { useMemo } from "react";
import { getFrame } from "@/components/frames/registry";
import { computeLayout } from "@/lib/layout";
import { useEditorStore } from "@/store/editor";

/** Canvas geometry for the current image and settings, or null with no image. */
export function useLayout() {
  const image = useEditorStore((state) => state.image);
  const canvas = useEditorStore((state) => state.settings.canvas);
  const frameId = useEditorStore((state) => state.settings.frame.id);

  return useMemo(
    () => (image ? computeLayout(image, canvas, getFrame(frameId).barHeight) : null),
    [image, canvas, frameId],
  );
}
