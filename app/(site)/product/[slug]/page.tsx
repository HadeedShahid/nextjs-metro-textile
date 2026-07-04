import type { Metadata } from "next";
import { fetchProductBySlug } from "@/lib/api";
import { urlFor } from "@/sanity/image";
import { toPlainText } from "@/lib/portable-text";
import JsonLd from "@/components/common/JsonLd";
import {
  productSchema,
  breadcrumbSchema,
  type Crumb,
} from "@/lib/structured-data";
import { PortableText } from "next-sanity";
import { Card } from "@/components/ui/card";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductContactActions from "@/components/common/ProductContactActions";
import ImageGallery from "@/components/common/ImageGallery";
import SpecificationGrid from "@/components/common/SpecificationGrid";
import OurClient from "@/components/OurClient";
import Cta from "@/components/Cta";
import BlogSection from "@/components/common/BlogSection";
import KeyFeatures from "@/components/common/KeyFeatures";
import RelatedProducts from "@/components/common/RelatedProducts";
import Section from "@/components/base/Section";

/** Absolute /products path for a product's category. */
function categoryHref(category: {
  slug: string;
  parent: { slug: string } | null;
}): string {
  return `/products/${category.parent ? `${category.parent.slug}/` : ""}${category.slug}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await fetchProductBySlug(slug);

  if (!product) return { title: "Product Not Found" };

  // Use Sanity-authored meta fields when set; fall back to auto-generated.
  const excerpt = product.description
    ? toPlainText(product.description).slice(0, 110).trim()
    : "";
  const autoDescription = (
    excerpt
      ? `${excerpt}. Contact Metro Metal for MOQ, samples and custom orders.`
      : `${product.title} from Metro Metal, a B2B manufacturer of garment accessories. Contact us for MOQ, samples and custom orders.`
  ).slice(0, 155);

  const title = product.metaTitle ?? product.title;
  const description = product.metaDescription ?? autoDescription;

  const ogImage = product.images?.[0]
    ? urlFor(product.images[0]).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/product/${slug}` },
    openGraph: {
      title: `${title} | Metro Metal`,
      description,
      type: "website",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data: product } = await fetchProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium text-lg">Product not found.</p>
      </div>
    );
  }

  const breadcrumbs: { label: string; href?: string }[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
  ];

  if (product.category) {
    if (product.category.parent) {
      breadcrumbs.push({
        label: product.category.parent.title,
        href: `/products/${product.category.parent.slug}`,
      });
    }
    breadcrumbs.push({
      label: product.category.title,
      href: `/products/${product.category.parent ? `${product.category.parent.slug}/` : ""}${product.category.slug}`,
    });
  }
  breadcrumbs.push({ label: product.title });

  // JSON-LD: Product + BreadcrumbList (no offers/price — quote-based B2B).
  const jsonLdCrumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];
  if (product.category) {
    if (product.category.parent) {
      jsonLdCrumbs.push({
        name: product.category.parent.title,
        path: `/products/${product.category.parent.slug}`,
      });
    }
    jsonLdCrumbs.push({
      name: product.category.title,
      path: categoryHref(product.category),
    });
  }
  jsonLdCrumbs.push({ name: product.title, path: `/product/${product.slug.current}` });

  const categoryPath = product.category
    ? product.category.parent
      ? `${product.category.parent.title} > ${product.category.title}`
      : product.category.title
    : undefined;

  const productLd = productSchema({
    title: product.title,
    slug: product.slug.current,
    description: product.description
      ? toPlainText(product.description).slice(0, 300)
      : undefined,
    images: (product.images ?? [])
      .slice(0, 4)
      .map((img: any) => urlFor(img).width(1200).height(1200).fit("max").url()),
    categoryPath,
  });

  return (
    <main className="min-h-screen bg-white">
      <JsonLd data={[productLd, breadcrumbSchema(jsonLdCrumbs)]} />
      <Section>
        <div className="hidden md:block">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="flex flex-col gap-8 mb-16">
          <h1 className="font-bold text-3xl md:text-5xl text-slate-900">
            {product.title}
          </h1>

          <ImageGallery images={product.images || []} alt={product.title} />

          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <SpecificationGrid data={product.specifications} />

              <h3 className="text-slate-900 mt-0 mb-4">Description</h3>
              {product.description ? (
                <PortableText value={product.description} />
              ) : (
                <p>
                  Premium quality {product.title} meticulously crafted for
                  durability and style. Metro Metal ensures the highest
                  standards of manufacturing for brands worldwide.
                </p>
              )}
            </div>

            <div className="hidden lg:block">
              <Card className="p-6 sticky top-24 border-slate-200 shadow-sm rounded-2xl bg-slate-50/30">
                <h3 className="font-bold text-lg text-slate-900">
                  Quick Inquiry
                </h3>
                <ProductContactActions
                  productTitle={product.title}
                  showCall
                  className="mt-4"
                />
              </Card>
            </div>
          </div>
        </div>

        {/* <KeyFeatures /> */}

        <div className="mt-16">
          {product.category && (
            <RelatedProducts
              categoryId={product.category._id}
              currentProductId={product._id}
              categoryTitle={product.category.title}
            />
          )}

          <div className=" md:hidden">
            <Breadcrumbs items={breadcrumbs} />
          </div>

          <BlogSection />
        </div>
      </Section>

      {/* Mobile Floating Contact Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        <ProductContactActions productTitle={product.title} showCall />
      </div>
    </main>
  );
}
