import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Metro Textile",
  description: "High-quality textile products and sourcing solutions.",
};

import { client } from "@/sanity/client";

async function getCategories() {
  const query = `*[_type == "category" && !defined(parent)] | order(title asc) {
    title,
    "slug": slug.current
  }`;
  return await client.fetch(query);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  const menu = [
    { title: "All Products", url: "/products" },
    ...categories.map((cat: any) => ({
      title: cat.title,
      url: `/products/${cat.slug}`,
    })),
  ];

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="main-container mx-auto">
        <Navbar menu={menu} />
        <main className="flex flex-col gap-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
