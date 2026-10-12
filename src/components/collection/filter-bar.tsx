import type { ReactNode } from "react";
import Link from "next/link";

import Button from "@/components/ui/button";

interface FilterBarProps {
  children: ReactNode;
  clearHref: string;
  action?: string;
}

export default function FilterBar({
  children,
  clearHref,
  action,
}: FilterBarProps) {
  return (
    <form action={action} method="get" className="card p-4 sm:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
      <div className="border-border mt-4 flex items-center justify-end gap-4 border-t pt-4">
        <Link
          href={clearHref}
          className="text-muted hover:text-primary text-sm font-semibold transition-colors"
        >
          Clear
        </Link>
        <Button type="submit" size="sm">
          Apply
        </Button>
      </div>
    </form>
  );
}
