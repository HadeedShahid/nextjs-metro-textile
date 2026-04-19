import React from "react"
import Link from "next/link"
import { client } from "@/sanity/client"
import BlogCarousel from "./BlogCarousel"
import Section from "../base/Section"
import Text from "../base/Text"
import { Button } from "../ui/button"
import { ChevronRight } from "lucide-react"

const LATEST_POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...8] {
    _id,
    title,
    slug,
    image,
    publishedAt
}`

const BlogSection = async () => {
  let posts = []
  try {
    posts = await client.fetch(LATEST_POSTS_QUERY, {}, { next: { revalidate: 30 } })
  } catch (error) {
    console.error("[BlogSection] Error fetching blogs:", error)
  }

  if (posts.length === 0) return null

  return (
    <Section title="Latest Insights" headerAction={<Button
      variant={"link"}
      href={'/blogs'}
      className="font-semibold text-md"
    >
      Explore All
      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
    </Button>}>
      <BlogCarousel posts={posts} />
    </Section >
  )
}

export default BlogSection
