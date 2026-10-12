import type { PageDataResponse } from "./types";

const DEFAULT_MAX_PAGES = 1_000;

/**
 * Walks a paginated Lockmate list endpoint to completion. Dedupes by
 * `keyOf`, stops on an empty/duplicate page or a malformed page block, and
 * throws past the safety ceiling rather than looping forever. Never impose a
 * silent per-caller item cap.
 */
export async function collectAllPages<T>(options: {
  fetchPage: (page: number) => Promise<PageDataResponse<T>>;
  keyOf: (item: T) => string;
  maxPages?: number;
}): Promise<T[]> {
  const collected: T[] = [];
  const seen = new Set<string>();
  const maxPages =
    options.maxPages !== undefined &&
    Number.isSafeInteger(options.maxPages) &&
    options.maxPages > 0
      ? options.maxPages
      : DEFAULT_MAX_PAGES;

  let requestedPage = 1;
  let previousResponsePage = 0;

  for (let fetched = 0; fetched < maxPages; fetched += 1) {
    const response = await options.fetchPage(requestedPage);
    let added = 0;

    for (const item of response.data) {
      const key = options.keyOf(item);
      if (!seen.has(key)) {
        seen.add(key);
        collected.push(item);
        added += 1;
      }
    }

    if (added === 0) {
      break;
    }

    const { page, limit, total_items } = response.page;
    if (!Number.isSafeInteger(page) || page <= previousResponsePage) {
      break;
    }
    previousResponsePage = page;

    if (
      Number.isSafeInteger(total_items) &&
      total_items >= 0 &&
      collected.length >= total_items
    ) {
      break;
    }

    if (!Number.isSafeInteger(limit) || limit <= 0) {
      break;
    }

    const totalPages = Math.ceil(total_items / limit);
    if (!Number.isSafeInteger(totalPages) || page >= totalPages) {
      break;
    }

    if (fetched + 1 === maxPages) {
      throw new Error(
        `Collection incomplete after reaching the ${maxPages}-page safety ceiling.`
      );
    }

    requestedPage = page + 1;
  }

  return collected;
}
