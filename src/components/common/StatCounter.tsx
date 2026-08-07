import { useEffect, useRef, useState } from "react";

/** Animated counter that only runs once the element scrolls into view. */
export function StatCounter({
  value,
  label,
  suffix = "",
  textValue,
}: {
  value: number | null;
  label: string;
  suffix?: string;
  textValue?: string | null | undefined;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === null || !ref.current) return;
    const node = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(value);
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
          setCount(Math.round(value * (1 - Math.pow(1 - p, 3))));
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
        {textValue ? (
          <span className="text-xl">{textValue}</span>
        ) : value === null ? (
          <span className="text-primary-foreground/45" title="Figure not published">
            &mdash;
          </span>
        ) : (
          <>
            {count.toLocaleString()}
            {suffix}
          </>
        )}
      </p>
      <p className="mt-2 text-sm text-primary-foreground/75">{label}</p>
    </div>
  );
}
