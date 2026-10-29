import Image from "next/image";
import Link from "next/link";
import type { CatalogNode } from "@/lib/catalog";

interface FamilyStripProps {
  families: CatalogNode[];
  /** The family in view, and whether this is its own page or one of its types. */
  current: { familyId: string; exact: boolean };
}

const ITEM =
  "group flex min-h-11 flex-col items-center gap-1.5 py-1 text-center text-xs leading-tight text-muted-foreground transition-colors hover:text-foreground data-[active]:font-medium data-[active]:text-foreground sm:text-meta md:w-[5.75rem]";

/**
 * Every family as a small cut-out over its name, the way a maker lists its
 * product lines. The family in view reads in ink, the rest in graphite. All
 * five fit the width at every size, so nothing hides off-screen.
 */
export default function FamilyStrip({ families, current }: FamilyStripProps) {
  return (
    <nav aria-label="Product families">
      {/* Five equal cells on phones, so every family shows without scrolling sideways. */}
      <ul className="container-x grid grid-cols-5 gap-1 pb-2 pt-3 md:flex md:justify-center md:gap-5 md:pb-3 md:pt-4">
        {families.map((family) => {
          const active = current.familyId === family.id;
          const thumb = family.defaults?.thumb;
          return (
            <li key={family.id}>
              <Link
                href={family.href}
                aria-current={active ? (current.exact ? "page" : "true") : undefined}
                data-active={active || undefined}
                className={ITEM}
              >
                <span className="relative h-8 w-full max-w-14 md:h-11 md:max-w-20">
                  {thumb && (
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      // Small alpha cut-outs; the optimiser would flatten them.
                      unoptimized
                      sizes="(min-width: 768px) 80px, 56px"
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
