import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Facebook } from "lucide-react";
import { eServices, site } from "@/lib/site-data";

const usefulLinks = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "News", to: "/news" },
  { label: "Gallery", to: "/gallery" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-primary-deep text-primary-foreground">
      <div className="container-page grid gap-10 py-12 md:grid-cols-2 md:gap-8 md:py-14">
        <div>
          <p className="font-display text-lg font-semibold">{site.parent}</p>
          <p className="mt-1 text-sm text-primary-foreground/70">
            {site.name} — {site.subtitle}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/75">
            {site.footerIntro}
          </p>
          <a
            href={site.facebook}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Shaggar City Communication on Facebook"
            className="mt-5 inline-flex size-9 items-center justify-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
          >
            <Facebook aria-hidden="true" className="size-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <nav aria-labelledby="footer-links">
            <h2 id="footer-links" className="font-display text-sm font-semibold tracking-wide">
              Useful Links
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-eservices">
            <h2 id="footer-eservices" className="font-display text-sm font-semibold tracking-wide">
              E-Services
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              {eServices.map((service) => (
                <li key={service.label}>
                  {service.to ? (
                    <Link
                      to={service.to}
                      className="text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {service.label}
                    </Link>
                  ) : (
                    <a
                      href={service.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {service.label}
                      <ArrowUpRight aria-hidden="true" className="size-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.parent} — {site.name}. All rights reserved.
          </p>
          <p>{site.subtitle} Office</p>
        </div>
      </div>
    </footer>
  );
}
