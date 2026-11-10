import type { ComponentType } from "react";
import type { FrameId, FrameTheme } from "@/lib/types";
import { BrowserBar } from "./BrowserBar";
import { WindowBar } from "./WindowBar";

export interface FrameBarProps {
  theme: FrameTheme;
  title: string;
  height: number;
}

export interface FrameDefinition {
  id: FrameId;
  label: string;
  /** Design-pixel height the bar adds above the image. Layout depends on it. */
  barHeight: number;
  /** What the title field is called for this frame. */
  titleLabel: string;
  Bar: ComponentType<FrameBarProps> | null;
}

/**
 * To add a frame: write a bar component, add its id to `FrameId` in
 * lib/types.ts, and list it here. The panel and layout pick it up.
 */
export const FRAMES: FrameDefinition[] = [
  { id: "none", label: "None", barHeight: 0, titleLabel: "Title", Bar: null },
  { id: "window", label: "Window", barHeight: 44, titleLabel: "Title", Bar: WindowBar },
  { id: "browser", label: "Browser", barHeight: 52, titleLabel: "Address", Bar: BrowserBar },
];

export const getFrame = (id: FrameId) => FRAMES.find((frame) => frame.id === id) ?? FRAMES[0];
