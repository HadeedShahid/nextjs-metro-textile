import Image from "next/image";
import SectionIntro from "@/components/base/SectionIntro";
import { urlFor } from "@/sanity/image";
import { familyHighlights, framedProducts, leadProduct, runningName, type CatalogNode } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type CardImage =
  | { kind: "sanity"; source: Parameters<typeof urlFor>[0]; alt: string }
  | { kind: "static"; src: string; alt: string };

/**
 * Pictures for the cards, in order of preference: one set on the card in
 * Sanity, then the family's studio shots, then cleared catalog photos spread
 * across its types. A card left without one is text alone.
 */
function pictureCards(family: CatalogNode, count: number): (CardImage | null)[] {
  // The studio render already leads the page in the hero, so it is not reused here.
  const studio = family.defaults?.studio ?? [];
  const pool: CardImage[] = [
    ...studio.map((s) => ({ kind: "static" as const, src: s.src, alt: s.alt })),
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

/** "Get to know": what makes the family worth specifying, one card per idea, all in view. */
export default function Highlights({ family, className }: { family: CatalogNode; className?: string }) {
  const cards = familyHighlights(family);
  if (!cards.length) return null;
  const pictures = pictureCards(family, cards.length);
  const name = runningName(family.title);

  return (
    <section aria-labelledby="highlights-title" className={cn("py-10 md:py-14 lg:py-16", className)}>
      <div className="container-x">
        <SectionIntro id="highlights-title" className="mb-5 md:mb-6" title={`Get to know ${name}.`} />
        <ul
          aria-label={`About ${name}`}
          className={cn(
            "grid gap-3 sm:grid-cols-2 md:gap-4",
            cards.length % 3 === 0 ? "md:grid-cols-3" : cards.length > 4 ? "lg:grid-cols-3" : "lg:grid-cols-4",
          )}
        >
          {cards.map((card, i) => {
            const picture = pictures[i];
            return (
              <li key={card._key} className="flex flex-col overflow-hidden rounded-2xl bg-muted">
                {picture && (
                  <div className="relative aspect-[16/9] sm:aspect-[4/3]">
                    <Image
                      src={
                        picture.kind === "sanity"
                          ? urlFor(picture.source).width(800).height(600).fit("crop").url()
                          : picture.src
                      }
                      alt={picture.alt}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 640px) 46vw, 92vw"
                      className="object-cover"
                    />
                  </div>
                )}
                {picture ? (
                  <div className="p-4 sm:p-5">
                    <h3 className="text-title">{card.title}</h3>
                    {card.body && <p className="mt-1 text-sm text-muted-foreground">{card.body}</p>}
                  </div>
                ) : (
                  // No picture: the statement fills the card, its line at the foot.
                  <div className="flex min-h-40 flex-1 flex-col justify-between gap-6 p-4 sm:min-h-56 sm:p-5">
                    <h3 className="text-headline text-balance">{card.title}</h3>
                    {card.body && <p className="text-sm text-muted-foreground">{card.body}</p>}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
