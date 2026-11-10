import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-accent text-accent-ink hover:brightness-110",
  secondary: "bg-field text-ink hover:brightness-95 dark:hover:brightness-125",
  ghost: "text-muted hover:text-ink hover:bg-field",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export function Button({ variant = "secondary", className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex h-8 items-center justify-center gap-1 rounded-md px-3 text-[13px] pointer-coarse:h-10 font-medium whitespace-nowrap transition-[filter,background-color,color] disabled:pointer-events-none disabled:opacity-45 ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}
