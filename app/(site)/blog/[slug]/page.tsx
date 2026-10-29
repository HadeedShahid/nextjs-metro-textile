import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { ArrowLeft } from "lucide-react";
import { fetchPostBySlug, fetchAllPosts } from "@/lib/api";
import { urlFor } from "@/sanity/image";
import { toPlainText } from "@/lib/portable-text";
import { formatDate, readingTime } from "@/lib/blog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import BlogPostCard from "@/components/common/BlogPostCard";
import JsonLd from "@/components/common/JsonLd";
import { QuoteModalButton } from "@/components/QuoteModal";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/structured-data";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { data: post } = await fetchPostBySlug(slug);

    if (!post) return { title: "Post Not Found" };

    const description = post.body
        ? toPlainText(post.body).slice(0, 155).trim()
        : `${post.title}, insights from Metro Metal.`;
    const image = post.image
        ? urlFor(post.image).width(1200).height(630).url()
        : undefined;

    return {
        title: post.title,
        description,
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            type: "article",
            title: `${post.title} | Metro Metal`,
            description,
            publishedTime: post.publishedAt,
            images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
        },
    };
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const { data: post, ok } = await fetchPostBySlug(slug);

    // A failed fetch must not be cached as a 404.
    if (!ok) throw new Error(`Could not load post "${slug}"`);
    if (!post) notFound();

    const bannerUrl = post.image
        ? urlFor(post.image).width(1280).height(720).url()
        : null;
    const ogImage = post.image
        ? urlFor(post.image).width(1200).height(630).url()
        : undefined;

    const plain = post.body ? toPlainText(post.body) : "";
    const minutes = readingTime(plain);

    const { data: allPosts } = await fetchAllPosts();
    const related = (allPosts ?? [])
        .filter((p) => p.slug.current !== slug)
        .slice(0, 3);

    const blogLd = blogPostingSchema({
        title: post.title,
        slug: post.slug.current,
        publishedAt: post.publishedAt,
        image: ogImage,
        excerpt: plain ? plain.slice(0, 200).trim() : undefined,
    });
    const crumbLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blogs" },
        { name: post.title, path: `/blog/${post.slug.current}` },
    ]);

    return (
        <div className="container-x flex flex-col gap-12 pb-14 pt-8 md:pb-20 md:pt-10">
            <JsonLd data={[blogLd, crumbLd]} />

            <article className="mx-auto w-full max-w-4xl">
                {/* Header */}
                <header className="flex flex-col gap-5">
                    {/* Desktop-only breadcrumbs at top */}
                    <div className="hidden md:block">
                        <Breadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Blog", href: "/blogs" },
                                { label: post.title },
                            ]}
                        />
                    </div>
                    <h1 className="text-display max-w-[24ch]">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt)}
                        </time>
                        <span aria-hidden>·</span>
                        <span>{minutes} min read</span>
                    </div>
                </header>

                {/* Banner */}
                {bannerUrl && (
                    <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted">
                        <Image
                            src={bannerUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 896px"
                            className="object-cover"
                            preload
                        />
                    </div>
                )}

                {/* Body */}
                <div className="mt-8 md:mt-10">
                    <div className="prose mx-auto max-w-[68ch] prose-headings:font-semibold prose-headings:tracking-[-0.02em] prose-headings:text-foreground prose-h2:mt-12 prose-h2:text-headline prose-h3:mt-8 prose-h3:text-title prose-p:text-foreground/85 prose-p:leading-[1.7] prose-li:text-foreground/85 prose-strong:text-foreground prose-a:text-primary prose-a:underline-offset-2 prose-blockquote:border-l-foreground/20 prose-blockquote:text-foreground md:prose-lg">
                        {Array.isArray(post.body) && (
                            <PortableText
                                value={post.body}
                                components={{
                                    marks: {
                                        link: ({ children, value }) => {
                                            const href = value?.href ?? "#";
                                            return href.startsWith("/") ? (
                                                <Link href={href}>{children}</Link>
                                            ) : (
                                                <a href={href} target="_blank" rel="noopener noreferrer">
                                                    {children}
                                                </a>
                                            );
                                        },
                                    },
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Back link */}
                <div className="mx-auto mt-12 max-w-[68ch] border-t border-border pt-6">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-1.5 text-base text-primary hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden /> All articles
                    </Link>
                </div>
            </article>

            {/* Related posts */}
            {related.length > 0 && (
                <section aria-labelledby="more-title" className="border-t border-border pt-10">
                    <h2 id="more-title" className="text-headline">More from the journal.</h2>
                    <ul className="mt-6 grid gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((p) => (
                            <li key={p._id}>
                                <BlogPostCard post={p} />
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Closing CTA */}
            <section className="flex flex-col items-start justify-between gap-5 rounded-2xl bg-muted px-6 py-8 md:flex-row md:items-center md:px-10">
                <div>
                    <h2 className="text-title">Specifying trims for an upcoming range?</h2>
                    <p className="mt-2 text-base text-muted-foreground">
                        Our team helps brands turn a design into a buildable, compliant trims spec.
                    </p>
                </div>
                <QuoteModalButton size="lg" text="Request a quote" />
            </section>

            {/* Mobile-only breadcrumbs near footer (matches contact page pattern) */}
            <div className="md:hidden">
                <Breadcrumbs
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Blog", href: "/blogs" },
                        { label: post.title },
                    ]}
                />
            </div>
        </div>
    );
}
