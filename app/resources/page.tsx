import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { resources } from "@/content/resources";
import type { Resource } from "@/lib/types";

export const metadata: Metadata = { title: "Resources" };

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

function ResourceCard({ resource }: { resource: Resource }) {
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

export default function ResourcesPage() {
  const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2";

  // Group by category when any entry has one; otherwise render a flat list.
  const grouped = resources.some((r) => r.category);
  const groups = new Map<string, Resource[]>();
  for (const r of resources) {
    const key = r.category ?? "Other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(r);
  }

  return (
    <Container>
      <PageHeader title="Resources" />

      {resources.length === 0 ? (
        <EmptyState
          title="No resources yet"
          hint="Add the links, tools, and references you find yourself sharing."
          file="content/resources.ts"
        />
      ) : grouped ? (
        <div className="pb-20">
          {[...groups.entries()].map(([category, items]) => (
            <Section key={category} title={category} count={items.length}>
              <div className={grid}>
                {items.map((r, i) => (
                  <ResourceCard key={`${r.url}-${i}`} resource={r} />
                ))}
              </div>
            </Section>
          ))}
        </div>
      ) : (
        <div className={`${grid} pb-20`}>
          {resources.map((r, i) => (
            <ResourceCard key={`${r.url}-${i}`} resource={r} />
          ))}
        </div>
      )}
    </Container>
  );
}
