"use client";

import Link from "next/link";
import { useDeferredValue, useEffect, useId, useState } from "react";
import { Search, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { QuoteModalButton } from "@/components/QuoteModal";
import { Button } from "@/components/ui/button";
import type { CatalogChip, CatalogItem } from "@/lib/catalog";
import { cn } from "@/lib/utils";

interface CatalogProps {
  /** The view's title and line, set by the page (an h1 on a products page, an h2 on home). */
  heading: React.ReactNode;
  items: CatalogItem[];
  familyChips: CatalogChip[];
  /** The chosen family's types, when it has two or more. */
  typeChips?: CatalogChip[] | null;
  /** What the search box searches, as its placeholder says it ("Search buttons"). */
  searchPlaceholder?: string;
  /** Words the page opened with (?q=), such as a search from the home page. */
  initialQuery?: string;
}

// Family chips: 36px on phones so the families fit two rows, 40px from 640px;
// the selected one is solid plum. Type chips sit under them, smaller, the
// selected one a plum tint, so the two rows never read as one.
const CHIP = {
  family:
    "h-9 px-3 text-[0.8125rem] sm:h-10 sm:px-4 sm:text-sm border-border bg-background hover:border-foreground/30 hover:bg-muted",
  type: "h-8 px-3 text-[0.8125rem] border-border bg-background hover:border-foreground/30 hover:bg-muted",
};
const CHIP_ACTIVE = {
  family:
    "border-primary bg-primary text-primary-foreground hover:border-primary hover:bg-[color-mix(in_oklab,var(--primary)_88%,black)]",
  type: "border-primary bg-primary/10 text-primary hover:border-primary hover:bg-primary/15",
};

/** A row of filters. Each chip is a real link, so every filter has its own page and address. */
function Chips({ label, chips, variant }: { label: string; chips: CatalogChip[]; variant: "family" | "type" }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.href}>
            <Link
              href={chip.href}
              aria-current={chip.active ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border font-medium text-foreground transition-colors",
                CHIP[variant],
                chip.active && CHIP_ACTIVE[variant],
              )}
            >
              {chip.label}
              <span
                className={cn(
                  "text-xs tabular-nums",
                  chip.active ? (variant === "family" ? "text-primary-foreground/75" : "text-primary/75") : "text-muted-foreground",
                )}
              >
                {chip.count}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Everything a product can be found by: its name, type, family and spec values. */
const searchText = ({ product, typeLabel }: CatalogItem) =>
  [product.title, typeLabel, product.category?.title, ...(product.specifications ?? []).map((s) => s?.value)]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

/**
 * A catalogue view: the title, a search box, the family chips (and the chosen
 * family's types), then every product in the selection in a plain grid. The
 * search narrows the grid as you type; nothing found offers a quote instead.
 */
export default function Catalog({
  heading,
  items,
  familyChips,
  typeChips,
  searchPlaceholder = "Search products",
  initialQuery = "",
}: CatalogProps) {
  const [query, setQuery] = useState(initialQuery);
  const deferred = useDeferredValue(query);
  const searchId = useId();

  // The address keeps the search (?q=), so a reload or a shared link shows the same results.
  useEffect(() => {
    const url = new URL(window.location.href);
    const words = deferred.trim();
    if (words === (url.searchParams.get("q") ?? "")) return;
    if (words) url.searchParams.set("q", words);
    else url.searchParams.delete("q");
    window.history.replaceState(window.history.state, "", url);
  }, [deferred]);

  const terms = deferred.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const shown = terms.length ? items.filter((item) => terms.every((t) => searchText(item).includes(t))) : items;
  const searching = terms.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="min-w-0">{heading}</div>
        <div role="search" className="relative w-full sm:w-72 sm:shrink-0">
          <label htmlFor={searchId} className="sr-only">
            {searchPlaceholder}
          </label>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            autoComplete="off"
            className="h-10 w-full rounded-control border border-input bg-background pl-9 pr-9 text-[0.9375rem] placeholder:text-muted-foreground focus-visible:border-foreground [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear the search"
              className="absolute right-1 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-control text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>
      </div>

      <Chips label="Product families" chips={familyChips} variant="family" />
      {typeChips && <Chips label="Types" chips={typeChips} variant="type" />}

      <p aria-live="polite" className={cn("text-meta text-muted-foreground", !searching && "sr-only")}>
        {searching ? `${shown.length} of ${items.length} ${items.length === 1 ? "product matches" : "products match"} “${deferred.trim()}”` : ""}
      </p>

      {shown.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {shown.map((item, i) => (
            <li key={item.product._id}>
              <ProductCard product={item.product} typeLabel={item.typeLabel} fallback={item.fallback} priority={i < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-lg border border-dashed border-input px-5 py-10 text-center">
          <p className="font-semibold">Nothing here matches “{deferred.trim()}”.</p>
          <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
            We make more than the catalogue shows. Send a drawing, a photo or a sample and we&apos;ll quote it.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <QuoteModalButton product={deferred.trim()} size="default" text="Request a quote" />
            <Button variant="outline" onClick={() => setQuery("")}>
              Clear the search
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
