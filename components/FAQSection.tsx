"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "./base/Section";

import { DEFAULT_FAQS } from "@/data/faqs";

interface FAQSectionProps {
  title?: string;
  items?: { question: string; answer: string }[];
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  items = DEFAULT_FAQS,
}: FAQSectionProps) {
  return (
    <Section title={title}>
      <div className="w-full">
        <Accordion className="w-full space-y-4">
          {items.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-300 rounded-md px-3 md:px-6 data-open:border-primary/40 data-open:shadow-sm"
            >
              <AccordionTrigger className="text-slate-800 justify-center items-center cursor-pointer text-left py-2 md:py-4 text-base md:text-lg no-underline hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-sm md:text-base md:pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
