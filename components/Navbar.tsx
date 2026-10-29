"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Building2, ChevronDown, ChevronRight, House, LayoutGrid, Mail, Menu, ShieldCheck, type LucideIcon } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { QuoteModalButton } from "./QuoteModal";
import { CONTACT_ICONS } from "./common/contact-icons";
import { CONTACT_ROUTES, CONTACT_WHATSAPP_HREF } from "@/constants";
import { cn } from "@/lib/utils";
import MoreLink from "@/components/base/MoreLink";

interface NavFamily {
  title: string;
  url: string;
  /** Small alpha cut-out of the family. */
  thumb?: string;
  types: Array<{ title: string; url: string }>;
}

interface NavbarProps {
  /** Product families from Sanity (top-level categories) with their types. */
  families?: NavFamily[];
}

const COMPANY_LINKS: { title: string; url: string; icon: LucideIcon }[] = [
  { title: "About", url: "/about-us", icon: Building2 },
  { title: "Compliance", url: "/compliance", icon: ShieldCheck },
  { title: "Journal", url: "/blogs", icon: BookOpen },
  { title: "Contact", url: "/contact-us", icon: Mail },
];


const LINK =
  "flex items-center px-3 text-[0.9375rem] font-medium text-foreground/70 transition-colors hover:text-foreground aria-[current=page]:text-foreground";

/**
 * Global nav: a plain white bar with every section named in full. Products
 * opens a panel listing each family and its types, on hover or from its
 * arrow button, so buyers can see the whole catalog without leaving the page.
 * The panel unrolls downward from the bar, opaque from the first frame, and
 * its columns follow a beat behind; closing is a quick fade.
 */
const Navbar = ({ families = [] }: NavbarProps) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [productsOpen, setProductsOpen] = React.useState(false);
  const closeTimer = React.useRef<number | undefined>(undefined);
  const hoverOpenedAt = React.useRef(0);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  // A new page closes whatever was open.
  React.useEffect(() => {
    setProductsOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  React.useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const isActive = (url: string) => (url === "/" ? pathname === "/" : pathname?.startsWith(url));

  const openProducts = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    if (!productsOpen) hoverOpenedAt.current = Date.now();
    setProductsOpen(true);
  };
  // A click that lands just after hover opened the panel means "open", not "close".
  const toggleProducts = () =>
    setProductsOpen((open) => (open && Date.now() - hoverOpenedAt.current < 600 ? true : !open));
  const closeProducts = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setProductsOpen(false), 150);
  };

  return (
    <header className="sticky top-0 z-50 h-[var(--nav-h)] border-b border-border bg-white">
      <nav aria-label="Main" className="container-x flex h-full items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Metro Metal home">
          <Image src="/logo.png" width={68} height={66} alt="" className="h-10 w-auto" preload />
        </Link>

        <ul className="hidden h-full items-stretch lg:flex">
          <li className="flex">
            <Link href="/" aria-current={isActive("/") ? "page" : undefined} className={LINK}>
              Home
            </Link>
          </li>

          {/* Static, so the panel spans the bar rather than this item. */}
          <li
            className="flex"
            onPointerEnter={openProducts}
            onPointerLeave={closeProducts}
            onKeyDown={(e) => {
              if (e.key === "Escape" && productsOpen) {
                setProductsOpen(false);
                toggleRef.current?.focus();
              }
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setProductsOpen(false);
            }}
          >
            <Link
              href="/products"
              aria-current={isActive("/products") ? "page" : undefined}
              className={cn(LINK, "pr-1")}
            >
              Products
            </Link>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={productsOpen}
              aria-controls="products-panel"
              aria-label="Show product families"
              onClick={toggleProducts}
              className="flex w-9 items-center justify-center pr-2 text-foreground/70 transition-colors hover:text-foreground"
            >
              <ChevronDown
                className={cn("size-4 transition-transform duration-200", productsOpen && "rotate-180")}
                aria-hidden
              />
            </button>

            <div
              id="products-panel"
              data-open={productsOpen || undefined}
              inert={!productsOpen}
              className="group/panel invisible absolute inset-x-0 top-full border-b border-border bg-white opacity-0 shadow-[0_18px_30px_-18px_rgb(15_15_20/0.22)] [clip-path:inset(0_0_100%_0)] [transition:opacity_150ms_ease-out,visibility_0s_150ms,clip-path_0s_150ms] data-[open]:visible data-[open]:opacity-100 data-[open]:[clip-path:inset(0_0_-3rem_0)] data-[open]:[transition:clip-path_320ms_var(--ease-strike)] motion-reduce:[clip-path:none]"
            >
              <div className="container-x grid grid-cols-5 gap-6 py-7">
                {families.map((family, i) => (
                  <div
                    key={family.url}
                    style={{ "--i": i } as React.CSSProperties}
                    className="translate-y-1.5 opacity-0 transition-[opacity,translate] duration-150 group-data-[open]/panel:translate-y-0 group-data-[open]/panel:opacity-100 group-data-[open]/panel:delay-[calc(40ms+var(--i)*25ms)] group-data-[open]/panel:duration-300 group-data-[open]/panel:ease-[var(--ease-strike)] motion-reduce:translate-y-0"
                  >
                    <Link href={family.url} className="group block">
                      <span className="relative block h-14 w-24">
                        {family.thumb && (
                          <Image
                            src={family.thumb}
                            alt=""
                            fill
                            // Small alpha cut-outs; the optimiser would flatten them.
                            unoptimized
                            sizes="96px"
                            className="object-contain object-left"
                          />
                        )}
                      </span>
                      <span className="mt-3 block text-[0.9375rem] font-semibold group-hover:underline">
                        {family.title}
                      </span>
                    </Link>
                    {family.types.length > 0 && (
                      <ul className="mt-2 space-y-1.5">
                        {family.types.map((type) => (
                          <li key={type.url}>
                            <Link
                              href={type.url}
                              className="text-sm text-muted-foreground transition-colors hover:text-foreground hover:underline"
                            >
                              {type.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <div className="border-t border-border">
                <div className="container-x py-3">
                  <MoreLink href="/products">View all products</MoreLink>
                </div>
              </div>
            </div>
          </li>

          {COMPANY_LINKS.map((item) => (
            <li key={item.url} className="flex">
              <Link href={item.url} aria-current={isActive(item.url) ? "page" : undefined} className={LINK}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <QuoteModalButton className="px-4 lg:hidden" text="Request a quote" />
          <Button
            href={CONTACT_WHATSAPP_HREF}
            external
            variant="ghost"
            size="icon-lg"
            className="md:hidden"
            aria-label="Message us on WhatsApp"
          >
            <IconBrandWhatsapp className="size-6" aria-hidden />
          </Button>
          <QuoteModalButton className="hidden lg:inline-flex" text="Request a quote" />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={<Button variant="ghost" size="icon-lg" className="-mr-2 lg:hidden" aria-label="Open menu" />}
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent
              side="top"
              className="data-[side=top]:h-dvh overflow-y-auto rounded-none border-0 px-5 pb-10 pt-[calc(var(--nav-h)+0.5rem)] shadow-none"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <ul className="border-t border-border">
                <MenuRow href="/" icon={<House />} current={isActive("/")} onNavigate={() => setMenuOpen(false)}>
                  Home
                </MenuRow>
                <MenuRow
                  href="/products"
                  icon={<LayoutGrid />}
                  current={pathname === "/products"}
                  onNavigate={() => setMenuOpen(false)}
                >
                  All products
                </MenuRow>
                {families.map((family) => (
                  <MenuRow
                    key={family.url}
                    href={family.url}
                    icon={
                      family.thumb ? (
                        <Image src={family.thumb} alt="" width={36} height={36} unoptimized className="size-full object-contain p-1" />
                      ) : (
                        <LayoutGrid />
                      )
                    }
                    current={isActive(family.url)}
                    onNavigate={() => setMenuOpen(false)}
                    nested
                  >
                    {family.title}
                  </MenuRow>
                ))}
                {COMPANY_LINKS.map((item) => (
                  <MenuRow
                    key={item.url}
                    href={item.url}
                    icon={<item.icon />}
                    current={isActive(item.url)}
                    onNavigate={() => setMenuOpen(false)}
                  >
                    {item.title}
                  </MenuRow>
                ))}
              </ul>

              <ul className="mt-8 space-y-3 text-[0.9375rem] text-muted-foreground">
                {CONTACT_ROUTES.map((contact) => {
                  const Icon = CONTACT_ICONS[contact.kind];
                  return (
                    <li key={contact.kind}>
                      <a
                        href={contact.href}
                        {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex items-center gap-2 hover:text-foreground hover:underline"
                      >
                        <Icon className="size-4" aria-hidden />
                        {contact.linkText}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

/** One menu line: an icon chip (or a family's cut-out), the name and an arrow. */
function MenuRow({
  href,
  icon,
  current,
  nested = false,
  onNavigate,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  current?: boolean;
  nested?: boolean;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <li className="border-b border-border">
      <Link
        href={href}
        onClick={onNavigate}
        aria-current={current ? "page" : undefined}
        className={cn(
          "flex items-center gap-3 py-2.5 text-foreground/80 hover:text-foreground aria-[current=page]:text-foreground",
          nested ? "pl-6 text-[0.9375rem]" : "text-base font-medium",
          current && "font-semibold",
        )}
      >
        <span
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-foreground/70 [&_svg]:size-[1.125rem]"
        >
          {icon}
        </span>
        <span className="flex-1">{children}</span>
        <ChevronRight className="size-4 text-muted-foreground/60" aria-hidden />
      </Link>
    </li>
  );
}

export default Navbar;
