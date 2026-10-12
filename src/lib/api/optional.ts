import "server-only";

import { ApiError } from "./client";

/**
 * Resolves an optional lookup: returns `null` on a backend 404, rethrows
 * everything else. Never hand-roll `.catch(() => null)`, which would swallow a
 * transient 5xx as "not found".
 */
export async function getOptional<T>(
  read: () => Promise<T>
): Promise<T | null> {
  try {
    return await read();
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}
