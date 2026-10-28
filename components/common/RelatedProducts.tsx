import { fetchRelatedProducts } from "@/lib/api"
import ProductCarousel from "./ProductCarousel"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
  categoryTitle: string
  categoryHref: string
}

/** Other styles from the same category, as a snapping rail. */
const RelatedProducts = async ({ categoryId, currentProductId, categoryTitle, categoryHref }: RelatedProductsProps) => {
  const { data: products } = await fetchRelatedProducts(categoryId, currentProductId)

  if (!products || products.length === 0) return null

  return (
    <ProductCarousel
      title={`More ${categoryTitle.toLowerCase()}.`}
      lede="Other styles in this family. Any of them can be made in your finish."
      products={products}
      viewAllHref={categoryHref}
      viewAllLabel={`See all ${categoryTitle.toLowerCase()}`}
    />
  )
}

export default RelatedProducts
