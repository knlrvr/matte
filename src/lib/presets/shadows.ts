import type { ShadowId } from "../types";

export const SHADOWS: { id: ShadowId; label: string; css: string }[] = [
  { id: "none", label: "None", css: "none" },
  { id: "soft", label: "Soft", css: "0 10px 30px -8px rgba(0, 0, 0, 0.28)" },
  { id: "medium", label: "Medium", css: "0 28px 64px -14px rgba(0, 0, 0, 0.42)" },
  {
    id: "strong",
    label: "Strong",
    css: "0 56px 110px -24px rgba(0, 0, 0, 0.55), 0 30px 60px -30px rgba(0, 0, 0, 0.5)",
  },
];

export const getShadowCss = (id: ShadowId) =>
  SHADOWS.find((shadow) => shadow.id === id)?.css ?? "none";
