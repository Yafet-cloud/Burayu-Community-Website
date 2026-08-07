import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactInfo } from "@/components/common/ContactInfo";
import { leadership, statistics, welcome } from "@/lib/site-data";
import { StatCounter } from "@/components/common/StatCounter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Burayu Sub City" },
      {
        name: "description",
        content:
          "Welcome message from the Burayu Sub City Administration and an overview of the sub city leadership.",
      },
      { property: "og:title", content: "About Us — Burayu Sub City" },
      {
        property: "og:description",
        content: "Welcome message and leadership of the Burayu Sub City Administration.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        description="Burayu Sub City Administration, Shaggar City."
        crumbs={[{ label: "Home", to: "/" }, { label: "About" }]}
      />

      <section className="section-y" aria-labelledby="about-welcome">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="card-surface overflow-hidden">
              <img
                src={welcome.photo}
                alt={`Portrait of ${welcome.name}`}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="p-6">
                <p className="font-display text-lg font-semibold text-foreground">{welcome.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{welcome.role}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Welcome"
              title={welcome.title}
              id="about-welcome"
              className="max-w-none"
            />
            <p className="mt-4 font-display text-lg text-primary">{welcome.subtitle}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{welcome.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-primary-deep py-16" aria-labelledby="about-stats">
        <div className="container-page">
          <h2 id="about-stats" className="sr-only">
            Burayu Sub City in numbers
          </h2>
          <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {statistics.map((stat) => (
              <li key={stat.label}>
                <StatCounter value={stat.value} label={stat.label} textValue={stat.display} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="about-leadership">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Administration"
            title="Leadership"
            id="about-leadership"
            align="center"
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((person, i) => (
              <Reveal as="li" key={person.name} delay={i * 0.07}>
                <div className="card-surface card-interactive h-full overflow-hidden text-center">
                  <img
                    src={person.photo}
                    alt={`Portrait of ${person.name}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="font-display text-base font-semibold text-foreground">
                      {person.name}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y bg-surface" aria-labelledby="about-contact">
        <div className="container-page">
          <SectionHeading eyebrow="Contact" title="Get in touch" id="about-contact" align="center" />
          <div className="mt-12">
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}
