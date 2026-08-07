import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navigation, site } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <div className="hidden bg-primary-deep text-primary-foreground md:block">
        <div className="container-page flex items-center justify-between py-2 text-xs">
          <p className="text-primary-foreground/75">
            {site.parent} · {site.name} · {site.subtitle}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phones[0].replace(/-/g, "")}`}
              className="inline-flex items-center gap-1.5 text-primary-foreground/85 transition-colors hover:text-primary-foreground"
            >
              <Phone aria-hidden="true" className="size-3.5" />
              {site.phones[0]}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-1.5 text-primary-foreground/85 transition-colors hover:text-primary-foreground"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-b border-border bg-background/85 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[var(--shadow-header)]",
        )}
      >
        <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3">
          <Link to="/" className="flex min-w-0 items-center gap-3">
            <span
              aria-hidden="true"
              className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground"
            >
              B
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-semibold text-foreground">
                {site.name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {site.subtitle} · {site.parent}
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) =>
                item.children ? (
                  <li key={item.label} className="group relative">
                    <button
                      type="button"
                      aria-haspopup="true"
                      className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary-soft hover:text-primary group-focus-within:bg-primary-soft"
                    >
                      {item.label}
                      <ChevronDown aria-hidden="true" className="size-4" />
                    </button>
                    <div className="invisible absolute left-0 top-full w-60 translate-y-1 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="mt-2 max-h-[70vh] overflow-auto rounded-xl border border-border bg-popover p-2 shadow-[var(--shadow-lift)]">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            {child.to ? (
                              <Link
                                to={child.to}
                                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
                              >
                                {child.label}
                              </Link>
                            ) : (
                              <a
                                href={child.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary"
                              >
                                {child.label}
                                <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-60" />
                              </a>
                            )}
                          </li>
                        ))}

                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      to={item.to as string}
                      activeOptions={{ exact: item.to === "/" }}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-primary-soft hover:text-primary data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>

        <div
          id="mobile-menu"
          hidden={!open}
          className="border-t border-border bg-background lg:hidden"
        >
          <nav aria-label="Mobile" className="container-page max-h-[70vh] overflow-auto py-4">
            <ul className="space-y-1">
              {navigation.map((item) =>
                item.children ? (
                  <li key={item.label}>
                    <details className="group rounded-xl border border-border">
                      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium">
                        {item.label}
                        <ChevronDown
                          aria-hidden="true"
                          className="size-4 transition-transform group-open:rotate-180"
                        />
                      </summary>
                      <ul className="border-t border-border p-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            {child.to ? (
                              <Link
                                to={child.to}
                                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
                              >
                                {child.label}
                              </Link>
                            ) : (
                              <a
                                href={child.href}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                              >
                                {child.label}
                                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                              </a>
                            )}
                          </li>
                        ))}

                      </ul>
                    </details>
                  </li>
                ) : (
                  <li key={item.label}>
                    <Link
                      to={item.to as string}
                      activeOptions={{ exact: item.to === "/" }}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-secondary data-[status=active]:bg-primary-soft data-[status=active]:text-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
