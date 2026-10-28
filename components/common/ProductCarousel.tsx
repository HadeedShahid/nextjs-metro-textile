import ProductCard from "../ProductCard";
import Rail from "../base/Rail";
import SectionIntro from "../base/SectionIntro";
import type { ProductSummary } from "@/lib/api";

interface ProductCarouselProps {
  products: ProductSummary[];
  title: string;
  lede?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

/** A headed rail of product tiles that snaps tile by tile. */
const ProductCarousel = ({
  products,
  title,
  lede,
  viewAllHref,
  viewAllLabel = "See all products",
}: ProductCarouselProps) => {
  return (
    <section className="py-24 md:py-32">
      <SectionIntro
        className="container-x mb-10 md:mb-14"
        title={title}
        lede={lede}
        action={viewAllHref ? { href: viewAllHref, label: viewAllLabel } : undefined}
      />
      <Rail label={title} itemClassName="w-[78%] sm:w-[44%] lg:w-[calc((75rem-2.5rem)/3)]">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Rail>
    </section>
  );
};

export default ProductCarousel;
