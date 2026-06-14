import { cache } from "react";
import { sanityFetch } from "@/lib/sanity-fetch";
import type { ApiResponse } from "@/lib/network-client";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

export type NavCategory = {
  title: string;
  slug: string;
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
};

export type ProductSummary = {
  _id: string;
  title: string;
  slug: { current: string };
  images: any[];
  isFeatured: boolean;
  isPopular: boolean;
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
  images: any[];
  description: any[] | null;
  specifications: any | null;
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
  image: any | null;
};

export type PostListItem = PostSummaryWithImage & {
  excerpt: string | null;
};

export type PostDetail = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  image: any | null;
  body: any[] | null;
};

export type CategoryShowcaseData = {
  category: { _id: string; title: string; slug: string } | null;
  products: ProductSummary[];
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

const NAV_CATEGORIES_QUERY = `*[_type == "category" && !defined(parent)] | order(title asc) {
  title,
  "slug": slug.current
}`;

const ALL_PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)] {
  _id,
  title,
  slug,
  images,
  isFeatured,
  isPopular,
  "category": category->{
    _id,
    title,
    slug,
    parent
  }
}`;

const ALL_CATEGORIES_QUERY = `*[_type == "category" && defined(slug.current)] {
  _id,
  title,
  slug,
  parent,
  metaTitle,
  metaDescription,
  h1,
  intro
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

const PARENT_CATEGORIES_QUERY = `*[_type == "category" && !defined(parent) && defined(slug.current)] | order(title asc) {
  "slug": slug.current
}`;

const CATEGORY_SHOWCASE_QUERY = `{
  "category": *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current
  },
  "products": *[_type == "product" && (
    category->slug.current == $slug ||
    category->parent->slug.current == $slug ||
    category->parent->parent->slug.current == $slug
  )] | order(_createdAt desc) [0...12] {
    _id,
    title,
    slug,
    images,
    isFeatured,
    isPopular,
    "category": category->{
      _id,
      title,
      slug
    }
  }
}`;

const LATEST_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...8] {
  _id,
  title,
  slug,
  image,
  publishedAt
}`;

const RELATED_PRODUCTS_QUERY = `*[_type == "product" && category._ref == $categoryId && _id != $currentProductId] | order(_createdAt desc) [0...8] {
  _id,
  title,
  slug,
  images,
  category->{
    title,
    "slug": slug
  },
  isFeatured,
  isPopular
}`;

// ---------------------------------------------------------------------------
// Fetch functions
// All functions inherit 15-minute ISR and the "sanity" tag from sanityFetch.
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

/** All top-level (parent) categories — used in ParentCategoryShowcase. */
export function fetchParentCategories(): Promise<ApiResponse<{ slug: string }[]>> {
  return sanityFetch<{ slug: string }[]>(PARENT_CATEGORIES_QUERY);
}

/** Category info + its products for the homepage showcase carousel. */
export function fetchCategoryShowcase(
  categorySlug: string,
): Promise<ApiResponse<CategoryShowcaseData>> {
  return sanityFetch<CategoryShowcaseData>(CATEGORY_SHOWCASE_QUERY, { slug: categorySlug });
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
