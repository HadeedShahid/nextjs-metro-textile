import Image from "next/image";
import Link from "next/link";
import type { CatalogNode } from "@/lib/catalog";

interface FamilyStripProps {
  families: CatalogNode[];
  /** The family in view, and whether this is its own page or one of its types. */
  current: { familyId: string; exact: boolean };
}

const ITEM =
  "group flex w-[5.75rem] flex-col items-center gap-2 pb-1 pt-1 text-center text-[0.8125rem] leading-tight text-muted-foreground transition-colors hover:text-foreground data-[active]:font-medium data-[active]:text-foreground";

/**
 * Every family as a small cut-out over its name, the way a maker lists its
 * product lines. The family in view reads in ink, the rest in graphite.
 */
export default function FamilyStrip({ families, current }: FamilyStripProps) {
  return (
    <nav aria-label="Product families">
      <ul className="no-scrollbar mx-auto flex max-w-[75rem] gap-1 overflow-x-auto px-3 pb-4 pt-5 md:justify-center md:gap-5 md:pb-5 md:pt-7">
        {families.map((family) => {
          const active = current.familyId === family.id;
          const thumb = family.defaults?.thumb;
          return (
            <li key={family.id} className="shrink-0">
              <Link
                href={family.href}
                aria-current={active ? (current.exact ? "page" : "true") : undefined}
                data-active={active || undefined}
                className={ITEM}
              >
                <span className="relative h-11 w-20">
                  {thumb && (
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      // Small alpha cut-outs; the optimiser would flatten them.
                      unoptimized
                      sizes="80px"
                      className="object-contain transition-transform duration-500 ease-[var(--ease-strike)] group-hover:scale-[1.06]"
                    />
                  )}
                </span>
                {family.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
