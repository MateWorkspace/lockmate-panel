import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";
import { ChevronDownIcon } from "@/components/icons";

/**
 * A styled native <select>. AGENTS.md forbids raw <select> in filters so the
 * dropdown chevron doesn't collide with the browser's own arrow.
 */
export default function Select({
  className,
  children,
  ...props
}: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          "border-border bg-surface text-foreground h-11 w-full appearance-none rounded-[var(--radius-input)] border pr-10 pl-3.5 text-base",
          "transition-colors duration-150 outline-none",
          "hover:border-border-strong",
          "focus-visible:border-accent focus-visible:ring-focus/45 focus-visible:ring-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon className="text-muted pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
    </div>
  );
}
