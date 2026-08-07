import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { NewsCard } from "@/components/common/NewsCard";
import { Reveal } from "@/components/common/Reveal";
import { news } from "@/lib/site-data";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News & Announcements — Burayu Sub City" },
      {
        name: "description",
        content:
          "Latest news and announcements published by Burayu Sub City, including Digital Shaggar and the Irreecha festival.",
      },
      { property: "og:title", content: "News & Announcements — Burayu Sub City" },
      {
        property: "og:description",
        content: "Latest news and announcements published by Burayu Sub City.",
      },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return news;
    return news.filter(
      (item) =>
        item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <>
      <PageHeader
        title="News"
        description="Announcements and stories from the Burayu Sub City Administration."
        crumbs={[{ label: "Home", to: "/" }, { label: "News" }]}
      />

      <section className="section-y">
        <div className="container-page">
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto max-w-md"
          >
            <label htmlFor="news-search" className="sr-only">
              Search news
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id="news-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news…"
                className="h-12 w-full rounded-xl border border-input bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
            </div>
          </form>

          {results.length === 0 ? (
            <div className="card-surface mx-auto mt-12 max-w-md p-10 text-center">
              <h2 className="font-display text-lg font-semibold text-foreground">
                No news found
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                No published article matches “{query}”. Try a different search term.
              </p>
            </div>
          ) : (
            <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {results.map((item, i) => (
                <Reveal as="li" key={item.id} delay={i * 0.07}>
                  <NewsCard item={item} priority={i === 0} />
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
