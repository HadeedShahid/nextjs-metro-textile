import { fetchAllProducts, fetchAllCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Section from "@/components/base/Section";
import CompaniesTrust from "@/components/common/CompaniesTrust";
import SourcingProcess from "@/components/SourcingProcess";
import FAQSection from "@/components/FAQSection";
import { DEFAULT_FAQS } from "@/data/faqs";
import ContactSection from "@/components/ContactSection";
import Clients from "@/components/clients";
import ActionCTA from "@/components/ActionCTA";
import BlogSection from "@/components/common/BlogSection";

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

  return (
    <>
      <Section>
        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">
          {activeCategory ? activeCategory.title : "All Products"}
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
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-400 text-lg">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
        <div className="md:hidden">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
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
