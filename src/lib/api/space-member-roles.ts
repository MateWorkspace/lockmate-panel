import { apiFetch } from "./client";
import type { RoleResponse } from "./roles";
import type { SpaceMemberResponse } from "./space-members";
import type { IdResponse } from "./types";

/** 13. Space Member Roles — grants linking a membership to a role. */

export interface SpaceMemberRoleResponse {
  id: number;
  space_id: number;
  space_member_id: number;
  role_id: number;
  created_at: string;
  created_by?: number | null;
}

export interface SpaceMemberRoleDetailsResponse {
  space_member_role: SpaceMemberRoleResponse;
  space_member: SpaceMemberResponse;
  role: RoleResponse;
}

export interface SpaceMemberRoleWithRoleResponse {
  space_member_role: SpaceMemberRoleResponse;
  role: RoleResponse;
}

export interface SpaceMemberRoleWithSpaceMemberResponse {
  space_member_role: SpaceMemberRoleResponse;
  space_member: SpaceMemberResponse;
}

export interface CreateSpaceMemberRoleRequest {
  space_member_id: number;
  role_id: number;
}

export interface DeleteSpaceMemberRolesQuery {
  space_member_id?: number;
  role_id?: number;
}

function base(spaceId: number): string {
  return `/management/spaces/${spaceId}/space-member-roles`;
}

export function createSpaceMemberRole(
  spaceId: number,
  body: CreateSpaceMemberRoleRequest
): Promise<IdResponse> {
  return apiFetch<IdResponse>(base(spaceId), { method: "POST", body });
}

export function getSpaceMemberRoleById(
  spaceId: number,
  spaceMemberRoleId: number
): Promise<SpaceMemberRoleDetailsResponse> {
  return apiFetch<SpaceMemberRoleDetailsResponse>(
    `${base(spaceId)}/${spaceMemberRoleId}`
  );
}

export function getSpaceMemberRoleByPair(
  spaceId: number,
  spaceMemberId: number,
  roleId: number
): Promise<SpaceMemberRoleDetailsResponse> {
  return apiFetch<SpaceMemberRoleDetailsResponse>(`${base(spaceId)}/by-pair`, {
    query: { space_member_id: spaceMemberId, role_id: roleId },
  });
}

export function listSpaceMemberRolesBySpaceMember(
  spaceId: number,
  spaceMemberId: number
): Promise<SpaceMemberRoleWithRoleResponse[]> {
  return apiFetch<SpaceMemberRoleWithRoleResponse[]>(
    `${base(spaceId)}/by-space-member/${spaceMemberId}`
  );
}

export function listSpaceMemberRolesByRole(
  spaceId: number,
  roleId: number
): Promise<SpaceMemberRoleWithSpaceMemberResponse[]> {
  return apiFetch<SpaceMemberRoleWithSpaceMemberResponse[]>(
    `${base(spaceId)}/by-role/${roleId}`
  );
}

export function deleteSpaceMemberRole(
  spaceId: number,
  spaceMemberRoleId: number
): Promise<void> {
  return apiFetch<void>(`${base(spaceId)}/${spaceMemberRoleId}`, {
    method: "DELETE",
  });
}

export function deleteSpaceMemberRolesBySelectors(
  spaceId: number,
  query: DeleteSpaceMemberRolesQuery
): Promise<void> {
  return apiFetch<void>(base(spaceId), { method: "DELETE", query });
}
