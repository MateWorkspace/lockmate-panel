import { apiFetch } from "./client";
import type { PermissionResponse } from "./permissions";
import type { RoleResponse } from "./roles";
import type { IdResponse } from "./types";

/** 12. Role Permissions — grants linking a role to a permission. */

export interface RolePermissionResponse {
  id: number;
  space_id: number;
  role_id: number;
  permission_id: number;
  created_at: string;
  created_by?: number | null;
}

export interface RolePermissionDetailsResponse {
  role_permission: RolePermissionResponse;
  role: RoleResponse;
  permission: PermissionResponse;
}

export interface RolePermissionWithPermissionResponse {
  role_permission: RolePermissionResponse;
  permission: PermissionResponse;
}

export interface RolePermissionWithRoleResponse {
  role_permission: RolePermissionResponse;
  role: RoleResponse;
}

export interface CreateRolePermissionRequest {
  role_id: number;
  permission_id: number;
}

export interface DeleteRolePermissionsQuery {
  role_id?: number;
  permission_id?: number;
}

function base(spaceId: number): string {
  return `/management/spaces/${spaceId}/role-permissions`;
}

export function createRolePermission(
  spaceId: number,
  body: CreateRolePermissionRequest
): Promise<IdResponse> {
  return apiFetch<IdResponse>(base(spaceId), { method: "POST", body });
}

export function getRolePermissionById(
  spaceId: number,
  rolePermissionId: number
): Promise<RolePermissionDetailsResponse> {
  return apiFetch<RolePermissionDetailsResponse>(
    `${base(spaceId)}/${rolePermissionId}`
  );
}

export function getRolePermissionByPair(
  spaceId: number,
  roleId: number,
  permissionId: number
): Promise<RolePermissionDetailsResponse> {
  return apiFetch<RolePermissionDetailsResponse>(`${base(spaceId)}/by-pair`, {
    query: { role_id: roleId, permission_id: permissionId },
  });
}

export function listRolePermissionsByRole(
  spaceId: number,
  roleId: number
): Promise<RolePermissionWithPermissionResponse[]> {
  return apiFetch<RolePermissionWithPermissionResponse[]>(
    `${base(spaceId)}/by-role/${roleId}`
  );
}

export function listRolePermissionsByPermission(
  spaceId: number,
  permissionId: number
): Promise<RolePermissionWithRoleResponse[]> {
  return apiFetch<RolePermissionWithRoleResponse[]>(
    `${base(spaceId)}/by-permission/${permissionId}`
  );
}

export function deleteRolePermission(
  spaceId: number,
  rolePermissionId: number
): Promise<void> {
  return apiFetch<void>(`${base(spaceId)}/${rolePermissionId}`, {
    method: "DELETE",
  });
}

export function deleteRolePermissionsBySelectors(
  spaceId: number,
  query: DeleteRolePermissionsQuery
): Promise<void> {
  return apiFetch<void>(base(spaceId), { method: "DELETE", query });
}
