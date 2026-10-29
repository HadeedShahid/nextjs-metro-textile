import { CONTACT_ROUTES } from "@/constants";
import { CONTACT_ICONS } from "@/components/common/contact-icons";

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
        <p>Pakistan · China · Hong Kong</p>
      </div>
    </div>
  );
}
