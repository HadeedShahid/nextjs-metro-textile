import { Mail, Phone } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import type { ContactRoute } from "@/constants";

/** One icon per contact route: lucide outlines, with Tabler only for the WhatsApp mark. */
export const CONTACT_ICONS: Record<ContactRoute["kind"], React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>> = {
  email: Mail,
  phone: Phone,
  whatsapp: IconBrandWhatsapp,
};
