import { FileText, Factory, PackageCheck, Stamp } from "lucide-react";
import Link from "next/link";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import SectionIntro from "@/components/base/SectionIntro";
import { QuoteModalButton } from "@/components/QuoteModal";
import { CONTACT_WHATSAPP_HREF } from "@/constants";

// Worded from the FAQ's own account of sampling and quality control.
const STEPS = [
  {
    Icon: FileText,
    title: "Send your request",
    body: "Share artwork, a tech pack or a reference sample, with the quantity and finish you need.",
  },
  {
    Icon: Stamp,
    title: "Approve the sample",
    body: "We make a pre-production sample to your spec. Bulk starts only once you sign off the sealed sample.",
  },
  {
    Icon: Factory,
    title: "Bulk production",
    body: "Your order is made and checked in-process against the sealed sample you approved.",
  },
  {
    Icon: PackageCheck,
    title: "Inspected and shipped",
    body: "Every order is inspected before packing, then shipped worldwide. Your own inspectors are welcome.",
  },
];

/**
 * The four steps from first message to delivery, as a numbered line: a
 * vertical timeline on phones, one row joined by a rule from 768px. It ends
 * on the action that starts step one.
 */
export default function OrderSteps() {
  return (
    <section aria-labelledby="steps-title" className="bg-muted py-10 md:py-14">
      <div className="container-x">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <SectionIntro
            id="steps-title"
            title="How an order works"
            lede="From your first message to delivery, every order follows the same four steps, so the bulk run matches the sample you approved."
          />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 md:shrink-0">
            <QuoteModalButton size="default" text="Start your request" />
            <Link
              href={CONTACT_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] text-primary hover:underline"
            >
              <IconBrandWhatsapp className="size-5" aria-hidden />
              Ask on WhatsApp
            </Link>
          </div>
        </div>

        <ol className="mt-8 grid md:mt-10 md:grid-cols-4 md:gap-6">
          {STEPS.map(({ Icon, title, body }, i) => {
            const last = i === STEPS.length - 1;
            return (
              <li key={title} className="relative flex gap-4 pb-7 last:pb-0 md:flex-col md:gap-0 md:pb-0">
                {/* The rule joining this step to the next: down the left on phones, across from 768px. */}
                {!last && (
                  <span
                    aria-hidden
                    className="absolute left-5 top-11 bottom-1 w-px bg-foreground/15 md:left-12 md:-right-5 md:top-5 md:bottom-auto md:h-px md:w-auto"
                  />
                )}
                <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-foreground text-sm font-semibold tabular-nums text-background">
                  {i + 1}
                </span>
                <div className="min-w-0 pt-1.5 md:mt-4 md:pt-0">
                  <h3 className="flex items-center gap-2 text-base font-semibold">
                    <Icon className="size-[1.125rem] text-muted-foreground" strokeWidth={1.75} aria-hidden />
                    {title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
