import Breadcrumbs, { type BreadcrumbItem } from "@/components/common/Breadcrumbs";

interface PageHeaderProps {
  title: string;
  lede?: React.ReactNode;
  breadcrumbs: BreadcrumbItem[];
  children?: React.ReactNode;
}

/** Inner-page opening: crumbs, one large statement, one line of context. */
export default function PageHeader({ title, lede, breadcrumbs, children }: PageHeaderProps) {
  return (
    <header className="container-x pb-14 pt-10 md:pb-20 md:pt-14">
      <div className="hidden md:block">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <h1 className="text-display mt-4 max-w-5xl">{title}</h1>
      {lede && <p className="text-lede mt-5 max-w-2xl text-muted-foreground">{lede}</p>}
      {children && <div className="mt-8">{children}</div>}
    </header>
  );
}
