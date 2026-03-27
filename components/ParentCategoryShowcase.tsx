import { client } from "@/sanity/client";
import CategoryShowcase from "./CategoryShowcase";

const PARENT_CATEGORIES_QUERY = `*[_type == "category" && !defined(parent) && defined(slug.current)] | order(title asc) {
    "slug": slug.current
}`;

const options = { next: { revalidate: 30 } };

export default async function ParentCategoryShowcase() {
    const categories = await client.fetch<{ slug: string }[]>(
        PARENT_CATEGORIES_QUERY,
        {},
        options
    );

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
