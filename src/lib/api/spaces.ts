import { apiFetch } from "./client";
import type {
  AuditResponse,
  IdResponse,
  Json,
  PageDataResponse,
  PageQuery,
} from "./types";

/** 03. Spaces — the top-level tenant/project boundary. */

export interface SpaceResponse extends AuditResponse {
  id: number;
  slug: string;
  name: string;
  description?: string | null;
  is_active: boolean;
  preferences: Json;
}

export interface ListSpacesQuery extends PageQuery {
  is_active?: boolean;
}

export interface CreateSpaceRequest {
  slug: string;
  name: string;
  description?: string | null;
  is_active?: boolean;
  preferences?: Json;
}

export interface UpdateSpaceRequest {
  name?: string;
  description?: string | null;
  is_active?: boolean;
  preferences?: Json;
}

export function listSpaces(
  query: ListSpacesQuery = {}
): Promise<PageDataResponse<SpaceResponse>> {
  return apiFetch<PageDataResponse<SpaceResponse>>("/management/spaces", {
    query,
  });
}

export function createSpace(body: CreateSpaceRequest): Promise<IdResponse> {
  return apiFetch<IdResponse>("/management/spaces", {
    method: "POST",
    body,
  });
}

export function getSpaceById(spaceId: number): Promise<SpaceResponse> {
  return apiFetch<SpaceResponse>(`/management/spaces/${spaceId}`);
}

export function getSpaceBySlug(slug: string): Promise<SpaceResponse> {
  return apiFetch<SpaceResponse>(
    `/management/spaces/by-slug/${encodeURIComponent(slug)}`
  );
}

export function updateSpace(
  spaceId: number,
  body: UpdateSpaceRequest
): Promise<void> {
  return apiFetch<void>(`/management/spaces/${spaceId}`, {
    method: "PATCH",
    body,
  });
}

export function deleteSpace(spaceId: number): Promise<void> {
  return apiFetch<void>(`/management/spaces/${spaceId}`, { method: "DELETE" });
}
