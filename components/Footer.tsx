import Image from "next/image";
import Link from "next/link";
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

const COMPANY_LINKS = [
  { name: "About Metro Metal", href: "/about-us" },
  { name: "Compliance", href: "/compliance" },
  { name: "Journal", href: "/blogs" },
  { name: "Contact", href: "/contact-us" },
];

/** Quiet, dense, small-type footer on the aluminium ground. */
export default async function Footer() {
  const { data: categories } = await fetchNavCategories();

  const productLinks = [
    { name: "All products", href: "/products" },
    ...(categories ?? []).map((cat) => ({ name: cat.title, href: `/products/${cat.slug}` })),
  ];

  const contactLinks = [
    { name: CONTACT_EMAIL, href: CONTACT_EMAIL_HREF, external: false },
    { name: CONTACT_PHONE_DISPLAY, href: CONTACT_PHONE_HREF, external: false },
    { name: "WhatsApp", href: CONTACT_WHATSAPP_HREF, external: true },
  ];

  const columns = [
    { title: "Products", links: productLinks },
    { title: "Company", links: COMPANY_LINKS },
    { title: "Get in touch", links: contactLinks },
  ];

  return (
    <footer className="bg-muted text-[0.8125rem] text-muted-foreground">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Link href="/" aria-label={`${COMPANY_NAME} home`}>
              <Image src="/logo.png" width={68} height={66} alt="" className="h-9 w-auto" />
            </Link>
            <p className="mt-4 leading-relaxed">{COMPANY_TAGLINE}</p>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-semibold text-foreground">{col.title}</h2>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="break-words transition-colors hover:text-foreground hover:underline"
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-black/[0.08] pt-5 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </p>
          <p>Pakistan · China · Hong Kong</p>
        </div>
      </div>
    </footer>
  );
}
