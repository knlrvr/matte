"use client";

import { useNoticeStore } from "@/store/notice";

/** A single status line that floats over the stage and clears itself. */
export function Notice() {
  const notice = useNoticeStore((state) => state.notice);
  return (
    <div aria-live="polite" className="pointer-events-none absolute inset-x-0 top-3 z-20 flex justify-center px-4">
      {notice && (
        <p
          key={notice.id}
          className={`max-w-full truncate rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-medium shadow-lg ${
            notice.tone === "error" ? "text-danger" : "text-panel"
          }`}
        >
          {notice.message}
        </p>
      )}
    </div>
  );
}
