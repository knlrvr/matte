import type { CSSProperties } from "react";

interface SwatchProps {
  name: string;
  /** Any CSS `background` value. */
  background: string;
  selected: boolean;
  onSelect: () => void;
  style?: CSSProperties;
}

export function Swatch({ name, background, selected, onSelect, style }: SwatchProps) {
  return (
    <button
      type="button"
      title={name}
      aria-label={name}
      aria-pressed={selected}
      onClick={onSelect}
      style={{ background, ...style }}
      className={`aspect-square w-full rounded-md ring-1 ring-black/10 transition-shadow ring-inset dark:ring-white/15 ${
        selected ? "outline-2 outline-offset-2 outline-ink" : ""
      }`}
    />
  );
}
