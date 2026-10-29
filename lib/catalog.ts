import type { Category, CategoryHighlight, ProductSummary } from "@/lib/api";
import { FAMILY_DEFAULTS, LEAD_PHOTOS, SUBCATEGORY_TAGLINES, type FamilyDefaults } from "@/data/families";

/** A category with everything a family or subcategory page needs, resolved once. */
export type CatalogNode = {
  id: string;
  title: string;
  slug: string;
  href: string;
  category: Category;
  parent: CatalogNode | null;
  children: CatalogNode[];
  /** Every product filed under this category or any of its subcategories. */
  products: ProductSummary[];
  tagline: string | null;
  /** Built-in art and copy; families only. */
  defaults: FamilyDefaults | null;
};

/** Photos at least this wide hold up in large frames; smaller ones are placeholders. */
const LARGE_PHOTO = 1000;

export function hasLargePhoto(p: ProductSummary) {
  return Boolean(p.images?.[0]) && (p.leadWidth ?? 0) >= LARGE_PHOTO;
}

/** A photo fit to lead: large enough, and cleared to feature (see LEAD_PHOTOS). */
export function canLead(p: ProductSummary) {
  return hasLargePhoto(p) && LEAD_PHOTOS.has(p.slug.current);
}

/** True when the lead photo is known to be a small placeholder rather than a catalog shot. */
/** A lead photo too small for a tile: the 512px placeholders some products still carry. */
export function hasPlaceholderPhoto(p: { leadWidth?: number | null }) {
  return p.leadWidth != null && p.leadWidth < LARGE_PHOTO;
}

/**
 * Builds the family tree from the flat Sanity lists: families in title order,
 * subcategories by how many styles they hold, products filed up the tree.
 */
export function buildCatalog(categories: Category[], products: ProductSummary[]) {
  const nodes = new Map<string, CatalogNode>();
  for (const category of categories) {
    nodes.set(category._id, {
      id: category._id,
      title: category.title,
      slug: category.slug.current,
      href: "",
      category,
      parent: null,
      children: [],
      products: [],
      tagline: null,
      defaults: null,
    });
  }

  for (const node of nodes.values()) {
    const parentId = node.category.parent?._ref;
    const parent = parentId ? nodes.get(parentId) : undefined;
    if (parent) {
      node.parent = parent;
      parent.children.push(node);
    }
  }

  for (const product of products) {
    let node = product.category?._id ? nodes.get(product.category._id) : undefined;
    while (node) {
      node.products.push(product);
      node = node.parent ?? undefined;
    }
  }

  const families = [...nodes.values()]
    .filter((n) => !n.parent)
    .sort((a, b) => a.title.localeCompare(b.title));

  const finish = (node: CatalogNode, base: string) => {
    node.href = `${base}/${node.slug}`;
    node.defaults = node.parent ? null : (FAMILY_DEFAULTS[node.slug] ?? null);
    node.tagline =
      node.category.tagline?.trim() ||
      node.defaults?.tagline ||
      SUBCATEGORY_TAGLINES[node.slug] ||
      null;
    node.children.sort(
      (a, b) => b.products.length - a.products.length || a.title.localeCompare(b.title),
    );
    node.children.forEach((child) => finish(child, node.href));
  };
  families.forEach((family) => finish(family, "/products"));

  return { families };
}

/** Resolves /products/[...slug] to a node, walking family then subcategory. */
export function resolvePath(families: CatalogNode[], slugs: string[]) {
  let level = families;
  let node: CatalogNode | undefined;
  for (const slug of slugs) {
    node = level.find((n) => n.slug === slug);
    if (!node) return null;
    level = node.children;
  }
  return node ?? null;
}

/** The node's lead photo: its first product with a photo cleared to lead. */
export function leadProduct(node: CatalogNode) {
  return node.products.find(canLead) ?? null;
}

/** "Get to know" cards: Sanity's when set, otherwise the built-in ones. */
export function familyHighlights(node: CatalogNode): CategoryHighlight[] {
  const fromSanity = (node.category.highlights ?? []).filter((h) => h?.title);
  if (fromSanity.length) return fromSanity;
  return (node.defaults?.highlights ?? []).map((h, i) => ({ _key: `default-${i}`, ...h }));
}

export const styleCount = (n: number) => `${n} ${n === 1 ? "style" : "styles"}`;

const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/** A small count as a word for running copy ("Five families"); digits past ten. */
export const countWord = (n: number) => NUMBER_WORDS[n] ?? String(n);

/** A category name for running text: lower case, but acronyms such as PU stay as they are. */
export const runningName = (title: string) =>
  title
    .split(" ")
    .map((word) => (/^[A-Z]{2,}$/.test(word) ? word : word.toLowerCase()))
    .join(" ");

/**
 * Products with photos cleared to lead, taken from each type in turn
 * (largest type first), with any filed on the family itself at the end, so
 * one odd product cannot lead every picture on the page.
 */
export function framedProducts(node: CatalogNode, exclude: Set<string> = new Set()) {
  const usable = (p: ProductSummary) => canLead(p) && !exclude.has(p._id);
  const lanes = node.children.map((c) => c.products.filter(usable));
  const inLanes = new Set(node.children.flatMap((c) => c.products.map((p) => p._id)));
  const picked: ProductSummary[] = [];
  for (let i = 0; lanes.some((lane) => i < lane.length); i++) {
    for (const lane of lanes) if (lane[i]) picked.push(lane[i]);
  }
  return [...picked, ...node.products.filter((p) => usable(p) && !inLanes.has(p._id))];
}
