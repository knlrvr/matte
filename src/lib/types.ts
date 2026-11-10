/**
 * Everything the editor can change lives in `EditorSettings`, split into
 * sections that map one-to-one onto sidebar panels. To add a feature, add a
 * field here, give it a default in `lib/defaults.ts`, and read it where it is
 * rendered — persistence and reset pick it up automatically.
 */

export type BackgroundType =
  | "preset"
  | "solid"
  | "gradient"
  | "image"
  | "transparent";

export interface BackgroundSettings {
  type: BackgroundType;
  presetId: string;
  solid: string;
  gradient: { from: string; to: string; angle: number };
  /** Object URL of an uploaded backdrop. Never persisted. */
  imageUrl: string | null;
}

export interface CanvasSettings {
  ratioId: string;
  /** Minimum space around the shot, in design pixels. */
  padding: number;
}

export type ShadowId = "none" | "soft" | "medium" | "strong";

export interface ShotSettings {
  radius: number;
  shadow: ShadowId;
  scale: number;
  tiltX: number;
  tiltY: number;
  rotate: number;
}

export type FrameId = "none" | "window" | "browser";
export type FrameTheme = "light" | "dark";

export interface FrameSettings {
  id: FrameId;
  theme: FrameTheme;
  title: string;
}

export type ExportFormat = "png" | "jpeg" | "webp";

export interface ExportSettings {
  format: ExportFormat;
  /** Multiplier on the source image's native resolution. */
  scale: number;
}

export interface EditorSettings {
  background: BackgroundSettings;
  canvas: CanvasSettings;
  shot: ShotSettings;
  frame: FrameSettings;
  export: ExportSettings;
}

export interface SourceImage {
  src: string;
  width: number;
  height: number;
  name: string;
}
