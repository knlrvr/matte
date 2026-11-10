export interface AspectRatio {
  id: string;
  label: string;
  /** Width divided by height. `null` hugs the image. */
  value: number | null;
  /** Longer description, shown as a tooltip. */
  hint?: string;
}

export const ASPECT_RATIOS: AspectRatio[] = [
  { id: "auto", label: "Auto", value: null },
  { id: "16:9", label: "16:9", value: 16 / 9 },
  { id: "3:2", label: "3:2", value: 3 / 2 },
  { id: "4:3", label: "4:3", value: 4 / 3 },
  { id: "1:1", label: "1:1", value: 1 },
  { id: "4:5", label: "4:5", value: 4 / 5 },
  { id: "9:16", label: "9:16", value: 9 / 16 },
  { id: "1200:630", label: "Social", value: 1200 / 630, hint: "Link preview card, 1200 × 630" },
];

export const getAspectRatio = (id: string) =>
  ASPECT_RATIOS.find((ratio) => ratio.id === id) ?? ASPECT_RATIOS[0];
