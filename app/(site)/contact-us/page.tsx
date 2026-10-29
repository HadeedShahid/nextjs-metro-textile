import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/base/PageHeader";
import ContactForm from "@/components/forms/ContactForm";
import Presence from "@/components/Presence";
import { QuoteModalButton } from "@/components/QuoteModal";
import { CONTACT_ROUTES } from "@/constants";
import { CONTACT_ICONS } from "@/components/common/contact-icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Metro Metal for garment accessory sourcing. Request a quote, samples, MOQ and lead times. Reach our team by email, phone or WhatsApp.",
  alternates: { canonical: "/contact-us" },
};

const CRUMBS = [{ label: "Home", href: "/" }, { label: "Contact" }];


export default function ContactUsPage() {
  return (
    <>
      <PageHeader
        title="Let's talk hardware."
        lede="Questions about products, finishes, samples or pricing. Our team replies within 24 hours."
        breadcrumbs={CRUMBS}
      >
        <QuoteModalButton size="lg" text="Request a quote" />
      </PageHeader>

      <section aria-label="Contact" className="container-x pb-10 md:pb-14 lg:pb-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="text-title">Reach us directly</h2>
            <ul className="mt-6 border-t border-border">
              {CONTACT_ROUTES.map(({ kind, label, value, href, external }) => {
                const Icon = CONTACT_ICONS[kind];
                return (
                  <li key={kind} className="border-b border-border">
                    <Link
                      href={href}
                      className="group flex items-center gap-4 py-4"
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                      <span className="min-w-0">
                        <span className="block text-meta text-muted-foreground">{label}</span>
                        <span className="block break-words text-base font-medium tracking-[-0.015em] group-hover:underline">
                          {value}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-sm text-muted-foreground">
              Working across Pakistan, China and Hong Kong.
            </p>
          </div>

          <div className="rounded-2xl bg-muted p-6 md:p-10">
            <h2 className="text-title">Send a message</h2>
            <p className="mt-2 text-muted-foreground">
              For a quote with files attached, use Request a quote instead.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <Presence className="bg-muted" />
    </>
  );
}
