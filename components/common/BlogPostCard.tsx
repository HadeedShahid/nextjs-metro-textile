import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { formatDate, readingTime } from "@/lib/blog";
import type { PostListItem } from "@/lib/api";

/** A journal article, picture first, set like the product tiles. */
const BlogPostCard = ({ post }: { post: PostListItem }) => {
  const img = post.image ? urlFor(post.image).width(960).height(600).fit("crop").url() : null;

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
        {img && (
          <Image
            src={img}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
          />
        )}
      </div>
      <p className="mt-5 text-meta text-muted-foreground">
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        <span aria-hidden> · </span>
        {readingTime(post.excerpt)} min read
      </p>
      <h3 className="mt-1.5 text-base font-semibold leading-snug tracking-[-0.02em]">
        <Link href={`/blog/${post.slug.current}`} className="after:absolute after:inset-0 group-hover:underline">
          {post.title}
        </Link>
      </h3>
      {post.excerpt && (
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
      )}
    </article>
  );
};

export default BlogPostCard;
