"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ArrowRight, ChevronLeft, ChevronRight } from "@/components/ui/icons";

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
  // Track scroll position so we can signal where the user is: disable the
  // arrow at each extent and fade an edge mask on the side with more content.
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = 0;
    // The track's left padding (px-5) is also where scroll-snap rests the first
    // slide, so "at start" means scrollLeft is within that padding, not 0.
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const update = () => {
      raf = 0;
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setAtStart(scrollLeft <= pad + 1);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  function nudge(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  const arrow =
    "flex h-9 w-9 items-center justify-center rounded-full border border-border-strong font-sans text-muted transition duration-200 hover:border-accent hover:bg-accent-soft hover:text-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border-strong disabled:hover:bg-transparent disabled:hover:text-muted";

  return (
    <div>
      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-border pb-2.5">
        <h2 className="font-serif text-[1.5rem] text-ink">{title}</h2>
        <div className="flex items-center gap-4">
          {viewAllHref ? (
            <a
              href={viewAllHref}
              className="group inline-flex items-center gap-1 font-sans text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              {viewAllLabel}
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          ) : null}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => nudge(-1)}
              disabled={atStart}
              className={arrow}
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => nudge(1)}
              disabled={atEnd}
              className={arrow}
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Edge masks — fade in only on the side that has more to scroll.
            The track bleeds 20px (-mx-5) past this wrapper for shadow room, so
            the masks sit at -left-5/-right-5 to meet the slides' real edges. */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 -left-5 z-10 w-10 bg-gradient-to-r from-bg to-transparent transition-opacity duration-200",
            atStart ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-y-0 -right-5 z-10 w-10 bg-gradient-to-l from-bg to-transparent transition-opacity duration-200",
            atEnd ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-10 pt-4 -mx-5 -mb-6 -mt-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
