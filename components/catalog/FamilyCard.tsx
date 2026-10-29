import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface FamilyCardData {
  title: string;
  href: string;
  tagline?: string | null;
  /** Transparent cut-out of the family. */
  image?: { src: string; width: number; height: number };
  /** A count line, such as "14 styles". */
  more?: string;
}

/**
 * Every family in one grid, all in view at once: two across on phones and
 * three from 640px, so cards keep room for their render and line at every
 * width. A sixth cell (`trailing`) closes the second row.
 */
export function FamilyGrid({
  families,
  label,
  trailing,
}: {
  families: FamilyCardData[];
  label: string;
  trailing?: React.ReactNode;
}) {
  return (
    <ul aria-label={label} className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
      {families.map((family) => (
        <li key={family.href}>
          <FamilyCard family={family} />
        </li>
      ))}
      {trailing && <li>{trailing}</li>}
    </ul>
  );
}

/**
 * A family as a compact card: the cut-out sitting with room around it in a
 * wide well, then its name and one line. The whole card is the link, marked
 * by the arrow beside the name.
 */
export default function FamilyCard({ family }: { family: FamilyCardData }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-muted">
      <div className="relative aspect-[2/1] xl:aspect-[5/2]">
        {family.image && (
          <Image
            src={family.image.src}
            alt=""
            fill
            // Hand-made alpha cut-outs; the optimiser would flatten them.
            unoptimized
            className="object-contain p-2.5 drop-shadow-[0_8px_12px_rgba(15,15,20,0.12)] transition-transform duration-500 ease-[var(--ease-strike)] group-hover:scale-[1.04] sm:px-8 sm:py-5 lg:px-10 lg:py-6"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-3 pt-2 sm:p-4 sm:pt-3">
        <h3 className="text-title">
          <Link
            href={family.href}
            className="inline-flex items-center gap-0.5 after:absolute after:inset-0 after:rounded-2xl"
          >
            {family.title}
            <ChevronRight
              className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </h3>
        {family.tagline && <p className="text-meta mt-1 text-muted-foreground sm:text-sm">{family.tagline}</p>}
        {family.more && <p className="text-meta mt-auto pt-2 text-muted-foreground">{family.more}</p>}
      </div>
    </article>
  );
}
