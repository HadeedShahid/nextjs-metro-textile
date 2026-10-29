import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the root to this app: a stray lockfile in the parent folder otherwise
  // makes Turbopack watch the whole parent tree.
  turbopack: {
    root: __dirname,
  },
  images: {
    // Product, category and journal photos are served by Sanity's CDN.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
