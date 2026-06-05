import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaCard } from "@/components/cards/media-card";
import { music } from "@/content/music";

export const metadata: Metadata = { title: "Music" };

export default function MusicPage() {
  return (
    <Container>
      <PageHeader kicker="Media" title="Music" />

      {music.length === 0 ? (
        <EmptyState
          title="No music yet"
          hint="Add the albums, songs, or artists you love."
          file="content/music.ts"
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 pb-20 sm:grid-cols-2">
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
      )}
    </Container>
  );
}
