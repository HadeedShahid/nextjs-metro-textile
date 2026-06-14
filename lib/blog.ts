export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

/** Rough reading time in minutes from a plain-text string (~200 wpm). */
export const readingTime = (text: string | null | undefined) => {
  const words = (text ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};
