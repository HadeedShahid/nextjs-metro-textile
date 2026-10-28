import Link from "next/link";
import { ChevronRight } from "lucide-react";
import SiteShell from "@/components/SiteShell";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <SiteShell>
      <section className="container-x flex min-h-[70vh] flex-col items-start justify-center py-24">
        <h1 className="text-display max-w-3xl">This page isn&apos;t in the catalog.</h1>
        <p className="text-lede mt-5 max-w-xl text-muted-foreground">
          The link may be old, or the product may have moved. Everything we make is one click away.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Button href="/products" size="lg" variant="ink">
            Browse products
          </Button>
          <Link href="/" className="group inline-flex items-center gap-0.5 text-[1.0625rem] text-primary hover:underline">
            Go to the homepage
            <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
