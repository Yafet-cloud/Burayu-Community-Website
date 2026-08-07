import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { news } from "@/lib/site-data";

export const Route = createFileRoute("/news/$newsId")({
  loader: ({ params }) => {
    const item = news.find((n) => n.id === params.newsId);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Article not found — Burayu Sub City" }, { name: "robots", content: "noindex" }],
      };
    }
    const { item } = loaderData;
    return {
      meta: [
        { title: `${item.title} — Burayu Sub City News` },
        { name: "description", content: item.excerpt.slice(0, 155) },
        { property: "og:title", content: `${item.title} — Burayu Sub City News` },
        { property: "og:description", content: item.excerpt.slice(0, 155) },
        ...(item.image
          ? [
              { property: "og:image", content: item.image },
              { name: "twitter:image", content: item.image },
            ]
          : []),
      ],
    };
  },
  component: NewsDetailPage,
});

function NewsDetailPage() {
  const { item } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        title={item.title}
        crumbs={[{ label: "Home", to: "/" }, { label: "News", to: "/news" }, { label: item.title }]}
      />

      <article className="section-y">
        <div className="container-page max-w-3xl">
          <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <CalendarDays aria-hidden="true" className="size-4" />
            <time dateTime={item.date}>{item.date}</time>
          </p>

          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              loading="eager"
              decoding="async"
              className="mt-6 aspect-[16/9] w-full rounded-2xl border border-border object-cover shadow-[var(--shadow-card)]"
            />
          ) : null}

          <p className="mt-8 text-lg leading-relaxed text-foreground/90">{item.excerpt}</p>

          <Link
            to="/news"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to all news
          </Link>
        </div>
      </article>
    </>
  );
}
