import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { QuoteModalButton } from "@/components/QuoteModal";
import { styleCount, type CatalogNode } from "@/lib/catalog";
import { cn } from "@/lib/utils";

/**
 * A family as a large tile on aluminium: its name, one line and its count up
 * top, the cut-out filling the space beneath. The whole tile opens the family.
 */
export default function FamilyTile({ family, className }: { family: CatalogNode; className?: string }) {
  const cutout = family.defaults?.cutout;
  return (
    <article
      className={cn(
        "group relative flex h-[26rem] flex-col overflow-hidden rounded-[2rem] bg-muted p-8 md:p-10",
        className,
      )}
    >
      <h3 className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em]">
        <Link href={family.href} className="after:absolute after:inset-0 after:rounded-[2rem]">
          {family.title}
        </Link>
      </h3>
      {family.tagline && <p className="mt-2 max-w-[24rem] text-[1.0625rem] text-muted-foreground">{family.tagline}</p>}
      {/* Sits above the tile link but lets clicks through, except on the quote button. */}
      <div className="pointer-events-none relative z-10 mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <span className="inline-flex items-center gap-0.5 text-[1.0625rem] text-primary group-hover:underline">
          Explore {styleCount(family.products.length)}
          <ChevronRight className="size-4" aria-hidden />
        </span>
        <QuoteModalButton
          product={family.title}
          variant="link"
          size="sm"
          className="pointer-events-auto h-auto px-0 text-[1.0625rem]"
          text="Request a quote"
        />
      </div>
      {cutout && (
        <div className="pointer-events-none absolute inset-x-[-5%] bottom-[4%] top-[13.5rem]">
          <Image
            src={cutout.src}
            alt=""
            width={cutout.width}
            height={cutout.height}
            // Hand-made alpha cut-out; the optimiser would flatten it.
            unoptimized
            className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_24px_rgba(15,15,20,0.14)] transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
          />
        </div>
      )}
    </article>
  );
}
