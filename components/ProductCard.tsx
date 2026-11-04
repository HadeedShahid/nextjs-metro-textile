import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { QuoteModalButton } from "@/components/QuoteModal";
import { hasPlaceholderPhoto } from "@/lib/catalog";
import type { SanityImage } from "@/lib/api";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    slug: { current: string };
    images: SanityImage[];
    category: { title: string } | null;
    /** Pixel width of the lead photo; small ones are placeholders. */
    leadWidth?: number | null;
  };
  /** The type the product is filed under; defaults to its category's name. */
  typeLabel?: string | null;
  /** Prioritise the image (first tiles above the fold). */
  priority?: boolean;
  /** A studio render to show in place of a placeholder photo, such as the family cut-out. */
  fallback?: { src: string; width: number; height: number } | null;
}

/**
 * A catalogue card: the photo in a square grey well, the name and its type,
 * and a quote button that already knows which product it is about. The whole
 * card opens the product; the button sits above that link.
 */
export default function ProductCard({ product, typeLabel, priority = false, fallback }: ProductCardProps) {
  const image = product.images?.[0];
  const placeholder = Boolean(fallback) && hasPlaceholderPhoto(product);
  const productUrl = `/product/${product.slug.current}`;
  const label = typeLabel ?? product.category?.title;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-foreground/20 hover:shadow-[0_4px_16px_rgb(0_0_0/0.07)]">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {placeholder && fallback ? (
          <Image
            src={fallback.src}
            alt=""
            fill
            // Hand-made alpha cut-out; the optimiser would flatten it.
            unoptimized
            className="object-contain p-4"
          />
        ) : image ? (
          <Image
            src={urlFor(image).width(600).height(600).fit("crop").url()}
            alt={product.title}
            fill
            preload={priority}
            sizes="(max-width: 640px) 48vw, (max-width: 1024px) 32vw, 18rem"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Photo coming soon
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h3 className="text-sm font-semibold leading-snug sm:text-[0.9375rem]">
          <Link href={productUrl} className="after:absolute after:inset-0">
            {product.title}
          </Link>
        </h3>
        {label && <p className="text-meta mt-0.5 text-muted-foreground">{label}</p>}
        <div className="relative z-10 mt-auto pt-3">
          <QuoteModalButton product={product.title} variant="outline" size="sm" className="h-9 w-full" text="Request a quote" />
        </div>
      </div>
    </article>
  );
}
