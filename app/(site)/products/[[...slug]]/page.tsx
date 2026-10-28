import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { fetchAllProducts, fetchAllCategories, type Category, type ProductSummary } from "@/lib/api";
import { buildCatalog, resolvePath, runningName, styleCount, type CatalogNode } from "@/lib/catalog";
import JsonLd from "@/components/common/JsonLd";
import { collectionPageSchema, breadcrumbSchema, type Crumb } from "@/lib/structured-data";
import ProductCard from "@/components/ProductCard";
import SectionIntro from "@/components/base/SectionIntro";
import FamilyStrip from "@/components/catalog/FamilyStrip";
import FamilyHero from "@/components/catalog/FamilyHero";
import FamilyTile from "@/components/catalog/FamilyTile";
import TypeHero from "@/components/catalog/TypeHero";
import TypeLineup from "@/components/catalog/TypeLineup";
import Highlights from "@/components/catalog/Highlights";
import StyleGrid, { MadeToSpecTile } from "@/components/catalog/StyleGrid";
import AboutCategory from "@/components/catalog/AboutCategory";
import FAQSection from "@/components/FAQSection";
import ClosingBand from "@/components/home/ClosingBand";
import { DEFAULT_FAQS } from "@/data/faqs";

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
    "Metro Metal makes buckles, buttons, patches, plates and zippers for apparel and leather-goods brands, finished and branded to spec. Request a quote.",
  h1: "Garment & Leather-Goods Accessories Manufacturer",
  intro:
    "Metro Metal manufactures the full range of garment and leather-goods accessories: buckles, buttons, patches, plates and zippers. With over 20 years supplying apparel and leather brands worldwide, our network spans Pakistan, China and Hong Kong. Every piece can be made in your finish and carry your mark. Open a family to see every style, or request a quote from any product page.",
};

function resolveCategorySeo(
  slugArray: string[] | undefined,
  categories: Category[],
): ResolvedSeo {
  if (!slugArray || slugArray.length === 0) return ALL_PRODUCTS_SEO;

  const leafSlug = slugArray[slugArray.length - 1];
  const cat = categories.find((c) => c.slug.current === leafSlug);

  if (!cat) {
    // Unknown slug — generate a generic fallback.
    const pretty = leafSlug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      metaTitle: `${pretty} Manufacturer & Supplier`,
      metaDescription: `Metro Metal manufactures and supplies ${pretty.toLowerCase()} for global apparel brands. Bulk B2B supply. Request a quote.`,
      h1: `${pretty} Manufacturer & Supplier`,
      intro: null,
    };
  }

  const pretty = cat.title;
  return {
    metaTitle: cat.metaTitle ?? `${pretty} Manufacturer & Supplier`,
    metaDescription:
      cat.metaDescription ??
      `Metro Metal manufactures and supplies ${pretty.toLowerCase()} for global apparel brands. Bulk B2B supply. Request a quote.`,
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
      title: `${seo.metaTitle} | Metro Metal`,
      description: seo.metaDescription,
      url: canonical,
      type: "website",
    },
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;

  const [{ data: products }, { data: categories }] = await Promise.all([
    fetchAllProducts(),
    fetchAllCategories(),
  ]);

  const { families } = buildCatalog(categories ?? [], products ?? []);
  const node = slug.length ? resolvePath(families, slug) : null;

  // A path that doesn't resolve to a real category is a 404, not the full catalog.
  if (slug.length && !node && categories) notFound();

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

  return (
    <>
      <JsonLd data={[collectionLd, breadcrumbSchema(crumbs)]} />
      {!node ? (
        <CatalogOverview families={families} total={(products ?? []).length} seo={seo} />
      ) : node.parent ? (
        <TypePage type={node} families={families} />
      ) : (
        <FamilyPage family={node} families={families} />
      )}
    </>
  );
}

const FAQS = [
  ...DEFAULT_FAQS.slice(0, 6),
  {
    question: "How do I request a custom product not listed here?",
    answer:
      "Use the quote form or message us on WhatsApp with your requirements. Our team will review your request and reply with sourcing options within 24 to 48 hours.",
  },
];

const stylesLede = (products: ProductSummary[]) =>
  products.length
    ? `${styleCount(products.length)}, each made in your finish and carrying your mark.`
    : "Every piece here is made to your specification. Send us a brief and we'll quote it.";

/** A family's own page: its stage, its types, what sets it apart, every style. */
function FamilyPage({ family, families }: { family: CatalogNode; families: CatalogNode[] }) {
  const types = family.children.filter((c) => c.products.length > 0);
  const showTypes = types.length >= 2;
  const name = runningName(family.title);

  return (
    <>
      <FamilyStrip families={families} current={{ familyId: family.id, exact: true }} />
      <FamilyHero family={family} />
      {showTypes && (
        <TypeLineup
          title="Explore the lineup."
          lede="Each type is made in your finish and carries your mark."
          types={types}
        />
      )}
      <Highlights family={family} className={showTypes ? "pt-0 md:pt-0" : undefined} />
      <StyleGrid
        id="styles"
        title={`All ${name}.`}
        lede={stylesLede(family.products)}
        products={family.products}
        quoteFor={family.title}
        fallback={family.defaults?.cutout}
        className="pt-0 md:pt-0"
      />
      <AboutCategory heading={family.category.h1 ?? `About ${runningName(family.title)}`} intro={family.category.intro} />
      <FAQSection lede={`What buyers ask before ordering ${name}.`} items={FAQS} />
      <ClosingBand />
    </>
  );
}

/** One type inside a family: every style in it, then its sibling types. */
function TypePage({ type, families }: { type: CatalogNode; families: CatalogNode[] }) {
  const family = type.parent as CatalogNode;
  const siblings = family.children.filter((c) => c.id !== type.id && c.products.length > 0);
  const name = runningName(type.title);

  return (
    <>
      <FamilyStrip families={families} current={{ familyId: family.id, exact: false }} />
      <TypeHero type={type} />
      <StyleGrid
        id="styles"
        title={`All ${name}.`}
        lede={stylesLede(type.products)}
        products={type.products}
        quoteFor={type.title}
        fallback={family.defaults?.cutout}
      />
      {siblings.length > 0 && (
        <TypeLineup
          title={`More ${runningName(family.title)}.`}
          types={siblings}
          className="pt-0 md:pt-0"
        />
      )}
      <AboutCategory heading={type.category.h1 ?? `About ${runningName(type.title)}`} intro={type.category.intro} />
      <FAQSection lede={`What buyers ask before ordering ${name}.`} items={FAQS} />
      <ClosingBand />
    </>
  );
}

const NUMBER_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/** /products: every family as a stage-sized tile, then a taste of each one. */
function CatalogOverview({
  families,
  total,
  seo,
}: {
  families: CatalogNode[];
  total: number;
  seo: ResolvedSeo;
}) {
  const familyCount = NUMBER_WORDS[families.length] ?? String(families.length);

  return (
    <>
      <header className="container-x pb-12 pt-10 md:pb-16 md:pt-14">
        <h1 className="text-display">All products.</h1>
        <p className="text-lede mt-5 max-w-2xl text-muted-foreground">
          {familyCount} families and {total} styles, each made in your finish and carrying your mark.
        </p>
      </header>

      <section aria-label="Product families" className="container-x grid gap-5 md:grid-cols-6 md:gap-6">
        {families.map((family, i) => (
          <FamilyTile
            key={family.id}
            family={family}
            className={i < 2 ? "md:col-span-3 md:h-[32rem]" : "md:col-span-2 md:h-[28rem]"}
          />
        ))}
      </section>

      <section aria-labelledby="by-family-title" className="py-24 md:py-32">
        <SectionIntro
          id="by-family-title"
          className="container-x mb-12 md:mb-16"
          title="A first look at each."
          lede="Four styles from every family. Open one to see them all."
        />
        <div className="container-x flex flex-col gap-20 md:gap-24">
          {families.map((family) => (
            <section key={family.id} aria-labelledby={`family-${family.slug}`}>
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-border pb-4">
                <h3 id={`family-${family.slug}`} className="text-title">
                  {family.title}
                </h3>
                <Link
                  href={family.href}
                  className="group inline-flex items-center gap-0.5 text-[1.0625rem] text-primary hover:underline"
                >
                  {family.products.length > 1
                    ? `See all ${styleCount(family.products.length)}`
                    : `Explore ${runningName(family.title)}`}
                  <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
                {family.products.slice(0, 4).map((product) => (
                  <li key={product._id}>
                    <ProductCard product={product} fallback={family.defaults?.cutout} />
                  </li>
                ))}
                {family.products.length < 4 && (
                  <li className="col-span-2 lg:col-span-1">
                    <MadeToSpecTile quoteFor={family.title} compact />
                  </li>
                )}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <AboutCategory heading={seo.h1 ?? seo.metaTitle} intro={seo.intro} />
      <FAQSection lede="What buyers ask before ordering from the catalog." items={FAQS} />
      <ClosingBand />
    </>
  );
}
