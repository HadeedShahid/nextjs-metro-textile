import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Rail from "@/components/base/Rail";
import SectionIntro from "@/components/base/SectionIntro";
import { QuoteModalButton } from "@/components/QuoteModal";
import { fetchAllCategories } from "@/lib/api";
import { FAMILY_DEFAULTS } from "@/data/families";

/**
 * The five families as large tiles on the aluminium ground. The renders are
 * transparent cut-outs, grounded with a soft drop shadow. Each line is the
 * family's tagline from Sanity, with the shared default behind it.
 */
const FAMILIES = [
  {
    title: "Zippers",
    href: "/products/zippers",
    src: "/assets/bento/zippers.webp",
    w: 1600,
    h: 605,
  },
  {
    title: "Buttons",
    href: "/products/buttons",
    src: "/assets/bento/buttons.webp",
    w: 1600,
    h: 653,
  },
  {
    title: "Buckles",
    href: "/products/buckles",
    src: "/assets/bento/buckles.webp",
    w: 1600,
    h: 604,
  },
  {
    title: "Patches",
    href: "/products/patches",
    src: "/assets/bento/patches.webp",
    w: 1600,
    h: 753,
  },
  {
    title: "Plates",
    href: "/products/plates",
    src: "/assets/bento/plates.webp",
    w: 1600,
    h: 836,
  },
];

export default async function Lineup() {
  const { data: categories } = await fetchAllCategories();
  const tagline = (href: string) => {
    const slug = href.split("/").pop() as string;
    const category = categories?.find((c) => c.slug.current === slug && !c.parent);
    return category?.tagline?.trim() || FAMILY_DEFAULTS[slug]?.tagline;
  };

  return (
    <section aria-labelledby="lineup-title" className="pb-24 pt-10 md:pb-32 md:pt-16">
      <SectionIntro
        id="lineup-title"
        className="container-x mb-10 md:mb-14"
        title="The lineup."
        lede="Five families of hardware, each made in your finish and carrying your mark."
        action={{ href: "/products", label: "Browse the full catalog" }}
      />
      <Rail label="Product families" itemClassName="w-[86%] sm:w-[60%] lg:w-[min(46rem,60vw)]">
        {FAMILIES.map((family) => (
          <article
            key={family.title}
            className="group relative flex h-[28rem] flex-col overflow-hidden rounded-[2rem] bg-muted p-8 md:h-[32rem] md:p-10"
          >
            <h3 className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em]">
              <Link href={family.href} className="after:absolute after:inset-0 after:rounded-[2rem]">
                {family.title}
              </Link>
            </h3>
            <p className="mt-2 max-w-[22rem] text-[1.0625rem] text-muted-foreground">{tagline(family.href)}</p>
            {/* Sits above the tile link but lets clicks through, except on the quote button. */}
            <div className="pointer-events-none relative z-10 mt-5 flex items-center gap-6">
              <span className="inline-flex items-center gap-0.5 text-[1.0625rem] text-primary group-hover:underline">
                Explore
                <ChevronRight className="size-4" aria-hidden />
              </span>
              <QuoteModalButton
                product={family.title}
                variant="link"
                size="sm"
                className="pointer-events-auto h-auto px-0 text-[1.0625rem]"
                text="Request a quote"
              />
            </div>
            {/* The object fills the space under the copy at studio scale,
                running a little past the tile's edges. */}
            <div className="pointer-events-none absolute inset-x-[-6%] bottom-[3%] top-[13rem] md:top-[14rem]">
              <Image
                src={family.src}
                alt=""
                width={family.w}
                height={family.h}
                // Hand-made WebP cut-outs; the optimiser would flatten their alpha.
                unoptimized
                className="h-full w-full object-contain object-bottom drop-shadow-[0_18px_24px_rgba(15,15,20,0.14)] transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
              />
            </div>
          </article>
        ))}
      </Rail>
    </section>
  );
}
