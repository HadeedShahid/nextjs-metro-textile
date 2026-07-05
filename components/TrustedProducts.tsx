import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        slideClassName="basis-[75%] sm:basis-[40%] lg:basis-[24%]"
      >
        {safeCategories.map((cat) => {
          const imgUrl = cat.image
            ? urlFor(cat.image).width(640).height(480).url()
            : FALLBACK_IMAGE;

          return (
            <article
              key={cat.slug}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-[#f6f3f7]">
                <Image
                  src={imgUrl}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 75vw, (max-width: 1024px) 40vw, 24vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold leading-snug text-slate-900">
                  {/* Overlay link — the whole card clicks through to the category */}
                  <Link
                    href={`/products/${cat.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    {cat.title}
                  </Link>
                </h3>

                {cat.subcategories.length > 0 && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/products/${cat.slug}/${sub.slug}`}
                        className="relative z-10 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3.5">
                  <span className="text-xs text-slate-500">
                    {cat.productCount > 0
                      ? `${cat.productCount} product${cat.productCount === 1 ? "" : "s"}`
                      : "View range"}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-primary">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
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
