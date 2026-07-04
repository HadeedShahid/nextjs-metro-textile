import type { Metadata } from "next";
import { fetchAllProducts, fetchAllCategories, type Category } from "@/lib/api";
import JsonLd from "@/components/common/JsonLd";
import { collectionPageSchema, breadcrumbSchema, type Crumb } from "@/lib/structured-data";
import { SearchX } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Section from "@/components/base/Section";
import { Button } from "@/components/ui/button";
import CompaniesTrust from "@/components/common/CompaniesTrust";
import SourcingProcess from "@/components/SourcingProcess";
import FAQSection from "@/components/FAQSection";
import { DEFAULT_FAQS } from "@/data/faqs";
import ContactSection from "@/components/ContactSection";
import Clients from "@/components/clients";
import ActionCTA from "@/components/ActionCTA";
import BlogSection from "@/components/common/BlogSection";

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
    "Metro Metal manufactures buckles, buttons, patches, plates and zippers for global fashion brands. ISO and OEKO-TEX certified. Request a quote.",
  h1: "Garment & Leather-Goods Accessories Manufacturer",
  intro:
    "Metro Metal manufactures the full range of garment and leather goods accessories including buckles, buttons, patches, plates and zippers. With over 20 years supplying apparel and leather brands worldwide, our network spans Pakistan, China and Hong Kong. We offer ISO-certified quality, OEKO-TEX compliance and commercial-scale production. Browse by category or request a quote from any product page.",
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
  const { slug: slugArray } = await params;

  const [{ data: products }, { data: categories }] = await Promise.all([
    fetchAllProducts(),
    fetchAllCategories(),
  ]);

  const safeProducts = products ?? [];
  const safeCategories = categories ?? [];

  // Resolve activeCategoryId from slugArray
  let activeCategoryId: string | null = null;
  if (slugArray && slugArray.length > 0) {
    let currentParentId: string | undefined = undefined;
    for (const slugPart of slugArray) {
      const matchedCategory = safeCategories.find(
        (c) =>
          c.slug.current === slugPart &&
          (currentParentId ? c.parent?._ref === currentParentId : !c.parent),
      );
      if (matchedCategory) {
        activeCategoryId = matchedCategory._id;
        currentParentId = matchedCategory._id;
      } else {
        activeCategoryId = null;
        break;
      }
    }
  }

  const filteredProducts = safeProducts.filter((product) => {
    if (!activeCategoryId) return true;

    const checkCategoryMatch = (catId: string | undefined): boolean => {
      if (!catId) return false;
      if (catId === activeCategoryId) return true;
      const cat = safeCategories.find((c) => c._id === catId);
      return checkCategoryMatch(cat?.parent?._ref);
    };

    return checkCategoryMatch(product.category?._id);
  });

  const getCategoryPath = (catId: string | undefined): string => {
    if (!catId) return "/products";
    const path: string[] = [];
    let current = safeCategories.find((c) => c._id === catId);
    while (current) {
      path.unshift(current.slug.current);
      const parentId = current.parent?._ref;
      current = parentId
        ? safeCategories.find((c) => c._id === parentId)
        : undefined;
    }
    return `/products/${path.join("/")}`;
  };

  const activeCategory = activeCategoryId
    ? safeCategories.find((c) => c._id === activeCategoryId)
    : null;

  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  if (activeCategoryId) {
    const hierarchy: { label: string; href: string }[] = [];
    let current = safeCategories.find((c) => c._id === activeCategoryId);
    while (current) {
      hierarchy.unshift({
        label: current.title,
        href: getCategoryPath(current._id),
      });
      const parentId = current.parent?._ref;
      current = parentId
        ? safeCategories.find((c) => c._id === parentId)
        : undefined;
    }
    breadcrumbItems.push(...hierarchy);
  }

  // SEO content + structured data for this listing page.
  const seo = resolveCategorySeo(slugArray, safeCategories);
  const currentPath =
    slugArray && slugArray.length ? `/products/${slugArray.join("/")}` : "/products";

  const collectionLd = collectionPageSchema({
    name: seo.h1 ?? seo.metaTitle,
    path: currentPath,
    products: filteredProducts.map((p) => ({
      title: p.title,
      slug: p.slug.current,
    })),
  });
  const crumbLd: Crumb[] = breadcrumbItems
    .filter((b) => b.href)
    .map((b) => ({ name: b.label, path: b.href as string }));

  return (
    <>
      <JsonLd data={[collectionLd, breadcrumbSchema(crumbLd)]} />
      <Section>
        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
          {seo.h1 ?? seo.metaTitle}
        </h1>

        <CategoryFilters
          categories={safeCategories}
          activeCategoryId={activeCategoryId || null}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                categoryPath={getCategoryPath(product.category?._id)}
              />
            ))
          ) : (
            <div className="col-span-full py-10 flex flex-col items-center justify-center gap-5 bg-white rounded-3xl border border-dashed border-slate-300 text-center px-6">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                <SearchX className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold text-slate-800">No products found</h3>
                <p className="text-sm text-slate-400 max-w-xs mx-auto">
                  We couldn't find anything matching your current filters. Try selecting a different category.
                </p>
              </div>
              <Button href="/products" variant="outline" className="rounded-full px-6">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <Breadcrumbs items={breadcrumbItems} />
        </div>

        {seo.intro && (
          <p className="max-w-3xl text-sm text-slate-400 leading-relaxed border-t border-slate-100 pt-8">
            {seo.intro}
          </p>
        )}
      </Section>

      <ActionCTA />

      <Clients />

      <ContactSection />

      <FAQSection
        title="Product Sourcing FAQs"
        items={[
          ...DEFAULT_FAQS,
          {
            question: "How do I request a custom product not listed here?",
            answer:
              "Simply use our contact form or WhatsApp us with your requirements. Our team will analyze your request and get back to you with sourcing options within 24-48 hours.",
          },
        ]}
      />
      <BlogSection />
    </>
  );
}
