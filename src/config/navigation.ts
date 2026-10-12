import type { ComponentType, SVGProps } from "react";

import { DashboardIcon, ShieldIcon, UsersIcon } from "@/components/icons";

export interface NavItem {
  href: string;
  label: string;
  hint: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface NavGroup {
  label: string;
  items: readonly NavItem[];
}

export const NAVIGATION: readonly NavGroup[] = [
  {
    label: "Workspace",
    items: [
      {
        href: "/dashboard",
        label: "Overview",
        hint: "Fleet of identities at a glance",
        icon: DashboardIcon,
      },
      {
        href: "/users",
        label: "Users",
        hint: "Identities across every space",
        icon: UsersIcon,
      },
      {
        href: "/access-control",
        label: "Access control",
        hint: "Roles and their permission grants",
        icon: ShieldIcon,
      },
    ],
  },
];

/** Flattened list for active-route matching. */
export const NAV_ITEMS: readonly NavItem[] = NAVIGATION.flatMap(
  (group) => group.items
);

export function isActiveRoute(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
