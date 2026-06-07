"use client";

import { useRef } from "react";

/**
 * Horizontal, swipeable carousel shell: a titled header with an optional
 * "view all" link and prev/next buttons, over a scroll-snap track.
 * Slides are passed as children (each should be `shrink-0 snap-start`).
 * Native touch swipe via scroll-snap; buttons nudge by ~one viewport.
 */
export function Carousel({
  title,
  viewAllHref,
  viewAllLabel = "View all",
  children,
}: {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  children: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function nudge(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full border border-border-strong font-sans text-muted transition-colors hover:border-accent hover:text-accent";

  return (
    <div>
      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-border pb-2.5">
        <h2 className="font-serif text-[1.5rem] text-ink">{title}</h2>
        <div className="flex items-center gap-4">
          {viewAllHref ? (
            <a
              href={viewAllHref}
              className="font-sans text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              {viewAllLabel} &rarr;
            </a>
          ) : null}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => nudge(-1)}
              className={arrow}
            >
              &larr;
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => nudge(1)}
              className={arrow}
            >
              &rarr;
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
