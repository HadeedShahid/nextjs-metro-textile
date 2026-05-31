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

export default function CategoryFilters({
  categories,
  activeCategoryId,
}: CategoryFiltersProps) {
  const currentCategory = useMemo(
    () => categories.find((c) => c._id === activeCategoryId),
    [categories, activeCategoryId],
  );

  const activePath = useMemo(() => {
    const path: Category[] = [];
    let curr = currentCategory;
    while (curr) {
      path.unshift(curr);
      const parentId = curr.parent?._ref;
      curr = parentId ? categories.find((c) => c._id === parentId) : undefined;
    }
    return path;
  }, [categories, currentCategory]);

  const displayCategories = useMemo(
    () =>
      categories.filter((c) =>
        activeCategoryId
          ? c.parent?._ref === activeCategoryId
          : !c.parent,
      ),
    [categories, activeCategoryId],
  );

  const getPathHref = (pathSlice: Category[]) => {
    if (pathSlice.length === 0) return "/products";
    return `/products/${pathSlice.map((c) => c.slug.current).join("/")}`;
  };

  const hasSubCategories = displayCategories.length > 0 && activeCategoryId;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2 items-center">
        {/* All Products — root only */}
        {!activeCategoryId && (
          <Button href="/products" variant="default" className="rounded-full px-4">
            All Products
          </Button>
        )}

        {/* Active path chips */}
        {activePath.map((cat, index) => (
          <div
            key={cat._id}
            className="flex items-center gap-1 animate-in fade-in slide-in-from-left-2 duration-200"
          >
            <Button className="rounded-full pl-4 pr-2 gap-2">
              {cat.title}
              <Link
                href={getPathHref(activePath.slice(0, index))}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Remove ${cat.title} filter`}
              >
                <X size={14} />
              </Link>
            </Button>
          </div>
        ))}

        {/* Divider between active chips and subcategory options */}
        {hasSubCategories && (
          <div className="w-px h-6 bg-slate-200 mx-1 shrink-0" />
        )}

        {/* Subcategory chips */}
        {displayCategories.map((cat) => (
          <Button
            key={cat._id}
            href={getPathHref([...activePath, cat])}
            variant="outline"
            className="rounded-full px-4"
          >
            {cat.title}
          </Button>
        ))}
      </div>

    </div>
  );
}
