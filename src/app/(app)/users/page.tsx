import type { Metadata } from "next";
import Link from "next/link";

import Pagination from "@/components/collection/pagination";
import Button, { buttonClasses } from "@/components/ui/button";
import EmptyState from "@/components/ui/empty-state";
import PageHeader from "@/components/ui/page-header";
import { PlusIcon, SearchIcon, UsersIcon } from "@/components/icons";
import { roles, users } from "@/lib/mock";
import {
  buildCollectionUrl,
  firstQueryValue,
  parsePositiveSafeInteger,
  type RawSearchParams,
} from "@/lib/query";

import UserCard from "./_components/UserCard";
import UserFilters from "./_components/UserFilters";

export const metadata: Metadata = {
  title: "Users",
};

// Filters live in searchParams, so this segment blocks rather than
// prerendering an instant static shell.
export const instant = false;

const PAGE_SIZE = 6;

const roleNameById = new Map(roles.map((role) => [role.id, role.name]));

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const search = firstQueryValue(raw.search)?.trim() ?? "";
  const status = firstQueryValue(raw.status) ?? "";
  const role = firstQueryValue(raw.role) ?? "";
  const requestedPage = parsePositiveSafeInteger(firstQueryValue(raw.page), 1);

  const needle = search.toLowerCase();
  const filtered = users.filter((user) => {
    const matchesSearch =
      !needle ||
      user.name.toLowerCase().includes(needle) ||
      user.email.toLowerCase().includes(needle);
    const matchesStatus = !status || user.status === status;
    const matchesRole = !role || user.roleId === role;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hrefForPage = (target: number) =>
    buildCollectionUrl("/users", {
      search: search || undefined,
      status: status || undefined,
      role: role || undefined,
      page: String(target),
    });

  const hasFilters = Boolean(search || status || role);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        eyebrow="People"
        title="Users"
        description="Identities across every space. Filter by status or the role that holds their grants."
        actions={
          <Button size="sm">
            <PlusIcon className="h-4 w-4" />
            Invite user
          </Button>
        }
      />

      <UserFilters search={search} status={status} role={role} roles={roles} />

      <p className="text-muted text-sm">
        <span className="font-mono tabular-nums">{filtered.length}</span> of{" "}
        <span className="font-mono tabular-nums">{users.length}</span> users
        {hasFilters ? " match these filters" : ""}
      </p>

      {pageItems.length === 0 ? (
        <EmptyState
          icon={<SearchIcon />}
          title="No users match those filters"
          description="Try a different status or role, or clear the filters to see everyone."
          action={
            <Link
              href="/users"
              className={buttonClasses({ variant: "outline" })}
            >
              Clear filters
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pageItems.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              roleName={roleNameById.get(user.roleId) ?? "—"}
            />
          ))}
        </div>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        hrefForPage={hrefForPage}
      />

      {filtered.length > 0 ? (
        <p className="text-subtle flex items-center justify-center gap-1.5 text-xs">
          <UsersIcon className="h-3.5 w-3.5" />
          Page {page} of {totalPages}
        </p>
      ) : null}
    </div>
  );
}
