import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import MoreLink from "@/components/base/MoreLink";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-x flex min-h-[60vh] flex-col items-start justify-center py-16">
        <h1 className="text-display max-w-3xl">This page isn&apos;t in the catalog.</h1>
        <p className="text-lede mt-5 max-w-xl text-muted-foreground">
          The link may be old, or the product may have moved. Everything we make is one click away.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href="/products" size="lg" variant="ink">
            Browse products
          </Button>
          <MoreLink href="/">Go to the homepage</MoreLink>
        </div>
      </section>
    </SiteShell>
  );
}
