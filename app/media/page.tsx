import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaCard } from "@/components/cards/media-card";
import { media } from "@/content/media";

export const metadata: Metadata = { title: "Media" };

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2";

function SubEmpty({ what }: { what: string }) {
  return (
    <p className="font-sans text-sm text-muted">
      No {what} added yet — add some in{" "}
      <code className="rounded border border-border bg-canvas px-1.5 py-0.5 text-xs">
        content/media.ts
      </code>
      .
    </p>
  );
}

export default function MediaPage() {
  const { books, movies, shows, music } = media;
  const total = books.length + movies.length + shows.length + music.length;

  return (
    <Container>
      <PageHeader title="Media" />

      {total === 0 ? (
        <EmptyState
          title="Nothing here yet"
          hint="Add the books, movies, shows, and music you love."
          file="content/media.ts"
        />
      ) : (
        <div className="pb-20">
          <Section title="Books" count={books.length}>
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
                  />
                ))}
              </div>
            ) : (
              <SubEmpty what="books" />
            )}
          </Section>

          <Section title="Movies" count={movies.length}>
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
                  />
                ))}
              </div>
            ) : (
              <SubEmpty what="movies" />
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
              <SubEmpty what="shows" />
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
              <SubEmpty what="music" />
            )}
          </Section>
        </div>
      )}
    </Container>
  );
}
