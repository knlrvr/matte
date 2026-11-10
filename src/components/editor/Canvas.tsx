import type { Ref } from "react";
import { backgroundStyle } from "@/lib/background";
import type { Layout } from "@/lib/layout";
import type { EditorSettings, SourceImage } from "@/lib/types";
import { Shot } from "./Shot";

interface CanvasProps {
  ref?: Ref<HTMLDivElement>;
  image: SourceImage;
  settings: EditorSettings;
  layout: Layout;
}

/**
 * The exported artwork, drawn at design-pixel size. Purely presentational:
 * whatever this renders is exactly what ends up in the file, so anything that
 * should appear in exports goes in here and nothing else does.
 */
export function Canvas({ ref, image, settings, layout }: CanvasProps) {
  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ width: layout.canvasWidth, height: layout.canvasHeight, perspective: 2400 }}
    >
      <div aria-hidden className="absolute inset-0" style={backgroundStyle(settings.background)} />
      <Shot image={image} shot={settings.shot} frame={settings.frame} layout={layout} />
    </div>
  );
}
