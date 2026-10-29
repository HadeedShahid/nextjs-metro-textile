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
  // Pages of the old metro-metal.com site, so its links and search results
  // land on their replacements once the domain points here.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about-us.html", destination: "/about-us", permanent: true },
      { source: "/contact-us.html", destination: "/contact-us", permanent: true },
      { source: "/products.html", destination: "/products", permanent: true },
      { source: "/products.php", destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;
