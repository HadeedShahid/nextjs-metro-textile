import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { fetchPostBySlug } from "@/lib/api";
import { toPlainText } from "@/lib/portable-text";
import JsonLd from "@/components/common/JsonLd";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/structured-data";
import Link from "next/link";
import Image from "next/image";

const { projectId, dataset } = client.config();
const urlFor = (source: any) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

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
        : `${post.title} — insights from Metro Metal.`;
    const image = post.image
        ? urlFor(post.image)?.width(1200).height(630).url() ?? undefined
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
            <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
                <Link href="/blogs" className="hover:underline">← Back to blogs</Link>
                <p className="text-slate-500">Post not found.</p>
            </main>
        );
    }

    const postImageUrl = post.image
        ? urlFor(post.image)?.width(550).height(310).url()
        : null;

    const ogImage = post.image
        ? urlFor(post.image)?.width(1200).height(630).url() ?? undefined
        : undefined;
    const blogLd = blogPostingSchema({
        title: post.title,
        slug: post.slug.current,
        publishedAt: post.publishedAt,
        image: ogImage,
        excerpt: post.body ? toPlainText(post.body).slice(0, 200).trim() : undefined,
    });
    const crumbLd = breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blogs" },
        { name: post.title, path: `/blog/${post.slug.current}` },
    ]);

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
            <JsonLd data={[blogLd, crumbLd]} />
            <Link href="/blogs" className="hover:underline">
                ← Back to blogs
            </Link>
            {postImageUrl && (
                <Image
                    src={postImageUrl}
                    alt={post.title}
                    className="aspect-video rounded-xl object-cover"
                    width={550}
                    height={310}
                />
            )}
            <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
            <div className="prose">
                <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
                {Array.isArray(post.body) && <PortableText value={post.body} />}
            </div>
        </main>
    );
}