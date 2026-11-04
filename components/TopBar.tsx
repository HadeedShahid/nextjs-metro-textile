import Link from "next/link";
import { CONTACT_ROUTES } from "@/constants";
import { CONTACT_ICONS } from "@/components/common/contact-icons";

/** The company pages, listed in the contact bar, the phone menu and the footer. */
export const COMPANY_LINKS = [
  { title: "About us", url: "/about-us" },
  { title: "Compliance", url: "/compliance" },
  { title: "Blog", url: "/blogs" },
  { title: "Contact", url: "/contact-us" },
];

const LINK = "inline-flex items-center gap-1.5 transition-colors hover:text-foreground hover:underline";

/**
 * The bar above the nav, the way trade sites have it: email, phone and
 * WhatsApp on the left, the company pages on the right. It scrolls away with
 * the page; the nav below it stays. Phones get the same links in the menu.
 */
export default function TopBar() {
  return (
    <div className="hidden bg-muted text-meta text-muted-foreground md:block">
      <div className="container-x flex h-9 items-center justify-between gap-6">
        <ul className="flex items-center gap-6">
          {CONTACT_ROUTES.map((route) => {
            const Icon = CONTACT_ICONS[route.kind];
            return (
              <li key={route.kind}>
                <a
                  href={route.href}
                  className={LINK}
                  {...(route.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {route.linkText}
                </a>
              </li>
            );
          })}
        </ul>
        <nav aria-label="Company">
          <ul className="flex items-center gap-5">
            {COMPANY_LINKS.map((link) => (
              <li key={link.url}>
                <Link href={link.url} className={LINK}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
