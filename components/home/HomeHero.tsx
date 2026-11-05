import Link from "next/link";
import { getImageProps } from "next/image";
import { ArrowRight } from "lucide-react";
import HeroSearch, { type SearchSuggestion } from "@/components/home/HeroSearch";
import { QuoteModalButton } from "@/components/QuoteModal";

const ALT =
  "Metro Metal hardware: a brass zipper on denim tape, an engraved plate, a shank button, a leather patch and a roller buckle";

/**
 * A traditional hero, kept short: the title, one line on what Metro Metal
 * makes, the product search with suggestions, and the quote action, beside
 * the studio render of the hardware.
 *
 * One <picture> serves the portrait render to phones and the landscape one
 * from 768px, so each device downloads one image. The band is the render's
 * own ground (#f5f4f9), and the render fades into it at its edges. Phones get
 * the render under the copy; tablets tuck it up at the right, beside the
 * actions. From 1024px it anchors to the band's right edge at the band's
 * height (24rem, 26rem from 1280px), so its empty left field sits under the
 * text and the hardware stays clear of it.
 */
export default function HomeHero({ categories, products }: { categories: SearchSuggestion[]; products: SearchSuggestion[] }) {
  const common = { alt: ALT, sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
  const {
    props: { srcSet: landscape },
  } = getImageProps({ ...common, src: "/assets/home/hero-desktop.webp", width: 3168, height: 1344 });
  const {
    props: { srcSet: portrait, ...img },
  } = getImageProps({ ...common, src: "/assets/home/hero-mobile.webp", width: 1536, height: 2400 });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-[#f5f4f9] lg:h-[24rem] xl:h-[26rem]">
      <div className="container-x relative z-10 pt-8 md:pt-12 lg:flex lg:h-full lg:items-center lg:pt-0">
        <div className="max-w-[30rem] lg:max-w-[25rem] xl:max-w-[29rem]">
          <h1 id="hero-title" className="text-hero">
            Garment accessories, made to your logo.
          </h1>
          <p className="text-lede mt-3 text-muted-foreground">
            Buckles, buttons, patches, plates and zippers, made across Pakistan, China and Hong Kong.
          </p>

          <div className="mt-5 md:mt-6">
            <HeroSearch categories={categories} products={products} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <QuoteModalButton size="default" text="Request a quote" />
            <Link href="/products" className="inline-flex min-h-10 items-center gap-1 text-[0.9375rem] text-primary hover:underline">
              Browse all products <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>

      <picture className="relative mt-4 block aspect-[1536/1100] w-full overflow-hidden mask-t-from-85% md:-mt-16 md:ml-auto md:aspect-[3168/1344] md:w-[72%] md:mask-l-from-70% md:mask-t-from-80% lg:absolute lg:inset-y-0 lg:-right-16 lg:mt-0 lg:h-full lg:w-auto lg:mask-l-from-85% lg:mask-t-from-100% xl:right-0">
        <source media="(min-width: 768px)" srcSet={landscape} />
        <img {...img} srcSet={portrait} alt={ALT} className="absolute inset-0 h-full w-full object-cover object-bottom md:object-right" />
      </picture>
    </section>
  );
}
