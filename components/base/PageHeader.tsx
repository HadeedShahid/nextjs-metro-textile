import Breadcrumbs, { type BreadcrumbItem } from "@/components/common/Breadcrumbs";

interface PageHeaderProps {
  title: string;
  lede?: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  children?: React.ReactNode;
}

/** Inner-page opening: crumbs, the page title, one line of context. */
export default function PageHeader({ title, lede, breadcrumbs, children }: PageHeaderProps) {
  return (
    <header className="container-x pb-8 pt-8 md:pb-10 md:pt-10">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="text-display mt-3 max-w-4xl">{title}</h1>
      {lede && <p className="text-lede mt-3 max-w-2xl text-muted-foreground">{lede}</p>}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}
