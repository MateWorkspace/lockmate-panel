import Link from "next/link";

import Badge from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import type { Role } from "@/lib/mock";

export default function RoleList({
  roles,
  activeRoleId,
}: {
  roles: Role[];
  activeRoleId: string;
}) {
  return (
    <nav aria-label="Roles" className="flex flex-col gap-2">
      {roles.map((role) => {
        const active = role.id === activeRoleId;
        return (
          <Link
            key={role.id}
            href={`/access-control?role=${role.id}`}
            aria-current={active ? "true" : undefined}
            className={cn(
              "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 transition-colors",
              active
                ? "border-accent bg-surface-2"
                : "border-border bg-surface hover:border-accent/60"
            )}
          >
            <span className="min-w-0">
              <span className="font-display text-foreground block truncate text-base font-bold">
                {role.name}
              </span>
              <span className="text-muted block text-xs">
                <span className="font-mono tabular-nums">{role.members}</span>{" "}
                {role.members === 1 ? "member" : "members"}
              </span>
            </span>
            {role.system ? (
              <Badge tone="primary">System</Badge>
            ) : (
              <Badge>{role.permissionSlugs.length} grants</Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
