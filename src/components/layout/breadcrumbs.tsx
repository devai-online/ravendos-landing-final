import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 font-[family-name:var(--font-body)] text-xs text-text/40">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-text/30">
                /
              </span>
            )}
            {i < items.length - 1 ? (
              <Link
                href={item.href}
                className="transition-colors duration-200 hover:text-text/70"
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-text/60" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
