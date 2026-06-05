import { integrations } from "@/content/integrations";
import type { MusicItem } from "@/lib/types";

/**
 * Live Spotify data (Top Tracks, Top Artists, a featured playlist).
 *
 * Uses the OAuth refresh-token flow. Secrets come from env vars:
 *   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
 * Every fetcher returns [] when not configured or on error, so the Music page
 * falls back to manual content/music.ts.
 */

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const API = "https://api.spotify.com/v1";
const revalidate = integrations.revalidateSeconds;

interface SpotifyImage {
  url: string;
}
interface SpotifyArtistRef {
  name: string;
}
interface SpotifyTrack {
  name: string;
  artists: SpotifyArtistRef[];
  album?: { images: SpotifyImage[] };
  external_urls?: { spotify?: string };
}
interface SpotifyArtist {
  name: string;
  genres?: string[];
  images?: SpotifyImage[];
  external_urls?: { spotify?: string };
}

function pickImage(images?: SpotifyImage[]): string | undefined {
  if (!images?.length) return undefined;
  // Prefer a mid-size image (index 1) when available, else the first.
  return images[1]?.url ?? images[0]?.url;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function getAccessToken(opts?: {
  noStore?: boolean;
}): Promise<string | null> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;

  const caching: RequestInit & { next?: { revalidate: number } } = opts?.noStore
    ? { cache: "no-store" }
    : { next: { revalidate } };

  try {
    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh,
      }),
      ...caching,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { access_token?: string };
    return data.access_token ?? null;
  } catch {
    return null;
  }
}

async function apiGet<T>(path: string, token: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function trackToMusicItem(t: SpotifyTrack): MusicItem {
  return {
    title: t.name,
    artist: t.artists.map((a) => a.name).join(", "),
    kind: "song",
    cover: pickImage(t.album?.images),
    url: t.external_urls?.spotify,
  };
}

export async function getSpotifyTopTracks(): Promise<MusicItem[]> {
  const token = await getAccessToken();
  if (!token) return [];
  const { timeRange, topTracksLimit } = integrations.spotify;
  const data = await apiGet<{ items: SpotifyTrack[] }>(
    `/me/top/tracks?time_range=${timeRange}&limit=${topTracksLimit}`,
    token,
  );
  return data?.items?.map(trackToMusicItem) ?? [];
}

export async function getSpotifyTopArtists(): Promise<MusicItem[]> {
  const token = await getAccessToken();
  if (!token) return [];
  const { timeRange, topArtistsLimit } = integrations.spotify;
  const data = await apiGet<{ items: SpotifyArtist[] }>(
    `/me/top/artists?time_range=${timeRange}&limit=${topArtistsLimit}`,
    token,
  );
  return (
    data?.items?.map((a) => ({
      title: a.name,
      artist: a.genres?.length ? capitalize(a.genres[0]) : "Artist",
      kind: "artist" as const,
      cover: pickImage(a.images),
      url: a.external_urls?.spotify,
    })) ?? []
  );
}

export interface NowPlaying {
  isPlaying: boolean;
  title: string;
  artist: string;
  url?: string;
  cover?: string;
}

/** Currently-playing track (or null if nothing is playing / not configured). */
export async function getSpotifyNowPlaying(): Promise<NowPlaying | null> {
  const token = await getAccessToken({ noStore: true });
  if (!token) return null;
  try {
    const res = await fetch(`${API}/me/player/currently-playing`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    // 204 = nothing playing.
    if (res.status === 204 || !res.ok) return null;
    const data = (await res.json()) as {
      is_playing?: boolean;
      item?: SpotifyTrack | null;
    };
    if (!data.item) return null;
    return {
      isPlaying: Boolean(data.is_playing),
      title: data.item.name,
      artist: data.item.artists.map((a) => a.name).join(", "),
      url: data.item.external_urls?.spotify,
      cover: pickImage(data.item.album?.images),
    };
  } catch {
    return null;
  }
}

// Spotify's /playlists/{id}/tracks sub-endpoint can 403; the base /playlists/{id}
// returns 200 and inlines the tracks. The track paging object appears as either
// `tracks` (with `.track` entries) or `items` (with `.item` entries), so handle both.
interface PlaylistEntry {
  track?: SpotifyTrack | null;
  item?: SpotifyTrack | null;
}
interface PlaylistPaging {
  items: PlaylistEntry[];
}

export async function getSpotifyPlaylist(): Promise<MusicItem[]> {
  const { featuredPlaylistId, playlistLimit } = integrations.spotify;
  if (!featuredPlaylistId) return [];
  const token = await getAccessToken();
  if (!token) return [];
  const data = await apiGet<{
    tracks?: PlaylistPaging | null;
    items?: PlaylistPaging | null;
  }>(`/playlists/${featuredPlaylistId}`, token);

  const entries = (data?.tracks ?? data?.items)?.items ?? [];
  return entries
    .map((e) => e.track ?? e.item)
    .filter((t): t is SpotifyTrack => Boolean(t))
    .slice(0, playlistLimit)
    .map(trackToMusicItem);
}
