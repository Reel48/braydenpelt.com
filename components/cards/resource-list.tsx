import { EmptyState } from "@/components/ui/empty-state";
import { ResourceCard } from "@/components/cards/resource-card";
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
    <div className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-2">
      {items.map((r, i) => (
        <ResourceCard key={`${r.url}-${i}`} resource={r} />
      ))}
    </div>
  );
}
