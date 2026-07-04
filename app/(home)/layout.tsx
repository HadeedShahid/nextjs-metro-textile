import SiteShell from "@/components/SiteShell";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <SiteShell home>{children}</SiteShell>;
}
