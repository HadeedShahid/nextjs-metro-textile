"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/image"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  post: {
    title: string
    slug: { current: string }
    image?: any
    publishedAt: string
  }
}

const BlogCard = ({ post }: BlogCardProps) => {
  const imageUrl = post.image ? urlFor(post.image).width(600).height(800).url() : "/sample.jpg"

  return (
    <Link 
      href={`/blog/${post.slug.current}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 shadow-md transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
    >
      <Image
        src={imageUrl}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
      
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-900 shadow-sm">
          Latest News
        </span>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        <h3 className="text-white font-bold text-xl leading-snug line-clamp-2 md:text-2xl group-hover:text-purple-200 transition-colors">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}

export default BlogCard
