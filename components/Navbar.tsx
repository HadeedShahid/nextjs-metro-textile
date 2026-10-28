"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { QuoteModalButton } from "./QuoteModal";
import { cn } from "@/lib/utils";

interface NavbarProps {
  /** Product families from Sanity (top-level categories). */
  families?: Array<{ title: string; url: string }>;
}

const COMPANY_LINKS = [
  { title: "About", url: "/about-us" },
  { title: "Journal", url: "/blogs" },
  { title: "Contact", url: "/contact-us" },
];

/**
 * Global nav: a thin translucent bar that stays put while the page scrolls
 * underneath it. The quote action lives in the bar itself on every width, so
 * it never opens on top of the mobile menu.
 */
const Navbar = ({ families = [] }: NavbarProps) => {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (url: string) =>
    url === "/products" ? pathname === "/products" : pathname?.startsWith(url);

  const links = [{ title: "Products", url: "/products" }, ...families, ...COMPANY_LINKS];

  return (
    <header className="sticky top-0 z-50 h-[var(--nav-h)] border-b border-black/[0.06] bg-white/80 backdrop-blur-xl backdrop-saturate-150">
      <nav aria-label="Main" className="container-x flex h-full items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Metro Metal home">
          <Image src="/logo.png" width={68} height={66} alt="" className="h-8 w-auto" preload />
        </Link>

        <ul className="hidden h-full items-stretch lg:flex">
          {links.map((item) => (
            <li key={item.url} className="flex">
              <Link
                href={item.url}
                aria-current={isActive(item.url) ? "page" : undefined}
                className={cn(
                  "flex items-center px-3 text-[0.8125rem] text-foreground/75 transition-colors hover:text-foreground",
                  "aria-[current=page]:text-foreground aria-[current=page]:font-medium",
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <QuoteModalButton size="sm" text="Request a quote" />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu" />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="top"
              className="data-[side=top]:h-dvh overflow-y-auto rounded-none border-0 px-6 pb-10 pt-[calc(var(--nav-h)+1rem)] shadow-none"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <ul className="flex flex-col">
                {links.map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(item.url) ? "page" : undefined}
                      className="block py-2.5 text-[1.75rem] font-semibold tracking-[-0.025em] text-foreground/85 hover:text-foreground aria-[current=page]:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
