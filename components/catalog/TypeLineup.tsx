import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SectionIntro from "@/components/base/SectionIntro";
import { QuoteModalButton } from "@/components/QuoteModal";
import { urlFor } from "@/sanity/image";
import { leadProduct, styleCount, type CatalogNode } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface TypeLineupProps {
  title: string;
  lede?: string;
  types: CatalogNode[];
  className?: string;
}

/**
 * The types inside a family as large photo tiles: what each one is, how many
 * styles it holds, and the two ways forward, explore or quote.
 */
export default function TypeLineup({ title, lede, types, className }: TypeLineupProps) {
  return (
    <section aria-labelledby="types-title" className={cn("py-24 md:py-32", className)}>
      <SectionIntro id="types-title" className="container-x mb-10 md:mb-14" title={title} lede={lede} />
      <ul
        className={cn(
          "container-x grid gap-5 md:gap-6",
          types.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : types.length === 2 && "md:grid-cols-2",
        )}
      >
        {types.map((type) => {
          // The type's own image from Sanity, else a cleared catalog photo, else the family render.
          const own = type.category.heroImage?.asset ? type.category.heroImage : null;
          const photo = own ?? leadProduct(type)?.images?.[0];
          const cutout = type.parent?.defaults?.cutout;
          return (
            <li key={type.id} className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-muted">
              <div className="relative aspect-[4/3] overflow-hidden">
                {photo ? (
                  <Image
                    src={urlFor(photo).width(1000).height(750).fit("crop").url()}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 24rem, (min-width: 768px) 46vw, 92vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
                  />
                ) : (
                  cutout && (
                    <Image
                      src={cutout.src}
                      alt=""
                      fill
                      // Hand-made alpha cut-out; the optimiser would flatten it.
                      unoptimized
                      className="object-contain px-6 pt-8 drop-shadow-[0_18px_24px_rgba(15,15,20,0.14)] transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
                    />
                  )
                )}
              </div>
              <div className="flex flex-1 flex-col px-8 pb-8 pt-7 md:px-9 md:pb-9">
                <h3 className="text-title">
                  <Link href={type.href} className="after:absolute after:inset-0 after:rounded-[2rem]">
                    {type.title}
                  </Link>
                </h3>
                {type.tagline && <p className="mt-2 text-[1.0625rem] text-muted-foreground">{type.tagline}</p>}
                <p className="mt-3 text-[0.9375rem] text-muted-foreground">{styleCount(type.products.length)}</p>
                {/* Sits above the tile link but lets clicks through, except on the quote button. */}
                <div className="pointer-events-none relative z-10 mt-auto flex items-center gap-6 pt-6">
                  <span className="inline-flex items-center gap-0.5 text-[1.0625rem] text-primary group-hover:underline">
                    Explore
                    <ChevronRight className="size-4" aria-hidden />
                  </span>
                  <QuoteModalButton
                    product={type.title}
                    variant="link"
                    size="sm"
                    className="pointer-events-auto h-auto px-0 text-[1.0625rem]"
                    text="Request a quote"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
