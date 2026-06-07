import { renderInline } from "@/lib/inline";

/** A single entry in a vertical timeline (work roles or education). */
export function TimelineItem({
  title,
  subtitle,
  period,
  location,
  summary,
  highlights,
  logo,
}: {
  title: string;
  subtitle: string;
  period?: string;
  location?: string;
  summary?: string;
  highlights?: string[];
  logo?: string;
}) {
  return (
    <li className="relative border-l border-border pb-9 pl-6 last:pb-0">
      <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
      <div className="flex items-start gap-3">
        {logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logo}
            alt={`${subtitle} logo`}
            className="mt-0.5 h-10 w-10 flex-none rounded-md object-contain"
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="font-serif text-[1.3rem] text-ink">{title}</h3>
            {period ? (
              <span className="font-sans text-sm text-muted tnum">{period}</span>
            ) : null}
          </div>
          <p className="font-sans text-sm text-accent">
            {subtitle}
            {location ? (
              <span className="text-faint"> &middot; {location}</span>
            ) : null}
          </p>
          {summary ? (
            <p className="mt-2 font-serif text-[1.05rem] leading-[1.6] text-ink-soft">
              {renderInline(summary)}
            </p>
          ) : null}
          {highlights?.length ? (
            <ul className="mt-2 list-disc pl-5 font-serif text-[1rem] leading-[1.6] text-ink-soft marker:text-faint">
              {highlights.map((h, i) => (
                <li key={i} className="my-1">
                  {renderInline(h)}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </li>
  );
}
