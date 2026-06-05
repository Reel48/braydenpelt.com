import { cn } from "@/lib/cn";

/** A labeled content block — Georgia title + optional count, with a rule. */
export function Section({
  title,
  count,
  className,
  children,
}: {
  title: string;
  count?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn("mt-14 first:mt-0", className)}>
      <div className="mb-5 flex items-baseline justify-between gap-3 border-b border-border pb-2.5">
        <h2 className="font-serif text-[1.5rem] text-ink">{title}</h2>
        {count != null ? (
          <span className="font-sans text-xs uppercase tracking-[0.12em] text-faint tnum">
            {count} {count === 1 ? "item" : "items"}
          </span>
        ) : null}
      </div>
      {children}
    </section>
  );
}
