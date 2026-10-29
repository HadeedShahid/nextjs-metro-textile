import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { Mail, Paperclip } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ImageGallery from "@/components/common/ImageGallery";
import BlogSection from "@/components/common/BlogSection";
import RelatedProducts from "@/components/common/RelatedProducts";
import FAQSection from "@/components/FAQSection";
import { QuoteModalButton } from "@/components/QuoteModal";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, CONTACT_WHATSAPP_NUMBER, MAX_QUOTE_ATTACHMENTS } from "@/constants";
import { DEFAULT_FAQS } from "@/data/faqs";

// The questions a buyer has on a product page: minimums, samples, timing.
const PRODUCT_FAQ_QUESTIONS = [
  "What is Metro Metal's minimum order quantity (MOQ)?",
  "Do you provide samples before bulk production?",
  "What are your typical lead times?",
  "Do you offer custom, OEM and private-label accessories?",
];
const productFaqs = PRODUCT_FAQ_QUESTIONS.map((q) => DEFAULT_FAQS.find((f) => f.question === q)).filter(
  (f): f is (typeof DEFAULT_FAQS)[number] => Boolean(f),
);

/** Absolute /products path for a product's category. */
function categoryHref(category: {
  slug: string;
  parent: { slug: string } | null;
}): string {
  return `/products/${category.parent ? `${category.parent.slug}/` : ""}${category.slug}`;
}

/** Whole sentences that fit in `max` characters; a word-boundary cut if even the first is too long. */
function metaExcerpt(text: string, max: number) {
  let out = "";
  for (const sentence of text.match(/[^.!?]+[.!?]+/g) ?? [text]) {
    if ((out + sentence).trim().length > max) break;
    out += sentence;
  }
  if (out) return out.trim();
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trim()}…`;
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
  const cta = "Contact Metro Metal for MOQ, samples and custom orders.";
  const excerpt = product.description
    ? metaExcerpt(toPlainText(product.description), 155 - cta.length - 1)
    : "";
  const autoDescription = excerpt
    ? `${excerpt} ${cta}`
    : `${product.title} from Metro Metal, a B2B manufacturer of garment accessories. Contact us for MOQ, samples and custom orders.`;

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
  const { data: product, ok } = await fetchProductBySlug(slug);

  // A failed fetch must not be cached as a 404.
  if (!ok) throw new Error(`Could not load product "${slug}"`);
  if (!product) notFound();

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

  const specs: { label: string; value: string }[] = Array.isArray(product.specifications)
    ? product.specifications.filter((s: any) => s?.label && s?.value)
    : [];

  const familyHref = product.category ? categoryHref(product.category) : "/products";

  const emailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Inquiry: ${product.title}`,
  )}&body=${encodeURIComponent(
    `Hi, I'd like more information about ${product.title}: pricing, MOQ and lead time. Thank you.`,
  )}`;
  const waHref = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I'm interested in ${product.title}. Could you share pricing, MOQ and lead time?`,
  )}`;

  return (
    <>
      <JsonLd data={[productLd, breadcrumbSchema(jsonLdCrumbs)]} />

      <section className="container-x pb-14 pt-6 md:pb-16 md:pt-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="mt-5 grid gap-8 md:grid-cols-[1.1fr_1fr] lg:gap-12">
          <ImageGallery images={product.images || []} alt={product.title} />

          <div className="min-w-0 md:sticky md:top-[calc(var(--nav-h)+1.5rem)] md:self-start">
            <h1 className="text-headline">
              {product.title}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Made to order to your spec, in your finish and with your branding.
              Samples come first; bulk follows your sign-off.
            </p>

            {specs.length > 0 && (
              <dl className="mt-6 border-t border-border">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-6 border-b border-border py-2.5 text-sm">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="text-right font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {/* From 768px the actions sit beside the photos; phones use the bar at the foot. */}
            <div className="mt-6 hidden flex-col gap-2.5 md:flex">
              <QuoteModalButton product={product.title} size="lg" className="w-full" text="Request a quote" />
              <div className="grid grid-cols-2 gap-2.5">
                <Button href={emailHref} variant="secondary" size="lg">
                  <Mail aria-hidden /> Email
                </Button>
                <Button href={waHref} external variant="secondary" size="lg">
                  <IconBrandWhatsapp aria-hidden /> WhatsApp
                </Button>
              </div>
            </div>
            <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
              <Paperclip className="mt-0.5 size-4 shrink-0" aria-hidden />
              Attach drawings, a tech pack or photos to your quote request, up to {MAX_QUOTE_ATTACHMENTS} files.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-border pt-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
          <h2 className="text-title">About this piece</h2>
          <div className="prose max-w-[65ch] prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary">
            {product.description ? (
              <PortableText value={product.description} />
            ) : (
              <p>
                {product.title} is made to order. Send us your artwork or a reference
                sample and we&apos;ll confirm materials, finish and quantities in your quote.
              </p>
            )}
          </div>
        </div>
      </section>

      {product.category && (
        <div className="bg-muted">
          <RelatedProducts
            categoryId={product.category._id}
            currentProductId={product._id}
            categoryTitle={product.category.title}
            categoryHref={familyHref}
          />
        </div>
      )}

      <FAQSection title="Before you order." lede="What buyers ask about this kind of hardware." items={productFaqs} />

      <BlogSection className="bg-muted" />

      {/* Phone: the quote action stays within thumb reach. */}
      <div data-quote-bar className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-black/[0.06] bg-white/85 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden">
        <QuoteModalButton product={product.title} size="lg" className="flex-1" text="Request a quote" />
        <Button href={waHref} external variant="secondary" size="icon-lg" aria-label={`Ask about ${product.title} on WhatsApp`}>
          <IconBrandWhatsapp className="size-5" aria-hidden />
        </Button>
      </div>
    </>
  );
}
