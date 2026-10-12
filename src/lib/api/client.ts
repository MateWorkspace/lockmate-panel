import "server-only";

import { cookies } from "next/headers";

import {
  ACCESS_TOKEN_COOKIE,
  API_VERSION_PATH,
  CLIENT_SECRET,
  CLIENT_SLUG,
  HTTP_API_BASE_URL,
} from "@/config/env";

import type { ErrorResponse } from "./types";

/**
 * A normalized non-2xx response from the Lockmate backend. `title` mirrors the
 * backend's `error` field; `message` is the safe human-readable detail.
 */
export class ApiError extends Error {
  readonly status: number;
  readonly title: string;

  constructor(status: number, title: string, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.title = title;
  }
}

export type QueryValue = string | number | boolean | undefined | null;

export interface ApiFetchOptions {
  method?: "GET" | "HEAD" | "POST" | "PATCH" | "PUT" | "DELETE";
  /** Plain object is JSON-encoded; FormData is passed through untouched. */
  body?: unknown;
  /**
   * Query string parameters; undefined/null/"" values are skipped. Typed as
   * `object` so callers can pass a specific query interface without an index
   * signature (see `buildQuery`).
   */
  query?: object;
  /** Skip the bearer token (sign-in, register, refresh, exchange, jwks). */
  skipAuth?: boolean;
  /** Skip client headers (only the unversioned `/version` route). */
  skipClientAuth?: boolean;
  /** Path prefix; defaults to the versioned `/api/v1`. */
  basePath?: string;
  cache?: RequestCache;
}

function baseUrl(basePath: string): string {
  return `${HTTP_API_BASE_URL.replace(/\/$/, "")}${basePath}`;
}

/**
 * Builds a query string from a plain object, skipping undefined/null/empty
 * values. Generic over `object` so callers can pass typed query interfaces
 * without an index signature.
 */
export function buildQuery<T extends object>(params: T): string {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(params) as [string, unknown][]) {
    if (value === undefined || value === null || value === "") {
      continue;
    }
    search.set(key, String(value));
  }

  const query = search.toString();
  return query ? `?${query}` : "";
}

async function requestHeaders(
  options: ApiFetchOptions
): Promise<Record<string, string>> {
  const headers: Record<string, string> = {};

  if (!options.skipClientAuth) {
    headers["X-Client-Slug"] = CLIENT_SLUG;
    headers["X-Client-Secret"] = CLIENT_SECRET;
    headers["X-Client-Exec-Id"] = crypto.randomUUID();
  }

  if (!options.skipAuth) {
    const cookieStore = await cookies();
    const token = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  return headers;
}

/**
 * Low-level request returning the raw `Response`. Use only when a route's
 * behavior isn't plain JSON in/out (e.g. redirect-returning browser routes);
 * every other caller should use `apiFetch`.
 */
export async function apiRequest(
  path: string,
  options: ApiFetchOptions = {}
): Promise<Response> {
  const {
    method = "GET",
    body,
    query,
    basePath = API_VERSION_PATH,
    cache,
  } = options;

  const headers = await requestHeaders(options);
  const url = `${baseUrl(basePath)}${path}${query ? buildQuery(query) : ""}`;

  let requestBody: BodyInit | undefined;
  if (body instanceof FormData) {
    requestBody = body;
  } else if (body !== undefined) {
    headers["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

  return fetch(url, {
    method,
    headers,
    body: requestBody,
    cache,
    redirect: "manual",
  });
}

/**
 * Standard JSON in/out request. Throws `ApiError` on any non-2xx response;
 * returns `undefined` for a 204 No Content response.
 */
export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {}
): Promise<T> {
  const response = await apiRequest(path, options);

  if (response.status === 204) {
    return undefined as T;
  }

  if (response.status >= 300 && response.status < 400) {
    throw new ApiError(
      response.status,
      "Unexpected Redirect",
      `Unexpected redirect response for ${path} — use the browser URL builders for redirect-returning routes.`
    );
  }

  if (!response.ok) {
    const errorBody = (await response
      .json()
      .catch(() => null)) as ErrorResponse | null;

    throw new ApiError(
      response.status,
      errorBody?.error ?? "Something Went Wrong",
      errorBody?.message ?? response.statusText
    );
  }

  return (await response.json()) as T;
}
