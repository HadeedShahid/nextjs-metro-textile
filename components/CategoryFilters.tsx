"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface Category {
  _id: string;
  title: string;
  slug: { current: string };
  parent?: { _ref: string };
}

interface CategoryFiltersProps {
  categories: Category[];
  activeCategoryId: string | null;
}

function pathHref(path: Category[]) {
  return path.length
    ? `/products/${path.map((c) => c.slug.current).join("/")}`
    : "/products";
}

function DismissChip({ cat, href }: { cat: Category; href: string }) {
  return (
    <div className="flex items-center animate-in fade-in slide-in-from-left-2 duration-200">
      <Button className="rounded-full pl-4 pr-2 gap-2">
        {cat.title}
        <Link
          href={href}
          className="hover:bg-white/20 rounded-full p-1 transition-colors"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Remove ${cat.title} filter`}
        >
          <X size={14} />
        </Link>
      </Button>
    </div>
  );
}

export default function CategoryFilters({
  categories,
  activeCategoryId,
}: CategoryFiltersProps) {
  // Full ancestor chain for the active category
  const activePath = useMemo(() => {
    const path: Category[] = [];
    let curr = categories.find((c) => c._id === activeCategoryId);
    while (curr) {
      path.unshift(curr);
      curr = curr.parent?._ref
        ? categories.find((c) => c._id === curr!.parent!._ref)
        : undefined;
    }
    return path;
  }, [categories, activeCategoryId]);

  // Leaf = active category has no children
  const isLeaf =
    !!activeCategoryId &&
    !categories.some((c) => c.parent?._ref === activeCategoryId);

  // Top-level leaf = selected category has no parent AND no children (e.g. Buckles, Plates)
  const isTopLevelLeaf = isLeaf && !activePath.at(-1)?.parent?._ref;

  // Chips shown after the breadcrumb row
  const subChips = useMemo(() => {
    if (!activeCategoryId) return categories.filter((c) => !c.parent);

    const children = categories.filter((c) => c.parent?._ref === activeCategoryId);
    if (children.length) return children;

    // Leaf: show siblings, selected first
    const parentId = activePath.at(-1)?.parent?._ref;
    const siblings = categories
      .filter((c) => (parentId ? c.parent?._ref === parentId : !c.parent))
      .sort((a, b) => (a._id === activeCategoryId ? -1 : b._id === activeCategoryId ? 1 : 0));

    // Top-level leaf: active chip lives in breadcrumbs — exclude it from subChips
    return isTopLevelLeaf ? siblings.filter((c) => c._id !== activeCategoryId) : siblings;
  }, [categories, activeCategoryId, activePath, isTopLevelLeaf]);

  // Breadcrumb row:
  // - Non-leaf: full ancestor path
  // - Leaf with parent: strip leaf (it moves into subChips with inline X)
  // - Top-level leaf: keep the category itself here (nothing above it to show)
  const breadcrumbs = isTopLevelLeaf
    ? activePath
    : isLeaf
    ? activePath.slice(0, -1)
    : activePath;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {!activeCategoryId && (
        <Button href="/products" variant="default" className="rounded-full px-4">
          All Products
        </Button>
      )}

      {breadcrumbs.map((cat, i) => (
        <DismissChip key={cat._id} cat={cat} href={pathHref(activePath.slice(0, i))} />
      ))}

      {!isTopLevelLeaf && subChips.length > 0 && activeCategoryId && (
        <div className="w-px h-6 bg-slate-200 mx-1 shrink-0" />
      )}

      {!isTopLevelLeaf &&
        subChips.map((cat) => {
          const isActive = cat._id === activeCategoryId;
          const href = isLeaf
            ? pathHref([...activePath.slice(0, -1), cat])
            : pathHref([...activePath, cat]);

          return isActive ? (
            <DismissChip key={cat._id} cat={cat} href={pathHref(activePath.slice(0, -1))} />
          ) : (
            <Button key={cat._id} href={href} variant="outline" className="rounded-full px-4">
              {cat.title}
            </Button>
          );
        })}
    </div>
  );
}
