import Image from "next/image";
import SectionIntro from "@/components/base/SectionIntro";

/**
 * The struck object. The embossed plate is the one image that reprises the
 * strike motion as it scrolls into view; the two details beside it stay still.
 */
export default function MadeToMark() {
  return (
    <section aria-labelledby="mark-title" className="bg-muted py-24 md:py-32">
      <div className="container-x">
        <SectionIntro
          id="mark-title"
          align="center"
          className="mb-12 md:mb-16"
          title="Made to your mark."
          lede="Send artwork, a tech pack or a reference sample. We emboss, deboss or engrave your logo and match the finish and plating you specify."
        />

        <div className="grid gap-4 md:grid-cols-[1.35fr_1fr] md:gap-5">
          <figure className="relative overflow-hidden rounded-[2rem] bg-[#c4c5c2]">
            <div className="relative aspect-[4/5] md:aspect-auto md:h-full md:min-h-[40rem]">
              <Image
                src="/assets/home/landing-badge.webp"
                alt="A gold-finish metal plate with an embossed walking bull"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                className="strike-on-view object-cover"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 p-7 md:p-9">
              <p className="text-[clamp(1.375rem,2vw,1.75rem)] font-semibold leading-tight tracking-[-0.02em]">
                Embossed, debossed or engraved.
              </p>
              <p className="mt-1 text-[1.0625rem] text-[#3a3a3e]">Your logo, struck into the metal.</p>
            </figcaption>
          </figure>

          <div className="grid gap-4 md:gap-5">
            <figure className="relative overflow-hidden rounded-[2rem] bg-[#ccd0d0]">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[19.5rem]">
                <Image
                  src="/assets/home/landing-zipper.webp"
                  alt="A nickel-finish metal zipper with a polished puller on black fabric"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              {/* The zipper sits on black cloth, so this caption reads light on a dark scrim. */}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-7 pt-16">
                <p className="text-[1.3125rem] font-semibold tracking-[-0.02em] text-white">Built to your tech pack.</p>
              </figcaption>
            </figure>
            <figure className="relative overflow-hidden rounded-[2rem] bg-[#cfcfcf]">
              <div className="relative aspect-[4/3] md:aspect-auto md:h-full md:min-h-[19.5rem]">
                <Image
                  src="/assets/home/landing-buckle.webp"
                  alt="Six polished nickel roller and prong buckles"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-[1.3125rem] font-semibold tracking-[-0.02em]">Your finish, your plating.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
