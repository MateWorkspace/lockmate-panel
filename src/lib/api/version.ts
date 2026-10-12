import { API_BASE_PATH } from "@/config/env";

import { apiFetch } from "./client";

/** 00. Version — live at `/api/version` with no client or bearer headers. */
export interface VersionResponse {
  name: string;
  version: string;
}

export function getVersion(): Promise<VersionResponse> {
  return apiFetch<VersionResponse>("/version", {
    basePath: API_BASE_PATH,
    skipClientAuth: true,
    skipAuth: true,
  });
}
