import React from "react";
import BlogCard from "./BlogCard";
import EmblaCarouselWrapper from "@/components/emblaCarousel/EmblaCarouselWrapper";
import Section from "../base/Section";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface BlogCarouselProps {
  posts: any[];
  title?: string;
  viewAllHref?: string;
}

const BlogCarousel = ({ posts, title, viewAllHref }: BlogCarouselProps) => {
  if (posts.length === 0) return null;

  return (
    <Section
      title={title}
      headerAction={
        viewAllHref && (
          <Button
            variant={"link"}
            href={viewAllHref}
            className="font-semibold text-md"
          >
            Explore All
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        )
      }
    >
      <EmblaCarouselWrapper
        options={{ align: "start", containScroll: "trimSnaps", dragFree: true }}
        containerClassName="gap-4 md:gap-6"
        slideClassName="basis-[80%] sm:basis-[45%] lg:basis-[23%]"
      >
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </EmblaCarouselWrapper>
    </Section>
  );
};

export default BlogCarousel;
