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
      className={cn("scroll-mt-[var(--nav-h)] py-24 md:py-32", className)}
    >
      <SectionIntro id={`${id ?? "styles"}-title`} className="container-x mb-10 md:mb-14" title={title} lede={lede} />
      <ul className="container-x grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
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
    // Compact tiles span the row on phones, so they only turn square beside four-up product tiles.
    <div
      className={cn(
        "flex flex-col justify-end rounded-3xl bg-muted p-7 md:p-8",
        compact ? "lg:aspect-square" : "aspect-square",
      )}
    >
      <h3 className={cn("font-semibold tracking-[-0.02em]", compact ? "text-[1.1875rem]" : "text-title")}>
        Not in the catalog?
      </h3>
      <p className="mt-2 max-w-[20rem] text-[0.9375rem] text-muted-foreground">
        Send a drawing, tech pack or sample and we&apos;ll quote it to your spec.
      </p>
      <div className="mt-5">
        <QuoteModalButton product={quoteFor} size="default" text="Request a quote" />
      </div>
    </div>
  );
}
