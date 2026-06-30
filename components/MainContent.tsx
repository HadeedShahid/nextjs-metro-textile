"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main className={cn("flex flex-col gap-16", !isHome && "lg:py-5")}>
      {children}
    </main>
  );
}
