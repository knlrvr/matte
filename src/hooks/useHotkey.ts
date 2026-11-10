import { useEffect } from "react";

interface Combo {
  key: string;
  shift?: boolean;
}

/** Binds Cmd/Ctrl + key. Pass a stable handler (useCallback). */
export function useHotkey({ key, shift = false }: Combo, handler: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.altKey) return;
      if (event.shiftKey !== shift || event.key.toLowerCase() !== key) return;
      event.preventDefault();
      handler();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, shift, handler]);
}
