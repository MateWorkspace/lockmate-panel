import { apiFetch } from "./client";
import type {
  AuditResponse,
  IdResponse,
  Json,
  PageDataResponse,
  PageQuery,
} from "./types";

/** 05. Roles — named bundles of permissions within a space. */

export interface RoleResponse extends AuditResponse {
  id: number;
  space_id: number;
  slug: string;
  name: string;
  description?: string | null;
  is_default: boolean;
  preferences: Json;
}

export interface ListRolesQuery extends PageQuery {
  is_default?: boolean;
}

export interface CreateRoleRequest {
  slug: string;
  name: string;
  description?: string | null;
  is_default?: boolean;
  preferences?: Json;
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string | null;
  is_default?: boolean;
  preferences?: Json;
}

export function listRoles(
  spaceId: number,
  query: ListRolesQuery = {}
): Promise<PageDataResponse<RoleResponse>> {
  return apiFetch<PageDataResponse<RoleResponse>>(
    `/management/spaces/${spaceId}/roles`,
    { query }
  );
}

export function createRole(
  spaceId: number,
  body: CreateRoleRequest
): Promise<IdResponse> {
  return apiFetch<IdResponse>(`/management/spaces/${spaceId}/roles`, {
    method: "POST",
    body,
  });
}

export function getRoleById(
  spaceId: number,
  roleId: number
): Promise<RoleResponse> {
  return apiFetch<RoleResponse>(
    `/management/spaces/${spaceId}/roles/${roleId}`
  );
}

export function getRoleBySlug(
  spaceId: number,
  slug: string
): Promise<RoleResponse> {
  return apiFetch<RoleResponse>(
    `/management/spaces/${spaceId}/roles/by-slug/${encodeURIComponent(slug)}`
  );
}

export function getDefaultRole(spaceId: number): Promise<RoleResponse> {
  return apiFetch<RoleResponse>(`/management/spaces/${spaceId}/roles/default`);
}

export function updateRole(
  spaceId: number,
  roleId: number,
  body: UpdateRoleRequest
): Promise<void> {
  return apiFetch<void>(`/management/spaces/${spaceId}/roles/${roleId}`, {
    method: "PATCH",
    body,
  });
}

export function setDefaultRole(spaceId: number, roleId: number): Promise<void> {
  return apiFetch<void>(
    `/management/spaces/${spaceId}/roles/${roleId}/default`,
    { method: "PATCH" }
  );
}

export function deleteRole(spaceId: number, roleId: number): Promise<void> {
  return apiFetch<void>(`/management/spaces/${spaceId}/roles/${roleId}`, {
    method: "DELETE",
  });
}
