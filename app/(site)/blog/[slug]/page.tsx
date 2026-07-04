import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PortableText } from "next-sanity";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { fetchPostBySlug, fetchAllPosts } from "@/lib/api";
import { urlFor } from "@/sanity/image";
import { toPlainText } from "@/lib/portable-text";
import { formatDate, readingTime } from "@/lib/blog";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import BlogPostCard from "@/components/common/BlogPostCard";
import JsonLd from "@/components/common/JsonLd";
import Section from "@/components/base/Section";
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
    const { data: post } = await fetchPostBySlug(slug);

    if (!post) {
        return (
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-24 text-center">
                <p className="text-slate-500">Sorry, that article could not be found.</p>
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to all articles
                </Link>
            </div>
        );
    }

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
        <Section className="gap-12 pb-4">
            <JsonLd data={[blogLd, crumbLd]} />

            <article className="mx-auto w-full max-w-4xl">
                {/* Header */}
                <header className="flex flex-col gap-5">
                    {/* Desktop-only breadcrumbs at top */}
                    <div className="hidden md:block [&_ol]:text-slate-400">
                        <Breadcrumbs
                            items={[
                                { label: "Home", href: "/" },
                                { label: "Blog", href: "/blogs" },
                                { label: post.title },
                            ]}
                        />
                    </div>
                    <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                        Insights &amp; Guides
                    </span>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl md:leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                        <time dateTime={post.publishedAt}>
                            {formatDate(post.publishedAt)}
                        </time>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>{minutes} min read</span>
                    </div>
                </header>

                {/* Banner */}
                {bannerUrl && (
                    <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100">
                        <Image
                            src={bannerUrl}
                            alt={post.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 896px"
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Body */}
                <div className="mt-10 md:mt-12">
                    <div className="prose prose-slate mx-auto max-w-3xl prose-headings:font-bold prose-headings:tracking-tight prose-h2:mt-10 prose-h2:text-2xl prose-h3:mt-8 prose-h3:text-xl prose-p:text-slate-600 prose-p:leading-relaxed prose-li:text-slate-600 prose-strong:text-slate-900 prose-a:text-primary prose-a:underline prose-a:underline-offset-2 md:prose-lg">
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
                <div className="mx-auto mt-12 max-w-3xl border-t border-slate-100 pt-6">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to all articles
                    </Link>
                </div>
            </article>

            {/* Related posts */}
            {related.length > 0 && (
                <Section
                    title="More from the blog"
                    titleClassName="text-xl md:text-2xl font-semibold tracking-tight text-slate-900"
                    className="mx-auto w-full max-w-5xl"
                >
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((p) => (
                            <BlogPostCard key={p._id} post={p} />
                        ))}
                    </div>
                </Section>
            )}

            {/* Closing CTA */}
            <section className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 rounded-3xl border border-slate-100 bg-slate-50/60 px-6 py-8 md:flex-row md:items-center md:px-10">
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
        </Section>
    );
}
