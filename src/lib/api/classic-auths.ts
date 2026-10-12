import { apiFetch } from "./client";
import type {
  AuditResponse,
  IdResponse,
  Json,
  PageDataResponse,
  PageQuery,
} from "./types";

/** 07. Classic Auth — username/password credentials attached to a user. */

export interface ClassicAuthResponse extends AuditResponse {
  id: number;
  user_id: number;
  username: string;
  email?: string | null;
  phone?: string | null;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  preferences: Json;
}

export interface ListClassicAuthsQuery extends PageQuery {
  user_id?: number;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
}

export interface CreateClassicAuthRequest {
  user_id: number;
  username: string;
  password: string;
  email?: string | null;
  phone?: string | null;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  preferences?: Json;
}

export interface UpdateClassicAuthRequest {
  username?: string;
  email?: string | null;
  email_set_null?: boolean;
  phone?: string | null;
  phone_set_null?: boolean;
  is_email_verified?: boolean;
  is_phone_verified?: boolean;
  preferences?: Json;
}

export function listClassicAuths(
  query: ListClassicAuthsQuery = {}
): Promise<PageDataResponse<ClassicAuthResponse>> {
  return apiFetch<PageDataResponse<ClassicAuthResponse>>(
    "/management/classic-auths",
    { query }
  );
}

export function createClassicAuth(
  body: CreateClassicAuthRequest
): Promise<IdResponse> {
  return apiFetch<IdResponse>("/management/classic-auths", {
    method: "POST",
    body,
  });
}

export function getClassicAuthById(
  classicAuthId: number
): Promise<ClassicAuthResponse> {
  return apiFetch<ClassicAuthResponse>(
    `/management/classic-auths/${classicAuthId}`
  );
}

export function getClassicAuthByUserId(
  userId: number
): Promise<ClassicAuthResponse> {
  return apiFetch<ClassicAuthResponse>(
    `/management/classic-auths/by-user/${userId}`
  );
}

export function getClassicAuthByUsername(
  username: string
): Promise<ClassicAuthResponse> {
  return apiFetch<ClassicAuthResponse>(
    `/management/classic-auths/by-username/${encodeURIComponent(username)}`
  );
}

export function getClassicAuthByEmail(
  email: string
): Promise<ClassicAuthResponse> {
  return apiFetch<ClassicAuthResponse>("/management/classic-auths/by-email", {
    query: { email },
  });
}

export function getClassicAuthByPhone(
  phone: string
): Promise<ClassicAuthResponse> {
  return apiFetch<ClassicAuthResponse>("/management/classic-auths/by-phone", {
    query: { phone },
  });
}

export function updateClassicAuth(
  classicAuthId: number,
  body: UpdateClassicAuthRequest
): Promise<void> {
  return apiFetch<void>(`/management/classic-auths/${classicAuthId}`, {
    method: "PATCH",
    body,
  });
}

export function deleteClassicAuth(classicAuthId: number): Promise<void> {
  return apiFetch<void>(`/management/classic-auths/${classicAuthId}`, {
    method: "DELETE",
  });
}
