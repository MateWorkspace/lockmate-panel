"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import LockmateMark from "@/components/brand/LockmateMark";
import { LogOutIcon } from "@/components/icons";
import Avatar from "@/components/ui/avatar";
import { NAVIGATION, NAV_ITEMS, isActiveRoute } from "@/config/navigation";
import { cn } from "@/lib/cn";
import type { SessionUser } from "@/lib/mock";

interface SidebarProps {
  user: SessionUser;
  collapsed?: boolean;
  onNavigate?: () => void;
}

export default function Sidebar({
  user,
  collapsed = false,
  onNavigate,
}: SidebarProps) {
  const pathname = usePathname();
  const numberByHref = new Map(
    NAV_ITEMS.map((item, position) => [
      item.href,
      String(position + 1).padStart(2, "0"),
    ])
  );

  return (
    <div className="bg-surface border-border flex h-full flex-col border-r">
      <div
        className={cn(
          "flex h-16 items-center gap-2.5 px-4",
          collapsed && "justify-center px-0"
        )}
      >
        <LockmateMark className="role-pulse h-7 w-7 shrink-0" />
        <span
          className={cn(
            "font-display text-primary truncate text-lg font-bold tracking-tight",
            collapsed && "sr-only"
          )}
        >
          Lockmate
        </span>
      </div>

      <nav className="shell-scroll flex-1 overflow-y-auto px-3 pb-4">
        {NAVIGATION.map((group) => (
          <div key={group.label} className="mb-4">
            <p className={cn("eyebrow px-3 pb-2", collapsed && "sr-only")}>
              {group.label}
            </p>
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                const number = numberByHref.get(item.href) ?? "00";
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors",
                        collapsed && "justify-center px-0",
                        active
                          ? "bg-surface-2 text-primary"
                          : "text-muted hover:bg-surface-2/70 hover:text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "bg-accent absolute top-1/2 left-0 h-5 w-1 -translate-y-1/2 rounded-full transition-opacity",
                          active ? "opacity-100" : "opacity-0"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={cn(
                          "font-mono text-[0.7rem] font-medium tabular-nums",
                          active ? "text-accent-deep" : "text-subtle",
                          collapsed && "hidden"
                        )}
                      >
                        {number}
                      </span>
                      <item.icon className="h-5 w-5 shrink-0" />
                      <span className={cn("truncate", collapsed && "sr-only")}>
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-border border-t p-3">
        <div
          className={cn(
            "flex items-center gap-3 rounded-xl px-1 py-1",
            collapsed && "justify-center"
          )}
        >
          <Avatar name={user.name} />
          <div className={cn("min-w-0 flex-1", collapsed && "sr-only")}>
            <p className="text-foreground truncate text-sm font-semibold">
              {user.name}
            </p>
            <p className="text-muted truncate text-xs">{user.roleName}</p>
          </div>
          <button
            type="button"
            className={cn(
              "text-muted hover:text-primary hover:bg-surface-2 focus-visible:ring-focus/50 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none",
              collapsed && "hidden"
            )}
            aria-label="Sign out"
          >
            <LogOutIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
