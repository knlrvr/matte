interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  /** How the value reads next to the track, e.g. `(v) => `${v}°``. */
  format?: (value: number) => string;
  onChange: (value: number) => void;
}

export function Slider({ label, value, min, max, step = 1, format = String, onChange }: SliderProps) {
  return (
    <label className="grid grid-cols-[76px_1fr_42px] items-center gap-3">
      <span className="text-muted">{label}</span>
      <input
        type="range"
        className="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <output className="text-right tabular-nums">{format(value)}</output>
    </label>
  );
}
