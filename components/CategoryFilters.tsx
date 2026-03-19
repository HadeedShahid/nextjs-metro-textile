"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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

    // Find the path from root to current category for breadcrumbs and link building
    const path = useMemo(() => {
        const p: Category[] = [];
        let current = currentCategory;
        while (current) {
            p.unshift(current);
            const parentId = current.parent?._ref;
            current = parentId ? categories.find(c => c._id === parentId) : undefined;
        }
        return p;
    }, [categories, currentCategory]);

    const basePath = "/products";
    const currentPath = path.length > 0 
        ? `${basePath}/${path.map(c => c.slug.current).join("/")}`
        : basePath;

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

    return (
        <div className="flex flex-col gap-6 mb-12">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap pb-2 no-scrollbar">
                <Link href="/products" className="hover:text-purple-600 transition-colors">
                    Home
                </Link>
                {path.map((cat, i) => {
                    const breadcrumbPath = `${basePath}/${path.slice(0, i + 1).map(c => c.slug.current).join("/")}`;
                    return (
                        <div key={cat._id} className="flex items-center gap-2">
                            <ChevronRight className="w-3 h-3 text-slate-300 shrink-0" />
                            <Link 
                                href={breadcrumbPath}
                                className={`hover:text-purple-600 transition-colors ${i === path.length - 1 ? 'font-semibold text-slate-900' : ''}`}
                            >
                                {cat.title}
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
                {displayCategories.length > 0 ? (
                    displayCategories.map(cat => (
                        <Link
                            key={cat._id}
                            href={`${currentPath === basePath ? basePath : currentPath}/${cat.slug.current}`}
                            className="bg-slate-50 hover:bg-purple-100 border border-slate-100 hover:border-purple-200 text-slate-700 hover:text-purple-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm"
                        >
                            {cat.title}
                        </Link>
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
