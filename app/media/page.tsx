import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section, LiveBadge } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaCard } from "@/components/cards/media-card";
import { media } from "@/content/media";
import { getGoodreadsBooks } from "@/lib/integrations/goodreads";
import { getLetterboxdMovies } from "@/lib/integrations/letterboxd";

export const metadata: Metadata = { title: "Media" };

// Re-fetch the live feeds hourly (keep in sync with integrations.revalidateSeconds).
export const revalidate = 3600;

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2";

function SubEmpty({ what, file }: { what: string; file: string }) {
  return (
    <p className="font-sans text-sm text-muted">
      No {what} yet — add some in{" "}
      <code className="rounded border border-border bg-canvas px-1.5 py-0.5 text-xs">
        {file}
      </code>
      .
    </p>
  );
}

export default async function MediaPage() {
  // Live feeds (fall back to manual content/media.ts when not configured/empty).
  const [liveBooks, liveMovies] = await Promise.all([
    getGoodreadsBooks(),
    getLetterboxdMovies(),
  ]);

  const booksLive = liveBooks.length > 0;
  const moviesLive = liveMovies.length > 0;
  const books = booksLive ? liveBooks : media.books;
  const movies = moviesLive ? liveMovies : media.movies;
  const { shows, music } = media;

  const total = books.length + movies.length + shows.length + music.length;

  return (
    <Container>
      <PageHeader title="Media" />

      {total === 0 ? (
        <EmptyState
          title="Nothing here yet"
          hint="Connect Goodreads / Letterboxd in content/integrations.ts, or add entries manually."
          file="content/integrations.ts"
        />
      ) : (
        <div className="pb-20">
          <Section
            title="Books"
            count={booksLive ? undefined : books.length}
            badge={booksLive ? <LiveBadge source="Goodreads" /> : undefined}
          >
            {books.length ? (
              <div className={grid}>
                {books.map((b, i) => (
                  <MediaCard
                    key={`${b.title}-${i}`}
                    title={b.title}
                    subtitle={b.author}
                    meta={b.year}
                    rating={b.rating}
                    note={b.note}
                    image={b.cover}
                    href={b.link}
                  />
                ))}
              </div>
            ) : (
              <SubEmpty what="books" file="content/integrations.ts" />
            )}
          </Section>

          <Section
            title="Movies"
            count={moviesLive ? undefined : movies.length}
            badge={moviesLive ? <LiveBadge source="Letterboxd" /> : undefined}
          >
            {movies.length ? (
              <div className={grid}>
                {movies.map((m, i) => (
                  <MediaCard
                    key={`${m.title}-${i}`}
                    title={m.title}
                    subtitle={m.director}
                    meta={m.year}
                    rating={m.rating}
                    note={m.note}
                    image={m.poster}
                    href={m.link}
                  />
                ))}
              </div>
            ) : (
              <SubEmpty what="movies" file="content/integrations.ts" />
            )}
          </Section>

          <Section title="TV Shows" count={shows.length}>
            {shows.length ? (
              <div className={grid}>
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
            ) : (
              <SubEmpty what="shows" file="content/media.ts" />
            )}
          </Section>

          <Section title="Music" count={music.length}>
            {music.length ? (
              <div className={grid}>
                {music.map((m, i) => (
                  <MediaCard
                    key={`${m.title}-${i}`}
                    title={m.title}
                    subtitle={m.artist}
                    meta={m.kind}
                    note={m.note}
                    image={m.cover}
                    href={m.url}
                  />
                ))}
              </div>
            ) : (
              <SubEmpty what="music" file="content/media.ts" />
            )}
          </Section>
        </div>
      )}
    </Container>
  );
}
