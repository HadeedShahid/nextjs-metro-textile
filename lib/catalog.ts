import type { Category, ProductSummary } from "@/lib/api";
import { FAMILY_DEFAULTS, SUBCATEGORY_TAGLINES, type FamilyDefaults, type StudioImage } from "@/data/families";

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

  // Two levels only, as the Studio enforces. A category that names itself as
  // its family still counts as a family, and one filed under a subcategory is
  // left out, so bad data can never loop the tree.
  const isFamily = (c: Category) => !c.parent || c.parent._ref === c._id;
  for (const node of nodes.values()) {
    if (isFamily(node.category)) continue;
    const parent = nodes.get(node.category.parent!._ref);
    if (parent && isFamily(parent.category)) {
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
    .filter((n) => isFamily(n.category))
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

export const styleCount = (n: number) => `${n} ${n === 1 ? "style" : "styles"}`;

/** A category name for running text: lower case, but acronyms such as PU stay as they are. */
export const runningName = (title: string) =>
  title
    .split(" ")
    .map((word) => (/^[A-Z]{2,}$/.test(word) ? word : word.toLowerCase()))
    .join(" ");

/** One filter on a catalogue view: a link to that family or type, with its count. */
export type CatalogChip = { label: string; href: string; count: number; active: boolean };

/** A product as the catalogue grid lists it. */
export type CatalogItem = {
  product: ProductSummary;
  /** The type it is filed under ("Shank Buttons"), or its family when it has no type. */
  typeLabel: string | null;
  /** The family's studio cut-out, shown in place of a placeholder photo. */
  fallback: StudioImage | null;
};

/** A type's name inside its family's row: "Plastic Buttons" reads "Plastic" under "Buttons". */
export const typeName = (type: string, family: string) => {
  const short = type.replace(new RegExp(`\\s+${family}$`, "i"), "").trim();
  return short && short !== type ? short : type;
};

/**
 * The filters a catalogue view opens on: every family that holds a product,
 * then, once a family with two or more types is chosen, its types.
 */
export function catalogChips(families: CatalogNode[], current: CatalogNode | null, allHref = "/products") {
  const family = current?.parent ?? current;
  const stocked = families.filter((f) => f.products.length > 0);
  const total = stocked.reduce((sum, f) => sum + f.products.length, 0);

  const familyChips: CatalogChip[] = [
    { label: "All products", href: allHref, count: total, active: !family },
    ...stocked.map((f) => ({ label: f.title, href: f.href, count: f.products.length, active: f.id === family?.id })),
  ];

  const types = family?.children.filter((c) => c.products.length > 0) ?? [];
  const typeChips: CatalogChip[] | null =
    family && types.length >= 2
      ? [
          { label: "All", href: family.href, count: family.products.length, active: current === family },
          ...types.map((t) => ({ label: typeName(t.title, family.title), href: t.href, count: t.products.length, active: t.id === current?.id })),
        ]
      : null;

  return { familyChips, typeChips };
}

/** Every category in the tree, by id. */
function nodesById(families: CatalogNode[]) {
  const map = new Map<string, CatalogNode>();
  for (const family of families) {
    map.set(family.id, family);
    for (const child of family.children) map.set(child.id, child);
  }
  return map;
}

/** A node's products type by type, in its chips' order, then any filed on the node itself. */
function inChipOrder(node: CatalogNode): ProductSummary[] {
  if (!node.children.length) return node.products;
  const typed = node.children.flatMap((c) => c.products);
  const seen = new Set(typed.map((p) => p._id));
  return [...typed, ...node.products.filter((p) => !seen.has(p._id))];
}

/** A node's products as grid items, each labelled with its own type and carrying its family's cut-out. */
export function catalogItems(families: CatalogNode[], node: CatalogNode | null): CatalogItem[] {
  const byId = nodesById(families);
  // All products are listed family by family, and every family type by type in
  // the order its chips read, so the grid and the filters agree.
  const products = node ? inChipOrder(node) : families.flatMap(inChipOrder);
  return products.map((product) => {
    const own = product.category?._id ? byId.get(product.category._id) : undefined;
    const family = own?.parent ?? own;
    return {
      product,
      typeLabel: own?.title ?? product.category?.title ?? null,
      fallback: family?.defaults?.cutout ?? null,
    };
  });
}
