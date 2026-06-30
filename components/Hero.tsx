import React from "react";
import Image from "next/image";
import { Globe } from "lucide-react";
import { Button } from "./ui/button";
import { QuoteModalButton } from "./QuoteModal";
import TrustIndicators from "./TrustIndicators";
import HeroProductSearch, { type HeroSearchItem } from "./HeroProductSearch";
import { fetchAllCategories, type Category } from "@/lib/api";

/** Builds `/products/parent-slug/child-slug` by walking the parent chain — matches CategoryFilters' convention. */
function buildCategoryHref(category: Category, byId: Map<string, Category>): string {
  const segments = [category.slug.current];
  let current = category;
  while (current.parent?._ref) {
    const parentCat = byId.get(current.parent._ref);
    if (!parentCat) break;
    segments.unshift(parentCat.slug.current);
    current = parentCat;
  }
  return `/products/${segments.join("/")}`;
}

const HeroCopy = ({
  compact = false,
  searchItems = [],
}: {
  compact?: boolean;
  searchItems?: HeroSearchItem[];
}) => (
  <div className={compact ? "max-w-md" : "max-w-2xl"}>
    <div
      className={
        compact
          ? "mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1"
          : "mb-6 inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1"
      }
    >
      <Globe className="h-3.5 w-3.5 text-primary" />
      <span className="text-xs font-medium text-slate-700">
        Pakistan
        <span className="px-1 text-slate-400">·</span>
        China
        <span className="px-1 text-slate-400">·</span>
        Hong Kong
      </span>
    </div>
    <h1
      className={
        compact
          ? "text-[28px] font-bold text-slate-900 tracking-tight leading-[1.1]"
          : "max-w-lg text-3xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]"
      }
    >
      <span className="block">Garment Accessories</span>
      <span className="block mt-1 lg:mt-2">
        Manufacturer &amp; <span className="text-primary">Sourcing</span>{" "}
        Partner
      </span>
    </h1>

    <HeroProductSearch
      items={searchItems}
      className={compact ? "mt-4" : "mt-6"}
    />

    <div className={compact ? "flex flex-row items-center gap-3 mt-5" : "flex flex-row items-center gap-4 mt-8"}>
      <Button href="/products" size={compact ? "sm" : "lg"}>
        Explore Products
      </Button>
      <QuoteModalButton
        variant="outline"
        size={compact ? "sm" : "lg"}
        text={compact ? "Get a Quote" : "Request a Quote"}
      />
    </div>

    {!compact && <TrustIndicators />}
  </div>
);

const Hero = async () => {
  const { data: categories } = await fetchAllCategories();
  const byId = new Map((categories ?? []).map((cat) => [cat._id, cat]));
  const searchItems: HeroSearchItem[] = (categories ?? []).map((cat) => ({
    title: cat.title,
    href: buildCategoryHref(cat, byId),
    parentTitle: cat.parent ? byId.get(cat.parent._ref)?.title ?? null : null,
  }));

  return (
    <section className="breakout w-screen overflow-hidden">
      {/* Mobile (portrait): fills the device viewport, same as desktop, capped on very tall screens */}
      <div className="relative min-h-[max(100vh,640px)] max-h-[960px] w-full lg:hidden">
        <Image
          src="/assets/hero-mobile.png"
          alt="Metro Metal hardware — zipper, hang button, engraved plate, leather patch and buckle"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 top-0 z-10 pt-28">
          <div className="main-container">
            <HeroCopy compact searchItems={searchItems} />
          </div>
        </div>
      </div>

      {/* Desktop (landscape): full-bleed image, text overlaid on the clear left side, capped on very tall screens */}
      <div className="relative hidden min-h-[100vh] max-h-[960px] w-full items-center lg:flex">
        <Image
          src="/assets/hero-desktop.png"
          alt="Metro Metal hardware — zipper, hang button, engraved plate, leather patch and buckle"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 w-full pt-24">
          <div className="main-container">
            <HeroCopy searchItems={searchItems} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
