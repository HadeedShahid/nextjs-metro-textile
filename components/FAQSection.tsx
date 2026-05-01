"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Section from "./base/Section";

const faqs = [
  {
    question: "What types of textiles do you specialize in sourcing?",
    answer:
      "We specialize in high-quality woven and knitted fabrics, including cotton, denim, technical performance textiles, and sustainable fiber blends tailored for premium brands.",
  },
  {
    question: "How do you ensure the quality of the sourced fabrics?",
    answer:
      "We implement a rigorous 4-step quality control process, including on-site factory inspections, laboratory testing for fiber composition, and final pre-shipment checks to ensure industry-leading standards.",
  },
  {
    question: "What is the typical lead time for custom textile orders?",
    answer:
      "Lead times vary depending on complexity, but most custom sourcing projects are completed within 4 to 8 weeks, including sampling and final production.",
  },
  {
    question: "Do you provide samples before bulk production?",
    answer:
      "Yes, we provide physical strike-offs and yardage samples for approval to ensure the final product meets your exact specifications, handle, and color requirements.",
  },
  {
    question: "What are your minimum order requirements (MOQ)?",
    answer:
      "Our MOQs depend on the fabric type and manufacturing process. We strive to offer flexible options for growing brands while maintaining competitive pricing for larger volumes.",
  },
];

export default function FAQSection() {
  return (
    <Section title="Frequently Asked Questions">
      <div className="w-full">
        <Accordion className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-slate-300 rounded-md px-3 md:px-6 data-open:border-primary/40 data-open:shadow-sm"
            >
              <AccordionTrigger className="text-slate-800 justify-center items-center cursor-pointer text-left py-2 md:py-5 text-base md:text-lg no-underline hover:no-underline">
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
