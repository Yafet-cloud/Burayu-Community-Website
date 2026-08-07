import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Facebook, Mail, MapPin, Phone } from "lucide-react";
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
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="font-display text-xl font-semibold">{site.parent}</p>
          <p className="mt-1 text-sm text-primary-foreground/70">
            {site.name} — {site.subtitle}
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-primary-foreground/80">
            {site.footerIntro}
          </p>
          <a
            href={site.facebook}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Shaggar City Communication on Facebook"
            className="mt-6 inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
          >
            <Facebook aria-hidden="true" className="size-4" />
          </a>
        </div>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className="font-display text-sm font-semibold tracking-wide">
            Useful Links
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {usefulLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className="text-primary-foreground/75 transition-colors hover:text-primary-foreground"
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
          <ul className="mt-4 space-y-2.5 text-sm">
            {eServices.map((service) => (
              <li key={service.label}>
                {service.to ? (
                  <Link
                    to={service.to}
                    className="inline-flex items-center gap-1 text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                  >
                    {service.label}
                  </Link>
                ) : (
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1 text-primary-foreground/75 transition-colors hover:text-primary-foreground"
                  >
                    {service.label}
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                )}
              </li>
            ))}

          </ul>
        </nav>

        <div className="md:col-span-2 lg:col-span-4">
          <div className="grid gap-6 border-t border-primary-foreground/15 pt-8 text-sm sm:grid-cols-3">
            <p className="flex items-start gap-3 text-primary-foreground/80">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {site.address}
            </p>
            <p className="flex items-start gap-3 text-primary-foreground/80">
              <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <span>
                {site.phones.map((phone, i) => (
                  <span key={phone}>
                    <a href={`tel:${phone.replace(/-/g, "")}`} className="hover:underline">
                      {phone}
                    </a>
                    {i < site.phones.length - 1 ? " or " : ""}
                  </span>
                ))}
              </span>
            </p>
            <p className="flex items-start gap-3 text-primary-foreground/80">
              <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-primary-foreground/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.parent} — {site.name}. All rights reserved.
          </p>
          <p>{site.subtitle} Office</p>
        </div>
      </div>
    </footer>
  );
}
