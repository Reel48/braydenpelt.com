import { Carousel } from "@/components/ui/carousel";
import { renderInline } from "@/lib/inline";

type QuoteSlide = { text: string; author: string; source?: string };

/** Home-page quotes: swipe or click the arrows to read through them. */
export function QuoteCarousel({ items }: { items: QuoteSlide[] }) {
  if (!items.length) return null;

  return (
    <Carousel title="Quotes" viewAllHref="/interests/quotes">
      {items.map((q, i) => (
        <figure
          key={`${q.author}-${i}`}
          className="flex w-[clamp(280px,82vw,440px)] shrink-0 snap-start flex-col rounded-[14px] border border-border bg-surface p-6 shadow-soft"
        >
          <blockquote className="font-serif italic text-[clamp(1.15rem,2vw,1.4rem)] leading-[1.35] text-ink">
            {renderInline(q.text)}
          </blockquote>
          <figcaption className="mt-auto pt-4 font-sans text-sm text-faint">
            <span className="font-medium text-ink">{q.author}</span>
            {q.source ? <> &middot; {renderInline(q.source)}</> : null}
          </figcaption>
        </figure>
      ))}
    </Carousel>
  );
}
