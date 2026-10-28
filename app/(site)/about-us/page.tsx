import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/base/PageHeader";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import LogoRow from "@/components/home/LogoRow";
import Presence from "@/components/Presence";
import ClosingBand from "@/components/home/ClosingBand";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Metro Metal is a B2B manufacturer and sourcing partner for garment and leather goods accessories, supplying apparel brands worldwide for over 20 years.",
  alternates: { canonical: "/about-us" },
};

const CRUMBS = [{ label: "Home", href: "/" }, { label: "About" }];

export default function AboutUsPage() {
  return (
    <>
      <PageHeader
        title="About Metro Metal."
        lede="A partner to the global leather and textile industry, supplying accessories to soft and hard goods makers worldwide."
        breadcrumbs={CRUMBS}
      />

      <div className="container-x">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-muted md:aspect-[21/9]">
          <Image
            src="/assets/about-us.jpg"
            alt="A row of production machines on a Metro factory floor"
            fill
            preload
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
          />
        </div>
      </div>

      <section aria-labelledby="story-title" className="py-24 md:py-32">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <h2 id="story-title" className="text-headline">
            Decades of making the details.
          </h2>
          <div className="max-w-[62ch] space-y-5 text-[1.1875rem] leading-relaxed text-muted-foreground">
            <p>
              Metro Metal is a partner to the global leather and textile industry. We provide
              accessories to the global soft and hard goods industry. Our company is based in
              China and has been catering to our clients and exporting accessories all over the
              world for decades.
            </p>
            <p>
              We have a very strong global network through which we cater to the needs of our
              clients, with a business presence in Asia and Europe.
            </p>
            <p>
              All of our manufacturing units are{" "}
              <strong className="font-semibold text-foreground">ISO certified</strong>, and all
              our products follow the{" "}
              <strong className="font-semibold text-foreground">OEKO-TEX standard</strong> and
              carry an excellent track record of timely delivery. We put special emphasis on
              design, higher quality and value-added work.
            </p>
          </div>
        </div>
      </section>

      <div className="border-y border-border">
        <LogoRow />
      </div>

      <Presence />

      <div className="container-x pb-10 md:hidden">
        <Breadcrumbs items={CRUMBS} />
      </div>

      <ClosingBand />
    </>
  );
}
