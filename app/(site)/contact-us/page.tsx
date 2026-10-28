import type { Metadata } from "next";
import Link from "next/link";
import { IconBrandWhatsapp, IconMailFilled } from "@tabler/icons-react";
import { Phone } from "lucide-react";
import PageHeader from "@/components/base/PageHeader";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ContactForm from "@/components/forms/ContactForm";
import Presence from "@/components/Presence";
import { QuoteModalButton } from "@/components/QuoteModal";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
} from "@/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Metro Metal for garment accessory sourcing. Request a quote, samples, MOQ and lead times. Reach our team by email, phone or WhatsApp.",
  alternates: { canonical: "/contact-us" },
};

const CRUMBS = [{ label: "Home", href: "/" }, { label: "Contact" }];

const ROUTES = [
  { label: "Email", value: CONTACT_EMAIL, href: CONTACT_EMAIL_HREF, Icon: IconMailFilled, external: false },
  { label: "Phone", value: CONTACT_PHONE_DISPLAY, href: CONTACT_PHONE_HREF, Icon: Phone, external: false },
  { label: "WhatsApp", value: CONTACT_PHONE_DISPLAY, href: CONTACT_WHATSAPP_HREF, Icon: IconBrandWhatsapp, external: true },
];

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

      <section aria-label="Contact" className="container-x pb-24 md:pb-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <h2 className="text-title">Reach us directly</h2>
            <ul className="mt-6 border-t border-border">
              {ROUTES.map(({ label, value, href, Icon, external }) => (
                <li key={label} className="border-b border-border">
                  <Link
                    href={href}
                    className="group flex items-center gap-4 py-5"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <Icon className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                    <span className="min-w-0">
                      <span className="block text-[0.875rem] text-muted-foreground">{label}</span>
                      <span className="block break-words text-[1.1875rem] font-medium tracking-[-0.015em] group-hover:underline">
                        {value}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.9375rem] text-muted-foreground">
              Working across Pakistan, China and Hong Kong.
            </p>
          </div>

          <div className="rounded-[2rem] bg-muted p-6 md:p-10">
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

      <div className="container-x py-10 md:hidden">
        <Breadcrumbs items={CRUMBS} />
      </div>
    </>
  );
}
