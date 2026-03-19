import Link from "next/link";
import { urlFor } from "@/sanity/image"; // Need to create this utility
import { Phone, Mail, MessageCircle, Info } from "lucide-react";

interface ProductCardProps {
    product: {
        _id: string;
        title: string;
        slug: { current: string };
        images: any[];
        category: { title: string };
        isFeatured?: boolean;
        isPopular?: boolean;
    };
    categoryPath: string;
}

export default function ProductCard({ product, categoryPath }: ProductCardProps) {
    const mainImage = product.images?.[0];

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
            {/* Image Section */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                {product.isFeatured && (
                    <span className="absolute top-3 left-3 z-10 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Featured
                    </span>
                )}
                {product.isPopular && !product.isFeatured && (
                    <span className="absolute top-3 left-3 z-10 bg-amber-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Popular
                    </span>
                )}
                
                {mainImage ? (
                    <img
                        src={urlFor(mainImage).width(600).height(450).url()}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        No Image
                    </div>
                )}
                
                <div className="absolute bottom-3 left-3">
                    <Link 
                        href={categoryPath}
                        className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-semibold px-2 py-1 rounded-lg border border-slate-200/50 hover:bg-purple-600 hover:text-white transition-colors"
                    >
                        {product.category?.title}
                    </Link>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow bg-white">
                <Link href={`/product/${product.slug.current}`}>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1 group-hover:text-purple-600 transition-colors">
                        {product.title}
                    </h3>
                </Link>

                {/* Info Text can be added here if needed */}
                <div className="mt-4 flex items-center gap-2 pt-4 border-t border-slate-50">
                    <button className="flex-1 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-600 p-2 rounded-xl transition-colors group/btn">
                        <Mail className="w-4 h-4 mx-auto" />
                    </button>
                    <button className="flex-1 bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-600 p-2 rounded-xl transition-colors group/btn">
                        <Phone className="w-4 h-4 mx-auto" />
                    </button>
                    <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 p-2 rounded-xl transition-colors">
                        <MessageCircle className="w-4 h-4 mx-auto" />
                    </button>
                    <Link 
                        href={`/product/${product.slug.current}`} 
                        className="flex-1 bg-purple-50 hover:bg-purple-100 text-purple-600 p-2 rounded-xl transition-colors"
                    >
                        <Info className="w-4 h-4 mx-auto" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
