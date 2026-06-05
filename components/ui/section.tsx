import { cn } from "@/lib/cn";

/** A labeled content block — Georgia title + optional count, with a rule. */
export function Section({
  title,
  count,
  badge,
  className,
  children,
}: {
  title: string;
  count?: number;
  /** Optional right-aligned node (e.g. a "live" indicator); replaces count. */
  badge?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("mt-14 first:mt-0", className)}>
      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-border pb-2.5">
        <h2 className="font-serif text-[1.5rem] text-ink">{title}</h2>
        {badge != null ? (
          badge
        ) : count != null ? (
          <span className="font-sans text-xs uppercase tracking-[0.12em] text-faint tnum">
            {count} {count === 1 ? "item" : "items"}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}

/** Small "Live · Source" pill used when a section is fed by an RSS integration. */
export function LiveBadge({ source }: { source: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-sans text-xs text-muted">
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
      Live · {source}
    </span>
  );
}
