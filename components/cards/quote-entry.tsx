import { cn } from "@/lib/cn";
import { renderInline } from "@/lib/inline";
import type { Quote } from "@/lib/types";

/** A single quote in the frameless, editorial commonplace-book layout. */
export function QuoteEntry({
  quote,
  className,
}: {
  quote: Quote;
  className?: string;
}) {
  return (
    <figure className={cn(className)}>
      <blockquote className="font-serif italic font-normal text-[clamp(1.3rem,2.4vw,1.65rem)] leading-[1.3] tracking-[-0.01em] text-ink">
        {renderInline(quote.text)}
      </blockquote>
      <figcaption className="mt-4 font-sans text-sm text-faint">
        <span className="font-medium text-ink">{quote.author}</span>
        {quote.source ? <> &middot; {renderInline(quote.source)}</> : null}
      </figcaption>
      {quote.note ? (
        <p className="mt-2 font-sans text-sm text-muted">{renderInline(quote.note)}</p>
      ) : null}
    </figure>
  );
}
