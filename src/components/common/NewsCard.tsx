import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { NewsItem } from "@/lib/site-data";

export function NewsCard({ item, priority = false }: { item: NewsItem; priority?: boolean }) {
  return (
    <article className="card-surface card-interactive group flex h-full flex-col overflow-hidden">
      <div className="aspect-[16/9] overflow-hidden bg-muted">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center text-xs text-muted-foreground">
            No image available
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays aria-hidden="true" className="size-3.5" />
          <time dateTime={item.date}>{item.date}</time>
        </p>
        <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.excerpt}
        </p>
        <Link
          to="/news/$newsId"
          params={{ newsId: item.id }}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-deep"
        >
          Read more
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
