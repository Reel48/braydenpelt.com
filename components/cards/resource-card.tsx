import type { Resource } from "@/lib/types";

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
      className="group flex flex-col rounded-[14px] border border-border bg-surface p-5 shadow-soft transition-colors hover:border-accent"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-serif text-[1.2rem] text-ink transition-colors group-hover:text-accent">
          {resource.title}
        </h3>
        <span
          aria-hidden
          className="font-sans text-muted transition-transform group-hover:-translate-y-0.5 group-hover:text-accent"
        >
          ↗
        </span>
      </div>
      {resource.description ? (
        <p className="mt-1 font-serif text-[1rem] leading-[1.6] text-ink-soft">
          {resource.description}
        </p>
      ) : null}
      {host ? (
        <p className="mt-2 font-sans text-xs text-faint">{host}</p>
      ) : null}
    </a>
  );
}
