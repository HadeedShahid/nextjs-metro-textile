import React from "react"
import Link from "next/link"
import { client } from "@/sanity/client"
import BlogCarousel from "./BlogCarousel"

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
    <section className="py-20 border-t border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Latest Insights
            </h2>
          </div>
          <Link 
            href="/blogs"
            className="text-purple-600 font-bold hover:text-purple-700 transition-colors flex items-center gap-1 group"
          >
            View All Blogs
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <BlogCarousel posts={posts} />
      </div>
    </section>
  )
}

export default BlogSection
