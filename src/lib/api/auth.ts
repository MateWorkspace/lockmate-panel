import { API_VERSION_PATH, HTTP_API_BASE_URL } from "@/config/env";

import { apiFetch, buildQuery } from "./client";
import type { Json } from "./types";

/** 01. Auth — classic + Google sign-in, token refresh, and the JWK set. */

export interface AuthSignInRequest {
  username: string;
  password: string;
}

export interface AuthRegisterRequest {
  name: string;
  username: string;
  password: string;
  bio?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface AuthRefreshRequest {
  refresh_token: string;
}

export interface AuthGoogleStartRequest {
  state: string;
}

export interface AuthExchangeRequest {
  code: string;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  is_new_user: boolean;
}

export interface AuthGoogleStartResponse {
  launch_url: string;
}

export interface JwksResponse {
  keys: Json[];
}

export function signIn(body: AuthSignInRequest): Promise<TokenResponse> {
  return apiFetch<TokenResponse>("/auth/sign-in", {
    method: "POST",
    body,
    skipAuth: true,
  });
}

export function register(body: AuthRegisterRequest): Promise<TokenResponse> {
  return apiFetch<TokenResponse>("/auth/register", {
    method: "POST",
    body,
    skipAuth: true,
  });
}

export function refresh(body: AuthRefreshRequest): Promise<TokenResponse> {
  return apiFetch<TokenResponse>("/auth/refresh", {
    method: "POST",
    body,
    skipAuth: true,
  });
}

export function exchangeHandoff(
  body: AuthExchangeRequest
): Promise<TokenResponse> {
  return apiFetch<TokenResponse>("/auth/exchange", {
    method: "POST",
    body,
    skipAuth: true,
  });
}

export function startGoogleSignIn(
  body: AuthGoogleStartRequest
): Promise<AuthGoogleStartResponse> {
  return apiFetch<AuthGoogleStartResponse>("/auth/google/start", {
    method: "POST",
    body,
    skipAuth: true,
  });
}

export function getJwks(): Promise<JwksResponse> {
  return apiFetch<JwksResponse>("/jwks", { skipAuth: true });
}

/**
 * Browser-navigation URL for the Google launch route. Not a fetch wrapper —
 * the caller redirects the browser to it. `GET /v1/auth/google/launch`.
 */
export function googleLaunchUrl(ticket: string): string {
  const base = HTTP_API_BASE_URL.replace(/\/$/, "");
  return `${base}${API_VERSION_PATH}/auth/google/launch${buildQuery({ ticket })}`;
}
