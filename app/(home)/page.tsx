import type { Metadata } from "next";
import HomeHero from "@/components/home/HomeHero";
import CategoryGrid from "@/components/home/CategoryGrid";
import LogoRow from "@/components/home/LogoRow";
import OrderSteps from "@/components/home/OrderSteps";
import ProductCard from "@/components/ProductCard";
import SectionIntro from "@/components/base/SectionIntro";
import FAQSection from "@/components/FAQSection";
import BlogSection from "@/components/common/BlogSection";
import JsonLd from "@/components/common/JsonLd";
import { fetchAllCategories, fetchAllProducts } from "@/lib/api";
import { buildCatalog, catalogItems } from "@/lib/catalog";
import { dataOrThrow } from "@/lib/sanity-fetch";
import { faqPageSchema } from "@/lib/structured-data";
import { pickFaqs } from "@/data/faqs";
import { SHOWCASE_PHOTOS } from "@/data/families";

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

/**
 * A traditional home page: the hero with a product search, the client marks,
 * the product range by family, a few styles cleared to show, then the order
 * steps, the questions and the blog. The full catalogue and its search live at
 * /products.
 */
export default async function Home() {
  const [productsRes, categoriesRes] = await Promise.all([fetchAllProducts(), fetchAllCategories()]);
  const { families } = buildCatalog(dataOrThrow(categoriesRes, "categories") ?? [], dataOrThrow(productsRes, "products") ?? []);
  const total = families.reduce((sum, f) => sum + f.products.length, 0);
  // Only photos cleared to show here: most catalogue photos carry a client's own mark.
  const items = catalogItems(families, null);
  const popular = SHOWCASE_PHOTOS.flatMap((slug) => items.filter((item) => item.product.slug.current === slug));

  return (
    <>
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <HomeHero total={total} />
      {/* The client marks right under the hero, before the range. */}
      <div className="border-b border-border">
        <LogoRow />
      </div>
      <CategoryGrid families={families} />

      {popular.length > 0 && (
        <section aria-labelledby="popular-title" className="border-t border-border py-10 md:py-14">
          <div className="container-x">
            <SectionIntro
              id="popular-title"
              title="From the catalogue"
              lede="A few styles from the catalogue. Ask for any of them in your finish and size."
              action={{ href: "/products", label: `View all ${total} products` }}
            />
            <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">
              {popular.map((item) => (
                <li key={item.product._id}>
                  <ProductCard product={item.product} typeLabel={item.typeLabel} fallback={item.fallback} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <OrderSteps />
      <FAQSection title="Frequently asked questions" lede="What buyers usually ask before their first order." items={homeFaqs} />
      <BlogSection className="bg-muted" />
    </>
  );
}
