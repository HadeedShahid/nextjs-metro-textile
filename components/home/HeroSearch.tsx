"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

/** One suggestion: a category, a type or a product, and the page it opens. */
export type SearchSuggestion = {
  label: string;
  href: string;
  /** A quiet note on the right: a style count, or the family or type it belongs to. */
  meta: string | null;
  /** A small studio cut-out, for categories only; product photos often carry a client's mark. */
  thumb: string | null;
};

type Group = { value: string; items: SearchSuggestion[] };

const words = (s: string) => s.trim().toLowerCase().split(/\s+/).filter(Boolean);
const matches = (s: SearchSuggestion, terms: string[]) => {
  const text = `${s.label} ${s.meta ?? ""}`.toLowerCase();
  return terms.every((t) => text.includes(t));
};

/**
 * The hero's search: suggestions as you type. Opening the field lists every
 * category and type; typing narrows them and adds matching products. Picking a
 * suggestion opens its page; pressing Enter without picking one searches the
 * catalogue for the words typed (/products?q=).
 */
export default function HeroSearch({ categories, products }: { categories: SearchSuggestion[]; products: SearchSuggestion[] }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const typed = value.trim();

  const groups = useMemo<Group[]>(() => {
    const terms = words(typed);
    const cats = terms.length ? categories.filter((s) => matches(s, terms)).slice(0, 5) : categories;
    const prods = terms.length ? products.filter((s) => matches(s, terms)).slice(0, 6) : [];
    const out: Group[] = [];
    if (cats.length) out.push({ value: "Categories", items: cats });
    if (prods.length) out.push({ value: "Products", items: prods });
    if (typed) {
      out.push({
        value: "Search",
        items: [{ label: `See all results for “${typed}”`, href: `/products?q=${encodeURIComponent(typed)}`, meta: null, thumb: null }],
      });
    }
    return out;
  }, [typed, categories, products]);

  return (
    <Form action="/products" role="search" className="flex w-full max-w-md gap-2">
      <Autocomplete.Root
        items={groups}
        // The groups are filtered above, so the list shows them as given.
        mode="none"
        value={value}
        onValueChange={(next) => setValue(next)}
        openOnInputClick
        itemToStringValue={(item: SearchSuggestion) => (item.href.startsWith("/products?q=") ? typed : item.label)}
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Autocomplete.Input
            name="q"
            aria-label="Search products"
            placeholder="Search products"
            autoComplete="off"
            className="h-11 w-full rounded-control border border-input bg-background pl-9 pr-3 text-base outline-none placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-3 focus-visible:ring-foreground/10 sm:text-[0.9375rem]"
          />
        </div>
        <Autocomplete.Portal>
          <Autocomplete.Positioner sideOffset={6} align="start" className="z-[60] w-[var(--anchor-width)]">
            <Autocomplete.Popup className="max-h-[min(22rem,var(--available-height))] overflow-y-auto rounded-lg border border-border bg-popover py-1 text-popover-foreground shadow-[0_8px_24px_rgb(0_0_0/0.08)] outline-none data-[empty]:hidden">
              <Autocomplete.List>
                {(group: Group) => (
                  <Autocomplete.Group key={group.value} items={group.items} className="py-1">
                    {group.value !== "Search" && (
                      <Autocomplete.GroupLabel className="px-3 pb-1 pt-1 text-meta font-medium text-muted-foreground">
                        {group.value}
                      </Autocomplete.GroupLabel>
                    )}
                    <Autocomplete.Collection>
                      {(item: SearchSuggestion) => (
                        <Autocomplete.Item
                          key={item.href}
                          value={item}
                          onClick={() => router.push(item.href)}
                          className="mx-1 flex min-h-10 cursor-pointer items-center gap-3 rounded-md px-2 text-sm outline-none data-[highlighted]:bg-muted"
                        >
                          {item.thumb ? (
                            <span className="relative size-8 shrink-0 overflow-hidden rounded-md bg-muted">
                              <Image src={item.thumb} alt="" fill unoptimized className="object-contain p-0.5" />
                            </span>
                          ) : group.value === "Search" ? (
                            <Search className="mx-2 size-4 shrink-0 text-muted-foreground" aria-hidden />
                          ) : null}
                          <span className="min-w-0 flex-1 truncate">{item.label}</span>
                          {item.meta && <span className="shrink-0 text-meta text-muted-foreground">{item.meta}</span>}
                          {group.value === "Search" && <ArrowRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
                        </Autocomplete.Item>
                      )}
                    </Autocomplete.Collection>
                  </Autocomplete.Group>
                )}
              </Autocomplete.List>
            </Autocomplete.Popup>
          </Autocomplete.Positioner>
        </Autocomplete.Portal>
      </Autocomplete.Root>
      <Button type="submit" variant="ink" size="lg" className="px-5">
        Search
      </Button>
    </Form>
  );
}
