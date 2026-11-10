"use client";

import { Autocomplete } from "@base-ui/react/autocomplete";
import Form from "next/form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

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
type Props = { categories: SearchSuggestion[]; products: SearchSuggestion[] };

const words = (s: string) => s.trim().toLowerCase().split(/\s+/).filter(Boolean);
const matches = (s: SearchSuggestion, terms: string[]) => {
  const text = `${s.label} ${s.meta ?? ""}`.toLowerCase();
  return terms.every((t) => text.includes(t));
};

const FIELD =
  "w-full rounded-control border border-input bg-background pl-9 pr-3 text-base outline-none placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-3 focus-visible:ring-foreground/10";

/**
 * The hero's search: suggestions as you type. Opening the field lists every
 * category and type; typing narrows them and adds matching products. Picking a
 * suggestion opens its page; pressing Enter without picking one searches the
 * catalogue for the words typed (/products?q=).
 *
 * From 768px the suggestions drop down under the field. Below that, the field
 * opens a bottom sheet with its own field on top and the suggestions under it,
 * so the phone keyboard never covers them. Both are rendered and CSS picks one,
 * so the hero does not shift while the page hydrates.
 */
export default function HeroSearch(props: Props) {
  return (
    <>
      <DropdownSearch {...props} />
      <SheetSearch {...props} />
    </>
  );
}

/** The groups for what has been typed so far. */
function useSuggestions({ categories, products }: Props) {
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

  // The "See all results" row fills the field with the words typed, not its own label.
  const itemToStringValue = (item: SearchSuggestion) => (item.href.startsWith("/products?q=") ? typed : item.label);

  return { value, setValue, groups, itemToStringValue };
}

/** Desktop: the field and the ink Search button, with suggestions in a floating list. */
function DropdownSearch(props: Props) {
  const router = useRouter();
  const { value, setValue, groups, itemToStringValue } = useSuggestions(props);

  return (
    <Form action="/products" role="search" className="hidden w-full max-w-md gap-2 md:flex">
      <Autocomplete.Root
        items={groups}
        // The groups are filtered above, so the list shows them as given.
        mode="none"
        value={value}
        onValueChange={(next) => setValue(next)}
        openOnInputClick
        itemToStringValue={itemToStringValue}
      >
        <div className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Autocomplete.Input
            name="q"
            aria-label="Search products"
            placeholder="Search products"
            autoComplete="off"
            className={cn(FIELD, "h-11 sm:text-[0.9375rem]")}
          />
        </div>
        <Autocomplete.Portal>
          <Autocomplete.Positioner sideOffset={6} align="start" className="z-[60] w-[var(--anchor-width)]">
            <Autocomplete.Popup className="max-h-[min(22rem,var(--available-height))] overflow-y-auto rounded-lg border border-border bg-popover py-1 text-popover-foreground shadow-[0_8px_24px_rgb(0_0_0/0.08)] outline-none data-[empty]:hidden">
              <Autocomplete.List>
                {(group: Group) => <SuggestionGroup key={group.value} group={group} onPick={(item) => router.push(item.href)} />}
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

/** Phones: a field-shaped button that opens a bottom sheet holding the real field and the suggestions. */
function SheetSearch(props: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const { value, setValue, groups, itemToStringValue } = useSuggestions(props);

  const pick = (item: SearchSuggestion) => {
    setOpen(false);
    router.push(item.href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <button type="button" className={cn(FIELD, "relative flex h-11 items-center text-left md:hidden", !value.trim() && "text-muted-foreground")}>
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <span className="truncate">{value.trim() || "Search products"}</span>
          </button>
        }
      />
      {/* A fixed height, so the sheet does not jump as the list narrows; the
          height goes through the data-[side=bottom] variant to outweigh the base h-auto. */}
      <SheetContent
        side="bottom"
        showCloseButton={false}
        initialFocus={input}
        className="gap-0 rounded-t-lg shadow-none data-[side=bottom]:h-[85dvh]"
      >
        <SheetTitle className="sr-only">Search products</SheetTitle>
        <Form action="/products" role="search" className="flex min-h-0 flex-1 flex-col">
          <Autocomplete.Root
            inline
            items={groups}
            mode="none"
            value={value}
            onValueChange={(next) => setValue(next)}
            itemToStringValue={itemToStringValue}
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                <Autocomplete.Input
                  ref={input}
                  name="q"
                  type="search"
                  enterKeyHint="search"
                  aria-label="Search products"
                  placeholder="Search products"
                  autoComplete="off"
                  className={cn(FIELD, "h-11 [&::-webkit-search-cancel-button]:hidden")}
                />
              </div>
              <SheetClose render={<Button type="button" variant="ghost" className="h-11 px-3" />}>Cancel</SheetClose>
              {/* Base UI adds a hidden text field to the form, and a form with two text
                  fields only submits on Enter when it has a submit button. */}
              <button type="submit" className="sr-only">
                Search
              </button>
            </div>
            <Autocomplete.List className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-1 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
              {(group: Group) => <SuggestionGroup key={group.value} group={group} onPick={pick} roomy />}
            </Autocomplete.List>
          </Autocomplete.Root>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

/** One group of suggestions: its label, then a row per suggestion. Rows are taller in the sheet, for thumbs. */
function SuggestionGroup({ group, onPick, roomy = false }: { group: Group; onPick: (item: SearchSuggestion) => void; roomy?: boolean }) {
  return (
    <Autocomplete.Group items={group.items} className="py-1">
      {group.value !== "Search" && (
        <Autocomplete.GroupLabel className="px-3 pb-1 pt-1 text-meta font-medium text-muted-foreground">{group.value}</Autocomplete.GroupLabel>
      )}
      <Autocomplete.Collection>
        {(item: SearchSuggestion) => (
          <Autocomplete.Item
            key={item.href}
            value={item}
            onClick={() => onPick(item)}
            className={cn(
              "mx-1 flex cursor-pointer items-center gap-3 rounded-md px-2 outline-none data-[highlighted]:bg-muted",
              roomy ? "min-h-12 text-[0.9375rem]" : "min-h-10 text-sm",
            )}
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
  );
}
