"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { QuoteModalButton } from "./QuoteModal";
import { CONTACT_ICONS } from "./common/contact-icons";
import { COMPANY_LINKS } from "./TopBar";
import { CONTACT_ROUTES, CONTACT_WHATSAPP_HREF } from "@/constants";
import { cn } from "@/lib/utils";

interface NavbarProps {
  /** Product families from Sanity (top-level categories). */
  families?: { title: string; url: string }[];
}

const LINK =
  "flex items-center border-b-2 border-transparent px-3 text-[0.9375rem] font-medium text-foreground/75 transition-colors hover:text-foreground aria-[current=page]:border-primary aria-[current=page]:text-foreground";

/**
 * The global nav, the way trade sites do it: the logo, every product family by
 * name, and the quote button. The company pages sit in the contact bar above.
 * Phones get one full-screen list with the contact routes under it.
 */
const Navbar = ({ families = [] }: NavbarProps) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  // A new page closes the menu.
  React.useEffect(() => setMenuOpen(false), [pathname]);

  const isActive = (url: string) => (url === "/products" ? pathname === url : pathname?.startsWith(url));
  const productLinks = [{ title: "All products", url: "/products" }, ...families];

  return (
    <header className="sticky top-0 z-50 h-[var(--nav-h)] border-b border-border bg-white">
      <nav aria-label="Main" className="container-x flex h-full items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Metro Metal home">
          <Image src="/logo.png" width={68} height={66} alt="" className="h-10 w-auto" preload />
        </Link>

        <ul className="hidden h-full items-stretch lg:flex">
          {productLinks.map((link) => (
            <li key={link.url} className="flex">
              <Link href={link.url} aria-current={isActive(link.url) ? "page" : undefined} className={LINK}>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button
            href={CONTACT_WHATSAPP_HREF}
            external
            variant="ghost"
            size="icon-lg"
            className="lg:hidden"
            aria-label="Message us on WhatsApp"
          >
            <IconBrandWhatsapp className="size-6" aria-hidden />
          </Button>
          <QuoteModalButton className="hidden lg:inline-flex" size="default" text="Request a quote" />

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
              <p className="text-meta font-medium text-muted-foreground">Products</p>
              <ul className="-mt-2 border-t border-border">
                {productLinks.map((link) => (
                  <MenuRow key={link.url} href={link.url} current={isActive(link.url)}>
                    {link.title}
                  </MenuRow>
                ))}
              </ul>
              <p className="mt-4 text-meta font-medium text-muted-foreground">Company</p>
              <ul className="-mt-2 border-t border-border">
                {COMPANY_LINKS.map((link) => (
                  <MenuRow key={link.url} href={link.url} current={isActive(link.url)}>
                    {link.title}
                  </MenuRow>
                ))}
              </ul>

              <QuoteModalButton className="mt-6 w-full" size="lg" text="Request a quote" />
              <ul className="mt-6 space-y-3 text-[0.9375rem] text-muted-foreground">
                {CONTACT_ROUTES.map((contact) => {
                  const Icon = CONTACT_ICONS[contact.kind];
                  return (
                    <li key={contact.kind}>
                      <a
                        href={contact.href}
                        {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex min-h-10 items-center gap-2 hover:text-foreground hover:underline"
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

/** One menu line: the name and an arrow, 48px tall. */
function MenuRow({ href, current, children }: { href: string; current?: boolean; children: React.ReactNode }) {
  return (
    <li className="border-b border-border">
      <Link
        href={href}
        aria-current={current ? "page" : undefined}
        className={cn(
          "flex min-h-12 items-center gap-3 text-base text-foreground/80 hover:text-foreground",
          current && "font-semibold text-foreground",
        )}
      >
        <span className="flex-1">{children}</span>
        <ChevronRight className="size-4 text-muted-foreground/60" aria-hidden />
      </Link>
    </li>
  );
}

export default Navbar;
