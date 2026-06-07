import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  const secret = process.env.REVALIDATE_SECRET;

  if (secret) {
    // no-op auth check placeholder — add header check if needed
  }

  revalidateTag("all", "default");

  return NextResponse.json({ ok: true, purgedAt: new Date().toISOString() });
}
