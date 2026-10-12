import { apiFetch } from "./client";
import type { AuditResponse, Json, PageDataResponse, PageQuery } from "./types";

/** 09. Clients — credentials a consumer app uses to authenticate. */

export interface ClientResponse extends AuditResponse {
  id: number;
  space_id: number;
  slug: string;
  name: string;
  description?: string | null;
  auth_redirect_uri?: string | null;
  is_active: boolean;
  preferences: Json;
  secret_key_redacted: string;
}

/** Returned on create and secret rotation: the raw secret is shown once. */
export interface ClientSecretResponse {
  client: ClientResponse;
  secret: string;
}

export interface ListClientsQuery extends PageQuery {
  is_active?: boolean;
}

export interface CreateClientRequest {
  slug: string;
  name: string;
  description?: string | null;
  auth_redirect_uri?: string | null;
  is_active?: boolean;
  preferences?: Json;
}

export interface UpdateClientRequest {
  auth_redirect_uri?: string | null;
  auth_redirect_uri_set_null?: boolean;
  name?: string;
  description?: string | null;
  is_active?: boolean;
  preferences?: Json;
}

export function listClients(
  spaceId: number,
  query: ListClientsQuery = {}
): Promise<PageDataResponse<ClientResponse>> {
  return apiFetch<PageDataResponse<ClientResponse>>(
    `/management/spaces/${spaceId}/clients`,
    { query }
  );
}

export function createClient(
  spaceId: number,
  body: CreateClientRequest
): Promise<ClientSecretResponse> {
  return apiFetch<ClientSecretResponse>(
    `/management/spaces/${spaceId}/clients`,
    { method: "POST", body }
  );
}

export function getClientById(
  spaceId: number,
  clientId: number
): Promise<ClientResponse> {
  return apiFetch<ClientResponse>(
    `/management/spaces/${spaceId}/clients/${clientId}`
  );
}

export function getClientBySlug(
  spaceId: number,
  slug: string
): Promise<ClientResponse> {
  return apiFetch<ClientResponse>(
    `/management/spaces/${spaceId}/clients/by-slug/${encodeURIComponent(slug)}`
  );
}

export function updateClient(
  spaceId: number,
  clientId: number,
  body: UpdateClientRequest
): Promise<void> {
  return apiFetch<void>(`/management/spaces/${spaceId}/clients/${clientId}`, {
    method: "PATCH",
    body,
  });
}

export function rotateClientSecret(
  spaceId: number,
  clientId: number
): Promise<ClientSecretResponse> {
  return apiFetch<ClientSecretResponse>(
    `/management/spaces/${spaceId}/clients/${clientId}/secret`,
    { method: "PATCH" }
  );
}

export function deleteClient(spaceId: number, clientId: number): Promise<void> {
  return apiFetch<void>(`/management/spaces/${spaceId}/clients/${clientId}`, {
    method: "DELETE",
  });
}
