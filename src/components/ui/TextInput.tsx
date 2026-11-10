import type { InputHTMLAttributes } from "react";

export function TextInput({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={`h-8 w-full pointer-coarse:h-10 min-w-0 rounded-md bg-field px-2.5 placeholder:text-muted/70 ${className}`}
      {...props}
    />
  );
}
