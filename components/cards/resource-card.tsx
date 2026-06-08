import { renderInline } from "@/lib/inline";
import type { Resource } from "@/lib/types";
import { ArrowUpRight } from "@/components/ui/icons";

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const host = hostname(resource.url);
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-[14px] border border-border bg-surface shadow-soft transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-lift"
    >
      {resource.image ? (
        <div className="aspect-square w-full border-b border-border bg-white p-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resource.image}
            alt={resource.title}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-[1.2rem] text-ink transition-colors group-hover:text-accent">
            {resource.title}
          </h3>
          <span
            aria-hidden
            className="mt-1 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-accent"
          >
            <ArrowUpRight />
          </span>
        </div>
        {resource.description ? (
          <p className="mt-1 font-serif text-[1rem] leading-[1.6] text-ink-soft">
            {renderInline(resource.description)}
          </p>
        ) : null}
        {host ? (
          <p className="mt-2 font-sans text-xs text-faint">{host}</p>
        ) : null}
      </div>
    </a>
  );
}
