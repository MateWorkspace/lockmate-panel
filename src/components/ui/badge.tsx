import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export type BadgeTone =
  | "neutral"
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "critical"
  | "info";

const TONE_CLASS: Record<BadgeTone, string> = {
  neutral: "",
  primary: "badge--primary",
  accent: "badge--accent",
  success: "badge--success",
  warning: "badge--warning",
  critical: "badge--critical",
  info: "badge--info",
};

interface BadgeProps extends ComponentProps<"span"> {
  tone?: BadgeTone;
  dot?: boolean;
}

export default function Badge({
  tone = "neutral",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn("badge", TONE_CLASS[tone], className)} {...props}>
      {dot ? <span className="badge__dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}
