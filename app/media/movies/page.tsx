import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { LiveBadge } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaCard } from "@/components/cards/media-card";
import { Reveal } from "@/components/ui/reveal";
import { movies as manualMovies } from "@/content/movies";
import { getLetterboxdMovies } from "@/lib/integrations/letterboxd";

export const metadata: Metadata = { title: "Movies & TV" };

// Live Letterboxd feed refreshes hourly (see content/integrations.ts).
export const revalidate = 3600;

export default async function MoviesPage() {
  const live = await getLetterboxdMovies();
  const isLive = live.length > 0;
  const movies = isLive ? live : manualMovies;

  return (
    <Container>
      <PageHeader kicker="Media" title="Movies & TV">
        {isLive ? <LiveBadge source="Letterboxd" /> : null}
      </PageHeader>

      {movies.length === 0 ? (
        <EmptyState
          title="No movies yet"
          hint="Connect your Letterboxd profile in content/integrations.ts, or add movies manually."
          file="content/integrations.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-2">
          {movies.map((m, i) => (
            <Reveal key={`${m.title}-${i}`} delay={Math.min(i, 6) * 60}>
              <MediaCard
                title={m.title}
                subtitle={m.director}
                meta={m.year}
                rating={m.rating}
                note={m.note}
                image={m.poster}
                href={m.link}
              />
            </Reveal>
          ))}
        </div>
      )}
    </Container>
  );
}
