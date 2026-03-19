import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function BlogsPage() {
    const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

    return (
        <main className="container mx-auto min-h-screen max-w-4xl p-8 md:p-12">
            <header className="mb-12 border-b border-slate-100 pb-8">
                <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
                    Metro Textile <span className="text-purple-600">Blog</span>
                </h1>
                <p className="text-slate-500 text-lg">
                    Latest news, industry insights, and updates from the world of textile sourcing.
                </p>
            </header>

            <div className="grid gap-y-12">
                {posts.map((post) => (
                    <article key={post._id} className="group relative flex flex-col items-start">
                        <h2 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-2">
                            <Link href={`/blog/${post.slug.current}`}>
                                {post.title}
                            </Link>
                        </h2>
                        <time className="text-sm text-slate-400 mb-4 block">
                            {new Date(post.publishedAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        <Link 
                            href={`/blog/${post.slug.current}`}
                            className="text-purple-600 font-semibold hover:underline flex items-center gap-1"
                        >
                            Read Article →
                        </Link>
                    </article>
                ))}
            </div>
        </main>
    );
}
