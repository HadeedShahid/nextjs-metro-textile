import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { Button } from "@/components/ui/button";
import { QuoteModalButton } from "@/components/QuoteModal";
import ShowcaseRail from "@/components/home/ShowcaseRail";
import { hasPlaceholderPhoto, styleCount, type CatalogItem } from "@/lib/catalog";

export type ShowcaseRow = {
  title: string;
  slug: string;
  href: string;
  /** Every style in the family, not just the ones shown. */
  count: number;
  items: CatalogItem[];
};

/**
 * One carousel per family, so the home page never mixes buckles with buttons:
 * one header line (the family's name and style count, then "View all" and the
 * arrows on the right), then a row of photo-led cards that scrolls sideways.
 */
export default function Showcase({ rows }: { rows: ShowcaseRow[] }) {
  if (rows.length === 0) return null;

  return (
    <div className="border-t border-border py-10 md:py-14">
      <div className="container-x space-y-10 md:space-y-14">
        {rows.map((row) => (
          <section key={row.slug} aria-labelledby={`showcase-${row.slug}`}>
            <ShowcaseRail
              label={row.title}
              heading={
                <div className="flex min-w-0 items-baseline gap-2">
                  <h2 id={`showcase-${row.slug}`} className="text-headline">
                    {row.title}
                  </h2>
                  <span className="text-meta whitespace-nowrap text-muted-foreground sm:text-sm">
                    {styleCount(row.count)}
                  </span>
                </div>
              }
              viewAll={
                <Button href={row.href} variant="outline" className="gap-1 pr-3.5">
                  View all<span className="sr-only"> {row.title.toLowerCase()}</span>
                  <ChevronRight aria-hidden />
                </Button>
              }
            >
              {row.items.map((item) => (
                <ShowcaseCard key={item.product._id} item={item} />
              ))}
            </ShowcaseRail>
          </section>
        ))}
      </div>
    </div>
  );
}

/** A photo-led card: the photo in a square grey well, the name and type, then a quiet quote link. */
function ShowcaseCard({ item }: { item: CatalogItem }) {
  const { product, typeLabel, fallback } = item;
  const image = product.images?.[0];
  const placeholder = Boolean(fallback) && hasPlaceholderPhoto(product);
  const href = `/product/${product.slug.current}`;

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        {placeholder && fallback ? (
          <Image
            src={fallback.src}
            alt=""
            fill
            // Hand-made alpha cut-out; the optimiser would flatten it.
            unoptimized
            className="object-contain p-6 transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : image ? (
          <Image
            src={urlFor(image).width(720).height(720).fit("crop").url()}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 42vw, 24rem"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col pt-3">
        <h3 className="text-[0.9375rem] font-semibold leading-snug sm:text-base">
          <Link href={href} className="after:absolute after:inset-0 group-hover:underline">
            {product.title}
          </Link>
        </h3>
        {typeLabel && <p className="text-meta mt-0.5 text-muted-foreground">{typeLabel}</p>}
        <div className="relative z-10 mt-auto">
          <QuoteModalButton
            product={product.title}
            variant="link"
            size="sm"
            className="h-10 px-0 text-[0.875rem]"
            text="Request a quote"
          />
        </div>
      </div>
    </article>
  );
}
