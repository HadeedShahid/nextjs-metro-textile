import Image from "next/image";
import Link from "next/link";
import { fetchLatestPosts } from "@/lib/api";
import { urlFor } from "@/sanity/image";
import { formatDate } from "@/lib/blog";
import SectionIntro from "../base/SectionIntro";
import { cn } from "@/lib/utils";

/** The three latest journal articles, picture first. */
const BlogSection = async ({ className }: { className?: string }) => {
  const { data: posts } = await fetchLatestPosts();
  const latest = (posts ?? []).slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container-x">
        <SectionIntro
          className="mb-10 md:mb-14"
          title="From the journal."
          lede="Guides on trims, finishes and compliance for teams specifying hardware."
          action={{ href: "/blogs", label: "All articles" }}
        />
        <ul className="grid gap-x-6 gap-y-12 md:grid-cols-3">
          {latest.map((post) => (
            <li key={post._id}>
              <article className="group relative">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-muted">
                  {post.image && (
                    <Image
                      src={urlFor(post.image).width(960).height(600).fit("crop").url()}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <time dateTime={post.publishedAt} className="mt-5 block text-[0.875rem] text-muted-foreground">
                  {formatDate(post.publishedAt)}
                </time>
                <h3 className="mt-1.5 text-[1.3125rem] font-semibold leading-snug tracking-[-0.02em]">
                  <Link href={`/blog/${post.slug.current}`} className="after:absolute after:inset-0 group-hover:underline">
                    {post.title}
                  </Link>
                </h3>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogSection;
