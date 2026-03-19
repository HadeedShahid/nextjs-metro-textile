import { client } from "@/sanity/client";
import ProductCard from "@/components/ProductCard";
import CategoryFilters from "@/components/CategoryFilters";

const PRODUCTS_QUERY = `*[_type == "product" && defined(slug.current)] {
    _id,
    title,
    slug,
    images,
    isFeatured,
    isPopular,
    "category": category->{
        _id,
        title,
        slug,
        parent
    }
}`;

const CATEGORIES_QUERY = `*[_type == "category" && defined(slug.current)] {
    _id,
    title,
    slug,
    parent
}`;

const options = { next: { revalidate: 30 } };

export default async function ProductsPage({
    params,
}: {
    params: Promise<{ slug?: string[] }>;
}) {
    const { slug: slugArray } = await params;

    // Fetch products and categories
    const [products, categories] = await Promise.all([
        client.fetch<any[]>(PRODUCTS_QUERY, {}, options),
        client.fetch<any[]>(CATEGORIES_QUERY, {}, options),
    ]);

    // Resolve activeCategoryId from slugArray
    let activeCategoryId: string | null = null;
    if (slugArray && slugArray.length > 0) {
        let currentParentId: string | undefined = undefined;
        for (const slugPart of slugArray) {
            const matchedCategory = categories.find(c => 
                c.slug.current === slugPart && 
                (currentParentId ? c.parent?._ref === currentParentId : !c.parent)
            );
            if (matchedCategory) {
                activeCategoryId = matchedCategory._id;
                currentParentId = matchedCategory._id;
            } else {
                // Break if path is invalid
                activeCategoryId = null;
                break;
            }
        }
    }

    // Filtering logic:
    // If a category is selected, we want to show products in that category
    // OR any of its descendants.
    const filteredProducts = products.filter(product => {
        if (!activeCategoryId) return true;
        
        const checkCategoryMatch = (catId: string | undefined): boolean => {
            if (!catId) return false;
            if (catId === activeCategoryId) return true;
            
            // Check the current category's parent
            const cat = categories.find(c => c._id === catId);
            return checkCategoryMatch(cat?.parent?._ref);
        };

        return checkCategoryMatch(product.category?._id);
    });

    // Helper to get full slug path for a category
    const getCategoryPath = (catId: string | undefined): string => {
        if (!catId) return "/products";
        const path: string[] = [];
        let current = categories.find(c => c._id === catId);
        while (current) {
            path.unshift(current.slug.current);
            const parentId = current.parent?._ref;
            current = parentId ? categories.find(c => c._id === parentId) : undefined;
        }
        return `/products/${path.join("/")}`;
    };

    return (
        <main className="min-h-screen bg-slate-50/30">
            <div className="container mx-auto max-w-7xl p-6 md:p-12">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
                        Explore Our <span className="text-purple-600">Inventory</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl">
                        High-quality textile accessories and product sourcing for your industry needs.
                    </p>
                </header>

                <CategoryFilters 
                    categories={categories} 
                    activeCategoryId={activeCategoryId || null} 
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard 
                                key={product._id} 
                                product={product} 
                                categoryPath={getCategoryPath(product.category?._id)}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-400 text-lg">No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
