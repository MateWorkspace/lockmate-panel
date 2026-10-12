import { apiFetch } from "./client";
import type {
  AuditResponse,
  IdResponse,
  Json,
  PageDataResponse,
  PageQuery,
} from "./types";

/** 04. Permissions — space-scoped capability slugs. */

export interface PermissionResponse extends AuditResponse {
  id: number;
  space_id: number;
  slug: string;
  name: string;
  description?: string | null;
  preferences: Json;
}

export interface CreatePermissionRequest {
  slug: string;
  name: string;
  description?: string | null;
  preferences?: Json;
}

export interface UpdatePermissionRequest {
  name?: string;
  description?: string | null;
  preferences?: Json;
}

export function listPermissions(
  spaceId: number,
  query: PageQuery = {}
): Promise<PageDataResponse<PermissionResponse>> {
  return apiFetch<PageDataResponse<PermissionResponse>>(
    `/management/spaces/${spaceId}/permissions`,
    { query }
  );
}

export function createPermission(
  spaceId: number,
  body: CreatePermissionRequest
): Promise<IdResponse> {
  return apiFetch<IdResponse>(`/management/spaces/${spaceId}/permissions`, {
    method: "POST",
    body,
  });
}

export function getPermissionById(
  spaceId: number,
  permissionId: number
): Promise<PermissionResponse> {
  return apiFetch<PermissionResponse>(
    `/management/spaces/${spaceId}/permissions/${permissionId}`
  );
}

export function getPermissionBySlug(
  spaceId: number,
  slug: string
): Promise<PermissionResponse> {
  return apiFetch<PermissionResponse>(
    `/management/spaces/${spaceId}/permissions/by-slug/${encodeURIComponent(slug)}`
  );
}

export function updatePermission(
  spaceId: number,
  permissionId: number,
  body: UpdatePermissionRequest
): Promise<void> {
  return apiFetch<void>(
    `/management/spaces/${spaceId}/permissions/${permissionId}`,
    { method: "PATCH", body }
  );
}

export function deletePermission(
  spaceId: number,
  permissionId: number
): Promise<void> {
  return apiFetch<void>(
    `/management/spaces/${spaceId}/permissions/${permissionId}`,
    { method: "DELETE" }
  );
}
