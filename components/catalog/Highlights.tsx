import Image from "next/image";
import Rail from "@/components/base/Rail";
import SectionIntro from "@/components/base/SectionIntro";
import { urlFor } from "@/sanity/image";
import { familyHighlights, framedProducts, leadProduct, runningName, type CatalogNode } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type CardImage =
  | { kind: "sanity"; source: Parameters<typeof urlFor>[0]; alt: string }
  | { kind: "static"; src: string; alt: string }
  | { kind: "cutout"; src: string; width: number; height: number };

/**
 * Pictures for the cards, in order of preference: one set on the card in
 * Sanity, then the family's studio shots (or its studio render when it has
 * none), then cleared catalog photos spread across its types. A card left
 * without one is set as a statement in type alone.
 */
function pictureCards(family: CatalogNode, count: number): (CardImage | null)[] {
  const studio = family.defaults?.studio ?? [];
  const cutout = family.defaults?.cutout;
  const pool: CardImage[] = [
    ...studio.map((s) => ({ kind: "static" as const, src: s.src, alt: s.alt })),
    ...(studio.length === 0 && cutout
      ? [{ kind: "cutout" as const, src: cutout.src, width: cutout.width, height: cutout.height }]
      : []),
    ...photosBesideLineup(family).map((p) => ({ kind: "sanity" as const, source: p.images[0], alt: p.title })),
  ];

  const cards = familyHighlights(family);
  return Array.from({ length: count }, (_, i) => {
    const own = cards[i]?.image;
    if (own?.asset) return { kind: "sanity", source: own, alt: own.alt ?? "" };
    return pool.shift() ?? null;
  });
}

/** Catalog photos for the cards, leaving out the ones the lineup tiles above already show. */
function photosBesideLineup(family: CatalogNode) {
  const shown = new Set(family.children.map((c) => leadProduct(c)?._id ?? ""));
  return framedProducts(family, shown);
}

/** "Get to know": what makes the family worth specifying, one card per idea. */
export default function Highlights({ family, className }: { family: CatalogNode; className?: string }) {
  const cards = familyHighlights(family);
  if (!cards.length) return null;
  const pictures = pictureCards(family, cards.length);
  const name = runningName(family.title);

  return (
    <section aria-labelledby="highlights-title" className={cn("py-24 md:py-32", className)}>
      <SectionIntro id="highlights-title" className="container-x mb-10 md:mb-14" title={`Get to know ${name}.`} />
      <Rail label={`About ${name}`} itemClassName="w-[84%] sm:w-[46%] lg:w-[30rem]">
        {cards.map((card, i) => {
          const picture = pictures[i];
          return (
            <article
              key={card._key}
              className="relative flex h-[30rem] flex-col overflow-hidden rounded-[2rem] bg-muted md:h-[34rem]"
            >
              {picture ? (
                <div className="px-8 pt-8 md:px-9 md:pt-9">
                  <h3 className="text-title">{card.title}</h3>
                  {card.body && <p className="mt-3 text-[1.0625rem] text-muted-foreground">{card.body}</p>}
                </div>
              ) : (
                // No picture: the statement carries the card, set large, its line at the foot.
                <div className="flex flex-1 flex-col justify-between p-8 md:p-9">
                  <h3 className="text-headline text-balance">{card.title}</h3>
                  {card.body && <p className="text-lede max-w-[22rem] text-muted-foreground">{card.body}</p>}
                </div>
              )}
              {picture && (
                <div className="relative mt-7 min-h-0 flex-1">
                  {picture.kind === "cutout" ? (
                    <Image
                      src={picture.src}
                      alt=""
                      fill
                      unoptimized
                      className="scale-[1.12] object-contain object-bottom px-6 pb-10 drop-shadow-[0_18px_24px_rgba(15,15,20,0.14)]"
                    />
                  ) : (
                    <Image
                      src={
                        picture.kind === "sanity"
                          ? urlFor(picture.source).width(900).height(900).fit("crop").url()
                          : picture.src
                      }
                      alt={picture.alt}
                      fill
                      sizes="(min-width: 1024px) 30rem, (min-width: 640px) 46vw, 84vw"
                      className="object-cover"
                    />
                  )}
                </div>
              )}
            </article>
          );
        })}
      </Rail>
    </section>
  );
}
