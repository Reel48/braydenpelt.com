import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaCard } from "@/components/cards/media-card";
import { shows } from "@/content/tv";

export const metadata: Metadata = { title: "TV Shows" };

export default function TVPage() {
  return (
    <Container>
      <PageHeader kicker="Media" title="TV Shows" />

      {shows.length === 0 ? (
        <EmptyState
          title="No shows yet"
          hint="Add the series you’re watching or recommend."
          file="content/tv.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-2">
          {shows.map((s, i) => (
            <MediaCard
              key={`${s.title}-${i}`}
              title={s.title}
              meta={s.year}
              rating={s.rating}
              note={s.note}
              image={s.poster}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
