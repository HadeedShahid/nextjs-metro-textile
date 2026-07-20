import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
  MAPS_HREF,
} from "@/constants";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import Section from "./base/Section";

const contactDetails = [
  {
    title: "Email support",
    icon: Mail,
    linkText: CONTACT_EMAIL,
    href: CONTACT_EMAIL_HREF,
  },
  {
    title: "WhatsApp",
    icon: IconBrandWhatsapp,
    linkText: "Start chat",
    href: CONTACT_WHATSAPP_HREF,
  },
  {
    title: "Call us directly",
    icon: Phone,
    linkText: CONTACT_PHONE_DISPLAY,
    href: CONTACT_PHONE_HREF,
  },
  {
    title: "Visit our office",
    icon: MapPin,
    linkText: "Check the map",
    href: MAPS_HREF,
  },
];

const ContactSection = () => {
  return (
    <Section eyebrow="Get in touch" title="We'd love to hear from you">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {contactDetails.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="group flex flex-col gap-3 rounded-xl border border-slate-200 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
              <item.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-slate-500">{item.title}</p>
              <p className="mt-0.5 flex items-center gap-1 text-base font-semibold text-slate-900">
                <span className="truncate">{item.linkText}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-0.5" />
              </p>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
};

export default ContactSection;
