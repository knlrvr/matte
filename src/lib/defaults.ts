import type { EditorSettings } from "./types";

export const DEFAULT_SETTINGS: EditorSettings = {
  background: {
    type: "preset",
    presetId: "lagoon",
    solid: "#2f5bea",
    gradient: { from: "#ff8a5c", to: "#7b4dff", angle: 135 },
    imageUrl: null,
  },
  canvas: { ratioId: "auto", padding: 96 },
  shot: { radius: 14, shadow: "medium", scale: 1, tiltX: 0, tiltY: 0, rotate: 0 },
  frame: { id: "none", theme: "light", title: "" },
  export: { format: "png", scale: 1 },
};
