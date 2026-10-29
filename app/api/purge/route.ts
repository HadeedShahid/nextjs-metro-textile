import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Busts every cached Sanity fetch (they all carry the "all" tag).
 *
 * Send the secret as an `x-revalidate-secret` header or a `?secret=` query
 * (handy for a Sanity webhook). Without REVALIDATE_SECRET set it only runs in
 * development, so production is never open to anyone emptying the cache.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = req.headers.get("x-revalidate-secret") ?? req.nextUrl.searchParams.get("secret");

  if (secret ? given !== secret : process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("all", "default");

  return NextResponse.json({ ok: true, purgedAt: new Date().toISOString() });
}
