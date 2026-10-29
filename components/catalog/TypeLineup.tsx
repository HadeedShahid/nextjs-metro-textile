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
 * The types inside a family as photo tiles, all in one row: what each one is,
 * how many styles it holds, and the two ways forward, explore or quote.
 */
export default function TypeLineup({ title, lede, types, className }: TypeLineupProps) {
  return (
    <section aria-labelledby="types-title" className={cn("py-10 md:py-14 lg:py-16", className)}>
      <SectionIntro id="types-title" className="container-x mb-5 md:mb-6" title={title} lede={lede} />
      <ul
        className={cn(
          "container-x grid gap-3 sm:grid-cols-2 md:gap-4",
          types.length >= 3 && "md:grid-cols-3",
        )}
      >
        {types.map((type) => {
          // The type's own image from Sanity, else a cleared catalog photo, else the family render.
          const own = type.category.heroImage?.asset ? type.category.heroImage : null;
          const photo = own ?? leadProduct(type)?.images?.[0];
          const cutout = type.parent?.defaults?.cutout;
          return (
            // Phones: a compact row, picture beside the text. From 640px: a picture-led tile.
            <li key={type.id} className="group relative flex overflow-hidden rounded-2xl bg-muted sm:flex-col">
              <div
                className={cn(
                  "relative aspect-square w-28 shrink-0 overflow-hidden sm:aspect-[16/9] sm:w-auto",
                  types.length >= 3 && "sm:aspect-[4/3]",
                )}
              >
                {photo ? (
                  <Image
                    src={urlFor(photo).width(800).height(types.length >= 3 ? 600 : 450).fit("crop").url()}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 36rem, (min-width: 640px) 46vw, 7rem"
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
                      className="object-contain p-2 drop-shadow-[0_10px_14px_rgba(15,15,20,0.14)] transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
                    />
                  )
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-3 pb-0 sm:p-4 sm:pb-2 md:p-5 md:pb-3">
                <h3 className="text-title">
                  <Link href={type.href} className="after:absolute after:inset-0 after:rounded-2xl">
                    {type.title}
                  </Link>
                </h3>
                {type.tagline && <p className="text-meta mt-0.5 text-muted-foreground sm:mt-1 sm:text-sm">{type.tagline}</p>}
                <p className="text-meta mt-1 text-muted-foreground sm:mt-1.5 sm:text-sm">{styleCount(type.products.length)}</p>
                {/* Sits above the tile link but lets clicks through, except on the quote button. */}
                <div className="pointer-events-none relative z-10 mt-auto flex items-center gap-5 sm:pt-2">
                  <span className="hidden items-center gap-0.5 text-sm text-primary group-hover:underline sm:inline-flex">
                    Explore
                    <ChevronRight className="size-4" aria-hidden />
                  </span>
                  <QuoteModalButton
                    product={type.title}
                    variant="link"
                    size="sm"
                    className="pointer-events-auto h-10 px-0 text-sm"
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
