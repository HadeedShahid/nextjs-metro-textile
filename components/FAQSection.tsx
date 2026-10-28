"use client";

import Link from "next/link";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { QuoteModalButton } from "./QuoteModal";
import { CONTACT_WHATSAPP_HREF } from "@/constants";
import { DEFAULT_FAQS } from "@/data/faqs";

interface FAQSectionProps {
  title?: string;
  lede?: string;
  items?: { question: string; answer: string }[];
}

/**
 * Buyer questions beside the action they lead to: the heading and the quote
 * and WhatsApp routes hold the left column while the answers open on the right.
 */
export default function FAQSection({
  title = "Questions, answered.",
  lede = "What buyers usually ask before their first order.",
  items = DEFAULT_FAQS,
}: FAQSectionProps) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:self-start">
          <h2 className="text-headline">{title}</h2>
          <p className="text-lede mt-4 text-muted-foreground">{lede}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <QuoteModalButton size="lg" text="Request a quote" />
            <Link
              href={CONTACT_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[1.0625rem] text-primary hover:underline"
            >
              <IconBrandWhatsapp className="size-5" aria-hidden />
              Ask on WhatsApp
            </Link>
          </div>
        </div>

        <Accordion className="border-t border-border">
          {items.map((faq) => (
            <AccordionItem key={faq.question} value={faq.question} className="border-b border-border">
              <AccordionTrigger className="py-6 text-[1.1875rem] font-semibold leading-snug tracking-[-0.02em] hover:no-underline md:text-[1.3125rem] **:data-[slot=accordion-trigger-icon]:mt-1 **:data-[slot=accordion-trigger-icon]:size-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[62ch] pb-6 text-[1.0625rem] leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
