"use client"

import ProductCard from "../ProductCard"

interface ProductCarouselProps {
  products: any[],
  title: string,
  viewAllHref: string
}

const ProductCarousel = ({ products, title, viewAllHref }: ProductCarouselProps) => {
  return (
    <div className="flex gap-6 px-2">
      <p>{title}</p>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          categoryPath={`/products/${product.category?.slug.current}`}
        />
      ))}
    </div>
  )
}

export default ProductCarousel
