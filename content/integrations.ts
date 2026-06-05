/**
 * Live data integrations.
 *
 * These pull from official, public RSS feeds (no scraping, no private APIs).
 * Leave a field blank to disable that integration — the Media page then falls
 * back to the manual entries in `content/media.ts`.
 *
 * Data refreshes automatically (ISR) every `revalidateSeconds`.
 */
export const integrations = {
  goodreads: {
    /**
     * Your numeric Goodreads user ID — from your profile URL:
     * goodreads.com/user/show/<THIS_NUMBER>-name
     */
    userId: "", // TODO: e.g. "152185079"
    /** Which shelf to stream. Common: "read", "currently-reading". */
    shelf: "read",
    /** Max books to show (RSS returns up to the last 100 on the shelf). */
    limit: 24,
  },
  letterboxd: {
    /** Your Letterboxd username — from letterboxd.com/<THIS> */
    username: "", // TODO: e.g. "davepelt"
    /** Max recently-watched films to show. */
    limit: 24,
  },
  spotify: {
    /**
     * Spotify uses OAuth, so the SECRETS live in environment variables, NOT here:
     *   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
     * (in .env.local locally and in Vercel → Project → Settings → Environment
     * Variables). See docs/SPOTIFY_SETUP.md. The non-secret display options live here.
     */
    timeRange: "medium_term", // "short_term" (~4wk) | "medium_term" (~6mo) | "long_term"
    topTracksLimit: 12,
    topArtistsLimit: 12,
    /** Featured playlist — the ID from its share link: open.spotify.com/playlist/<ID> */
    featuredPlaylistId: "", // TODO: paste your "Old Music" playlist ID
    featuredPlaylistTitle: "Old Music",
    playlistLimit: 24,
  },
  /** How often (seconds) the live feeds re-fetch. 3600 = hourly. */
  revalidateSeconds: 3600,
} as const;
