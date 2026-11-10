import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_SETTINGS } from "@/lib/defaults";
import { revokeIfObjectUrl } from "@/lib/image";
import type { EditorSettings, SourceImage } from "@/lib/types";

interface EditorState {
  image: SourceImage | null;
  settings: EditorSettings;
  setImage: (image: SourceImage | null) => void;
  /** Patch one settings section, e.g. `update("shot", { radius: 20 })`. */
  update: <K extends keyof EditorSettings>(section: K, patch: Partial<EditorSettings[K]>) => void;
  resetSettings: () => void;
}

/** Fills in any keys missing from a saved copy, so new settings get defaults. */
function withDefaults(saved: Partial<EditorSettings> | undefined): EditorSettings {
  const merged = structuredClone(DEFAULT_SETTINGS);
  for (const key of Object.keys(merged) as (keyof EditorSettings)[]) {
    Object.assign(merged[key], saved?.[key]);
  }
  return merged;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      image: null,
      settings: structuredClone(DEFAULT_SETTINGS),

      setImage: (image) => {
        const previous = get().image;
        if (previous?.src !== image?.src) revokeIfObjectUrl(previous?.src);
        set({ image });
      },

      update: (section, patch) =>
        set((state) => ({
          settings: {
            ...state.settings,
            [section]: { ...state.settings[section], ...patch },
          },
        })),

      resetSettings: () => {
        revokeIfObjectUrl(get().settings.background.imageUrl);
        set({ settings: structuredClone(DEFAULT_SETTINGS) });
      },
    }),
    {
      name: "matte:settings",
      version: 1,
      // Rehydrated from an effect in <Editor /> so server and client markup match.
      skipHydration: true,
      // Images are object URLs that die with the tab, so only settings are saved.
      partialize: ({ settings }) => ({
        settings: {
          ...settings,
          background: {
            ...settings.background,
            imageUrl: null,
            type: settings.background.type === "image" ? "preset" : settings.background.type,
          },
        },
      }),
      merge: (persisted, current) => ({
        ...current,
        settings: withDefaults((persisted as Partial<EditorState> | undefined)?.settings),
      }),
    },
  ),
);
