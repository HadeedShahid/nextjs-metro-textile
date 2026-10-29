import ProductCard from "../ProductCard";
import SectionIntro from "../base/SectionIntro";
import type { ProductSummary } from "@/lib/api";
import { cn } from "@/lib/utils";

interface ProductGridProps {
  products: ProductSummary[];
  title: string;
  lede?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Show only this many tiles below 768px; the "see all" link carries the rest. */
  phoneLimit?: number;
  className?: string;
}

/** A headed grid of product tiles, every one in view: two across on phones, four on desktop. */
const ProductGrid = ({
  products,
  title,
  lede,
  viewAllHref,
  viewAllLabel = "See all products",
  phoneLimit,
  className,
}: ProductGridProps) => {
  return (
    <section className={cn("py-10 md:py-14 lg:py-16", className)}>
      <div className="container-x">
        <SectionIntro
          className="mb-5 md:mb-6"
          title={title}
          lede={lede}
          action={viewAllHref ? { href: viewAllHref, label: viewAllLabel } : undefined}
        />
        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-4 md:gap-x-4">
          {products.map((product, i) => (
            <li key={product._id} className={cn(phoneLimit !== undefined && i >= phoneLimit && "max-md:hidden")}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProductGrid;
