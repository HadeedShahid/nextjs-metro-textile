import ProductCard from "@/components/ProductCard";
import SectionIntro from "@/components/base/SectionIntro";
import { QuoteModalButton } from "@/components/QuoteModal";
import type { ProductSummary } from "@/lib/api";
import { cn } from "@/lib/utils";

interface StyleGridProps {
  /** Heading level and text; families and types use the section heading. */
  title: string;
  lede?: string;
  products: ProductSummary[];
  /** What the quote tile asks about, such as the family name. */
  quoteFor: string;
  /** Studio render shown in place of placeholder product photos. */
  fallback?: { src: string; width: number; height: number };
  id?: string;
  className?: string;
}

/**
 * Every style as a photo tile, ending on a tile for the piece that is not in
 * the catalog yet, so the grid always closes on the quote.
 */
export default function StyleGrid({ title, lede, products, quoteFor, fallback, id, className }: StyleGridProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id ?? "styles"}-title`}
      className={cn("scroll-mt-[var(--nav-h)] py-10 md:py-14 lg:py-16", className)}
    >
      <SectionIntro id={`${id ?? "styles"}-title`} className="container-x mb-5 md:mb-6" title={title} lede={lede} />
      <ul className="container-x grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 md:gap-x-4 lg:grid-cols-4">
        {products.map((product) => (
          <li key={product._id}>
            <ProductCard product={product} fallback={fallback} />
          </li>
        ))}
        <li>
          <MadeToSpecTile quoteFor={quoteFor} />
        </li>
      </ul>
    </section>
  );
}

/** The catalog's last tile: the piece the buyer has in mind but cannot see here. */
export function MadeToSpecTile({ quoteFor, compact = false }: { quoteFor: string; compact?: boolean }) {
  return (
    // Compact tiles span the row on phones, so they only turn square beside four-up product
    // tiles; there the column sets the size, since a stretched height would widen the square.
    <div
      className={cn(
        "flex h-full min-h-40 flex-col justify-end rounded-2xl bg-muted p-3 sm:p-4 md:p-5",
        compact && "lg:h-auto lg:aspect-square",
      )}
    >
      <h3 className="text-title">Not in the catalog?</h3>
      <p className="text-meta mt-1 max-w-[20rem] text-muted-foreground sm:text-sm">
        Send a drawing, tech pack or sample and we&apos;ll quote it to your spec.
      </p>
      <div className="mt-3">
        <QuoteModalButton product={quoteFor} size="sm" className="h-10 px-3 sm:px-4" text="Request a quote" />
      </div>
    </div>
  );
}
