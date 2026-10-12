import Link from "next/link";

import { cn } from "@/lib/cn";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

interface PaginationProps {
  page: number;
  totalPages: number;
  hrefForPage: (page: number) => string;
}

function pageWindow(page: number, totalPages: number): number[] {
  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  return [...pages]
    .filter((value) => value >= 1 && value <= totalPages)
    .sort((a, b) => a - b);
}

export default function Pagination({
  page,
  totalPages,
  hrefForPage,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = pageWindow(page, totalPages);
  const linkClass =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors";

  return (
    <nav
      className="flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <PagerLink
        href={hrefForPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        className={linkClass}
        label="Previous page"
      >
        <ChevronLeftIcon className="h-4 w-4" />
      </PagerLink>

      {pages.map((value, index) => {
        const previous = pages[index - 1];
        const gap = previous !== undefined && value - previous > 1;
        return (
          <span key={value} className="flex items-center gap-2">
            {gap ? <span className="text-subtle px-1">…</span> : null}
            <Link
              href={hrefForPage(value)}
              aria-current={value === page ? "page" : undefined}
              className={cn(
                linkClass,
                value === page
                  ? "border-primary bg-primary text-surface"
                  : "border-border text-muted hover:border-accent hover:text-primary"
              )}
            >
              {value}
            </Link>
          </span>
        );
      })}

      <PagerLink
        href={hrefForPage(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className={linkClass}
        label="Next page"
      >
        <ChevronRightIcon className="h-4 w-4" />
      </PagerLink>
    </nav>
  );
}

function PagerLink({
  href,
  disabled,
  className,
  label,
  children,
}: {
  href: string;
  disabled: boolean;
  className: string;
  label: string;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={label}
        className={cn(
          className,
          "border-border text-subtle/60 cursor-not-allowed"
        )}
      >
        {children}
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        className,
        "border-border text-muted hover:border-accent hover:text-primary"
      )}
    >
      {children}
    </Link>
  );
}
