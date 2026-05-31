import { client } from "@/sanity/client";
import type { ApiResponse } from "@/lib/network-client";

/** 15 minutes — applied to every Sanity fetch by default. */
const DEFAULT_REVALIDATE = 900;

type SanityFetchOptions = {
  /** Next.js ISR revalidation in seconds. Defaults to 15 min. Pass `false` for static (no revalidation). */
  revalidate?: number | false;
  /** Extra cache tags. The "sanity" tag is always included — hit POST /api/purge to bust everything. */
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
