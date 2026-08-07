import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Building2, CalendarClock, MapPin, Wallet } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { careerIntro, jobs } from "@/lib/site-data";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Burayu Sub City" },
      {
        name: "description",
        content: "Current job openings and career opportunities at Burayu Sub City, Shaggar City.",
      },
      { property: "og:title", content: "Careers — Burayu Sub City" },
      {
        property: "og:description",
        content: "Current job openings and career opportunities at Burayu Sub City.",
      },
    ],
  }),
  component: CareersPage,
});

function Field({
  Icon,
  label,
  value,
}: {
  Icon: typeof Briefcase;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
      <p className="text-sm">
        <span className="text-muted-foreground">{label}: </span>
        {value ? (
          <span className="font-medium text-foreground">{value}</span>
        ) : (
          <span className="text-muted-foreground italic">Not specified</span>
        )}
      </p>
    </div>
  );
}

function CareersPage() {
  return (
    <>
      <PageHeader
        title="Career"
        description="Join the team serving the residents of Burayu Sub City."
        crumbs={[{ label: "Home", to: "/" }, { label: "Careers" }]}
      />

      <section className="section-y">
        <div className="container-page">
          <SectionHeading eyebrow="Careers" title="Career Opportunities" />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {careerIntro}
          </p>
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="openings">
        <div className="container-page">
          <SectionHeading eyebrow="Vacancies" title="Current Job Openings" id="openings" />

          {jobs.length === 0 ? (
            <div className="card-surface mt-12 p-10 text-center">
              <h3 className="font-display text-lg font-semibold text-foreground">
                No open positions
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                There are no vacancies published at the moment. Please check back later.
              </p>
            </div>
          ) : (
            <ul className="mt-12 grid gap-6 lg:grid-cols-2">
              {jobs.map((job, i) => (
                <Reveal as="li" key={`${job.title}-${i}`} delay={i * 0.07}>
                  <article className="card-surface card-interactive flex h-full flex-col p-7">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                      <h3 className="min-w-0 font-display text-xl font-semibold text-foreground">
                        {job.title}
                      </h3>
                      <span className="shrink-0 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-foreground">
                        {job.type}
                      </span>
                    </div>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <Field Icon={MapPin} label="Work location" value={job.location} />
                      <Field Icon={Building2} label="Office" value={job.office} />
                      <Field Icon={Wallet} label="Salary" value={job.salary} />
                      <Field Icon={CalendarClock} label="Started on" value={job.startedOn} />
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">Job description: </span>
                      {job.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                      <p className="text-sm text-muted-foreground">
                        Deadline:{" "}
                        <time dateTime={job.deadline} className="font-medium text-foreground">
                          {job.deadline}
                        </time>
                      </p>
                      <a
                        href="mailto:cshaggar@gmail.com?subject=Job%20application"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
                      >
                        <Briefcase aria-hidden="true" className="size-4" />
                        Apply Now
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
