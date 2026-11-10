import { useId } from "react";

interface SegmentedProps<T extends string | number> {
  /** Read by screen readers; the visible label comes from the surrounding Field. */
  label: string;
  value: T;
  options: readonly { value: T; label: string }[];
  onChange: (value: T) => void;
}

/** A single-choice control. Real radio inputs underneath, so arrow keys work. */
export function Segmented<T extends string | number>({ label, value, options, onChange }: SegmentedProps<T>) {
  const name = useId();
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-md bg-field p-0.5">
      {options.map((option) => (
        <label key={option.value} className="relative min-w-0 flex-1 cursor-pointer">
          <input
            type="radio"
            name={name}
            className="peer sr-only"
            checked={option.value === value}
            onChange={() => onChange(option.value)}
          />
          <span className="block truncate rounded-[5px] px-1 py-1 text-center text-[12px] pointer-coarse:py-2 text-muted transition-colors peer-checked:bg-panel peer-checked:font-medium peer-checked:text-ink peer-checked:shadow-sm peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}
