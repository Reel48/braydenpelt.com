import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { art } from "@/content/art";

export const metadata: Metadata = { title: "Art" };

export default function ArtPage() {
  return (
    <Container>
      <PageHeader kicker="Interests" title="Art" />

      {art.length === 0 ? (
        <EmptyState
          title="No art yet"
          hint="Add pieces with an image path — they’ll lay out as a gallery."
          file="content/art.ts"
        />
      ) : (
        <div className="columns-1 gap-5 pb-20 sm:columns-2 lg:columns-3">
          {art.map((piece, i) => {
            const meta = [piece.medium, piece.year].filter(Boolean).join(" · ");
            return (
              <figure
                key={`${piece.title}-${i}`}
                className="mb-5 break-inside-avoid overflow-hidden rounded-[14px] border border-border bg-surface shadow-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={piece.image}
                  alt={piece.title}
                  className="w-full object-cover"
                />
                <figcaption className="p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-serif text-[1.1rem] text-ink">
                      {piece.title}
                    </h2>
                    {meta ? (
                      <span className="font-sans text-xs text-faint">{meta}</span>
                    ) : null}
                  </div>
                  {piece.note ? (
                    <p className="mt-1 font-serif text-[0.95rem] leading-[1.5] text-ink-soft">
                      {piece.note}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </div>
      )}
    </Container>
  );
}
