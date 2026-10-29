import { getImageProps } from "next/image";
import { QuoteModalButton } from "@/components/QuoteModal";
import MoreLink from "@/components/base/MoreLink";

const ALT =
  "Metro Metal hardware: a brass zipper on denim tape, an engraved plate, a shank button, a leather patch and a roller buckle";

/**
 * First viewport: the statement beside the studio render, kept short so the
 * product families show just below it.
 *
 * One art-directed <picture> serves the portrait render to phones and the
 * landscape render from tablet up, so each device downloads one image. On
 * phones the copy sits above the objects. On tablets the render sits right,
 * tucked up beside the actions, its empty left field faded out. From 1024px it
 * anchors to the right edge at the band's height, so the copy sits on clear
 * ground. The render settles into focus once on load
 * (the strike) and is visible from the first frame.
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
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-muted lg:h-[26rem] xl:h-[30rem]">
      <div className="container-x relative z-10 pt-10 md:pt-12 lg:flex lg:h-full lg:items-center lg:pt-0">
        <div className="flex max-w-[30rem] flex-col items-start lg:max-w-[23rem] xl:max-w-[27rem]">
          <h1 id="hero-title" className="text-display">
            Hardware, made to your mark.
          </h1>
          <p className="text-lede mt-3 text-muted-foreground">
            Zippers, buttons, buckles, patches and plates for apparel and leather
            brands, sampled and produced to your spec.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <QuoteModalButton size="lg" text="Request a quote" />
            <MoreLink href="/products">Explore products</MoreLink>
          </div>
        </div>
      </div>

      <picture className="relative mt-4 block aspect-[1536/960] w-full overflow-hidden md:-mt-20 md:ml-auto md:aspect-[3168/1344] md:w-[78%] md:mask-l-from-70% md:mask-t-from-82% lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-full lg:w-auto lg:mask-l-from-86% lg:mask-t-from-100%">
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
