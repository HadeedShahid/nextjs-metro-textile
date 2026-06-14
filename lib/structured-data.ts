/**
 * JSON-LD builders. One source of truth for all structured data.
 *
 * Conventions:
 * - The Organization is defined ONCE (in the root layout) with a stable @id.
 *   Every other schema references it by { "@id": orgId } rather than repeating
 *   the full block.
 * - No prices/offers anywhere — Metro Metal is quote-based B2B, so Product
 *   nodes are entity/understanding signals, not merchant rich results.
 * - All URLs are absolute and env-driven via lib/seo.
 */
import { siteUrl, absoluteUrl, SITE_NAME, QUALITY_CERTIFICATION, OEKO_TEX } from "@/lib/seo";
import { CONTACT_EMAIL, CONTACT_PHONE_E164 } from "@/constants";

export const ORG_ID = `${siteUrl}/#organization`;
export const WEBSITE_ID = `${siteUrl}/#website`;

/** Company-wide Organization node. Render once in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    description:
      "B2B manufacturer and sourcing partner for garment and leather goods accessories: zippers, buttons, buckles, patches and plates. 20+ years serving global apparel and leather brands.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_E164,
      url: absoluteUrl("/contact-us"),
      availableLanguage: ["English"],
    },
    areaServed: { "@type": "Place", name: "Worldwide" },
    knowsAbout: [
      "Garment accessories manufacturing",
      "Apparel hardware sourcing",
      "Zippers",
      "Buttons",
      "Buckles",
      "Leather and PU patches",
      "Metal plates",
      "OEM and private-label accessories",
    ],
    // Company certifications: schema.org `hasCertification` + `Certification`
    // is the dedicated property chain for third-party certs issued to an
    // organization (not `hasCredential`/EducationalOccupationalCredential,
    // which is for people). Cert numbers omitted until confirmed.
    hasCertification: [
      {
        "@type": "Certification",
        name: QUALITY_CERTIFICATION,
        about: { "@id": ORG_ID },
      },
      {
        "@type": "Certification",
        name: OEKO_TEX,
        issuedBy: { "@type": "Organization", name: "OEKO-TEX Association" },
        about: { "@id": ORG_ID },
      },
    ],
    // sameAs intentionally omitted until real social URLs are confirmed —
    // a placeholder URL that 404s is a negative trust signal.
  };
}

/** Site-level WebSite node. Render once in the root layout. No SearchAction —
 *  there is no real /search endpoint. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteUrl,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList from an ordered list of { name, path } crumbs. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export type ProductForSchema = {
  title: string;
  slug: string;
  description?: string;
  images?: string[];
  categoryPath?: string; // e.g. "Patches > Leather Patches"
};

/** Single Product node (no offers/price). For /product/[slug]. */
export function productSchema(p: ProductForSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(`/product/${p.slug}`)}#product`,
    name: p.title,
    url: absoluteUrl(`/product/${p.slug}`),
    sku: p.slug,
    ...(p.description ? { description: p.description } : {}),
    ...(p.images && p.images.length ? { image: p.images } : {}),
    ...(p.categoryPath ? { category: p.categoryPath } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": ORG_ID },
  };
}

export type ListedProduct = { title: string; slug: string };

/** CollectionPage + nested ItemList of products. For category listing pages.
 *  Product items link to the real /product/[slug] route. */
export function collectionPageSchema(opts: {
  name: string;
  path: string;
  products: ListedProduct[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: opts.name,
    url: absoluteUrl(opts.path),
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.products.length,
      itemListElement: opts.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: p.title,
          url: absoluteUrl(`/product/${p.slug}`),
          brand: { "@type": "Brand", name: SITE_NAME },
          manufacturer: { "@id": ORG_ID },
        },
      })),
    },
  };
}

export type Faq = { question: string; answer: string };

/** FAQPage node. Use only where the same Q&As are visibly rendered on-page
 *  (homepage). Not for per-product pages (duplicate content). */
export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export type PostForSchema = {
  title: string;
  slug: string;
  publishedAt?: string;
  image?: string;
  excerpt?: string;
};

/** BlogPosting node. For /blog/[slug]. */
export function blogPostingSchema(post: PostForSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(`/blog/${post.slug}`)}#post`,
    headline: post.title,
    url: absoluteUrl(`/blog/${post.slug}`),
    ...(post.image ? { image: post.image } : {}),
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.excerpt ? { description: post.excerpt } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
