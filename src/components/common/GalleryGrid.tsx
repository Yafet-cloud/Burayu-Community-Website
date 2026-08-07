import { useEffect, useState } from "react";
import { X } from "lucide-react";

export function GalleryGrid({ images }: { images: string[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open gallery image ${i + 1} of ${images.length}`}
              className="group block w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <span className="block aspect-square">
                <img
                  src={src}
                  alt={`Burayu Sub City gallery image ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            aria-label="Close preview"
            autoFocus
            className="absolute right-4 top-4 grid size-11 place-items-center rounded-full bg-background text-foreground"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
          <img
            src={images[active]}
            alt={`Burayu Sub City gallery image ${active + 1}`}
            className="max-h-[85vh] max-w-full rounded-2xl object-contain"
          />
        </div>
      ) : null}
    </>
  );
}
