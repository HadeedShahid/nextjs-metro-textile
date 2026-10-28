import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { QuoteModalButton } from "@/components/QuoteModal";
import { urlFor } from "@/sanity/image";
import { leadProduct, runningName, styleCount, type CatalogNode } from "@/lib/catalog";

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
      <div className="container-x grid items-center gap-10 pb-14 pt-12 md:grid-cols-[1fr_1fr] md:gap-12 md:pb-20 md:pt-16">
        <div>
          <h1 id="type-title" className="text-display text-balance">
            {type.title}
          </h1>
          {type.tagline && <p className="text-lede mt-4 max-w-lg text-muted-foreground">{type.tagline}</p>}
          {type.products.length > 0 && (
            <p className="mt-3 text-[0.9375rem] text-muted-foreground">{styleCount(type.products.length)}</p>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <QuoteModalButton product={type.title} size="lg" text="Request a quote" />
            {family && (
              <Link
                href={family.href}
                className="group inline-flex items-center gap-0.5 text-[1.0625rem] text-primary hover:underline"
              >
                All {runningName(family.title)}
                <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
              </Link>
            )}
          </div>
        </div>
        {own ? (
          <div className="strike-on-load relative aspect-square overflow-hidden rounded-[2rem]">
            <Image
              src={urlFor(own).width(1200).height(1200).fit("crop").url()}
              alt={ownAlt ?? ""}
              fill
              preload
              sizes="(min-width: 768px) 45vw, 92vw"
              className="object-cover"
            />
          </div>
        ) : (
          cutout && (
            // Runs a little past the column on phones, like the family hero.
            <div className="strike-on-load mx-[-6%] w-[112%] md:mx-0 md:w-[118%]">
              <Image
                src={cutout.src}
                alt={cutout.alt}
                width={cutout.width}
                height={cutout.height}
                preload
                // Hand-made alpha cut-out; the optimiser would flatten it.
                unoptimized
                className="h-auto w-full drop-shadow-[0_18px_24px_rgba(15,15,20,0.14)]"
              />
            </div>
          )
        )}
      </div>
    </section>
  );
}
