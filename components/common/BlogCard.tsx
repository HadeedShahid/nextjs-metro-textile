import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/image";
import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconCalendarFilled } from "@tabler/icons-react";
import Text from "../base/Text";

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
      <Card className="relative aspect-square md:aspect-3/4 overflow-hidden bg-slate-100 shadow-md p-0 border-none cursor-pointer flex flex-col justify-end">
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
        <div className="relative z-20 p-6 flex flex-col gap-2">
          <Text className="text-white font-semibold text-lg leading-tight">
            {post.title}
          </Text>
          <div className="flex items-center gap-2 text-white/80">
            <IconCalendarFilled size={14} />
            <span className="text-xs font-semibold">
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "November 14, 2025"}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
