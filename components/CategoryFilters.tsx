"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

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
    // Build tree or just find children of current active category
    const currentCategory = useMemo(() =>
        categories.find(c => c._id === activeCategoryId),
        [categories, activeCategoryId]);

    // Sub-categories to display: 
    // If a category is selected, show its children.
    // Otherwise, show top-level categories.
    const displayCategories = useMemo(() => {
        return categories.filter(c =>
            activeCategoryId
                ? c.parent?._ref === activeCategoryId
                : !c.parent
        );
    }, [categories, activeCategoryId]);

    // Helper to build the path for the chip links
    const getChipHref = (catSlug: string) => {
        if (!activeCategoryId) return `/products/${catSlug}`;

        // Find current category path
        const path: string[] = [];
        let curr = currentCategory;
        while (curr) {
            path.unshift(curr.slug.current);
            const parentId = curr.parent?._ref;
            curr = parentId ? categories.find(c => c._id === parentId) : undefined;
        }
        return `/products/${path.join("/")}/${catSlug}`;
    };

    return (
        <div className="flex flex-col gap-6 mb-12">
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
                {displayCategories.length > 0 ? (
                    displayCategories.map(cat => (
                        <Button
                            key={cat._id}
                            href={getChipHref(cat.slug.current)}
                            variant={"outline"}
                        >
                            {cat.title}
                        </Button>
                    ))
                ) : (
                    activeCategoryId && (
                        <p className="text-sm text-slate-400 italic">No further sub-categories</p>
                    )
                )}
            </div>
        </div>
    );
}
