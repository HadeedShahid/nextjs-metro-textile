import { fetchParentCategories } from "@/lib/api";
import CategoryShowcase from "./CategoryShowcase";

export default async function ParentCategoryShowcase() {
    const { data: categories } = await fetchParentCategories();

    if (!categories || categories.length === 0) return null;

    return (
        <>
            {categories.map((category) => (
                <CategoryShowcase
                    key={category.slug}
                    categorySlug={category.slug}
                />
            ))}
        </>
    );
}
