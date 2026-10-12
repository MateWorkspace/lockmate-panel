import { apiFetch } from "./client";
import type {
  AuditResponse,
  IdResponse,
  PageDataResponse,
  PageQuery,
} from "./types";

/** 10. Client IP Allowlist — CIDR entries permitted to call for a client. */

export interface ClientIpAllowlistResponse extends AuditResponse {
  id: number;
  client_id: number;
  cidr: string;
  is_active: boolean;
}

export interface ListClientIpAllowlistsQuery extends PageQuery {
  is_active?: boolean;
}

export interface CreateClientIpAllowlistRequest {
  cidr: string;
  is_active?: boolean;
}

export interface UpdateClientIpAllowlistRequest {
  cidr?: string;
  is_active?: boolean;
}

function base(spaceId: number, clientId: number): string {
  return `/management/spaces/${spaceId}/clients/${clientId}/ip-allowlist`;
}

export function listClientIpAllowlists(
  spaceId: number,
  clientId: number,
  query: ListClientIpAllowlistsQuery = {}
): Promise<PageDataResponse<ClientIpAllowlistResponse>> {
  return apiFetch<PageDataResponse<ClientIpAllowlistResponse>>(
    base(spaceId, clientId),
    { query }
  );
}

export function listAllClientIpAllowlists(
  spaceId: number,
  clientId: number
): Promise<ClientIpAllowlistResponse[]> {
  return apiFetch<ClientIpAllowlistResponse[]>(
    `${base(spaceId, clientId)}/all`
  );
}

export function createClientIpAllowlist(
  spaceId: number,
  clientId: number,
  body: CreateClientIpAllowlistRequest
): Promise<IdResponse> {
  return apiFetch<IdResponse>(base(spaceId, clientId), {
    method: "POST",
    body,
  });
}

export function getClientIpAllowlistById(
  spaceId: number,
  clientId: number,
  ipAllowlistId: number
): Promise<ClientIpAllowlistResponse> {
  return apiFetch<ClientIpAllowlistResponse>(
    `${base(spaceId, clientId)}/${ipAllowlistId}`
  );
}

export function getClientIpAllowlistByCidr(
  spaceId: number,
  clientId: number,
  cidr: string
): Promise<ClientIpAllowlistResponse> {
  return apiFetch<ClientIpAllowlistResponse>(
    `${base(spaceId, clientId)}/by-cidr`,
    {
      query: { cidr },
    }
  );
}

export function updateClientIpAllowlist(
  spaceId: number,
  clientId: number,
  ipAllowlistId: number,
  body: UpdateClientIpAllowlistRequest
): Promise<void> {
  return apiFetch<void>(`${base(spaceId, clientId)}/${ipAllowlistId}`, {
    method: "PATCH",
    body,
  });
}

export function deleteClientIpAllowlist(
  spaceId: number,
  clientId: number,
  ipAllowlistId: number
): Promise<void> {
  return apiFetch<void>(`${base(spaceId, clientId)}/${ipAllowlistId}`, {
    method: "DELETE",
  });
}
