type Block = { _type?: string; children?: { text?: string }[] };

/** Flatten Sanity Portable Text blocks into a plain string (for meta
 *  descriptions, JSON-LD descriptions, etc.). */
export function toPlainText(blocks: unknown): string {
  if (!Array.isArray(blocks)) return "";
  return (blocks as Block[])
    .map((block) =>
      block?._type === "block" && Array.isArray(block.children)
        ? block.children.map((child) => child?.text ?? "").join("")
        : "",
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}
