import { EmptyState } from "@/components/ui/empty-state";
import { ResourceCard } from "@/components/cards/resource-card";
import { Reveal } from "@/components/ui/reveal";
import type { Resource } from "@/lib/types";

/** Grid of resource cards with a shared empty state. */
export function ResourceList({
  items,
  what,
  file = "content/resources.ts",
}: {
  items: Resource[];
  what: string;
  file?: string;
}) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={`No ${what} yet`}
        hint="Add the links worth sharing — title + url, with an optional description."
        file={file}
      />
    );
  }
  return (
    // Masonry columns (like the art gallery): each column flows independently,
    // so a card's height never forces a gap on the card beside it. Each card
    // reveals on its own with a small stagger.
    <div className="columns-1 gap-4 pb-20 sm:columns-2">
      {items.map((r, i) => (
        <Reveal
          key={`${r.url}-${i}`}
          delay={Math.min(i, 6) * 60}
          className="mb-4 break-inside-avoid"
        >
          <ResourceCard resource={r} />
        </Reveal>
      ))}
    </div>
  );
}
