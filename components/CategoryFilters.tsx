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

export default function CategoryFilters({ categories, activeCategoryId }: CategoryFiltersProps) {
    // Find current category
    const currentCategory = useMemo(() =>
        categories.find(c => c._id === activeCategoryId),
        [categories, activeCategoryId]);

    // Build the full active path
    const activePath = useMemo(() => {
        const path: Category[] = [];
        let curr = currentCategory;
        while (curr) {
            path.unshift(curr);
            const parentId = curr.parent?._ref;
            curr = parentId ? categories.find(c => c._id === parentId) : undefined;
        }
        return path;
    }, [categories, currentCategory]);

    // Sub-categories to display as available options
    const displayCategories = useMemo(() => {
        return categories.filter(c =>
            activeCategoryId
                ? c.parent?._ref === activeCategoryId
                : !c.parent
        );
    }, [categories, activeCategoryId]);

    // Helper to build Href for any path slice
    const getPathHref = (pathSlice: Category[]) => {
        if (pathSlice.length === 0) return "/products";
        const slugs = pathSlice.map(c => c.slug.current);
        return `/products/${slugs.join("/")}`;
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 items-center">
                {/* 1. All Products - Only show at root level */}
                {!activeCategoryId && (
                    <Button
                        href="/products"
                        variant="default"
                        className="rounded-full px-4"
                    >
                        All Products
                    </Button>
                )}

                {/* 2. Active Path Chips (Breadchips) */}
                {activePath.map((cat, index) => {
                    const parentHref = getPathHref(activePath.slice(0, index));
                    return (
                        <div key={cat._id} className="flex items-center gap-1 group/chip animate-in fade-in slide-in-from-left-2 duration-300">
                            <Button
                                className="rounded-full pl-4 pr-2 flex items-center gap-2"
                            >
                                <span>{cat.title}</span>
                                <Link
                                    href={parentHref}
                                    className="hover:bg-white/20 rounded-full p-1 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <X size={14} />
                                </Link>
                            </Button>
                        </div>
                    );
                })}

                {/* 3. Available Sub-category Chips */}
                {displayCategories.map(cat => (
                    <Button
                        key={cat._id}
                        href={getPathHref([...activePath, cat])}
                        variant={"outline"}
                        className="rounded-full px-4"
                    >
                        {cat.title}
                    </Button>
                ))}
            </div>

            {/* No further options indicator */}
            {displayCategories.length === 0 && activeCategoryId && (
                <p className="text-xs text-slate-400 italic px-1">No further sub-categories</p>
            )}
        </div>
    );
}
