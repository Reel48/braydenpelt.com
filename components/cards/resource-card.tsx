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
      className="group flex gap-4 rounded-[14px] border border-border bg-surface p-5 shadow-soft transition-colors hover:border-accent"
    >
      {resource.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resource.image}
          alt={resource.title}
          className="h-12 w-12 flex-none rounded-md border border-border bg-white object-contain p-1"
        />
      ) : null}
      <div className="flex min-w-0 flex-1 flex-col">
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
      </div>
    </a>
  );
}
