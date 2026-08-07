import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function ServiceCard({
  label,
  href,
  description,
  Icon,
}: {
  label: string;
  href: string;
  description: string;
  Icon: LucideIcon;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="card-surface card-interactive group flex h-full flex-col p-6"
    >
      <span
        aria-hidden="true"
        className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
      >
        <Icon className="size-5" />
      </span>
      <span className="mt-5 flex items-center gap-1.5 font-display text-base font-semibold text-foreground">
        {label}
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </span>
      <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</span>
    </a>
  );
}
