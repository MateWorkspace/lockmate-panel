import { apiFetch } from "./client";
import type { ClassicAuthResponse } from "./classic-auths";
import type { GoogleAuthResponse } from "./google-auths";
import type { PermissionResponse } from "./permissions";
import type { RoleResponse } from "./roles";
import type { SpaceMemberResponse } from "./space-members";
import type { SpaceResponse } from "./spaces";
import type { Json } from "./types";
import type { UserResponse } from "./users";

/** 02. Profile — the signed-in user's own account, roles, and security. */

export interface ProfileResponse {
  user: UserResponse;
  space: SpaceResponse;
  space_member: SpaceMemberResponse;
}

export interface AuthMethodsResponse {
  classic_auth: ClassicAuthResponse | null;
  google_auth: GoogleAuthResponse | null;
}

export interface ProfileUpdateProfileRequest {
  name?: string;
  bio?: string;
  avatar_path?: string;
  avatar_path_set_null?: boolean;
  preferences?: Json;
}

export interface ProfileUpdateMembershipPreferencesRequest {
  preferences: Json;
}

export interface ProfileUpdateClassicAuthRequest {
  username?: string;
  email?: string;
  email_set_null?: boolean;
  phone?: string;
  phone_set_null?: boolean;
}

export interface ProfileChangePasswordRequest {
  current_password: string;
  new_password: string;
}

export function getProfile(): Promise<ProfileResponse> {
  return apiFetch<ProfileResponse>("/profile");
}

export function getProfileRoles(): Promise<RoleResponse[]> {
  return apiFetch<RoleResponse[]>("/profile/roles");
}

export function getProfilePermissions(): Promise<PermissionResponse[]> {
  return apiFetch<PermissionResponse[]>("/profile/permissions");
}

export function getProfileAuthMethods(): Promise<AuthMethodsResponse> {
  return apiFetch<AuthMethodsResponse>("/profile/auth-methods");
}

export function updateProfile(
  body: ProfileUpdateProfileRequest
): Promise<void> {
  return apiFetch<void>("/profile", { method: "PATCH", body });
}

export function updateMembershipPreferences(
  body: ProfileUpdateMembershipPreferencesRequest
): Promise<void> {
  return apiFetch<void>("/profile/membership/preferences", {
    method: "PATCH",
    body,
  });
}

export function updateProfileClassicAuth(
  body: ProfileUpdateClassicAuthRequest
): Promise<void> {
  return apiFetch<void>("/profile/classic-auth", { method: "PATCH", body });
}

export function changePassword(
  body: ProfileChangePasswordRequest
): Promise<void> {
  return apiFetch<void>("/profile/password", { method: "PATCH", body });
}
