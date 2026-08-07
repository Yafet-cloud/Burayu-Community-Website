import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string };

export function PageHeader({
  title,
  description,
  crumbs,
}: {
  title: string;
  description?: string;
  crumbs: Crumb[];
}) {
  return (
    <section className="border-b border-border bg-primary-deep">
      <div className="container-page py-14 md:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-primary-foreground/70">
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1">
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="rounded-sm transition-colors hover:text-primary-foreground"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-primary-foreground">
                    {crumb.label}
                  </span>
                )}
                {i < crumbs.length - 1 ? (
                  <ChevronRight aria-hidden="true" className="size-4 opacity-60" />
                ) : null}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="mt-4 text-4xl font-semibold text-primary-foreground sm:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/80">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
