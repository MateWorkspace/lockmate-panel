"use client";

import { usePathname } from "next/navigation";

import Avatar from "@/components/ui/avatar";
import { MenuIcon, PanelIcon, SparkIcon } from "@/components/icons";
import { NAV_ITEMS, isActiveRoute } from "@/config/navigation";
import { cn } from "@/lib/cn";
import type { SessionUser } from "@/lib/mock";

interface TopBarProps {
  user: SessionUser;
  onToggleDesktop: () => void;
  onOpenMobile: () => void;
}

export default function TopBar({
  user,
  onToggleDesktop,
  onOpenMobile,
}: TopBarProps) {
  const pathname = usePathname();
  const current = NAV_ITEMS.find((item) => isActiveRoute(pathname, item.href));

  const iconButton =
    "text-muted hover:text-primary hover:bg-surface-2 focus-visible:ring-focus/50 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none";

  return (
    <header className="bg-background/85 border-border sticky top-0 z-30 flex h-16 items-center gap-3 border-b px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        className={cn(iconButton, "lg:hidden")}
        onClick={onOpenMobile}
        aria-label="Open navigation"
      >
        <MenuIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        className={cn(iconButton, "hidden lg:inline-flex")}
        onClick={onToggleDesktop}
        aria-label="Collapse navigation"
      >
        <PanelIcon className="h-5 w-5" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="eyebrow hidden sm:block">Workspace</p>
        <p className="font-display text-foreground truncate text-base font-bold">
          {current?.label ?? "Lockmate"}
        </p>
      </div>

      <span className="border-accent/40 bg-surface-2 text-primary hidden items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold md:inline-flex">
        <SparkIcon className="h-3.5 w-3.5" />
        {user.spaces[0]}
      </span>

      <button
        type="button"
        className="focus-visible:ring-focus/50 flex items-center gap-2 rounded-full pr-1 pl-1 transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none"
        aria-label="Account menu"
      >
        <Avatar name={user.name} className="h-9 w-9" />
      </button>
    </header>
  );
}
