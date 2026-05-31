import React from "react"
import { fetchRelatedProducts } from "@/lib/api"
import ProductCarousel from "./ProductCarousel"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
  categoryTitle: string
}

const RelatedProducts = async ({ categoryId, currentProductId, categoryTitle }: RelatedProductsProps) => {
  const { data: products } = await fetchRelatedProducts(categoryId, currentProductId)

  if (!products || products.length === 0) return null

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Exploring More {categoryTitle}
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Check out other similar products from this category.
            </p>
          </div>
        </div>

        <ProductCarousel products={products} />
      </div>
    </section >
  )
}

export default RelatedProducts
