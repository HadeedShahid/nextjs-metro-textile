import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { QuoteModalButton } from "@/components/QuoteModal";
import { urlFor } from "@/sanity/image";
import type { CatalogNode } from "@/lib/catalog";

/**
 * A family's stage: its name at display scale, one line, the quote action,
 * and the family's render running wide beneath at studio scale.
 */
export default function FamilyHero({ family }: { family: CatalogNode }) {
  const custom = family.category.heroImage?.asset ? family.category.heroImage : null;
  const cutout = family.defaults?.cutout;

  return (
    <section aria-labelledby="family-title" className="overflow-hidden bg-muted pb-14 md:pb-20">
      <div className="container-x flex flex-col items-center pt-14 text-center md:pt-20">
        <h1 id="family-title" className="text-display">
          {family.title}
        </h1>
        {family.tagline && (
          <p className="text-lede mt-4 max-w-xl text-balance text-muted-foreground">{family.tagline}</p>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <QuoteModalButton product={family.title} size="lg" text="Request a quote" />
          <Link
            href="#styles"
            className="group inline-flex items-center gap-0.5 text-[1.0625rem] text-primary hover:underline"
          >
            See every style
            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>

      {/* On phones the render runs a little past both edges, so it keeps its studio scale. */}
      <div className="strike-on-load mx-[-6%] mt-10 w-[112%] md:mx-auto md:mt-14 md:w-[min(100%-4rem,62rem)]">
        {custom ? (
          <div className="relative aspect-[16/7]">
            <Image
              src={urlFor(custom).width(2000).auto("format").url()}
              alt={custom.alt ?? ""}
              fill
              preload
              sizes="(min-width: 1024px) 62rem, 100vw"
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
              className="h-auto w-full drop-shadow-[0_18px_24px_rgba(15,15,20,0.14)]"
            />
          )
        )}
      </div>
    </section>
  );
}
