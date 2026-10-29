import { cache } from "react";
import type { PortableTextBlock } from "next-sanity";
import type { SanityImageObject } from "@sanity/image-url";
import { sanityFetch, type ApiResponse } from "@/lib/sanity-fetch";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

/** An image field as Sanity stores it: an asset reference, plus hotspot/crop and alt when set. */
export type SanityImage = SanityImageObject & { _key?: string; alt?: string | null };

export type Specification = { label: string | null; value: string | null };

export type NavCategory = {
  title: string;
  slug: string;
  /** Sub-categories that hold at least one product. */
  types: { title: string; slug: string }[];
};

export type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  parent?: { _ref: string };
  metaTitle?: string | null;
  metaDescription?: string | null;
  h1?: string | null;
  intro?: string | null;
  /** One line under the name on the category page and its tile. */
  tagline?: string | null;
  /** Large image at the top of a family page; a cut-out or a photo. */
  heroImage?: SanityImage | null;
  /** The "Get to know" cards on a family page. */
  highlights?: CategoryHighlight[] | null;
};

export type CategoryHighlight = {
  _key: string;
  title: string;
  body?: string | null;
  image?: SanityImage | null;
};

export type ProductSummary = {
  _id: string;
  title: string;
  slug: { current: string };
  images: SanityImage[];
  isFeatured: boolean;
  isPopular: boolean;
  excerpt?: string | null;
  specifications?: Specification[] | null;
  /** Full category path for /products/[...slug], e.g. "patches/leather-patches". */
  categoryPath?: string | null;
  /** Pixel width of the lead photo, so small placeholders can be kept out of large frames. */
  leadWidth?: number | null;
  category: {
    _id: string;
    title: string;
    slug: { current: string };
    parent?: { _ref: string };
  } | null;
};

export type ProductDetail = {
  _id: string;
  title: string;
  slug: { current: string };
  images: SanityImage[];
  description: PortableTextBlock[] | null;
  specifications: Specification[] | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  category: {
    _id: string;
    title: string;
    slug: string;
    parent: { title: string; slug: string } | null;
  } | null;
};

export type PostSummary = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
};

export type PostSummaryWithImage = PostSummary & {
  image: SanityImage | null;
};

export type PostListItem = PostSummaryWithImage & {
  excerpt: string | null;
};

export type PostDetail = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image: SanityImage | null;
  body: PortableTextBlock[] | null;
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/** A product's full category path ("parent/child"), so links to a
 *  subcategory land on its own filtered listing rather than every product. */
const CATEGORY_PATH = `"categoryPath": select(
    defined(category->parent->parent) => category->parent->parent->slug.current + "/" + category->parent->slug.current + "/" + category->slug.current,
    defined(category->parent) => category->parent->slug.current + "/" + category->slug.current,
    category->slug.current
  )`;

/** Every field a product tile needs, shared by all product list queries so they stay in step. */
const PRODUCT_CARD = `{
  _id,
  ${CATEGORY_PATH},
  title,
  slug,
  images,
  "leadWidth": images[0].asset->metadata.dimensions.width,
  isFeatured,
  isPopular,
  "excerpt": pt::text(description),
  specifications[]{label, value},
  "category": category->{ _id, title, slug, parent }
}`;

const NAV_CATEGORIES_QUERY = `*[_type == "category" && !defined(parent)] | order(title asc) {
  title,
  "slug": slug.current,
  "types": *[_type == "category" && parent._ref == ^._id && count(*[_type == "product" && category._ref == ^._id]) > 0] | order(title asc) {
    title,
    "slug": slug.current
  }
}`;

const ALL_PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)] ${PRODUCT_CARD} | order(title asc)`;

const ALL_CATEGORIES_QUERY = `*[_type == "category" && defined(slug.current)] {
  _id,
  title,
  slug,
  parent,
  metaTitle,
  metaDescription,
  h1,
  intro,
  tagline,
  heroImage,
  highlights[]{ _key, title, body, image }
}`;

const PRODUCT_DETAIL_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  images,
  description,
  metaTitle,
  metaDescription,
  "category": category->{
    _id,
    title,
    "slug": slug.current,
    "parent": parent->{
      title,
      "slug": slug.current
    }
  },
  specifications
}`;

const ALL_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  image,
  "excerpt": pt::text(body)
}`;

const POST_DETAIL_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

// A cross-section of the catalog: the newest two products from each family
// whose lead photo is large enough to show at tile size (skips placeholders).
const CATALOG_SAMPLER_QUERY = `*[_type == "category" && !defined(parent)] | order(title asc) {
  "items": *[_type == "product" && defined(slug.current)
    && (category._ref == ^._id || category->parent._ref == ^._id)
    && images[0].asset->metadata.dimensions.width >= 1000
  ] | order(_createdAt desc) [0...$perFamily] ${PRODUCT_CARD}
}.items[]`;

const LATEST_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...8] {
  _id,
  title,
  slug,
  image,
  publishedAt
}`;

const RELATED_PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current) && category._ref == $categoryId && _id != $currentProductId] | order(_createdAt desc) [0...8] ${PRODUCT_CARD}`;

// ---------------------------------------------------------------------------
// Fetch functions
// All functions inherit 15-minute ISR and the "all" tag from sanityFetch.
// Hit POST /api/purge to bust all cached data at once.
// ---------------------------------------------------------------------------

/** Top-level categories for the navbar. */
export function fetchNavCategories(): Promise<ApiResponse<NavCategory[]>> {
  return sanityFetch<NavCategory[]>(NAV_CATEGORIES_QUERY);
}

/** All products (used on the products listing page). */
export function fetchAllProducts(): Promise<ApiResponse<ProductSummary[]>> {
  return sanityFetch<ProductSummary[]>(ALL_PRODUCTS_QUERY);
}

/**
 * All categories (used on the products listing page for filters).
 * Wrapped in React `cache()` so generateMetadata + the page body share a
 * single call within one request (ISR still dedups across requests).
 */
export const fetchAllCategories = cache(
  (): Promise<ApiResponse<Category[]>> =>
    sanityFetch<Category[]>(ALL_CATEGORIES_QUERY),
);

/**
 * Single product by slug (product detail page).
 * Cached per-request so generateMetadata + the page share one fetch.
 */
export const fetchProductBySlug = cache(
  (slug: string): Promise<ApiResponse<ProductDetail>> =>
    sanityFetch<ProductDetail>(PRODUCT_DETAIL_QUERY, { slug }),
);

/** All blog posts ordered by date (blogs listing page). */
export function fetchAllPosts(): Promise<ApiResponse<PostListItem[]>> {
  return sanityFetch<PostListItem[]>(ALL_POSTS_QUERY);
}

/**
 * Single blog post by slug (blog detail page).
 * Cached per-request so generateMetadata + the page share one fetch.
 */
export const fetchPostBySlug = cache(
  (slug: string): Promise<ApiResponse<PostDetail>> =>
    sanityFetch<PostDetail>(POST_DETAIL_QUERY, { slug }),
);

/** Newest presentable products from every family, for the homepage rail. */
export function fetchCatalogSampler(perFamily = 2): Promise<ApiResponse<ProductSummary[]>> {
  return sanityFetch<ProductSummary[]>(CATALOG_SAMPLER_QUERY, { perFamily });
}

/** Latest 8 posts with image — used in the BlogSection carousel. */
export function fetchLatestPosts(): Promise<ApiResponse<PostSummaryWithImage[]>> {
  return sanityFetch<PostSummaryWithImage[]>(LATEST_POSTS_QUERY);
}

/** Related products in the same category (product detail page). */
export function fetchRelatedProducts(
  categoryId: string,
  currentProductId: string,
): Promise<ApiResponse<ProductSummary[]>> {
  return sanityFetch<ProductSummary[]>(RELATED_PRODUCTS_QUERY, { categoryId, currentProductId });
}
