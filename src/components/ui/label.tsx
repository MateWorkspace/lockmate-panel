import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export default function Label({
  className,
  children,
  ...props
}: ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-foreground flex items-center gap-2 text-sm font-semibold",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
