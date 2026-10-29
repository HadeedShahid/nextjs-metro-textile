import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
} from "@/constants";

const LINK = "inline-flex items-center gap-1.5 transition-colors hover:text-foreground hover:underline";

/**
 * The contact routes above the nav, the way trade sites list them: email,
 * phone and WhatsApp, always one click away. It scrolls away with the page;
 * the nav below it stays. Phones get the same routes in the menu instead.
 */
export default function TopBar() {
  return (
    <div className="hidden bg-muted text-meta text-muted-foreground md:block">
      <div className="container-x flex h-9 items-center justify-between gap-6">
        <ul className="flex items-center gap-6">
          <li>
            <a href={CONTACT_EMAIL_HREF} className={LINK}>
              <Mail className="size-3.5" aria-hidden />
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>
            <a href={CONTACT_PHONE_HREF} className={LINK}>
              <Phone className="size-3.5" aria-hidden />
              {CONTACT_PHONE_DISPLAY}
            </a>
          </li>
          <li>
            <Link href={CONTACT_WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={LINK}>
              <IconBrandWhatsapp className="size-4" aria-hidden />
              WhatsApp
            </Link>
          </li>
        </ul>
        <p>Pakistan · China · Hong Kong</p>
      </div>
    </div>
  );
}
