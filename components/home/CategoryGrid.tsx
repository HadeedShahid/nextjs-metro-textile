import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionIntro from "@/components/base/SectionIntro";
import { QuoteModalButton } from "@/components/QuoteModal";
import { styleCount, typeName, type CatalogNode } from "@/lib/catalog";

/**
 * The product range as one tile per family: its studio cut-out in a grey
 * well, the name and count, one line on it, and its types as links, so a
 * buyer can go straight to Shank buttons from the home page. The sixth tile
 * covers everything not in the catalogue.
 */
export default function CategoryGrid({ families }: { families: CatalogNode[] }) {
  const stocked = families.filter((f) => f.products.length > 0);

  return (
    <section aria-labelledby="range-title" className="py-10 md:py-14">
      <div className="container-x">
        <SectionIntro
          id="range-title"
          title="Our product range"
          lede="Five families of hardware. Every piece can be made in your finish and with your logo."
          action={{ href: "/products", label: "Browse all products" }}
        />
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {stocked.map((family) => {
            const types = family.children.filter((c) => c.products.length > 0);
            const cutout = family.defaults?.cutout;
            return (
              <li key={family.id}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-[border-color,box-shadow] duration-200 hover:border-foreground/20 hover:shadow-[0_4px_16px_rgb(0_0_0/0.07)]">
                  <div className="relative aspect-[16/10] bg-muted">
                    {cutout && (
                      <Image
                        src={cutout.src}
                        alt={cutout.alt}
                        fill
                        // Hand-made alpha cut-out; the optimiser would flatten it.
                        unoptimized
                        className="object-contain p-3 transition-transform duration-300 ease-out group-hover:scale-[1.03] sm:p-5"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-3 sm:p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold sm:text-title">
                        <Link href={family.href} className="after:absolute after:inset-0">
                          {family.title}
                        </Link>
                      </h3>
                      <span className="text-meta shrink-0 tabular-nums text-muted-foreground">{styleCount(family.products.length)}</span>
                    </div>
                    {family.tagline && <p className="text-meta mt-1 text-muted-foreground sm:text-sm">{family.tagline}</p>}
                    {types.length >= 2 && (
                      <ul className="relative z-10 mt-2 flex flex-wrap gap-x-2.5 gap-y-1 text-[0.8125rem] sm:gap-x-3 sm:text-sm">
                        {types.map((type) => (
                          <li key={type.id}>
                            <Link href={type.href} className="inline-flex min-h-8 items-center text-primary hover:underline">
                              {typeName(type.title, family.title)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </article>
              </li>
            );
          })}
          <li>
            <div className="flex h-full flex-col justify-between gap-4 rounded-lg bg-muted p-4 sm:p-5">
              <div>
                <h3 className="text-base font-semibold sm:text-title">Something else?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Send a drawing, a tech pack or a sample and we&apos;ll quote it to your spec.
                </p>
              </div>
              <div className="flex flex-col items-start gap-1">
                <QuoteModalButton product="Custom hardware" size="default" className="w-full px-3 sm:w-auto sm:px-4" text="Request a quote" />
                <Link href="/products" className="hidden min-h-10 items-center gap-1 text-sm text-primary hover:underline sm:inline-flex">
                  Search the catalogue <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
