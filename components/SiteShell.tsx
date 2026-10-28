import Navbar from "@/components/Navbar";
import { fetchNavCategories } from "@/lib/api";

/**
 * Server-rendered page chrome: the global nav and the main landmark. Pages own
 * their own widths, so full-bleed image bands can run edge to edge.
 */
export default async function SiteShell({ children }: { children: React.ReactNode }) {
  const { data: categories } = await fetchNavCategories();

  const families = (categories ?? []).map((cat) => ({
    title: cat.title,
    url: `/products/${cat.slug}`,
  }));

  return (
    <>
      <Navbar families={families} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
    </>
  );
}
