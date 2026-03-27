import ProductCard from "../ProductCard"
import EmblaCarouselWrapper from "@/components/emblaCarousel/EmblaCarouselWrapper"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ProductCarouselProps {
  products: any[],
  title?: string,
  viewAllHref?: string
}

const ProductCarousel = ({ products, title, viewAllHref }: ProductCarouselProps) => {
  return (
    <div className="space-y-6 py-8">
      {title && viewAllHref && (
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors group"
          >
            Explore All
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}

      <EmblaCarouselWrapper
        options={{ align: "start", containScroll: "trimSnaps", dragFree: true }}
        containerClassName="gap-4 md:gap-6"
        slideClassName="basis-[calc((100%/1.2)-1rem)] md:basis-[calc((100%/2.8)-1.5rem)] lg:basis-[calc((100%/4.2)-1.5rem)]"
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            categoryPath={`/products/${product.category?.slug?.current || ''}`}
          />
        ))}
      </EmblaCarouselWrapper>
    </div>
  )
}

export default ProductCarousel
