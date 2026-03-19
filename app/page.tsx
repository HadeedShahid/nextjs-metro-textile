import Link from "next/link";
import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Latest News</h1>
        <div className="flex gap-4">
            <Link 
            href="/blogs" 
            className="text-slate-500 hover:text-purple-600 font-medium transition-colors"
            >
            Browse Blog →
            </Link>
            <Link 
            href="/products" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg shadow-purple-100"
            >
            Products →
            </Link>
        </div>
      </div>
      <ul className="flex flex-col gap-y-6">
        {posts.map((post) => (
          <li className="p-6 rounded-2xl border border-slate-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-50 transition-all group" key={post._id}>
            <Link href={`/blog/${post.slug.current}`}>
              <h2 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-2">{post.title}</h2>
              <p className="text-slate-400 text-sm">{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}