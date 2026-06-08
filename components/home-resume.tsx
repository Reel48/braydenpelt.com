"use client";

import { useState } from "react";
import Link from "next/link";
import { TimelineItem } from "@/components/cards/timeline-item";
import type { WorkEntry, EducationEntry } from "@/lib/types";

function roleProps(w: WorkEntry) {
  return {
    title: w.role,
    subtitle: w.organization,
    location: w.location,
    period: `${w.start} – ${w.end ?? "Present"}`,
    summary: w.summary,
    highlights: w.highlights,
    logo: w.logo,
  };
}

/**
 * Home-page résumé teaser: shows the current role, with a toggle that expands
 * to the rest of the experience and education. Reuses TimelineItem.
 */
export function HomeResume({
  work,
  education,
}: {
  work: WorkEntry[];
  education: EducationEntry[];
}) {
  const [expanded, setExpanded] = useState(false);

  if (work.length === 0 && education.length === 0) return null;

  const [current, ...pastRoles] = work;
  const hasMore = pastRoles.length > 0 || education.length > 0;

  return (
    <section className="pb-16">
      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-border pb-2.5">
        <h2 className="font-serif text-[1.5rem] text-ink">Resume</h2>
        <Link
          href="/resume"
          className="font-sans text-sm font-medium text-accent transition-colors hover:text-accent-strong"
        >
          Full resume →
        </Link>
      </div>

      <ol className="mt-2">
        {current ? <TimelineItem {...roleProps(current)} /> : null}
        {expanded
          ? pastRoles.map((w, i) => (
              <TimelineItem key={`${w.organization}-${i}`} {...roleProps(w)} />
            ))
          : null}
      </ol>

      {expanded && education.length ? (
        <div className="mt-8">
          <h3 className="mb-3 font-sans text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-faint">
            Education
          </h3>
          <ol>
            {education.map((e, i) => (
              <TimelineItem
                key={`${e.institution}-${i}`}
                title={e.credential}
                subtitle={e.institution}
                location={e.location}
                period={e.end ? `${e.start} – ${e.end}` : e.start}
                summary={e.field}
                highlights={e.highlights ?? (e.notes ? [e.notes] : undefined)}
                logo={e.logo}
              />
            ))}
          </ol>
        </div>
      ) : null}

      {hasMore ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-3 inline-flex items-center gap-1.5 font-sans text-sm font-medium text-accent transition-colors hover:text-accent-strong"
        >
          {expanded ? "Show less" : "Show full resume"}
          <span
            aria-hidden
            className={`transition-transform ${expanded ? "rotate-180" : ""}`}
          >
            ↓
          </span>
        </button>
      ) : null}
    </section>
  );
}
