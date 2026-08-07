import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/site-data";

const items = [
  { Icon: MapPin, title: "Our Address", body: site.address, href: null },
  { Icon: Mail, title: "Email Us", body: site.email, href: `mailto:${site.email}` },
  {
    Icon: Phone,
    title: "Call Us",
    body: site.phones.join(" or "),
    href: `tel:${site.phones[0].replace(/-/g, "")}`,
  },
];

export function ContactInfo() {
  return (
    <ul className="grid gap-5 sm:grid-cols-3">
      {items.map(({ Icon, title, body, href }) => (
        <li key={title} className="card-surface card-interactive p-6">
          <span
            aria-hidden="true"
            className="grid size-11 place-items-center rounded-xl bg-primary-soft text-primary"
          >
            <Icon className="size-5" />
          </span>
          <h3 className="mt-4 font-display text-base font-semibold text-foreground">{title}</h3>
          {href ? (
            <a
              href={href}
              className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {body}
            </a>
          ) : (
            <p className="mt-1 text-sm text-muted-foreground">{body}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
