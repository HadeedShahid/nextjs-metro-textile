import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/image";
import { formatDate, readingTime } from "@/lib/blog";
import type { PostListItem } from "@/lib/api";

const BlogPostCard = ({ post }: { post: PostListItem }) => {
  const img = post.image
    ? urlFor(post.image).width(800).height(500).url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {img ? (
          <Image
            src={img}
            alt={post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-primary/90" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span className="h-1 w-1 rounded-full bg-slate-300" />
          <span>{readingTime(post.excerpt)} min read</span>
        </div>
        <h3 className="line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="line-clamp-2 flex-1 text-sm text-slate-500">
            {post.excerpt}
          </p>
        )}
        <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default BlogPostCard;
