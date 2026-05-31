import React from "react"
import Link from "next/link"
import { fetchLatestPosts } from "@/lib/api"
import BlogCarousel from "./BlogCarousel"
import Section from "../base/Section"
import Text from "../base/Text"
import { Button } from "../ui/button"
import { ChevronRight } from "lucide-react"

const BlogSection = async () => {
  const { data: posts } = await fetchLatestPosts()

  if (!posts || posts.length === 0) return null

  return (
    <BlogCarousel
      posts={posts}
      title="Latest Insights"
      viewAllHref="/blogs"
    />
  );
}

export default BlogSection
