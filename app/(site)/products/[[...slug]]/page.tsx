import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchAllProducts, fetchAllCategories, type Category } from "@/lib/api";
import { buildCatalog, catalogChips, catalogItems, resolvePath, runningName, styleCount, type CatalogNode } from "@/lib/catalog";
import JsonLd from "@/components/common/JsonLd";
import { dataOrThrow } from "@/lib/sanity-fetch";
import { collectionPageSchema, breadcrumbSchema, type Crumb } from "@/lib/structured-data";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Catalog from "@/components/catalog/Catalog";
import CustomRequest from "@/components/catalog/CustomRequest";
import AboutCategory from "@/components/catalog/AboutCategory";
import FAQSection from "@/components/FAQSection";
import { DEFAULT_FAQS } from "@/data/faqs";
import { SITE_NAME } from "@/lib/seo";

// ---------------------------------------------------------------------------
// SEO resolver — reads metaTitle / metaDescription / h1 / intro from the
// active Sanity category document. Falls back to a generic title for any
// category that doesn't have SEO fields set yet.
// ---------------------------------------------------------------------------
type ResolvedSeo = {
  metaTitle: string;
  metaDescription: string;
  h1: string | null;
  intro: string | null;
};

const ALL_PRODUCTS_SEO: ResolvedSeo = {
  metaTitle: "Garment Accessories Manufacturer & Supplier",
  metaDescription:
    "Metro Metal makes buckles, buttons, patches, plates and zippers for apparel and leather goods brands, finished and branded to spec. Request a quote.",
  h1: "Garment & Leather Goods Accessories Manufacturer",
  intro:
    "Metro Metal manufactures the full range of garment and leather goods accessories: buckles, buttons, patches, plates and zippers. With over 20 years supplying apparel and leather brands worldwide, our network spans Pakistan, China and Hong Kong. Every piece can be made in your finish and carry your mark. Open a family to see every style, or request a quote from any product page.",
};

/** Generated title and description for a category without its own SEO fields. */
const fallbackSeo = (name: string) => ({
  metaTitle: `${name} Manufacturer & Supplier`,
  metaDescription: `Metro Metal manufactures and supplies ${name.toLowerCase()} for global apparel brands. Bulk B2B supply. Request a quote.`,
});

function resolveCategorySeo(
  slugArray: string[] | undefined,
  categories: Category[],
): ResolvedSeo {
  if (!slugArray || slugArray.length === 0) return ALL_PRODUCTS_SEO;

  const leafSlug = slugArray[slugArray.length - 1];
  const cat = categories.find((c) => c.slug.current === leafSlug);

  if (!cat) {
    // Unknown slug (or categories failed to load): a readable name from the slug.
    const name = leafSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    const seo = fallbackSeo(name);
    return { ...seo, h1: seo.metaTitle, intro: null };
  }

  const seo = fallbackSeo(cat.title);
  return {
    metaTitle: cat.metaTitle ?? seo.metaTitle,
    metaDescription: cat.metaDescription ?? seo.metaDescription,
    h1: cat.h1 ?? null,
    intro: cat.intro ?? null,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: categories } = await fetchAllCategories();
  const leaf = slug?.at(-1);
  if (leaf && categories && !categories.some((c) => c.slug.current === leaf)) {
    return { title: "Page not found", robots: { index: false } };
  }
  const seo = resolveCategorySeo(slug, categories ?? []);
  const canonical = slug && slug.length ? `/products/${slug.join("/")}` : "/products";

  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: `${seo.metaTitle} | ${SITE_NAME}`,
      description: seo.metaDescription,
      url: canonical,
      type: "website",
    },
  };
}

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { slug = [] } = await params;
  // The home page's search lands here with its words in ?q=.
  const { q } = await searchParams;
  const initialQuery = (Array.isArray(q) ? q[0] : q)?.slice(0, 100) ?? "";

  const [productsRes, categoriesRes] = await Promise.all([fetchAllProducts(), fetchAllCategories()]);
  const products = dataOrThrow(productsRes, "products");
  const categories = dataOrThrow(categoriesRes, "categories");

  const { families } = buildCatalog(categories ?? [], products ?? []);
  const node = slug.length ? resolvePath(families, slug) : null;

  // A path that doesn't resolve to a real category is a 404, not the full catalog.
  if (slug.length && !node) notFound();

  // SEO content + structured data for this page.
  const seo = resolveCategorySeo(slug, categories ?? []);
  const listed = node ? node.products : (products ?? []);
  const lineage: CatalogNode[] = [];
  for (let n = node; n; n = n.parent) lineage.unshift(n);
  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    ...lineage.map((n) => ({ name: n.title, path: n.href })),
  ];
  const collectionLd = collectionPageSchema({
    name: seo.h1 ?? seo.metaTitle,
    path: node?.href ?? "/products",
    products: listed.map((p) => ({ title: p.title, slug: p.slug.current })),
  });

  const { familyChips, typeChips } = catalogChips(families, node);
  const title = node?.title ?? "All products";
  const line = node?.tagline ?? "Buckles, buttons, patches, plates and zippers, each made in your finish and with your logo.";

  return (
    <>
      <JsonLd data={[collectionLd, breadcrumbSchema(crumbs)]} />

      <section className="container-x pb-10 pt-5 md:pb-14 md:pt-6">
        <Breadcrumbs items={crumbs.map((c, i) => (i === crumbs.length - 1 ? { label: c.name } : { label: c.name, href: c.path }))} />
        <div className="mt-4">
          <Catalog
            heading={
              <>
                <h1 className="text-display">{title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {line} <span className="whitespace-nowrap">{styleCount(listed.length)}.</span>
                </p>
              </>
            }
            items={catalogItems(families, node)}
            familyChips={familyChips}
            typeChips={typeChips}
            searchPlaceholder={node ? `Search ${runningName(node.title)}` : "Search products"}
            initialQuery={initialQuery}
          />
        </div>
        <CustomRequest className="mt-8" quoteFor={node?.title} />
      </section>

      <AboutCategory heading={aboutHeading(node, seo)} intro={node ? node.category.intro : seo.intro} />
      <FAQSection
        title="Frequently asked questions"
        lede={`What buyers ask before ordering ${node ? runningName(node.title) : "from the catalogue"}.`}
        items={FAQS}
      />
    </>
  );
}

/** The search copy's heading: the category's own keyword h1 from Sanity, or a plain one. */
function aboutHeading(node: CatalogNode | null, seo: ResolvedSeo) {
  if (!node) return seo.h1 ?? seo.metaTitle;
  return node.category.h1 ?? `About ${runningName(node.title)}`;
}

const FAQS = [
  ...DEFAULT_FAQS.slice(0, 6),
  {
    question: "How do I request a custom product not listed here?",
    answer:
      "Use the quote form or message us on WhatsApp with your requirements. Our team will review your request and reply with sourcing options within 24 to 48 hours.",
  },
];
