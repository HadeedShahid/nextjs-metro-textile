import SectionIntro from "@/components/base/SectionIntro";
import { FamilyGrid } from "@/components/catalog/FamilyCard";
import { MadeToSpecTile } from "@/components/catalog/StyleGrid";
import { fetchAllCategories } from "@/lib/api";
import { FAMILY_DEFAULTS } from "@/data/families";

/**
 * The five families side by side, all in view at once. The renders are
 * transparent cut-outs; each line is the family's tagline from Sanity, with
 * the shared default behind it.
 */
const FAMILIES = [
  {
    title: "Buckles",
    href: "/products/buckles",
    src: "/assets/bento/buckles.webp",
    w: 1600,
    h: 604,
  },
  {
    title: "Buttons",
    href: "/products/buttons",
    src: "/assets/bento/buttons.webp",
    w: 1600,
    h: 653,
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
  {
    title: "Zippers",
    href: "/products/zippers",
    src: "/assets/bento/zippers.webp",
    w: 1600,
    h: 605,
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
    <section aria-labelledby="lineup-title" className="pb-10 pt-4 md:pb-14 md:pt-6 lg:pb-16">
      <SectionIntro
        id="lineup-title"
        className="container-x mb-5 md:mb-6"
        title="The lineup."
        lede="Five families of hardware, each made in your finish and carrying your mark."
        action={{ href: "/products", label: "Browse the full catalog" }}
      />
      <div className="container-x">
        <FamilyGrid
          label="Product families"
          families={FAMILIES.map((family) => ({
            title: family.title,
            href: family.href,
            tagline: tagline(family.href),
            image: { src: family.src, width: family.w, height: family.h },
          }))}
          trailing={<MadeToSpecTile quoteFor="Custom hardware" />}
        />
      </div>
    </section>
  );
}
