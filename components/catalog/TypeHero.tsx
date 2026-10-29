import Image from "next/image";
import { QuoteModalButton } from "@/components/QuoteModal";
import { urlFor } from "@/sanity/image";
import { leadProduct, runningName, styleCount, type CatalogNode } from "@/lib/catalog";
import MoreLink from "@/components/base/MoreLink";

/**
 * A type's opening inside its family: the name, one line, the quote action,
 * and beside them the type itself: its own image from Sanity, else a cleared
 * catalog photo of it, else the family's studio render.
 */
export default function TypeHero({ type }: { type: CatalogNode }) {
  const lead = leadProduct(type);
  const own = type.category.heroImage?.asset ? type.category.heroImage : (lead?.images?.[0] ?? null);
  const ownAlt = type.category.heroImage?.asset ? type.category.heroImage.alt : lead?.title;
  const family = type.parent;
  const cutout = family?.defaults?.cutout;

  return (
    <section aria-labelledby="type-title" className="overflow-hidden bg-muted">
      <div className="container-x grid items-center gap-6 py-8 md:grid-cols-[1.2fr_1fr] md:gap-10 md:py-10">
        <div>
          <h1 id="type-title" className="text-display text-balance">
            {type.title}
          </h1>
          {type.tagline && <p className="text-lede mt-3 max-w-lg text-muted-foreground">{type.tagline}</p>}
          {type.products.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">{styleCount(type.products.length)}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <QuoteModalButton product={type.title} size="lg" text="Request a quote" />
            {family && (
              <MoreLink href={family.href}>All {runningName(family.title)}</MoreLink>
            )}
          </div>
        </div>
        {own ? (
          <div className="strike-on-load relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={urlFor(own).width(1000).height(750).fit("crop").url()}
              alt={ownAlt ?? ""}
              fill
              preload
              sizes="(min-width: 768px) 30rem, 92vw"
              className="object-cover"
            />
          </div>
        ) : (
          cutout && (
            <div className="strike-on-load">
              <Image
                src={cutout.src}
                alt={cutout.alt}
                width={cutout.width}
                height={cutout.height}
                preload
                // Hand-made alpha cut-out; the optimiser would flatten it.
                unoptimized
                className="h-auto w-full drop-shadow-[0_12px_18px_rgba(15,15,20,0.14)]"
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}
