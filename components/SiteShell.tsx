import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { fetchNavCategories } from "@/lib/api";
import { FAMILY_DEFAULTS } from "@/data/families";

/**
 * Server-rendered page chrome: the contact bar, the global nav and the main
 * landmark. Pages own their own widths, so full-bleed bands run edge to edge.
 */
export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const { data: categories } = await fetchNavCategories();

  const families = (categories ?? []).map((cat) => ({
    title: cat.title,
    url: `/products/${cat.slug}`,
    thumb: FAMILY_DEFAULTS[cat.slug]?.thumb,
    types: (cat.types ?? []).map((type) => ({
      title: type.title,
      url: `/products/${cat.slug}/${type.slug}`,
    })),
  }));

  return (
    <>
      <TopBar />
      <Navbar families={families} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </>
  );
}
