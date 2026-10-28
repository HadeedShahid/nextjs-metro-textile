import Image from "next/image";
import Link from "next/link";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { QuoteModalButton } from "@/components/QuoteModal";
import { CONTACT_WHATSAPP_HREF } from "@/constants";

/** The close: three buckles in low light, one statement, one action. */
export default function ClosingBand() {
  return (
    <section aria-labelledby="closing-title" className="on-die relative overflow-hidden bg-die text-die-foreground">
      <div className="relative min-h-[34rem] md:min-h-[44rem]">
        <Image
          src="/assets/home/die-buckles.webp"
          alt="Three belt buckles lit from above on a dark surface"
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="container-x relative flex flex-col items-center pt-24 text-center md:pt-32">
          <h2 id="closing-title" className="text-display max-w-4xl">
            Your mark, in metal.
          </h2>
          <p className="text-lede mt-5 max-w-xl text-die-muted">
            Made across Pakistan, China and Hong Kong. Shipped worldwide.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <QuoteModalButton variant="light" size="lg" text="Request a quote" />
            <Link
              href={CONTACT_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[1.0625rem] text-die-foreground hover:underline"
            >
              <IconBrandWhatsapp className="size-5" aria-hidden />
              Message us on WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
