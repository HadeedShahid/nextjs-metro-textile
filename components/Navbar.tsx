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

const Navbar = ({
  logo = {
    url: "/",
    src: "/logo.png",
    alt: "logo",
  },
  menu = [
    { title: "Products", url: "/products" },
  ],
}: NavbarProps) => {
  return (
    <section className="py-4">
      {/* Desktop Menu */}
      <nav className="hidden justify-between items-center md:flex">
        <div className="flex gap-10">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <Image src={logo.src} width={64} height={62} alt={logo.alt} />
          </Link>
          <div className="flex items-center gap-6">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-sm font-medium text-foreground hover:text-[#742b76] transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="hidden lg:block">
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#742b76] to-[#9d3fa0] rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition duration-300"></div>
            <Button
              href="mailto:info@metrotextile.com?subject=Product Query&body=Hello,%0D%0A%0D%0AI would like to inquire about your products."
              className="relative bg-[#742b76] hover:bg-[#5a2160] text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Send Query
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className="block lg:hidden">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={logo.url} className="flex items-center gap-2">
            <img
              src={logo.src}
              className="max-h-8 dark:invert"
              alt={logo.alt}
            />
          </Link>
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              }
            />
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  <Link href={logo.url} className="flex items-center gap-2">
                    <img
                      src={logo.src}
                      className="max-h-8 dark:invert"
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

                <div className="flex flex-col gap-3 pt-4 border-t">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#742b76] to-[#9d3fa0] rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition duration-300"></div>
                    <Button
                      href="mailto:info@metrotextile.com?subject=Product Query&body=Hello,%0D%0A%0D%0AI would like to inquire about your products."
                      className="relative bg-[#742b76] hover:bg-[#5a2160] text-white font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl w-full flex items-center justify-center gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Send Query
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
