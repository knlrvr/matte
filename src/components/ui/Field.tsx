import type { ReactNode } from "react";

interface FieldProps {
  label: string;
  /** Put the label above the control, for controls that need the full width. */
  stacked?: boolean;
  children: ReactNode;
}

/** A labelled control that isn't a slider. */
export function Field({ label, stacked = false, children }: FieldProps) {
  return (
    <div className={stacked ? "flex flex-col gap-1.5" : "grid grid-cols-[76px_1fr] items-center gap-3"}>
      <span className="text-muted">{label}</span>
      {children}
    </div>
  );
}
