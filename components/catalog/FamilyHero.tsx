import Image from "next/image";
import { QuoteModalButton } from "@/components/QuoteModal";
import { urlFor } from "@/sanity/image";
import { styleCount, type CatalogNode } from "@/lib/catalog";
import MoreLink from "@/components/base/MoreLink";

/**
 * A family's opening: its name, one line, its count and the quote action on
 * the left, and the family's render beside them.
 */
export default function FamilyHero({ family }: { family: CatalogNode }) {
  const custom = family.category.heroImage?.asset ? family.category.heroImage : null;
  const cutout = family.defaults?.cutout;

  return (
    <section aria-labelledby="family-title" className="overflow-hidden bg-muted">
      <div className="container-x grid items-center gap-6 py-8 md:grid-cols-[1.2fr_1fr] md:gap-10 md:py-10">
        <div>
          <h1 id="family-title" className="text-display">
            {family.title}
          </h1>
          {family.tagline && <p className="text-lede mt-3 max-w-lg text-muted-foreground">{family.tagline}</p>}
          {family.products.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">{styleCount(family.products.length)}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <QuoteModalButton product={family.title} size="lg" text="Request a quote" />
            <MoreLink href="#styles">See every style</MoreLink>
          </div>
        </div>

        <div className="strike-on-load">
          {custom ? (
            <div className="relative aspect-[16/9]">
              <Image
                src={urlFor(custom).width(1200).auto("format").url()}
                alt={custom.alt ?? ""}
                fill
                preload
                sizes="(min-width: 768px) 30rem, 100vw"
                className="object-contain"
              />
            </div>
          ) : (
            cutout && (
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
            )
          )}
        </div>
      </div>
    </section>
  );
}
