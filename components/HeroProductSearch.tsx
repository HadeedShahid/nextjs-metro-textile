"use client";

import { useRouter } from "next/navigation";
import SearchSelect, { type SearchSelectGroup } from "@/components/common/SearchSelect";

export interface HeroSearchItem {
  title: string;
  href: string;
  parentTitle?: string | null;
}

export default function HeroProductSearch({
  items,
  className,
}: {
  items: HeroSearchItem[];
  className?: string;
}) {
  const router = useRouter();

  const categories = items
    .filter((item) => !item.parentTitle)
    .sort((a, b) => a.title.localeCompare(b.title));
  const subcategories = items
    .filter((item) => item.parentTitle)
    .sort((a, b) => a.title.localeCompare(b.title));

  const groups: SearchSelectGroup[] = [
    {
      heading: "Categories",
      items: categories.map((item) => ({ label: item.title, value: item.href })),
    },
    {
      heading: "Subcategories",
      items: subcategories.map((item) => ({
        label: item.title,
        value: item.href,
        meta: item.parentTitle,
      })),
    },
  ];

  return (
    <SearchSelect
      groups={groups}
      onSelect={(href) => router.push(href)}
      placeholder="Search categories…"
      triggerLabel="Search categories"
      emptyText="No categories found."
      sheetTitle="Browse categories"
      className={className}
    />
  );
}
