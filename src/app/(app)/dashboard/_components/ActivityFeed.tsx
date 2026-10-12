import Avatar from "@/components/ui/avatar";
import { cn } from "@/lib/cn";
import type { ActivityEntry } from "@/lib/mock";

export default function ActivityFeed({
  entries,
}: {
  entries: ActivityEntry[];
}) {
  return (
    <ol className="flex flex-col">
      {entries.map((entry, index) => (
        <li
          key={entry.id}
          className={cn(
            "flex gap-3 py-3.5",
            index > 0 && "border-border border-t"
          )}
        >
          <Avatar name={entry.actor} className="h-9 w-9 text-xs" />
          <div className="min-w-0">
            <p className="text-foreground text-sm leading-snug">
              <span className="font-semibold">{entry.actor}</span>{" "}
              <span className="text-muted">{entry.action}</span>{" "}
              <span className="text-primary font-semibold">{entry.target}</span>
            </p>
            <p className="text-subtle mt-0.5 text-xs">{entry.label}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
