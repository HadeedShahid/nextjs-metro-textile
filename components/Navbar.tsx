"use client";

import * as React from "react";
import { Menu, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { CONTACT_EMAIL_HREF } from "@/constants";
import { QuoteModalButton } from "./QuoteModal";
import { cn } from "@/lib/utils";

import Link from "next/link";

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
  };
  menu?: Array<{
    title: string;
    url: string;
  }>;
  /** Overlay variant for the homepage hero — absolute, transparent, on top. */
  transparent?: boolean;
}

const QUERY_HREF = `${CONTACT_EMAIL_HREF}?subject=Product Query&body=Hello,%0D%0A%0D%0AI would like to inquire about your products.`;

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
  },
  menu = [{ title: "Products", url: "/products" }],
  transparent = false,
}: NavbarProps) => {
  const isHome = transparent;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <section
      className={cn(
        "py-4",
        isHome && "absolute inset-x-0 top-0 z-50 bg-transparent",
      )}
    >
      <div className={cn(isHome && "main-container")}>
      {/* ── Desktop ── */}
      <nav className="hidden justify-between items-center md:flex">
        <div className="flex gap-10">
          {/* Logo — slightly larger than before */}
          <Link href={logo.url} className="flex items-center gap-2">
            <Image src={logo.src} width={68} height={66} alt={logo.alt} />
          </Link>
          <div className="flex items-center gap-6">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="font-medium text-foreground hover:text-[#742b76] transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        {/* On the homepage the hero's own CTAs do the job — no navbar button
            competing with the hero image. */}
        {!isHome && (
          <div className="flex gap-3 items-center">
            <Button size="lg" href={QUERY_HREF}>
              <Mail className="h-4 w-4" />
              Send Query
            </Button>
          </div>
        )}
      </nav>

      {/* ── Mobile ── logo LEFT · hamburger RIGHT */}
      <div className="block md:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center">
            <Image
              src={logo.src}
              width={150}
              height={40}
              className="h-11 w-auto"
              alt={logo.alt}
            />
          </Link>

          {/* Hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className={cn(
                    isHome && "border-foreground/15 bg-transparent hover:bg-foreground/5",
                  )}
                >
                  <Menu className="size-4" />
                </Button>
              }
            />
            <SheetContent side="right" className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href={logo.url} className="flex items-center">
                    <Image
                      src={logo.src}
                      width={140}
                      height={38}
                      className="h-10 w-auto"
                      alt={logo.alt}
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-4">
                  {menu.map((item) => (
                    <Link
                      key={item.title}
                      href={item.url}
                      onClick={closeMobile}
                      className="text-base font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                {/* Same pair as the hero, so the CTAs read as one system */}
                <Button href="/products" size="lg" onClick={closeMobile}>
                  Explore Products
                </Button>
                <QuoteModalButton
                  variant="outline"
                  size="lg"
                  className="cta-beam"
                  text="Get a Quote in 24h"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Navbar;
