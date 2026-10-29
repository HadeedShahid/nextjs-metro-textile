import SectionIntro from "@/components/base/SectionIntro";
import { FamilyGrid } from "@/components/catalog/FamilyCard";
import { MadeToSpecTile } from "@/components/catalog/StyleGrid";
import { fetchAllCategories } from "@/lib/api";
import { FAMILY_DEFAULTS } from "@/data/families";
import { countWord } from "@/lib/catalog";

/**
 * Every family side by side, all in view at once, straight from Sanity's
 * top-level categories in title order. Each card shows the family's studio
 * cut-out and its tagline from Sanity, with the shared default behind it.
 */
export default async function Lineup() {
  const { data: categories } = await fetchAllCategories();
  const families = (categories ?? [])
    .filter((c) => !c.parent)
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((c) => {
      const defaults = FAMILY_DEFAULTS[c.slug.current];
      return {
        title: c.title,
        href: `/products/${c.slug.current}`,
        tagline: c.tagline?.trim() || defaults?.tagline,
        image: defaults?.cutout,
      };
    });
  if (families.length === 0) return null;

  return (
    <section aria-labelledby="lineup-title" className="pb-10 pt-4 md:pb-14 md:pt-6 lg:pb-16">
      <SectionIntro
        id="lineup-title"
        className="container-x mb-5 md:mb-6"
        title="The lineup."
        lede={`${countWord(families.length)} families of hardware, each made in your finish and carrying your mark.`}
        action={{ href: "/products", label: "Browse the full catalog" }}
      />
      <div className="container-x">
        <FamilyGrid
          label="Product families"
          families={families}
          trailing={<MadeToSpecTile quoteFor="Custom hardware" />}
        />
      </div>
    </section>
  );
}
