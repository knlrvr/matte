import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  /** Optional control shown opposite the title, e.g. a reset link. */
  action?: ReactNode;
  children: ReactNode;
}

export function Section({ title, action, children }: SectionProps) {
  return (
    <section className="border-b border-line px-4 py-4">
      <div className="mb-3 flex h-5 items-center justify-between">
        <h2 className="text-[13px] font-semibold">{title}</h2>
        {action}
      </div>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}
