import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const font = localFont({
  src: [
    {
      path: "../../public/font/GeneralSans-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/font/GeneralSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/GeneralSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn(font.className, "font-sans", geist.variable)}>
      <body>
        <section className="main-container mx-auto">
          <Navbar />
          {children}
          <Footer />
        </section>
      </body>
    </html>
  );
}
