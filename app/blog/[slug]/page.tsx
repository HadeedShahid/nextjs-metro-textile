import { PortableText } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import { fetchPostBySlug } from "@/lib/api";
import Link from "next/link";

const { projectId, dataset } = client.config();
const urlFor = (source: any) =>
    projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;

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

    return (
        <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
            <Link href="/blogs" className="hover:underline">
                ← Back to blogs
            </Link>
            {postImageUrl && (
                <img
                    src={postImageUrl}
                    alt={post.title}
                    className="aspect-video rounded-xl"
                    width="550"
                    height="310"
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