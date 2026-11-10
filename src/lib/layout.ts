import { getAspectRatio } from "./presets/ratios";
import type { CanvasSettings, SourceImage } from "./types";

/**
 * The canvas is laid out in "design pixels": the image's longer side is always
 * SHOT_LONG_SIDE, whatever its real resolution. That keeps padding, radius,
 * shadows and frame chrome looking the same on a 600px crop and a 5K
 * screenshot. Export multiplies back up to the image's native resolution.
 */
export const SHOT_LONG_SIDE = 960;
const SHOT_MIN_WIDTH = 360;
const MAX_EXPORT_SIDE = 8192;

export interface Layout {
  shotWidth: number;
  imageHeight: number;
  chromeHeight: number;
  shotHeight: number;
  canvasWidth: number;
  canvasHeight: number;
  /** Device pixels per design pixel at the image's native resolution. */
  nativeRatio: number;
}

export function computeLayout(
  image: Pick<SourceImage, "width" | "height">,
  canvas: CanvasSettings,
  chromeHeight: number,
): Layout {
  const aspect = image.width / image.height;
  const shotWidth = Math.round(
    Math.max(aspect >= 1 ? SHOT_LONG_SIDE : SHOT_LONG_SIDE * aspect, SHOT_MIN_WIDTH),
  );
  const imageHeight = Math.round(shotWidth / aspect);
  const shotHeight = imageHeight + chromeHeight;

  const minWidth = shotWidth + canvas.padding * 2;
  const minHeight = shotHeight + canvas.padding * 2;
  const ratio = getAspectRatio(canvas.ratioId).value;

  let canvasWidth = minWidth;
  let canvasHeight = minHeight;
  if (ratio !== null) {
    if (minWidth / minHeight > ratio) canvasHeight = Math.round(minWidth / ratio);
    else canvasWidth = Math.round(minHeight * ratio);
  }

  return {
    shotWidth,
    imageHeight,
    chromeHeight,
    shotHeight,
    canvasWidth,
    canvasHeight,
    nativeRatio: image.width / shotWidth,
  };
}

export interface ExportSize {
  pixelRatio: number;
  width: number;
  height: number;
  /** True when the requested scale was reduced to stay within browser limits. */
  capped: boolean;
}

export function computeExportSize(layout: Layout, scale: number): ExportSize {
  const wanted = layout.nativeRatio * scale;
  const limit = MAX_EXPORT_SIDE / Math.max(layout.canvasWidth, layout.canvasHeight);
  const pixelRatio = Math.min(wanted, limit);
  return {
    pixelRatio,
    width: Math.round(layout.canvasWidth * pixelRatio),
    height: Math.round(layout.canvasHeight * pixelRatio),
    capped: wanted > limit,
  };
}
