export const API_BASE_PATH = "/api";
export const API_VERSION_PATH = `${API_BASE_PATH}/v1`;
export const HTTP_API_BASE_URL: string = envString(
  "LOCKMATE_PANEL_HTTP_API_BASE_URL",
  "http://127.0.0.1:10701"
);
export const GRPC_API_URL: string = envString(
  "LOCKMATE_PANEL_GRPC_API_URL",
  "http://127.0.0.1:10702"
);
export const CLIENT_SLUG: string = envString("LOCKMATE_PANEL_CLIENT_SLUG", "");
export const CLIENT_SECRET: string = envString(
  "LOCKMATE_PANEL_CLIENT_SECRET",
  ""
);
export const ACCESS_TOKEN_COOKIE: string = envString(
  "LOCKMATE_PANEL_ACCESS_TOKEN_COOKIE",
  "lockmate_access_token"
);
export const REFRESH_TOKEN_COOKIE: string = envString(
  "LOCKMATE_PANEL_REFRESH_TOKEN_COOKIE",
  "lockmate_refresh_token"
);
export const COOKIE_SECURE: boolean =
  process.env.LOCKMATE_PANEL_COOKIE_SECURE === "true";
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === "production";
export const HAS_CLIENT_CREDENTIALS: boolean = Boolean(
  CLIENT_SLUG && CLIENT_SECRET
);

function envString(key: string, fallback: string): string {
  const value = process.env[key];
  return value && value.trim() !== "" ? value : fallback;
}
