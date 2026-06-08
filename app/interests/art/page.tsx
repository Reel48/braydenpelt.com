import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { LightboxImage } from "@/components/lightbox-image";
import { renderInline } from "@/lib/inline";
import { art } from "@/content/art";
import { ArrowRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "Art" };

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "source";
  }
}

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
        <Reveal className="columns-1 gap-5 pb-20 sm:columns-2 lg:columns-3">
          {art.map((piece, i) => {
            const meta = [piece.medium, piece.year].filter(Boolean).join(" · ");
            return (
              <figure
                key={`${piece.title}-${i}`}
                className="mb-8 break-inside-avoid"
              >
                <div className="group/art overflow-hidden rounded-[10px] shadow-art">
                  <LightboxImage
                    src={piece.image}
                    alt={piece.title}
                    className="w-full object-cover transition-transform duration-500 ease-out group-hover/art:scale-[1.03]"
                  />
                </div>
                <figcaption className="pt-3">
                  <div className="flex items-baseline justify-between gap-2">
                    <h2 className="font-serif text-[1.1rem] text-ink">
                      <em className="italic">{piece.title}</em>
                    </h2>
                    {meta ? (
                      <span className="font-sans text-xs text-faint">{meta}</span>
                    ) : null}
                  </div>
                  {piece.artist ? (
                    <p className="mt-0.5 font-sans text-sm text-accent">
                      {piece.artist}
                    </p>
                  ) : null}
                  {piece.note ? (
                    <p className="mt-2 font-serif text-[0.95rem] leading-[1.6] text-ink-soft">
                      {renderInline(piece.note)}
                    </p>
                  ) : null}
                  {piece.url ? (
                    <a
                      href={piece.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link mt-3 inline-flex items-center gap-1 font-sans text-sm font-medium text-accent transition-colors hover:text-accent-strong"
                    >
                      View on {hostname(piece.url)}
                      <ArrowRight className="transition-transform duration-200 group-hover/link:translate-x-0.5" />
                    </a>
                  ) : null}
                </figcaption>
              </figure>
            );
          })}
        </Reveal>
      )}
    </Container>
  );
}
