import { apiFetch } from "./client";
import type {
  AuditResponse,
  IdResponse,
  Json,
  PageDataResponse,
  PageQuery,
} from "./types";

/** 06. Users — global identities (not space-scoped). */

export interface UserResponse extends AuditResponse {
  id: number;
  name: string;
  bio?: string | null;
  avatar_path?: string | null;
  preferences: Json;
}

export interface CreateUserRequest {
  name: string;
  username: string;
  password: string;
  bio?: string | null;
  avatar_path?: string | null;
  preferences?: Json;
  email?: string | null;
  phone?: string | null;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
}

export interface UpdateUserRequest {
  name?: string;
  bio?: string | null;
  avatar_path?: string | null;
  avatar_path_set_null?: boolean;
  preferences?: Json;
}

export interface ResetUserPasswordRequest {
  password: string;
}

export function listUsers(
  query: PageQuery = {}
): Promise<PageDataResponse<UserResponse>> {
  return apiFetch<PageDataResponse<UserResponse>>("/management/users", {
    query,
  });
}

export function createUser(body: CreateUserRequest): Promise<IdResponse> {
  return apiFetch<IdResponse>("/management/users", { method: "POST", body });
}

export function getUserById(userId: number): Promise<UserResponse> {
  return apiFetch<UserResponse>(`/management/users/${userId}`);
}

export function updateUser(
  userId: number,
  body: UpdateUserRequest
): Promise<void> {
  return apiFetch<void>(`/management/users/${userId}`, {
    method: "PATCH",
    body,
  });
}

export function resetUserPassword(
  userId: number,
  body: ResetUserPasswordRequest
): Promise<void> {
  return apiFetch<void>(`/management/users/${userId}/password`, {
    method: "PATCH",
    body,
  });
}

export function deleteUser(userId: number): Promise<void> {
  return apiFetch<void>(`/management/users/${userId}`, { method: "DELETE" });
}
