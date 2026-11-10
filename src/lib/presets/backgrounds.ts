export interface BackgroundPreset {
  id: string;
  name: string;
  /** Any valid CSS `background` value. */
  css: string;
}

const mesh = (base: string, ...spots: [pos: string, color: string, reach: number][]) =>
  [
    ...spots.map(([pos, color, reach]) => `radial-gradient(at ${pos}, ${color} 0, transparent ${reach}%)`),
    base,
  ].join(", ");

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  { id: "lagoon", name: "Lagoon", css: "linear-gradient(135deg, #43cea2, #185a9d)" },
  { id: "dusk", name: "Dusk", css: "linear-gradient(135deg, #ffb199 0%, #ff5e7e 55%, #a445b2 100%)" },
  { id: "ultraviolet", name: "Ultraviolet", css: "linear-gradient(135deg, #7f5af0, #2cb1ff)" },
  { id: "ember", name: "Ember", css: "linear-gradient(135deg, #f6d365, #fd7f5a)" },
  { id: "moss", name: "Moss", css: "linear-gradient(160deg, #d4fc79, #4fb286)" },
  { id: "orchid", name: "Orchid", css: "linear-gradient(135deg, #f8a4d8, #6c63ff)" },
  {
    id: "aurora",
    name: "Aurora",
    css: mesh("#0f172a", ["18% 22%", "#2dd4bf", 52], ["82% 12%", "#818cf8", 50], ["70% 92%", "#f472b6", 55]),
  },
  {
    id: "sherbet",
    name: "Sherbet",
    css: mesh("#ffe8d6", ["12% 85%", "#ff9f7a", 55], ["88% 18%", "#ffd166", 50], ["60% 60%", "#ff7eb6", 45]),
  },
  {
    id: "tidepool",
    name: "Tidepool",
    css: mesh("#dff6ff", ["15% 15%", "#7dd3fc", 55], ["85% 80%", "#34d399", 55], ["80% 15%", "#a5b4fc", 45]),
  },
  {
    id: "nightshade",
    name: "Nightshade",
    css: mesh("#150f2e", ["20% 80%", "#7c3aed", 55], ["85% 25%", "#db2777", 50], ["50% 0%", "#1d4ed8", 45]),
  },
  { id: "paper", name: "Paper", css: "linear-gradient(160deg, #f5f7fa, #c3cfe2)" },
  { id: "slate", name: "Slate", css: "linear-gradient(160deg, #4a5468, #1b1f2b)" },
];

export const getBackgroundPreset = (id: string) =>
  BACKGROUND_PRESETS.find((preset) => preset.id === id) ?? BACKGROUND_PRESETS[0];

export const SOLID_SWATCHES = [
  "#ffffff", "#f1f2f4", "#15171c", "#2f5bea", "#0ea5a4", "#16a34a", "#f59e0b", "#ef4444", "#db2777", "#7c3aed",
];
