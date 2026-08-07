import { useEffect, useRef, useState } from "react";

/** Animated counter that only runs once the element scrolls into view. */
export function StatCounter({
  value,
  label,
  suffix = "",
}: {
  value: number | null;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === null || !ref.current) return;
    const node = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-semibold text-primary-foreground sm:text-5xl">
        {value === null ? (
          <span className="text-primary-foreground/45" title="Figure not published">
            &mdash;
          </span>
        ) : (
          <>
            {display.toLocaleString()}
            {suffix}
          </>
        )}
      </p>
      <p className="mt-2 text-sm text-primary-foreground/75">{label}</p>
    </div>
  );
}
