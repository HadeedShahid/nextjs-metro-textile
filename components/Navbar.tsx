"use client";

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
}

const QUERY_HREF = `${CONTACT_EMAIL_HREF}?subject=Product Query&body=Hello,%0D%0A%0D%0AI would like to inquire about your products.`;

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
  },
  menu = [{ title: "Products", url: "/products" }],
}: NavbarProps) => {
  return (
    <section className="py-4">
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
        <div className="flex gap-3 items-center">
          <Button size="lg" href={QUERY_HREF}>
            <Mail className="h-4 w-4" />
            Send Query
          </Button>
        </div>
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
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon">
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
                      className="text-md font-semibold hover:text-[#742b76] transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                <Button variant="outline" href="/products">
                  Explore Products
                </Button>
                <Button href={QUERY_HREF}>
                  <Mail className="h-4 w-4" />
                  Send Query
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
