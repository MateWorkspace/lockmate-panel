import { apiFetch } from "./client";
import type { AuditResponse, Json, PageDataResponse, PageQuery } from "./types";

/** 08. Google Auth — read-only Google identity links (creation is via OAuth). */

export interface GoogleAuthResponse extends AuditResponse {
  id: number;
  user_id: number;
  subject: string;
  email?: string | null;
  is_email_verified: boolean;
  preferences: Json;
}

export interface ListGoogleAuthsQuery extends PageQuery {
  user_id?: number;
  is_email_verified?: boolean;
}

export function listGoogleAuths(
  query: ListGoogleAuthsQuery = {}
): Promise<PageDataResponse<GoogleAuthResponse>> {
  return apiFetch<PageDataResponse<GoogleAuthResponse>>(
    "/management/google-auths",
    { query }
  );
}

export function getGoogleAuthById(
  googleAuthId: number
): Promise<GoogleAuthResponse> {
  return apiFetch<GoogleAuthResponse>(
    `/management/google-auths/${googleAuthId}`
  );
}

export function getGoogleAuthByUserId(
  userId: number
): Promise<GoogleAuthResponse> {
  return apiFetch<GoogleAuthResponse>(
    `/management/google-auths/by-user/${userId}`
  );
}

export function getGoogleAuthBySubject(
  subject: string
): Promise<GoogleAuthResponse> {
  return apiFetch<GoogleAuthResponse>("/management/google-auths/by-subject", {
    query: { subject },
  });
}
