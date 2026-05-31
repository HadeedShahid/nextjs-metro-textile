import { fetchCategoryShowcase } from "@/lib/api";
import ProductCarousel from "./common/ProductCarousel";

interface CategoryShowcaseProps {
  categorySlug: string;
}

export default async function CategoryShowcase({
  categorySlug,
}: CategoryShowcaseProps) {
  const { data } = await fetchCategoryShowcase(categorySlug);

  if (!data?.category || !data.products.length) return null;

  return (
    <ProductCarousel
      title={`${data.category.title} Catalog`}
      products={data.products}
      viewAllHref={`/products/${data.category.slug}`}
    />
  );
}
