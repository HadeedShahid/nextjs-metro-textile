import { getImageProps } from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { QuoteModalButton } from "@/components/QuoteModal";

const ALT =
  "Metro Metal hardware: a brass zipper on denim tape, an engraved plate, a shank button, a leather patch and a roller buckle";

/**
 * First viewport: the studio render with the statement in its clear field.
 *
 * One art-directed <picture> serves the portrait render to phones and the
 * landscape render from tablet up, so each device downloads one image. On
 * phones and tablets the copy sits above the objects; from 1280px it overlays
 * the empty left field of the full-bleed render. The render settles into focus
 * once on load (the strike) and is visible from the first frame.
 */
export default function HomeHero() {
  const common = { alt: ALT, sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
  const {
    props: { srcSet: landscape },
  } = getImageProps({ ...common, src: "/assets/home/hero-desktop.webp", width: 3168, height: 1344 });
  const {
    props: { srcSet: portrait, ...img },
  } = getImageProps({ ...common, src: "/assets/home/hero-mobile.webp", width: 1536, height: 2400 });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-muted xl:flex xl:aspect-[3168/1344] xl:max-h-[calc(100svh-var(--nav-h))] xl:items-center"
    >
      <div className="relative z-10 px-5 pt-12 md:px-8 md:pt-16 xl:w-full xl:pl-[5vw] xl:pr-0 xl:pt-0">
        <div className="mx-auto flex max-w-[75rem] flex-col items-start xl:mx-0 xl:max-w-[34vw]">
          <h1
            id="hero-title"
            className="max-w-[11ch] text-[clamp(2.75rem,6.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] xl:max-w-none xl:text-[clamp(3.5rem,5.6vw,6rem)]"
          >
            Hardware, made to your mark.
          </h1>
          <p className="mt-5 max-w-[30rem] text-[clamp(1.125rem,1.45vw,1.3125rem)] leading-[1.42] tracking-[-0.015em] text-[#55555a] xl:max-w-[28vw]">
            Zippers, buttons, buckles, patches and plates for apparel and leather
            brands, sampled and produced to your spec.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <QuoteModalButton size="lg" text="Request a quote" />
            <Link
              href="/products"
              className="group inline-flex items-center gap-0.5 text-[1.0625rem] text-primary hover:underline"
            >
              Explore products
              <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Below xl the render sits under the copy; its top edge fades into the ground so no seam shows. */}
      <picture className="relative -mt-[80vw] block aspect-[1536/2400] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_22%)] md:mt-6 md:aspect-[16/9] xl:absolute xl:inset-0 xl:mt-0 xl:aspect-auto xl:[mask-image:none]">
        <source media="(min-width: 768px)" srcSet={landscape} />
        <img
          {...img}
          srcSet={portrait}
          alt={ALT}
          className="strike-on-load absolute inset-0 h-full w-full object-cover object-bottom md:object-right"
        />
      </picture>
    </section>
  );
}
