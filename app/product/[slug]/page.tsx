import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { Phone, Mail, MessageCircle, ChevronLeft } from "lucide-react";

async function getProduct(slug: string) {
    const query = `*[_type == "product" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        images,
        isFeatured,
        isPopular,
        description,
        "category": category->{
            _id,
            title,
            slug,
            parent
        }
    }`;
    return await client.fetch(query, { slug }, { next: { revalidate: 30 } });
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">Product not found.</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="container mx-auto max-w-6xl p-6 md:p-12">
                <Link 
                    href="/products" 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-purple-600 mb-8 transition-colors font-medium group"
                >
                    <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to products
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100">
                            {product.images?.[0] ? (
                                <img
                                    src={urlFor(product.images[0]).width(800).height(1000).url()}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                    No Image
                                </div>
                            )}
                        </div>
                        {/* Thumbnails if multiple images (optional for now) */}
                        {product.images?.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                {product.images.map((img: any, idx: number) => (
                                    <div key={idx} className="w-24 aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                                        <img src={urlFor(img).width(200).height(200).url()} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <span className="inline-block bg-purple-50 text-purple-600 text-sm font-bold px-3 py-1 rounded-full mb-4">
                                {product.category?.title}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                {product.title}
                            </h1>
                        </div>

                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed mb-12">
                            {product.description ? (
                                <PortableText value={product.description} />
                            ) : (
                                <p>High-quality {product.title} sourced and manufactured with precision by Metro Textile.</p>
                            )}
                        </div>

                        <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a 
                                href="https://wa.me/yournumber" 
                                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-green-200"
                            >
                                <MessageCircle className="w-5 h-5" />
                                WhatsApp Quote
                            </a>
                            <a 
                                href="mailto:contact@metrotextile.com" 
                                className="flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg shadow-slate-200"
                            >
                                <Mail className="w-5 h-5" />
                                Email Inquiry
                            </a>
                            <a 
                                href="tel:+9200000000" 
                                className="sm:col-span-2 flex items-center justify-center gap-3 bg-white hover:bg-slate-50 text-slate-900 font-bold py-4 px-8 rounded-2xl border-2 border-slate-900 transition-all"
                            >
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
