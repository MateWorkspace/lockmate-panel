/** Wire types shared across every Lockmate HTTP resource wrapper. */

/** Opaque JSON object (the backend's `json.RawMessage` preferences, etc.). */
export type Json = Record<string, unknown>;

export interface ErrorResponse {
  error: string;
  message: string;
}

export interface PageResponse {
  page: number;
  limit: number;
  total_items: number;
}

/** The backend's paginated envelope: `PageDataResponse[T]`. */
export interface PageDataResponse<T> {
  data: T[];
  page: PageResponse;
}

export interface PageQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IdResponse {
  id: number;
}

/** Audit columns present on most read responses. */
export interface AuditResponse {
  created_at: string;
  created_by?: number | null;
  updated_at?: string | null;
  updated_by?: number | null;
  deleted_at?: string | null;
  deleted_by?: number | null;
}
