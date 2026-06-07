import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { Section, LiveBadge } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { MediaCard } from "@/components/cards/media-card";
import { SpotifyNowPlaying } from "@/components/spotify-now-playing";
import type { MusicItem } from "@/lib/types";
import { music as manualMusic } from "@/content/music";
import { integrations } from "@/content/integrations";
import {
  getSpotifyTopTracks,
  getSpotifyTopArtists,
  getSpotifyPlaylist,
} from "@/lib/integrations/spotify";

export const metadata: Metadata = { title: "Music" };

// Live Spotify data refreshes hourly (see content/integrations.ts).
export const revalidate = 3600;

const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2";

function MusicGrid({ items }: { items: MusicItem[] }) {
  return (
    <div className={grid}>
      {items.map((m, i) => (
        <MediaCard
          key={`${m.title}-${i}`}
          title={m.title}
          // CMOS: albums italic, songs quoted, artist names plain.
          titleStyle={
            m.kind === "song" ? "quoted" : m.kind === "artist" ? "plain" : "italic"
          }
          subtitle={m.artist}
          note={m.note}
          image={m.cover}
          href={m.url}
        />
      ))}
    </div>
  );
}

export default async function MusicPage() {
  const [playlist, topTracks, topArtists] = await Promise.all([
    getSpotifyPlaylist(),
    getSpotifyTopTracks(),
    getSpotifyTopArtists(),
  ]);

  const anyLive =
    playlist.length > 0 || topTracks.length > 0 || topArtists.length > 0;

  if (!anyLive) {
    // Fallback to manual entries (or empty state) until Spotify is connected.
    return (
      <Container>
        <PageHeader kicker="Media" title="Music" />
        <SpotifyNowPlaying />
        {manualMusic.length === 0 ? (
          <EmptyState
            title="No music yet"
            hint="Connect Spotify (see docs/SPOTIFY_SETUP.md), or add albums/songs manually."
            file="content/music.ts"
          />
        ) : (
          <div className="pb-20">
            <MusicGrid items={manualMusic} />
          </div>
        )}
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader kicker="Media" title="Music" />
      <SpotifyNowPlaying />
      <div className="pb-20">
        {playlist.length ? (
          <Section
            title={integrations.spotify.featuredPlaylistTitle}
            badge={<LiveBadge source="Spotify" />}
          >
            <MusicGrid items={playlist} />
          </Section>
        ) : null}

        {topTracks.length ? (
          <Section title="Top Tracks" badge={<LiveBadge source="Spotify" />}>
            <MusicGrid items={topTracks} />
          </Section>
        ) : null}

        {topArtists.length ? (
          <Section title="Top Artists" badge={<LiveBadge source="Spotify" />}>
            <MusicGrid items={topArtists} />
          </Section>
        ) : null}
      </div>
    </Container>
  );
}
