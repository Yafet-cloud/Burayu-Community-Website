import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/common/PageHeader";
import { GalleryGrid } from "@/components/common/GalleryGrid";
import { gallery } from "@/lib/site-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Burayu Sub City" },
      {
        name: "description",
        content: "Photo gallery of events, projects and public life in Burayu Sub City.",
      },
      { property: "og:title", content: "Gallery — Burayu Sub City" },
      {
        property: "og:description",
        content: "Photo gallery of events, projects and public life in Burayu Sub City.",
      },
      { property: "og:image", content: gallery[0] },
      { name: "twitter:image", content: gallery[0] },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHeader
        title="Our Gallery"
        description="Images published by the Burayu Sub City Administration."
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
      />
      <section className="section-y">
        <div className="container-page">
          <GalleryGrid images={gallery} />
        </div>
      </section>
    </>
  );
}
