import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchAllPosts, type PostListItem } from "@/lib/api";
import { urlFor } from "@/sanity/image";
import { formatDate, readingTime } from "@/lib/blog";
import BlogPostCard from "@/components/common/BlogPostCard";
import JsonLd from "@/components/common/JsonLd";
import PageHeader from "@/components/base/PageHeader";
import ClosingBand from "@/components/home/ClosingBand";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Blog: Sourcing Insights & Guides",
  description:
    "Practical guides on garment trims, denim hardware, zippers, compliance and sourcing from Metro Metal, manufacturer of garment and leather goods accessories.",
  alternates: { canonical: "/blogs" },
};

const CRUMBS = [{ label: "Home", href: "/" }, { label: "Journal" }];

/** The newest article, given a full-width frame. */
function Lead({ post }: { post: PostListItem }) {
  const img = post.image ? urlFor(post.image).width(1600).height(900).fit("crop").url() : null;
  return (
    <article className="group relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-14">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
        {img && (
          <Image
            src={img}
            alt=""
            fill
            preload
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="lg:pb-4">
        <p className="text-meta text-muted-foreground">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden> · </span>
          {readingTime(post.excerpt)} min read
        </p>
        <h2 className="text-headline mt-2">
          <Link href={`/blog/${post.slug.current}`} className="after:absolute after:inset-0 group-hover:underline">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
        )}
      </div>
    </article>
  );
}

export default async function BlogsPage() {
  const { data: posts } = await fetchAllPosts();
  const safePosts = posts ?? [];
  const [lead, ...rest] = safePosts;

  const crumbLd = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blogs" },
  ]);

  return (
    <>
      <JsonLd data={crumbLd} />
      <PageHeader
        title="The journal."
        lede="Practical guides on denim hardware, zippers, labels, compliance and sourcing, written for the teams who specify them."
        breadcrumbs={CRUMBS}
      />

      <section aria-label="Articles" className="container-x pb-10 md:pb-14 lg:pb-16">
        {safePosts.length === 0 ? (
          <p className="rounded-2xl bg-muted px-6 py-16 text-center text-muted-foreground">
            New articles are on the way. Check back soon.
          </p>
        ) : (
          <>
            {lead && <Lead post={lead} />}
            {rest.length > 0 && (
              <ul className="mt-12 grid gap-x-4 gap-y-8 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <li key={post._id}>
                    <BlogPostCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>

      <ClosingBand />
    </>
  );
}
