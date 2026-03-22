import { client } from "@/sanity/client";
import ProductCarousel from "./common/ProductCarousel";

interface CategoryShowcaseProps {
  categorySlug: string;
}

const SHOWCASE_QUERY = `
{
  "category": *[_type == "category" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current
  },
  "products": *[_type == "product" && (category->slug.current == $slug || category->parent->slug.current == $slug || category->parent->parent->slug.current == $slug)] | order(_createdAt desc) [0...12] {
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
}
`;

const options = { next: { revalidate: 30 } };

export default async function CategoryShowcase({
  categorySlug,
}: CategoryShowcaseProps) {
  const data = await client.fetch<{
    category: { title: string; slug: string } | null;
    products: any[];
  }>(SHOWCASE_QUERY, { slug: categorySlug }, options);

  if (!data?.category || !data.products.length) return null;

  return (
    <ProductCarousel
      title={`${data.category.title} Catalog`}
      products={data.products}
      viewAllHref={`/products/${data.category.slug}`}
    />
  );
}
