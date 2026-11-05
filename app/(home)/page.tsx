import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import type { SearchSuggestion } from "@/components/home/HeroSearch";
import CategoryGrid from "@/components/home/CategoryGrid";
import LogoRow from "@/components/home/LogoRow";
import OrderSteps from "@/components/home/OrderSteps";
import Showcase, { type ShowcaseRow } from "@/components/home/Showcase";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/common/BlogSection";
import JsonLd from "@/components/common/JsonLd";
import { fetchAllCategories, fetchAllProducts } from "@/lib/api";
import { buildCatalog, catalogItems, styleCount } from "@/lib/catalog";
import { dataOrThrow } from "@/lib/sanity-fetch";
import { faqPageSchema } from "@/lib/structured-data";
import { pickFaqs } from "@/data/faqs";
import { FAMILY_DEFAULTS } from "@/data/families";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// The homepage shows the questions buyers ask before a first order; the
// FAQPage JSON-LD carries exactly the same set.
const HOME_FAQ_QUESTIONS = [
  "Do you offer custom, OEM and private-label accessories?",
  "What is Metro Metal's minimum order quantity (MOQ)?",
  "Do you provide samples before bulk production?",
  "What are your typical lead times?",
  "Which regions does Metro Metal supply, and on what terms?",
];
const homeFaqs = pickFaqs(HOME_FAQ_QUESTIONS);

/** How many styles each family's carousel shows; "View all" opens the rest. */
const SHOWCASE_PER_FAMILY = 12;

/** A shuffled copy (Fisher-Yates). The page is cached, so the order changes each time it is rebuilt. */
function shuffled<T>(list: T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * A traditional home page: the hero with a product search, the client marks,
 * the product range by family, a few styles cleared to show, then the order
 * steps, the questions and the blog. The full catalogue and its search live at
 * /products.
 */
export default async function Home() {
  const [productsRes, categoriesRes] = await Promise.all([fetchAllProducts(), fetchAllCategories()]);
  const { families } = buildCatalog(dataOrThrow(categoriesRes, "categories") ?? [], dataOrThrow(productsRes, "products") ?? []);
  const items = catalogItems(families, null);

  // One carousel per family, its styles in a random order.
  const showcase: ShowcaseRow[] = families
    .filter((f) => f.products.length > 0)
    .map((f) => ({
      title: f.title,
      slug: f.slug,
      href: f.href,
      count: f.products.length,
      items: shuffled(catalogItems(families, f)).slice(0, SHOWCASE_PER_FAMILY),
    }));

  // The hero search's suggestions: every family and type, then every product.
  const stocked = families.filter((f) => f.products.length > 0);
  const thumbOf = (slug: string) => (FAMILY_DEFAULTS[slug] ? `/assets/bento/thumb/${slug}.webp` : null);
  const searchCategories: SearchSuggestion[] = [
    ...stocked.map((f) => ({ label: f.title, href: f.href, meta: styleCount(f.products.length), thumb: thumbOf(f.slug) })),
    ...stocked.flatMap((f) =>
      f.children
        .filter((t) => t.products.length > 0)
        .map((t) => ({ label: t.title, href: t.href, meta: f.title, thumb: thumbOf(f.slug) })),
    ),
  ];
  const searchProducts: SearchSuggestion[] = items.map(({ product, typeLabel }) => ({
    label: product.title,
    href: `/product/${product.slug.current}`,
    meta: typeLabel,
    thumb: null,
  }));

  return (
    <>
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <HomeHero categories={searchCategories} products={searchProducts} />
      {/* The client marks right under the hero, before the range. */}
      <div className="border-b border-border">
        <LogoRow />
      </div>
      <CategoryGrid families={families} />

      <Showcase rows={showcase} />

      <OrderSteps />
      <FAQSection title="Frequently asked questions" lede="What buyers usually ask before their first order." items={homeFaqs} />
      <BlogSection className="bg-muted" />
    </>
  );
}
