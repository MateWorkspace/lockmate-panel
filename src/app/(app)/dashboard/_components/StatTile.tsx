import type { ReactNode } from "react";

import Card from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { Stat } from "@/lib/mock";

const TONE: Record<Stat["tone"], { value: string; chip: string }> = {
  primary: { value: "text-primary", chip: "bg-primary/10 text-primary" },
  accent: { value: "text-accent-deep", chip: "bg-accent/20 text-accent-deep" },
  success: { value: "text-success", chip: "bg-success/12 text-success" },
  info: { value: "text-info", chip: "bg-info/12 text-info" },
};

export default function StatTile({
  stat,
  icon,
}: {
  stat: Stat;
  icon: ReactNode;
}) {
  const tone = TONE[stat.tone];
  const formatted = stat.value.toLocaleString("en-US");

  return (
    <Card className="lift p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="eyebrow">{stat.label}</p>
        <span
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-xl [&>svg]:h-4 [&>svg]:w-4",
            tone.chip
          )}
        >
          {icon}
        </span>
      </div>
      <p
        className={cn(
          "font-display mt-4 text-4xl leading-none font-bold tracking-tight",
          tone.value
        )}
      >
        {formatted}
        {stat.suffix ? <span className="text-2xl">{stat.suffix}</span> : null}
      </p>
      <p className="text-muted mt-2 text-sm">{stat.delta}</p>
    </Card>
  );
}
