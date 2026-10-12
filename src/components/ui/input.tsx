import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export default function Input({
  className,
  ...props
}: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "border-border bg-surface text-foreground placeholder:text-subtle h-11 w-full rounded-[var(--radius-input)] border px-3.5 text-base",
        "transition-colors duration-150 outline-none",
        "hover:border-border-strong",
        "focus-visible:border-accent focus-visible:ring-focus/45 focus-visible:ring-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}
