import { fetchRelatedProducts } from "@/lib/api"
import ProductGrid from "./ProductGrid"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
  categoryTitle: string
  categoryHref: string
}

/** Other styles from the same category, as a grid. */
const RelatedProducts = async ({ categoryId, currentProductId, categoryTitle, categoryHref }: RelatedProductsProps) => {
  const { data: products } = await fetchRelatedProducts(categoryId, currentProductId)

  if (!products || products.length === 0) return null

  return (
    <ProductGrid
      title={`More ${categoryTitle.toLowerCase()}.`}
      lede="Other styles in this family. Any of them can be made in your finish."
      products={products}
      viewAllHref={categoryHref}
      viewAllLabel={`See all ${categoryTitle.toLowerCase()}`}
    />
  )
}

export default RelatedProducts
