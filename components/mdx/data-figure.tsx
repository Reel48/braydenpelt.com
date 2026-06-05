import { cn } from "@/lib/cn";

/**
 * Frames a data visual inside an article (table, image, or — once a chart lib
 * is wired in — a chart). Use in MDX: <DataFigure caption="...">…</DataFigure>
 */
export function DataFigure({
  caption,
  className,
  children,
}: {
  caption?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure
      className={cn(
        "my-8 rounded-[14px] border border-border bg-surface-2 p-5",
        className,
      )}
    >
      <div className="overflow-x-auto">{children}</div>
      {caption ? (
        <figcaption className="mt-3 font-sans text-sm text-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
