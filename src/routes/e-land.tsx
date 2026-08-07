import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, FileText, LandPlot, Map, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { LAND_PORTAL_URL, openPortal } from "@/lib/portals";
import { site } from "@/lib/site-data";

const PORTAL_URL = LAND_PORTAL_URL;

export const Route = createFileRoute("/e-land")({
  head: () => ({
    meta: [
      { title: "E-Land — Burayu Sub City" },
      {
        name: "description",
        content:
          "The Burayu Sub City E-Land service: land administration information and the login portal for registered users.",
      },
      { property: "og:title", content: "E-Land — Burayu Sub City" },
      {
        property: "og:description",
        content:
          "Land administration and cadastre services for residents and investors of Burayu Sub City.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "E-Land — Burayu Sub City" },
      {
        name: "twitter:description",
        content: "Land administration and cadastre services for Burayu Sub City.",
      },
    ],
  }),
  component: ELandPage,
});

const features = [
  {
    Icon: Map,
    title: "Land information",
    body: "Digital land administration records maintained by Shaggar City.",
  },
  {
    Icon: FileText,
    title: "Service requests",
    body: "Submit and follow land-related requests through the government portal.",
  },
  {
    Icon: ShieldCheck,
    title: "Verified access",
    body: "Only registered users with valid credentials can sign in to the system.",
  },
];

function ELandPage() {
  return (
    <>
      <PageHeader
        title="E-Land"
        description="Digital land administration service of Burayu Sub City, Shaggar City."
        crumbs={[{ label: "Home", to: "/" }, { label: "E-service" }, { label: "E-Land" }]}
      />

      <section className="section-y">
        <div className="container-page grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="E-service"
              title="The E-Land portal is being prepared"
              description="This page will host the full E-Land experience. In the meantime, registered users can sign in directly to the Shaggar City land administration portal."
            />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Guidance on required documents, eligibility and processing steps will be published
              here. For assistance today, please contact the office using the details below.
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
                Open the land portal
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href={`tel:${site.phones[0].replace(/-/g, "")}`}
                className="inline-flex items-center gap-2 rounded-xl border border-input bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent-soft"
              >
                Call {site.phones[0]}
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
                <LandPlot aria-hidden="true" className="size-5 shrink-0 text-primary" />
                More E-Land information will be published on this page.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </>
  );
}
