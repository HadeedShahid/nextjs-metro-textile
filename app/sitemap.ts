import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity-fetch";
import { siteUrl } from "@/lib/seo";

type SitemapData = {
  products: { slug: string; _updatedAt: string }[];
  categories: {
    slug: string;
    _updatedAt: string;
    parentSlug: string | null;
    grandparentSlug: string | null;
  }[];
  posts: { slug: string; _updatedAt: string }[];
};

const SITEMAP_QUERY = `{
  "products": *[_type == "product" && defined(slug.current)]{
    "slug": slug.current, _updatedAt
  },
  "categories": *[_type == "category" && defined(slug.current)]{
    "slug": slug.current,
    _updatedAt,
    "parentSlug": parent->slug.current,
    "grandparentSlug": parent->parent->slug.current
  },
  "posts": *[_type == "post" && defined(slug.current)]{
    "slug": slug.current, _updatedAt
  }
}`;

/** Build the hierarchical /products path the catch-all route expects. */
function categoryPath(cat: SitemapData["categories"][number]): string {
  const segments = [cat.grandparentSlug, cat.parentSlug, cat.slug].filter(
    Boolean,
  );
  return `/products/${segments.join("/")}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await sanityFetch<SitemapData>(SITEMAP_QUERY);

  const now = new Date();
  const url = (path: string) => `${siteUrl}${path}`;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: url("/products"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: url("/about-us"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: url("/compliance"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: url("/contact-us"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: url("/blogs"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = (data?.categories ?? []).map(
    (cat) => ({
      url: url(categoryPath(cat)),
      lastModified: new Date(cat._updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const productRoutes: MetadataRoute.Sitemap = (data?.products ?? []).map(
    (p) => ({
      url: url(`/product/${p.slug}`),
      lastModified: new Date(p._updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }),
  );

  const postRoutes: MetadataRoute.Sitemap = (data?.posts ?? []).map((p) => ({
    url: url(`/blog/${p.slug}`),
    lastModified: new Date(p._updatedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...postRoutes,
  ];
}
