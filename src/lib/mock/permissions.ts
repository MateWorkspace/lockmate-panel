import type { Permission } from "./types";

/**
 * The permission catalogue, grouped the way the backend groups its slugs.
 * Dummy data — no backend calls yet.
 */
export const permissions: Permission[] = [
  { slug: "user:get", label: "View users", group: "Users" },
  { slug: "user:create", label: "Invite users", group: "Users" },
  { slug: "user:update", label: "Edit users", group: "Users" },
  { slug: "user:delete", label: "Remove users", group: "Users" },
  { slug: "space:get", label: "View spaces", group: "Spaces" },
  { slug: "space:manage", label: "Manage spaces", group: "Spaces" },
  { slug: "role:get", label: "View roles", group: "Access" },
  { slug: "role:create", label: "Create roles", group: "Access" },
  { slug: "role:update", label: "Edit roles", group: "Access" },
  { slug: "role:delete", label: "Delete roles", group: "Access" },
  { slug: "permission:get", label: "View permissions", group: "Access" },
  { slug: "permission:assign", label: "Assign permissions", group: "Access" },
  { slug: "client:get", label: "View clients", group: "Clients" },
  { slug: "client:create", label: "Register clients", group: "Clients" },
  { slug: "client:delete", label: "Revoke clients", group: "Clients" },
  { slug: "session:get", label: "View sessions", group: "Security" },
  { slug: "session:revoke", label: "Revoke sessions", group: "Security" },
  { slug: "audit:get", label: "Read audit log", group: "Security" },
];

export const permissionGroups: string[] = [
  "Users",
  "Spaces",
  "Access",
  "Clients",
  "Security",
];
