"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { cn } from "@/lib/cn";
import type { SessionUser } from "@/lib/mock";

interface AppShellProps {
  user: SessionUser;
  children: ReactNode;
}

export default function AppShell({ user, children }: AppShellProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <div className="bg-background flex h-screen flex-col overflow-x-clip">
      <a
        href="#main-content"
        className="bg-primary text-surface focus-visible:ring-focus fixed top-3 left-4 z-50 -translate-y-20 rounded-full px-4 py-2.5 text-sm font-semibold transition-transform focus-visible:translate-y-0 focus-visible:ring-2 focus-visible:outline-none"
      >
        Skip to main content
      </a>

      <div className="flex min-h-0 flex-1">
        <aside
          className={cn(
            "hidden shrink-0 overflow-hidden transition-[width] duration-200 lg:block",
            collapsed ? "w-[4.75rem]" : "w-72"
          )}
        >
          <Sidebar user={user} collapsed={collapsed} />
        </aside>

        {mobileOpen ? (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
            className="bg-foreground/40 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
          />
        ) : null}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-200 lg:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar user={user} onNavigate={() => setMobileOpen(false)} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            user={user}
            onToggleDesktop={() => setCollapsed((value) => !value)}
            onOpenMobile={() => setMobileOpen(true)}
          />
          <main
            ref={mainRef}
            id="main-content"
            tabIndex={-1}
            className="shell-scroll min-w-0 flex-1 overflow-y-auto focus:outline-none"
          >
            <div className="mx-auto w-full max-w-[var(--page-max)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
