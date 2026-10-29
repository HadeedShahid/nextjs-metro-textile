import { client } from "@/sanity/client";

/** Result envelope for every Sanity fetch: it never throws, so callers branch on `ok`. */
export type ApiResponse<T = unknown> = {
  data: T | null;
  error: string | null;
  status: number;
  ok: boolean;
};

/** 15 minutes — applied to every Sanity fetch by default. */
const DEFAULT_REVALIDATE = 900;

type SanityFetchOptions = {
  /** Next.js ISR revalidation in seconds. Defaults to 15 min. Pass `false` for static (no revalidation). */
  revalidate?: number | false;
  /** Extra cache tags. The "all" tag is always included — POST /api/purge busts everything. */
  tags?: string[];
};

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options: SanityFetchOptions = {},
): Promise<ApiResponse<T>> {
  const { revalidate = DEFAULT_REVALIDATE, tags = [] } = options;

  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate, tags: ["all", ...tags] },
    });
    return { data, error: null, status: 200, ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sanity fetch failed";
    console.error(`[sanityFetch] ${message}`, { query, params });
    return { data: null, error: message, status: 500, ok: false };
  }
}

/**
 * For data a page cannot render without: returns it, or throws when the fetch
 * failed, so ISR keeps serving the last good page instead of caching an empty
 * one (or a 404) for the next 15 minutes.
 */
export function dataOrThrow<T>(res: ApiResponse<T>, what: string): T | null {
  if (!res.ok) throw new Error(`Could not load ${what}: ${res.error}`);
  return res.data;
}
