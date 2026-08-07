import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { ContactInfo } from "@/components/common/ContactInfo";
import { SectionHeading } from "@/components/common/SectionHeading";
import { site } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Burayu Sub City" },
      {
        name: "description",
        content:
          "Get in touch with the Burayu Sub City Administration: address, phone numbers, email and message form.",
      },
      { property: "og:title", content: "Contact — Burayu Sub City" },
      {
        property: "og:description",
        content: "Address, phone numbers and email for the Burayu Sub City Administration.",
      },
    ],
  }),
  component: ContactPage,
});

type Status = "idle" | "sent";

function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const subject = String(form.get("subject") ?? "");
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;

    window.location.href = `mailto:${site.email}?${new URLSearchParams({ subject, body })}`;
    setStatus("sent");
  }

  const fieldClass =
    "h-12 w-full rounded-xl border border-input bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none";

  return (
    <>
      <PageHeader
        title="Get in touch"
        description="We would like to hear from the residents and visitors of Burayu Sub City."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
      />

      <section className="section-y">
        <div className="container-page">
          <ContactInfo />

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <SectionHeading eyebrow="Message" title="Send us a message" />
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                You can also write to us directly at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-medium text-primary hover:underline"
                >
                  {site.email}
                </a>{" "}
                or call {site.phones.join(" or ")}.
              </p>
            </div>

            <form onSubmit={onSubmit} className="card-surface space-y-5 p-7" noValidate={false}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    Your name
                  </label>
                  <input id="name" name="name" required autoComplete="name" className={`mt-2 ${fieldClass}`} />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    Your email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={`mt-2 ${fieldClass}`}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  Subject
                </label>
                <input id="subject" name="subject" required className={`mt-2 ${fieldClass}`} />
              </div>
              <div>
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-2 w-full rounded-xl border border-input bg-card p-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep disabled:opacity-70"
              >
                <Send aria-hidden="true" className="size-4" />
                Send Message
              </button>

              <p aria-live="polite" className="min-h-5 text-sm text-primary">
                {status === "sent"
                  ? "Your email application should open with your message ready to send."
                  : ""}
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
