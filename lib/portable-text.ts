/** Flatten Sanity Portable Text blocks into a plain string (for meta
 *  descriptions, JSON-LD descriptions, etc.). */
export function toPlainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .map((block: any) =>
      block?._type === "block" && Array.isArray(block.children)
        ? block.children.map((child: any) => child?.text ?? "").join("")
        : "",
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
