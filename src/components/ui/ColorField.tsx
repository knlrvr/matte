import { useState } from "react";

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const HEX = /^#[0-9a-f]{6}$/i;

/** A colour well paired with a hex box, for people who have a brand colour to paste. */
export function ColorField({ label, value, onChange }: ColorFieldProps) {
  // Holds half-typed hex while the box is focused; null means "show the value".
  const [draft, setDraft] = useState<string | null>(null);

  return (
    <div className="flex h-8 min-w-0 pointer-coarse:h-10 items-center gap-2 rounded-md bg-field px-1.5">
      <input
        type="color"
        aria-label={`${label} colour picker`}
        value={HEX.test(value) ? value : "#000000"}
        onChange={(event) => onChange(event.target.value)}
        className="size-5 shrink-0"
      />
      <input
        type="text"
        aria-label={`${label} hex value`}
        spellCheck={false}
        maxLength={7}
        value={draft ?? value}
        onChange={(event) => {
          const next = event.target.value.startsWith("#") ? event.target.value : `#${event.target.value}`;
          setDraft(next);
          if (HEX.test(next)) onChange(next.toLowerCase());
        }}
        onBlur={() => setDraft(null)}
        className="w-full min-w-0 bg-transparent tabular-nums outline-none"
      />
    </div>
  );
}
