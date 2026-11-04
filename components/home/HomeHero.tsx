import Form from "next/form";
import { getImageProps } from "next/image";
import { ArrowRight, Search } from "lucide-react";
import { QuoteModalButton } from "@/components/QuoteModal";
import { Button } from "@/components/ui/button";

const ALT =
  "Metro Metal hardware: a brass zipper on denim tape, an engraved plate, a shank button, a leather patch and a roller buckle";

/**
 * A traditional hero: the headline, one line on what Metro Metal makes, a
 * product search that opens the catalogue, and the two actions, beside the
 * studio render of the hardware.
 *
 * One <picture> serves the portrait render to phones and the landscape one
 * from 768px, so each device downloads one image. The band is the render's
 * own ground (#f5f4f9), and the render fades into it at its edges. Phones get
 * the render under the copy; tablets tuck it up at the right, beside the
 * actions. From 1024px it anchors to the band's right edge at the
 * band's height (26rem, 30rem from 1280px), so its empty left field sits
 * under the text and the hardware stays clear of it.
 */
export default function HomeHero({ total }: { total: number }) {
  const common = { alt: ALT, sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
  const {
    props: { srcSet: landscape },
  } = getImageProps({ ...common, src: "/assets/home/hero-desktop.webp", width: 3168, height: 1344 });
  const {
    props: { srcSet: portrait, ...img },
  } = getImageProps({ ...common, src: "/assets/home/hero-mobile.webp", width: 1536, height: 2400 });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden bg-[#f5f4f9] lg:h-[26rem] xl:h-[30rem]">
      <div className="container-x relative z-10 pt-8 md:pt-12 lg:flex lg:h-full lg:items-center lg:pt-0">
        <div className="max-w-[34rem] lg:max-w-[25rem] xl:max-w-[29rem]">
          <h1 id="hero-title" className="text-hero">
            Garment and leather-goods accessories, made to your logo.
          </h1>
          <p className="text-lede mt-3 text-muted-foreground md:mt-4">
            Buckles, buttons, patches, plates and zippers for apparel and leather brands. Made across Pakistan, China
            and Hong Kong, and shipped worldwide.
          </p>

          {/* Searching opens the catalogue with the search already filled in. */}
          <Form action="/products" role="search" className="mt-5 flex max-w-md gap-2 md:mt-6">
            <label htmlFor="hero-search" className="sr-only">
              Search {total} products
            </label>
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder={`Search ${total} products`}
                autoComplete="off"
                className="h-11 w-full rounded-control border border-input bg-background pl-9 pr-3 text-[0.9375rem] placeholder:text-muted-foreground focus-visible:border-foreground [&::-webkit-search-cancel-button]:hidden"
              />
            </div>
            <Button type="submit" variant="ink" size="lg" className="px-5">
              Search
            </Button>
          </Form>

          {/* Side by side at every width: two equal halves on phones. */}
          <div className="mt-3 grid max-w-md grid-cols-2 gap-2 sm:flex sm:max-w-none sm:flex-wrap sm:items-center">
            <QuoteModalButton size="lg" className="px-4 sm:px-6" text="Request a quote" />
            <Button href="/products" variant="outline" size="lg" className="bg-background px-4 sm:px-6">
              Browse products <ArrowRight className="hidden sm:block" aria-hidden />
            </Button>
          </div>
        </div>
      </div>

      <picture className="relative mt-4 block aspect-[1536/1100] w-full overflow-hidden mask-t-from-85% md:-mt-16 md:ml-auto md:aspect-[3168/1344] md:w-[72%] md:mask-l-from-70% md:mask-t-from-80% lg:absolute lg:inset-y-0 lg:-right-16 xl:right-0 lg:mt-0 lg:h-full lg:w-auto lg:mask-l-from-85% lg:mask-t-from-100%">
        <source media="(min-width: 768px)" srcSet={landscape} />
        <img {...img} srcSet={portrait} alt={ALT} className="absolute inset-0 h-full w-full object-cover object-bottom md:object-right" />
      </picture>
    </section>
  );
}
