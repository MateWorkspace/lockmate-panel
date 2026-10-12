import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export type ButtonVariant =
  "primary" | "accent" | "soft" | "outline" | "ghost" | "critical";

export type ButtonSize = "sm" | "md" | "lg";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "",
  accent: "btn--accent",
  soft: "btn--soft",
  outline: "btn--outline",
  ghost: "btn--ghost",
  critical: "btn--critical",
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: "btn--sm",
  md: "",
  lg: "btn--lg",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  block = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  className?: string;
} = {}): string {
  return cn(
    "btn",
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    block && "btn--block",
    className
  );
}

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  block = false,
  loading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, size, block, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="btn__spinner" aria-hidden="true" /> : null}
      {children}
    </button>
  );
}
