"use client"

import React, { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ProductCard from "../ProductCard"

interface ProductCarouselProps {
  products: any[]
}

const ProductCarousel = ({ products }: ProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  })

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  if (products.length === 0) return null

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6 px-2">
          {products.map((product) => (
            <div key={product._id} className="flex-[0_0_100%] sm:flex-[0_0_45%] lg:flex-[0_0_23%]">
              <ProductCard 
                product={product} 
                categoryPath={`/products/${product.category?.slug.current}`} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {products.length > 4 && (
        <>
          <button
            onClick={scrollPrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-xl hover:bg-slate-50 transition-all border border-slate-100 hidden lg:flex"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-xl hover:bg-slate-50 transition-all border border-slate-100 hidden lg:flex"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </>
      )}
    </div>
  )
}

export default ProductCarousel
