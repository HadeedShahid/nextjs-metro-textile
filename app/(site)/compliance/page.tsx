import type { Metadata } from "next";
import PageHeader from "@/components/base/PageHeader";
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
        <div className="grid gap-3 md:grid-cols-2 md:gap-4">
          {STANDARDS.map((standard) => (
            <article key={standard.title} className="rounded-2xl bg-muted p-5 md:p-6">
              <h2 className="text-title">{standard.title}</h2>
              <p className="mt-1.5 max-w-[52ch] text-sm leading-relaxed text-muted-foreground">
                {standard.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* A light band, so the closing band stays the page's one die-black band. */}
      <section aria-labelledby="principles-title" className="mt-10 bg-muted py-10 md:mt-14 md:py-14 lg:mt-16 lg:py-16">
        <div className="container-x">
          <h2 id="principles-title" className="text-headline">
            Beyond the certificate.
          </h2>
          <ul className="mt-5 grid gap-x-10 gap-y-6 md:mt-6 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.title}>
                <h3 className="text-base font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Presence />

      <ClosingBand />
    </>
  );
}
