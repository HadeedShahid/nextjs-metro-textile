import Navbar from "@/components/Navbar";
import { fetchNavCategories } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * Server-rendered page chrome (navbar + main). The `home` flag is decided by
 * the route group layout — never by usePathname — so statically prerendered
 * HTML always carries the correct navbar variant on hard refresh.
 */
export default async function SiteShell({
  home = false,
  children,
}: {
  home?: boolean;
  children: React.ReactNode;
}) {
  const { data: categories } = await fetchNavCategories();

  const menu = [
    { title: "All Products", url: "/products" },
    ...(categories ?? []).map((cat) => ({
      title: cat.title,
      url: `/products/${cat.slug}`,
    })),
  ];

  return (
    <>
      <Navbar menu={menu} transparent={home} />
      <main className={cn("flex flex-col gap-16", !home && "lg:py-5")}>
        {children}
      </main>
    </>
  );
}
