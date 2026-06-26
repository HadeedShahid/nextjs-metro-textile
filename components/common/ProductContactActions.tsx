import { IconBrandWhatsapp, IconMailFilled } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { PhoneIcon } from "@/icons";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_NUMBER,
} from "@/constants";

interface ProductContactActionsProps {
  productTitle: string;
  /** Include a Call button (used on the detail page; omitted on the compact card). */
  showCall?: boolean;
  className?: string;
}

/**
 * Unified contact actions (Email · Call · WhatsApp) used across the product
 * card and the product detail page (desktop sticky + mobile bar) so the
 * styling stays consistent everywhere. Messages are customised per product and
 * never include a product URL.
 */
export default function ProductContactActions({
  productTitle,
  showCall = false,
  className,
}: ProductContactActionsProps) {
  const emailHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    `Inquiry: ${productTitle}`,
  )}&body=${encodeURIComponent(
    `Hi, I'd like more information about ${productTitle} — pricing, MOQ and lead time. Thank you.`,
  )}`;

  const waHref = `https://wa.me/${CONTACT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi, I'm interested in ${productTitle}. Could you share pricing, MOQ and lead time?`,
  )}`;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        href={emailHref}
        variant="outline"
        size="lg"
        className="flex-[2] border-primary/20 bg-primary/5 px-3 text-primary shadow-none hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
      >
        <IconMailFilled className="h-5 w-5" />
        Email
      </Button>

      {showCall && (
        <Button
          href={CONTACT_PHONE_HREF}
          variant="outline"
          size="lg"
          className="flex-1 border-primary/20 bg-primary/5 px-3 text-primary shadow-none hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
        >
          <PhoneIcon className="h-5 w-5" />
          Call
        </Button>
      )}

      <Button
        href={waHref}
        external
        variant="ghost"
        size="icon-lg"
        aria-label={`Ask about ${productTitle} on WhatsApp`}
        className="shrink-0 bg-green-700/5 text-green-700 shadow-none hover:bg-green-700/10 hover:text-green-700"
      >
        <IconBrandWhatsapp className="h-5 w-5" />
      </Button>
    </div>
  );
}
