import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  post: {
    title: string;
    slug: { current: string };
    image?: any;
    publishedAt: string;
  };
}

const BlogCard = ({ post }: BlogCardProps) => {
  const imageUrl = post.image
    ? urlFor(post.image).width(600).height(800).url()
    : "/sample.jpg";
  const blogUrl = `/blog/${post.slug.current}`;

  return (
    <Link href={blogUrl} className="block">
      <Card className="relative aspect-3/4 overflow-hidden bg-slate-100 shadow-md p-0 border-none cursor-pointer">
        <Image
          src={imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Badge */}
        <div className="absolute top-5 left-5 z-10">
          <Badge
            className="px-4 py-3 rounded-md font-semibold"
            variant={"secondary"}
          >
            Global News
          </Badge>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-8 z-10">
          <h3 className="text-white font-bold text-xl md:text-2xl leading-tight line-clamp-3 mb-4">
            {post.title}
          </h3>
          <div className="flex items-center gap-3 text-white/90">
            <Calendar className="w-5 h-5" strokeWidth={2.5} />
            <span className="text-base font-semibold tracking-wide">
              {post.publishedAt
                ? new Date(post.publishedAt).toISOString().split("T")[0]
                : "2025-11-14"}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
