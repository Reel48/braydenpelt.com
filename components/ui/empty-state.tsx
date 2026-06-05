import { cn } from "@/lib/cn";

/**
 * Renders when a content collection is empty. Intentionally NOT filler prose —
 * it's a real empty state plus a pointer to the data file Brayden should edit.
 */
export function EmptyState({
  title,
  hint,
  file,
  className,
}: {
  title: string;
  hint?: string;
  /** e.g. "content/quotes.ts" — shown as the place to add entries. */
  file?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border border-dashed border-border-strong bg-surface-2 px-6 py-14 text-center",
        className,
      )}
    >
      <p className="font-serif text-[1.3rem] text-ink-soft">{title}</p>
      {hint ? (
        <p className="mx-auto mt-2 max-w-md font-sans text-sm text-muted">
          {hint}
        </p>
      ) : null}
      {file ? (
        <p className="mt-4 font-sans text-xs text-faint">
          Add entries in{" "}
          <code className="rounded border border-border bg-canvas px-1.5 py-0.5">
            {file}
          </code>
        </p>
      ) : null}
    </div>
  );
}
