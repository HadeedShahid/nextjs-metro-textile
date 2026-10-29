import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MoreLinkProps {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "die";
  className?: string;
}

/** The "Label ›" text action: plum, 15px, with a 40px tall tap area. */
export default function MoreLink({ href, children, tone = "light", className }: MoreLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "link-more group hover:underline",
        tone === "die" ? "text-die-foreground" : "text-primary",
        className,
      )}
    >
      {children}
      <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
    </Link>
  );
}
