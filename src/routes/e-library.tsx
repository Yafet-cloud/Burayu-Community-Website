import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, GraduationCap, Library, Search } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { LIBRARY_PORTAL_URL, openPortal } from "@/lib/portals";
import { site } from "@/lib/site-data";

const PORTAL_URL = LIBRARY_PORTAL_URL;

export const Route = createFileRoute("/e-library")({
  head: () => ({
    meta: [
      { title: "E-library — Burayu Sub City" },
      {
        name: "description",
        content:
          "The Burayu Sub City E-library service: digital reading resources, catalogue access and the login portal for registered users.",
      },
      { property: "og:title", content: "E-library — Burayu Sub City" },
      {
        property: "og:description",
        content:
          "Digital reading resources and catalogue access for residents, students and researchers of Burayu Sub City.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "E-library — Burayu Sub City" },
      {
        name: "twitter:description",
        content: "Digital reading resources and catalogue access for Burayu Sub City.",
      },
    ],
  }),
  component: ELibraryPage,
});

const features = [
  {
    Icon: BookOpen,
    title: "Digital reading room",
    body: "Access published books, journals and reference material from any device.",
  },
  {
    Icon: Search,
    title: "Catalogue search",
    body: "Search the collection by title, author or subject before visiting an office.",
  },
  {
    Icon: GraduationCap,
    title: "For students and researchers",
    body: "Study resources supporting learners, researchers and public-sector staff.",
  },
];

function ELibraryPage() {
  return (
    <>
      <PageHeader
        title="E-library"
        description="Digital library service of Burayu Sub City, Shaggar City."
        crumbs={[{ label: "Home", to: "/" }, { label: "E-service" }, { label: "E-library" }]}
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="E-service"
              title="The E-library portal is being prepared"
              description="This page will host the full E-library experience. In the meantime, registered users can sign in directly to the Shaggar City library portal."
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              We are publishing the catalogue, borrowing guidance and registration steps here. If
              you need assistance with an account today, contact the office and our team will guide
              you through the process.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(event) => {
                  event.preventDefault();
                  openPortal(PORTAL_URL);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-deep"
              >
                Open the library portal
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft"
              >
                Ask for support
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              The portal is hosted on a separate government system and opens in a new tab.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {features.map(({ Icon, title, body }) => (
                <li
                  key={title}
                  className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-lift)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <div>
                      <h2 className="font-display text-base font-semibold text-foreground">
                        {title}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
                    </div>
                  </div>
                </li>
              ))}
              <li className="flex items-center gap-3 rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
                <Library aria-hidden="true" className="size-5 shrink-0 text-primary" />
                More E-library information will be published on this page.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
