import type { CSSProperties } from "react";
import { getBackgroundPreset } from "./presets/backgrounds";
import type { BackgroundSettings } from "./types";

/** Resolves background settings to inline styles for the canvas backdrop. */
export function backgroundStyle(background: BackgroundSettings): CSSProperties {
  switch (background.type) {
    case "preset":
      return { background: getBackgroundPreset(background.presetId).css };
    case "solid":
      return { background: background.solid };
    case "gradient": {
      const { from, to, angle } = background.gradient;
      return { background: `linear-gradient(${angle}deg, ${from}, ${to})` };
    }
    case "image":
      return background.imageUrl
        ? {
            backgroundImage: `url("${background.imageUrl}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        : { background: getBackgroundPreset(background.presetId).css };
    case "transparent":
      return { background: "transparent" };
  }
}
