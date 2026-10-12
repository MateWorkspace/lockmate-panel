import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface AvatarProps {
  name: string;
  className?: string;
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
}

export default function Avatar({ name, className }: AvatarProps) {
  return (
    <span
      className={cn(
        "border-accent/50 bg-surface-2 text-primary inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold",
        className
      )}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}

export function AvatarStack({
  names,
  className,
  ...props
}: { names: string[] } & ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center", className)} {...props}>
      {names.map((name, index) => (
        <Avatar
          key={`${name}-${index}`}
          name={name}
          className={cn("h-8 w-8 text-xs", index > 0 && "-ml-2")}
        />
      ))}
    </div>
  );
}

export function AvatarLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-foreground text-sm font-semibold">{children}</span>
  );
}
