import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Building2,
  Cpu,
  Database,
  Globe2,
  Handshake,
  Landmark,
  LibraryBig,
  MapPinned,
  Network,
  ShieldCheck,
  Store,
  Video,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/common/Reveal";
import { SectionHeading } from "@/components/common/SectionHeading";
import { StatCounter } from "@/components/common/StatCounter";
import { NewsCard } from "@/components/common/NewsCard";
import { ServiceCard } from "@/components/common/ServiceCard";
import { ContactInfo } from "@/components/common/ContactInfo";
import {
  cityProfile,
  gallery,
  heroSlides,
  leadership,
  news,
  site,
  statistics,
  welcome,
} from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Official Burayu Sub-City Website" },
      {
        name: "description",
        content:
          "Official Burayu Sub-City website providing information, services, news, and resources.",
      },
      { property: "og:title", content: "Official Burayu Sub-City Website" },
      {
        property: "og:description",
        content:
          "Official Burayu Sub-City website providing information, services, news, and resources.",
      },
      { property: "og:image", content: "/favicon.ico" },
      { name: "twitter:image", content: "/favicon.ico" },
    ],
  }),
  component: HomePage,
});

const serviceCards = [
  {
    label: "E-library",
    href: "/e-library",
    description: "Digital library access for residents, students and city staff.",
    Icon: LibraryBig,
  },
  {
    label: "E-Land",
    href: "/e-land",
    description: "Land administration services online.",
    Icon: MapPinned,
  },
  {
    label: "E-Conference",
    href: "https://shaggarcity.oo.et/?module=login",
    description: "Online conferencing platform for city offices.",
    Icon: Video,
  },
  {
    label: "E-service",
    href: "https://eservice.shaggarcity.et/",
    description: "The Shaggar City one-stop public service portal.",
    Icon: Globe2,
  },
  {
    label: "E-investment",
    href: "https://investment.shaggarcity.et/login",
    description: "Investment registration and follow-up services.",
    Icon: Handshake,
  },
  {
    label: "E-Trade",
    href: "http://etrade.gov.et/",
    description: "National electronic trade registration and licensing.",
    Icon: Store,
  },
];

const highlights = [
  {
    title: "Smart City Technology",
    body: "Digital initiatives that improve service efficiency, accessibility and connectivity for residents and businesses.",
    Icon: Cpu,
  },
  {
    title: "E-Governance",
    body: "Public services delivered online so residents can reach the administration without queueing at an office.",
    Icon: ShieldCheck,
  },
  {
    title: "Digital Library",
    body: "A shared knowledge platform supporting students, researchers and civil servants across the sub city.",
    Icon: Database,
  },
];

function Hero() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="relative isolate overflow-hidden bg-primary-deep">
      <div className="absolute inset-0 -z-10">
        {heroSlides.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="absolute inset-0 size-full object-cover transition-opacity duration-1000"
            style={{ opacity: i === index ? 0.35 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-primary-deep via-primary-deep/85 to-primary-deep/40" />
      </div>

      <div className="container-page py-24 md:py-32">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/85">
            <Landmark aria-hidden="true" className="size-3.5" />
            {site.parent} · {site.subtitle}
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            Burayu Sub City — building a model smart city
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            Competitive, livable and responsive to the needs of all residents. A compact,
            polycentric economic hub built on inclusivity, connectivity and environmental
            sustainability.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform duration-200 hover:-translate-y-0.5"
            >
              About the administration
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              href="https://eservice.shaggarcity.et/"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/30 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Go to e-services
            </a>
          </div>
        </motion.div>

        <div className="mt-12 flex gap-2" role="tablist" aria-label="Hero slides">
          {heroSlides.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-10 bg-accent" : "w-5 bg-primary-foreground/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />

      {/* Welcome */}
      <section className="section-y" aria-labelledby="welcome-heading">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
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
              id="welcome-heading"
              className="max-w-none"
            />
            <p className="mt-4 font-display text-lg text-primary">{welcome.subtitle}</p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{welcome.body}</p>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-deep"
            >
              Read the full message
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-y bg-surface" aria-labelledby="leadership-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="The Administration"
            title="City leadership"
            id="leadership-heading"
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

      {/* Statistics */}
      <section className="bg-primary-deep py-16" aria-labelledby="stats-heading">
        <div className="container-page">
          <h2 id="stats-heading" className="sr-only">
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

      {/* Science & Technology highlights */}
      <section className="section-y" aria-labelledby="highlights-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Science & Technology"
            title="Digital transformation of Shaggar"
            id="highlights-heading"
            description="Shaggar City is undergoing a digital transformation to improve service efficiency, accessibility and connectivity for its residents and businesses."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {highlights.map((item, i) => (
              <Reveal as="li" key={item.title} delay={i * 0.08}>
                <div className="card-surface card-interactive h-full p-7">
                  <span
                    aria-hidden="true"
                    className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary"
                  >
                    <item.Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section className="section-y bg-surface" aria-labelledby="services-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="E-Services"
            title="Public services online"
            id="services-heading"
            description="Access the digital services operated by Shaggar City and its partner institutions."
          />
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCards.map((service, i) => (
              <Reveal as="li" key={service.label} delay={i * 0.06}>
                <ServiceCard {...service} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* City profile */}
      <section className="section-y" aria-labelledby="profile-heading">
        <div className="container-page">
          <SectionHeading eyebrow="City Profile" title="Service coverage" id="profile-heading" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cityProfile.map((item, i) => (
              <Reveal as="li" key={item.label} delay={i * 0.05}>
                <div className="card-surface card-interactive h-full p-6">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-2 font-display text-3xl font-semibold text-foreground">
                    {item.value}
                  </p>
                  {item.percent !== null ? (
                    <div
                      className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted"
                      role="img"
                      aria-label={`${item.label}: ${item.value}`}
                    >
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-700"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* News */}
      <section className="section-y bg-surface" aria-labelledby="news-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Newsroom"
              title="News & announcements"
              id="news-heading"
              className="max-w-xl"
            />
            <Link
              to="/news"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary-soft hover:text-primary"
            >
              All news
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 0.07}>
                <NewsCard item={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured projects */}
      <section className="section-y" aria-labelledby="projects-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Featured Projects"
            title="Initiatives under way"
            id="projects-heading"
            description="Programmes highlighted by the administration on the city portal."
          />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Digital Shaggar",
                body: "City-wide digital initiatives spanning smart city technology, e-governance and the digital library.",
                Icon: Network,
              },
              {
                title: "Polycentric economic hub",
                body: "Strategic spatial planning and targeted investment in innovative infrastructure across the sub city.",
                Icon: Building2,
              },
              {
                title: "Connected public services",
                body: "Bringing land, trade, investment and conference services onto shared online platforms.",
                Icon: Globe2,
              },
            ].map((project, i) => (
              <Reveal as="li" key={project.title} delay={i * 0.08}>
                <div className="card-surface card-interactive h-full border-l-4 border-l-accent p-7">
                  <project.Icon aria-hidden="true" className="size-6 text-accent" />
                  <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="section-y bg-surface" aria-labelledby="gallery-heading">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Our Gallery"
              title="Moments from the sub city"
              id="gallery-heading"
              className="max-w-xl"
            />
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-primary-soft hover:text-primary"
            >
              View gallery
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.slice(0, 8).map((src, i) => (
              <li
                key={src}
                className="overflow-hidden rounded-2xl border border-border bg-muted shadow-[var(--shadow-card)]"
              >
                <img
                  src={src}
                  alt={`Burayu Sub City gallery image ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-square size-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y" aria-labelledby="cta-heading">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl bg-primary px-8 py-14 text-center md:px-16">
            <h2
              id="cta-heading"
              className="text-3xl font-semibold text-primary-foreground sm:text-4xl"
            >
              Work with the Science &amp; Technology Office
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-primary-foreground/85">
              Explore current vacancies at the sub city or get in touch with the administration.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/careers"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5"
              >
                See careers
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/35 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact preview */}
      <section className="section-y bg-surface" aria-labelledby="contact-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Contact"
            title="Reach the administration"
            id="contact-heading"
            align="center"
          />
          <div className="mt-12">
            <ContactInfo />
          </div>
        </div>
      </section>
    </>
  );
}
