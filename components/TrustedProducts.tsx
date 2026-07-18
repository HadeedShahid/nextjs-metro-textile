import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "./base/Section";
import EmblaCarouselWrapper from "./emblaCarousel/EmblaCarouselWrapper";
import { fetchParentCategories } from "@/lib/api";
import { urlFor } from "@/sanity/image";

const FALLBACK_IMAGE = "/assets/landing-card-1.png";

export default async function TrustedProducts() {
  const { data: categories } = await fetchParentCategories();
  const safeCategories = categories ?? [];

  if (safeCategories.length === 0) return null;

  return (
    <Section eyebrow="What we make" title="Product Catalog">
      <EmblaCarouselWrapper
        options={{ align: "start", containScroll: "trimSnaps", dragFree: true }}
        containerClassName="gap-4 md:gap-6"
        slideClassName="basis-[70%] sm:basis-[38%] lg:basis-[24%]"
      >
        {safeCategories.map((cat) => {
          const imgUrl = cat.image
            ? urlFor(cat.image).width(600).height(800).url()
            : FALLBACK_IMAGE;

          return (
            <article
              key={cat.slug}
              className="group relative aspect-[4/5] h-full overflow-hidden rounded-lg border border-slate-200 shadow-sm transition-shadow duration-200 hover:shadow-lg"
            >
              <Image
                src={imgUrl}
                alt={cat.title}
                fill
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 38vw, 24vw"
                className="object-cover"
              />

              {/* Scrim only at the base — keeps the photo bright, text readable */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

              {cat.productCount > 0 && (
                <span className="absolute right-3 top-3 rounded-md bg-slate-900/85 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md">
                  {cat.productCount} product{cat.productCount === 1 ? "" : "s"}
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-4">
                {cat.subcategories.length > 0 && (
                  <div className="mb-2.5 flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/products/${cat.slug}/${sub.slug}`}
                        className="relative z-10 rounded bg-white/15 px-2 py-0.5 text-[11px] font-medium text-white transition-colors hover:bg-white hover:text-slate-900"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xl font-semibold text-white">
                    {/* Overlay link — makes the whole card click through to the category */}
                    <Link
                      href={`/products/${cat.slug}`}
                      className="after:absolute after:inset-0"
                    >
                      {cat.title}
                    </Link>
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-white transition-colors group-hover:bg-white group-hover:text-slate-900"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </EmblaCarouselWrapper>
    </Section>
  );
}
