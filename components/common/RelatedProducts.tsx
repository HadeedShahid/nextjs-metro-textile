import React from "react"
import { client } from "@/sanity/client"
import ProductCarousel from "./ProductCarousel"

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
  categoryTitle: string
}

const RELATED_PRODUCTS_QUERY = `*[_type == "product" && category._ref == $categoryId && _id != $currentProductId] | order(_createdAt desc) [0...8] {
    _id,
    title,
    slug,
    images,
    category->{
        title,
        "slug": slug
    },
    isFeatured,
    isPopular
}`

const RelatedProducts = async ({ categoryId, currentProductId, categoryTitle }: RelatedProductsProps) => {
  let products = []
  try {
    products = await client.fetch(RELATED_PRODUCTS_QUERY, { categoryId, currentProductId }, { next: { revalidate: 30 } })
  } catch (error) {
    console.error("[RelatedProducts] Error fetching products:", error)
  }

  if (products.length === 0) return null

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Exploring More <span className="text-purple-600">{categoryTitle}</span>
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Check out other similar products from this category.
            </p>
          </div>
        </div>

        <ProductCarousel products={products} />
      </div>
    </section>
  )
}

export default RelatedProducts
