"use client"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/image"
import { Button } from "@/components/ui/button"
import { IconBrandWhatsapp, IconMailFilled } from "@tabler/icons-react"
import { PhoneIcon } from "@/icons"

interface ProductCardProps {
    product: {
        _id: string
        title: string
        slug: { current: string }
        images: any[]
        category: {
            title: string
        }
        isFeatured?: boolean
        isPopular?: boolean
    }
    categoryPath: string
}

export default function ProductCard({ product, categoryPath }: ProductCardProps) {
    const mainImage = product.images?.[0]
    const productUrl = `/product/${product.slug.current}`

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100 flex flex-col h-full">
            {/* Image Section - Edge to Edge in container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                {mainImage ? (
                    <Image
                        src={urlFor(mainImage).width(600).height(450).url()}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                        No Image
                    </div>
                )}

                {/* Category Badge - Absolute Bottom Left */}
                <div className="absolute bottom-3 left-3 z-10">
                    <Link
                        href={categoryPath}
                        className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-semibold px-2 py-1 rounded-lg border border-slate-200/50 hover:bg-purple-600 hover:text-white transition-colors block w-fit"
                    >
                        {product.category?.title}
                    </Link>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow bg-white">
                <Link href={productUrl}>
                    <h3 className="text-lg font-bold text-slate-900">
                        {product.title}
                    </h3>
                </Link>

                {/* Action Row - Unified style, no divider as requested */}
                <div className="mt-5 flex items-center gap-2">
                    <Button
                        size="lg"
                        variant="secondary"
                        href={`mailto:info@metrotextile.com?subject=Inquiry: ${product.title}`}
                        className="flex-1 text-slate-600 font-semibold"
                    >
                        <IconMailFilled /> Email
                    </Button>

                    <Button
                        size="lg"
                        variant="secondary"
                        href={`tel:+1234567890`}
                        className="flex-1 text-slate-600 font-semibold"
                    >
                        <PhoneIcon /> Call
                    </Button>

                    <Button
                        size="lg"
                        variant="default"
                        href={`https://wa.me/1234567890?text=I'm interested in ${product.title}`}
                        className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 "
                    >
                        <IconBrandWhatsapp />
                    </Button>

                </div>
            </div>
        </div>
    )
}
