import { Card } from "@/components/ui/card";
import type { Quote } from "@/lib/types";

export function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <Card className="flex flex-col bg-[linear-gradient(135deg,var(--color-blue-50),var(--color-surface))]">
      <span
        aria-hidden
        className="h-5 font-serif text-5xl leading-[0.4] text-blue-400"
      >
        &ldquo;
      </span>
      <blockquote className="font-serif italic text-[clamp(1.25rem,2.2vw,1.6rem)] leading-[1.3] text-ink">
        {quote.text}
      </blockquote>
      <div className="mt-4 font-sans text-sm text-muted">
        &mdash; <span className="font-semibold text-blue-700">{quote.author}</span>
        {quote.source ? <span>, {quote.source}</span> : null}
      </div>
      {quote.note ? (
        <p className="mt-3 font-sans text-sm text-muted">{quote.note}</p>
      ) : null}
    </Card>
  );
}
