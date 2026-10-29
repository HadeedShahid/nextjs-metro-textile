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
    <section className={cn("py-10 md:py-14 lg:py-16", className)}>
      <div className="container-x">
        <SectionIntro
          className="mb-5 md:mb-6"
          title="From the journal."
          lede="Guides on trims, finishes and compliance for teams specifying hardware."
          action={{ href: "/blogs", label: "All articles" }}
        />
        {/* Phones get a compact list (thumbnail beside the title); wider screens a row of three. */}
        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8">
          {latest.map((post) => (
            <li key={post._id}>
              <article className="group relative flex items-center gap-3 sm:block">
                <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:aspect-[16/10] sm:w-auto sm:rounded-2xl">
                  {post.image && (
                    <Image
                      src={urlFor(post.image).width(960).height(600).fit("crop").url()}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 7rem, 24rem"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-strike)] group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="min-w-0 sm:mt-3">
                  <time dateTime={post.publishedAt} className="text-meta block text-muted-foreground">
                    {formatDate(post.publishedAt)}
                  </time>
                  <h3 className="mt-0.5 text-sm font-semibold leading-snug sm:text-base">
                    <Link href={`/blog/${post.slug.current}`} className="after:absolute after:inset-0 group-hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BlogSection;
