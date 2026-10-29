import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import {
  COMPANY_NAME,
  COMPANY_TAGLINE,
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTACT_WHATSAPP_HREF,
} from "@/constants";
import { fetchNavCategories } from "@/lib/api";

type FooterLink = {
  name: string;
  href: string;
  external?: boolean;
  Icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

const COMPANY_LINKS: FooterLink[] = [
  { name: "About Metro Metal", href: "/about-us" },
  { name: "Compliance", href: "/compliance" },
  { name: "Journal", href: "/blogs" },
  { name: "Contact", href: "/contact-us" },
];

/**
 * Quiet footer on the aluminium ground. Phones get two columns (products
 * beside company) with 40px tall links; contact routes carry their icons.
 */
export default async function Footer() {
  const { data: categories } = await fetchNavCategories();

  const productLinks = [
    { name: "All products", href: "/products" },
    ...(categories ?? []).map((cat) => ({ name: cat.title, href: `/products/${cat.slug}` })),
  ];

  const contactLinks = [
    { name: CONTACT_EMAIL, href: CONTACT_EMAIL_HREF, external: false, Icon: Mail },
    { name: CONTACT_PHONE_DISPLAY, href: CONTACT_PHONE_HREF, external: false, Icon: Phone },
    { name: "WhatsApp", href: CONTACT_WHATSAPP_HREF, external: true, Icon: IconBrandWhatsapp },
  ];

  const columns: { title: string; links: FooterLink[] }[] = [
    { title: "Products", links: productLinks },
    { title: "Company", links: COMPANY_LINKS },
    { title: "Get in touch", links: contactLinks },
  ];

  return (
    <footer className="bg-muted text-sm text-muted-foreground">
      <div className="container-x py-10 md:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-[1.4fr_repeat(3,1fr)] md:gap-10">
          <div className="col-span-2 max-w-xs md:col-span-1">
            <Link href="/" aria-label={`${COMPANY_NAME} home`}>
              <Image src="/logo.png" width={68} height={66} alt="" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 leading-relaxed">{COMPANY_TAGLINE}</p>
          </div>

          {columns.map((col, i) => (
            <nav key={col.title} aria-label={col.title} className={i === 2 ? "col-span-2 md:col-span-1" : undefined}>
              <h2 className="font-semibold text-foreground">{col.title}</h2>
              <ul className="mt-1.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex min-h-10 items-center gap-2 break-all transition-colors hover:text-foreground hover:underline md:min-h-8"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.Icon && <link.Icon className="size-4 shrink-0" aria-hidden />}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="text-meta mt-8 flex flex-col gap-1 border-t border-black/[0.08] pt-5 md:mt-12 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <p>Pakistan · China · Hong Kong</p>
        </div>
      </div>
    </footer>
  );
}
