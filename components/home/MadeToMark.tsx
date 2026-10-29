import Image from "next/image";
import SectionIntro from "@/components/base/SectionIntro";
import { cn } from "@/lib/utils";

const PIECES: Array<{
  src: string;
  alt: string;
  ground: string;
  title: string;
  line?: string;
  strike?: boolean;
}> = [
  {
    src: "/assets/home/landing-badge.webp",
    alt: "A gold-finish metal plate with an embossed walking bull",
    ground: "bg-[#c4c5c2]",
    title: "Embossed, debossed or engraved.",
    line: "Your logo, struck into the metal.",
    strike: true,
  },
  {
    src: "/assets/home/landing-zipper.webp",
    alt: "A nickel-finish metal zipper with a polished puller on black fabric",
    ground: "bg-[#ccd0d0]",
    title: "Built to your tech pack.",
  },
  {
    src: "/assets/home/landing-buckle.webp",
    alt: "Six polished nickel roller and prong buckles",
    ground: "bg-[#cfcfcf]",
    title: "Your finish, your plating.",
  },
];

/**
 * The struck object. Three studio shots side by side, each captioned with
 * what can be specified. The embossed plate is the one image that reprises the
 * strike motion as it scrolls into view; the other two stay still.
 */
export default function MadeToMark() {
  return (
    <section aria-labelledby="mark-title" className="bg-muted py-10 md:py-14 lg:py-16">
      <div className="container-x">
        <SectionIntro
          id="mark-title"
          className="mb-5 md:mb-6"
          title="Made to your mark."
          lede="Send artwork, a tech pack or a reference sample. We emboss, deboss or engrave your logo and match the finish and plating you specify."
        />

        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-3">
          {PIECES.map((piece) => (
            <figure key={piece.src}>
              <div className={cn("relative aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[4/3]", piece.ground)}>
                <Image
                  src={piece.src}
                  alt={piece.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 24rem"
                  className={cn("object-cover", piece.strike && "strike-on-view")}
                />
              </div>
              <figcaption className="mt-3">
                <p className="text-base font-semibold tracking-[-0.01em]">{piece.title}</p>
                {piece.line && <p className="text-sm text-muted-foreground">{piece.line}</p>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
