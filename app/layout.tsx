import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Metro Metal",
  description: "High-quality textile products and sourcing solutions.",
};

import { fetchNavCategories } from "@/lib/api";
import { Toaster } from "sonner";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: categories } = await fetchNavCategories();

  const menu = [
    { title: "All Products", url: "/products" },
    ...(categories ?? []).map((cat) => ({
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
        <main className="flex flex-col gap-16 lg:py-5">{children}</main>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
