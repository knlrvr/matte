import type { FrameTheme } from "@/lib/types";

/** Frames are exported, so they use fixed colours rather than the app's theme tokens. */
export const FRAME_THEMES: Record<FrameTheme, { bar: string; border: string; text: string; well: string }> = {
  light: { bar: "#f1f2f5", border: "#dcdfe5", text: "#4a5160", well: "#ffffff" },
  dark: { bar: "#24262c", border: "#121317", text: "#b9bec8", well: "#16171b" },
};
