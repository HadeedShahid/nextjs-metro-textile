/** A publish date as "Jun 12, 2026". Fixed to UTC so the server and the browser always print the same day. */
export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });

/** Rough reading time in minutes from a plain-text string (~200 wpm). */
export const readingTime = (text: string | null | undefined) => {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};
