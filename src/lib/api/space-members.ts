import { apiFetch } from "./client";
import type { PermissionResponse } from "./permissions";
import type { RoleResponse } from "./roles";
import type {
  AuditResponse,
  IdResponse,
  Json,
  PageDataResponse,
  PageQuery,
} from "./types";
import type { UserResponse } from "./users";

/** 11. Space Members — a user's membership in a space, plus effective grants. */

export interface SpaceMemberResponse extends AuditResponse {
  id: number;
  space_id: number;
  user_id: number;
  is_active: boolean;
  preferences: Json;
}

export interface SpaceMemberWithUserResponse {
  space_member: SpaceMemberResponse;
  user: UserResponse;
}

export interface ListSpaceMembersQuery extends PageQuery {
  user_id?: number;
  role_id?: number;
  is_active?: boolean;
}

export interface CreateSpaceMemberRequest {
  user_id: number;
  is_active?: boolean;
  preferences?: Json;
}

export interface UpdateSpaceMemberRequest {
  is_active?: boolean;
  preferences?: Json;
}

export function listSpaceMembers(
  spaceId: number,
  query: ListSpaceMembersQuery = {}
): Promise<PageDataResponse<SpaceMemberWithUserResponse>> {
  return apiFetch<PageDataResponse<SpaceMemberWithUserResponse>>(
    `/management/spaces/${spaceId}/space-members`,
    { query }
  );
}

export function createSpaceMember(
  spaceId: number,
  body: CreateSpaceMemberRequest
): Promise<IdResponse> {
  return apiFetch<IdResponse>(`/management/spaces/${spaceId}/space-members`, {
    method: "POST",
    body,
  });
}

export function getSpaceMemberById(
  spaceId: number,
  spaceMemberId: number
): Promise<SpaceMemberResponse> {
  return apiFetch<SpaceMemberResponse>(
    `/management/spaces/${spaceId}/space-members/${spaceMemberId}`
  );
}

export function getSpaceMemberByUserId(
  spaceId: number,
  userId: number
): Promise<SpaceMemberResponse> {
  return apiFetch<SpaceMemberResponse>(
    `/management/spaces/${spaceId}/space-members/by-user/${userId}`
  );
}

export function updateSpaceMember(
  spaceId: number,
  spaceMemberId: number,
  body: UpdateSpaceMemberRequest
): Promise<void> {
  return apiFetch<void>(
    `/management/spaces/${spaceId}/space-members/${spaceMemberId}`,
    { method: "PATCH", body }
  );
}

export function getSpaceMemberEffectiveRoles(
  spaceId: number,
  spaceMemberId: number
): Promise<RoleResponse[]> {
  return apiFetch<RoleResponse[]>(
    `/management/spaces/${spaceId}/space-members/${spaceMemberId}/roles`
  );
}

export function getSpaceMemberEffectivePermissions(
  spaceId: number,
  spaceMemberId: number
): Promise<PermissionResponse[]> {
  return apiFetch<PermissionResponse[]>(
    `/management/spaces/${spaceId}/space-members/${spaceMemberId}/permissions`
  );
}

export function deleteSpaceMember(
  spaceId: number,
  spaceMemberId: number
): Promise<void> {
  return apiFetch<void>(
    `/management/spaces/${spaceId}/space-members/${spaceMemberId}`,
    { method: "DELETE" }
  );
}
