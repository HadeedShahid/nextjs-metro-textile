import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import ProductContactActions from "@/components/common/ProductContactActions";

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    slug: { current: string };
    images: any[];
    category: { title: string } | null;
    isFeatured?: boolean;
    isPopular?: boolean;
    excerpt?: string | null;
    specifications?: { label: string | null; value: string | null }[] | null;
  };
  categoryPath: string;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function ProductCard({
  product,
  categoryPath,
}: ProductCardProps) {
  const mainImage = product.images?.[0];
  const imageCount = product.images?.length ?? 0;
  const productUrl = `/product/${product.slug.current}`;

  // Up to 3 spec values condensed into one elegant attribute line.
  const attrLine = (product.specifications ?? [])
    .filter((s) => s?.value)
    .slice(0, 3)
    .map((s) => cap(s.value as string))
    .join("  ·  ");

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f6f3f7]">
        {mainImage ? (
          <Image
            src={urlFor(mainImage).width(640).height(480).url()}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">
            No Image
          </div>
        )}

        {/* Featured marker */}
        {product.isFeatured && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-primary shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Featured
          </span>
        )}

        {/* Image-count dots */}
        {imageCount > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex gap-1">
            {Array.from({ length: Math.min(imageCount, 4) }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i === 0 ? "bg-primary" : "bg-primary/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {product.category?.title && (
          <Link
            href={categoryPath}
            className="relative z-10 mb-1.5 w-fit text-[11px] font-medium uppercase tracking-[0.09em] text-slate-400 transition-colors hover:text-primary"
          >
            {product.category.title}
          </Link>
        )}

        <h3 className="text-base font-semibold leading-snug text-slate-900">
          <Link href={productUrl} className="after:absolute after:inset-0">
            {product.title}
          </Link>
        </h3>

        {attrLine && (
          <p className="mt-2 line-clamp-1 text-[13px] leading-relaxed text-slate-500">
            {attrLine}
          </p>
        )}

        {/* CTA row */}
        <ProductContactActions
          productTitle={product.title}
          className="relative z-10 mt-auto pt-4"
        />
      </div>
    </article>
  );
}
