import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fetchAllPosts, type PostListItem } from "@/lib/api";
import { urlFor } from "@/sanity/image";
import { formatDate, readingTime } from "@/lib/blog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import BlogPostCard from "@/components/common/BlogPostCard";
import JsonLd from "@/components/common/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import Section from "@/components/base/Section";

export const metadata: Metadata = {
  title: "Blog: Sourcing Insights & Guides",
  description:
    "Practical guides on garment trims, denim hardware, zippers, compliance and sourcing from Metro Metal, manufacturer of garment and leather goods accessories.",
  alternates: { canonical: "/blogs" },
};

function FeaturedCard({ post }: { post: PostListItem }) {
  const img = post.image
    ? urlFor(post.image).width(1280).height(720).url()
    : null;
  return (
    <Link href={`/blog/${post.slug.current}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
          {img ? (
            <Image
              src={img}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              priority
            />
          ) : (
            <div className="h-full w-full bg-primary/90" />
          )}
          <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-foreground shadow-md">
            Latest article
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{readingTime(post.excerpt)} min read</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-primary md:text-3xl">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="line-clamp-3 flex-1 max-w-3xl text-slate-500 md:text-lg">
              {post.excerpt}
            </p>
          )}
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Read article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </Link>
  );
}

/** Product CTA panel — shown only on lg+ in the right col of the hero split */
function ProductCtaPanel() {
  const collageImages = [
    { src: "/assets/landing-buckle.jpg", alt: "Metal buckle accessories" },
    { src: "/assets/landing-button.jpg", alt: "Garment buttons" },
    { src: "/assets/landing-zipper.jpg", alt: "Zipper trims" },
    { src: "/assets/card-1.png",         alt: "Apparel accessories" },
  ];

  return (
    <div className="relative hidden overflow-hidden rounded-3xl lg:flex lg:flex-col">
      {/* 2×2 image collage as background */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        {collageImages.map((img) => (
          <div key={img.src} className="relative overflow-hidden">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark gradient overlay — stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/50 to-slate-900/20" />

      {/* CTA content pinned to bottom */}
      <div className="relative z-10 mt-auto p-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/60">
          Our Products
        </p>
        <h3 className="text-xl font-bold leading-snug text-white">
          From zipper to buckle — explore our full accessories range.
        </h3>
        <p className="mt-2 text-sm text-white/70">
          Garment trims, denim hardware, labels &amp; more. Made to spec.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Explore Products
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default async function BlogsPage() {
  const { data: posts } = await fetchAllPosts();
  const safePosts = posts ?? [];
  const [featured, ...rest] = safePosts;

  const crumbLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blogs" },
  ]);

  return (
    <Section className="gap-12 pb-4">
      <JsonLd data={crumbLd} />

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-primary/90 px-6 pt-8 pb-10 text-white md:px-12 md:pt-10 md:pb-12">
        {/* decorative wave */}
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
        {/* decorative dot grid */}
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full opacity-[0.15]"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(currentColor 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="relative z-10">
          {/* Desktop-only breadcrumbs in hero */}
          <div className="mb-6 hidden md:block [&_a:hover]:text-white [&_a]:text-white/90 [&_ol]:text-white/70 [&_[aria-current]]:text-white">
            <Breadcrumbs
              items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
            />
          </div>
          <h1 className="max-w-2xl text-2xl font-bold tracking-tight md:text-3xl">
            Sourcing notes from the trims floor
          </h1>
          <p className="mt-3 max-w-xl text-sm text-primary-foreground/80 md:text-base">
            Practical guides on denim hardware, zippers, labels, compliance and
            sourcing, written for the brands and teams we build accessories for.
          </p>
        </div>
      </section>

      {safePosts.length === 0 ? (
        <p className="py-16 text-center text-slate-500">
          New articles are on the way. Check back soon.
        </p>
      ) : (
        <>
          {/* Featured card + Product CTA panel side-by-side on desktop */}
          {featured && (
            <section className="grid gap-6 lg:grid-cols-3">
              {/* Featured post — spans 2 of 3 cols */}
              <div className="lg:col-span-2">
                <FeaturedCard post={featured} />
              </div>
              {/* Product CTA panel — right col, desktop only */}
              <ProductCtaPanel />
            </section>
          )}

          {/* All remaining posts in "More articles" grid */}
          {rest.length > 0 && (
            <Section
              title="More articles"
              titleClassName="text-xl md:text-2xl font-semibold tracking-tight text-slate-900"
              headerAction={
                <span className="text-sm text-slate-400">
                  {safePosts.length} in total
                </span>
              }
            >
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <BlogPostCard key={post._id} post={post} />
                ))}
              </div>
            </Section>
          )}

          {/* Soft closing CTA */}
          <section className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-slate-100 bg-slate-50/60 px-6 py-8 md:flex-row md:items-center md:px-10">
            <div>
              <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                Specifying trims for an upcoming range?
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Our team helps brands turn a design into a buildable, compliant
                trims spec.
              </p>
            </div>
            <Link
              href="/contact-us"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Get in touch
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </section>
        </>
      )}

      {/* Mobile-only breadcrumbs near footer (matches contact page pattern) */}
      <div className="md:hidden">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />
      </div>
    </Section>
  );
}
