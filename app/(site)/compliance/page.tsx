import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/base/PageHeader";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Presence from "@/components/Presence";
import ClosingBand from "@/components/home/ClosingBand";

export const metadata: Metadata = {
  title: "Compliance & Certifications",
  description:
    "Metro Metal's quality and compliance: ISO-certified manufacturing and OEKO-TEX tested accessories for global apparel and leather goods brands.",
  alternates: { canonical: "/compliance" },
};

const CRUMBS = [{ label: "Home", href: "/" }, { label: "Compliance" }];

const STANDARDS = [
  {
    title: "ISO-certified manufacturing.",
    body: "Our manufacturing units work to ISO quality management systems, so every production run follows the same documented controls.",
  },
  {
    title: "OEKO-TEX standard.",
    body: "Our accessories are tested and verified against the OEKO-TEX standard for harmful substances. Certification documents are available to your compliance team on request.",
  },
];

const PRINCIPLES = [
  {
    title: "Ethical sourcing",
    body: "Fair labour practices and safe working conditions across our supply chain. Every partner must follow our code of conduct.",
  },
  {
    title: "Quality assurance",
    body: "Every batch goes through multi-point inspection against the sealed sample before it ships.",
  },
  {
    title: "Environmental care",
    body: "We are moving to more sustainable production methods and cutting water waste to reduce our footprint.",
  },
];

export default function CompliancePage() {
  return (
    <>
      <PageHeader
        title="Made to standard."
        lede="Certified manufacturing and tested materials, documented for the compliance teams of European and North American brands."
        breadcrumbs={CRUMBS}
      />

      <section aria-label="Certifications" className="container-x">
        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {STANDARDS.map((standard) => (
            <article key={standard.title} className="rounded-[2rem] bg-muted p-8 md:p-12">
              <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.03em]">
                {standard.title}
              </h2>
              <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted-foreground">
                {standard.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="principles-title" className="on-die mt-24 bg-die text-die-foreground md:mt-32">
        <div className="relative h-[22rem] md:h-[32rem]">
          <Image
            src="/assets/home/die-zipper.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[70%_50%] opacity-80"
          />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-die to-transparent" />
          <div className="container-x relative flex h-full items-end pb-10 md:pb-14">
            <h2 id="principles-title" className="text-headline max-w-3xl">
              Beyond the certificate.
            </h2>
          </div>
        </div>
        <div className="container-x pb-24 pt-6 md:pb-32">
          <ul className="grid gap-x-10 gap-y-10 border-t border-white/12 pt-10 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.title}>
                <h3 className="text-[1.3125rem] font-semibold tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-die-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Presence />

      <div className="container-x pb-10 md:hidden">
        <Breadcrumbs items={CRUMBS} />
      </div>

      <ClosingBand />
    </>
  );
}
