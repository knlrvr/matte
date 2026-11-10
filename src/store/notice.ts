import { create } from "zustand";

export type NoticeTone = "info" | "error";

interface NoticeState {
  notice: { id: number; message: string; tone: NoticeTone } | null;
  notify: (message: string, tone?: NoticeTone) => void;
}

let timer: ReturnType<typeof setTimeout> | undefined;

/** One short status line at a time: "Copied", "Downloaded…", or what went wrong. */
export const useNoticeStore = create<NoticeState>((set) => ({
  notice: null,
  notify: (message, tone = "info") => {
    clearTimeout(timer);
    set({ notice: { id: Date.now(), message, tone } });
    timer = setTimeout(() => set({ notice: null }), tone === "error" ? 6000 : 2600);
  },
}));
