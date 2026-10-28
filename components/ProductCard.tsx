import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { QuoteModalButton } from "@/components/QuoteModal";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    slug: { current: string };
    images: any[];
    category: { title: string } | null;
    isFeatured?: boolean;
    excerpt?: string | null;
    specifications?: { label: string | null; value: string | null }[] | null;
    /** Pixel width of the lead photo; small ones are placeholders. */
    leadWidth?: number | null;
  };
  /** Prioritise the image (first tiles above the fold). */
  priority?: boolean;
  /** A studio render to show in place of a placeholder photo, such as the family cut-out. */
  fallback?: { src: string; width: number; height: number };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * A product shown the way a maker shows an object: borderless tile on the
 * aluminium ground, the photo filling it, the name underneath, and one quote
 * action that already knows which product it is about.
 */
export default function ProductCard({ product, priority = false, fallback }: ProductCardProps) {
  const image = product.images?.[0];
  const placeholder = Boolean(fallback) && product.leadWidth != null && product.leadWidth < 1000;
  const productUrl = `/product/${product.slug.current}`;

  // Up to three spec values as one quiet attribute line.
  const attrs = (product.specifications ?? [])
    .filter((s) => s?.value)
    .slice(0, 3)
    .map((s) => cap(s.value as string));

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
        {placeholder && fallback ? (
          <Image
            src={fallback.src}
            alt=""
            fill
            // Hand-made alpha cut-out; the optimiser would flatten it.
            unoptimized
            className="object-contain p-6 drop-shadow-[0_18px_24px_rgba(15,15,20,0.14)] transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
          />
        ) : image ? (
          <Image
            src={urlFor(image).width(800).height(800).fit("crop").url()}
            alt={product.title}
            fill
            preload={priority}
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Photo coming soon
          </div>
        )}
        {product.isFeatured && (
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium backdrop-blur">
            Featured
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <h3 className="text-[1.1875rem] font-semibold leading-snug tracking-[-0.02em]">
          {/* The title link covers the whole tile; the quote link sits above it. */}
          <Link href={productUrl} className="after:absolute after:inset-0 after:rounded-3xl">
            {product.title}
          </Link>
        </h3>
        {attrs.length > 0 && (
          // One line only: a value that wraps is hidden whole, separator and all.
          <p className="mt-1 flex h-[1.4em] flex-wrap gap-x-1.5 overflow-hidden text-[0.9375rem] leading-[1.4] text-muted-foreground">
            {attrs.map((attr, i) => (
              <span key={i} className={i ? "before:mr-1.5 before:content-['·']" : undefined}>
                {attr}
              </span>
            ))}
          </p>
        )}
        <div className="relative z-10 mt-auto pt-3">
          <QuoteModalButton
            product={product.title}
            variant="link"
            size="sm"
            className="h-auto px-0 text-[0.9375rem]"
            text="Request a quote"
          />
        </div>
      </div>
    </article>
  );
}
