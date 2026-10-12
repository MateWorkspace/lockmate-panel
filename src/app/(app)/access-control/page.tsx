import type { Metadata } from "next";
import Link from "next/link";

import Badge from "@/components/ui/badge";
import PageHeader from "@/components/ui/page-header";
import { buttonClasses } from "@/components/ui/button";
import { PlusIcon } from "@/components/icons";
import { permissions, permissionGroups, roles } from "@/lib/mock";
import { firstQueryValue, type RawSearchParams } from "@/lib/query";

import PermissionMatrix from "./_components/PermissionMatrix";
import RoleList from "./_components/RoleList";

export const metadata: Metadata = {
  title: "Access control",
};

// The selected role lives in searchParams, so this segment blocks rather than
// prerendering an instant static shell.
export const instant = false;

export default async function AccessControlPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const requested = firstQueryValue(raw.role);
  const activeRole = roles.find((role) => role.id === requested) ?? roles[0];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="Access"
        title="Access control"
        description="Roles bundle permissions. Pick a role to review exactly what it grants."
        actions={
          <Link
            href="/access-control"
            className={buttonClasses({ size: "sm" })}
          >
            <PlusIcon className="h-4 w-4" />
            New role
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <RoleList roles={roles} activeRoleId={activeRole.id} />

        <div className="min-w-0">
          <div className="card mb-4 flex flex-wrap items-start justify-between gap-4 p-6">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-foreground text-2xl font-bold">
                  {activeRole.name}
                </h2>
                {activeRole.system ? (
                  <Badge tone="primary">System</Badge>
                ) : (
                  <Badge tone="accent">Custom</Badge>
                )}
              </div>
              <p className="text-muted mt-1.5 max-w-[52ch] text-sm">
                {activeRole.description}
              </p>
            </div>
            <dl className="flex items-center gap-6">
              <div>
                <dt className="eyebrow">Members</dt>
                <dd className="font-display text-primary mt-1 text-2xl font-bold">
                  {activeRole.members}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Updated</dt>
                <dd className="text-foreground mt-1 text-sm font-semibold">
                  {activeRole.updatedLabel}
                </dd>
              </div>
            </dl>
          </div>

          <PermissionMatrix
            key={activeRole.id}
            permissions={permissions}
            permissionGroups={permissionGroups}
            initial={activeRole.permissionSlugs}
            editable={!activeRole.system}
          />
        </div>
      </div>
    </div>
  );
}
