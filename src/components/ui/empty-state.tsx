import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="border-border bg-surface flex flex-col items-center justify-center rounded-[var(--radius-card)] border border-dashed px-6 py-14 text-center">
      {icon ? (
        <span className="bg-surface-2 text-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl [&>svg]:h-6 [&>svg]:w-6">
          {icon}
        </span>
      ) : null}
      <h3 className="font-display text-foreground text-xl font-bold">
        {title}
      </h3>
      {description ? (
        <p className="text-muted mt-2 max-w-[46ch] text-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
