# Connecting Spotify

The Music page (`/media/music`) streams your **Top Tracks**, **Top Artists**, and
your featured **"Old Music"** playlist from Spotify. It uses the OAuth
refresh-token flow, so three secrets live in environment variables (never
committed). Until they're set, the page falls back to `content/music.ts`.

## 1. Create a Spotify app

1. Go to <https://developer.spotify.com/dashboard> → **Create app**.
2. Name: anything (e.g. `braydenpelt.com`).
3. **Redirect URI:** `http://127.0.0.1:8888/callback`  ← must match exactly.
4. Save. Copy the **Client ID** and **Client Secret**.

## 2. Add the secrets locally

Create `.env.local` in the project root (it's gitignored):

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=   # filled in by the next step
```

## 3. Get your refresh token (one time)

```
pnpm spotify:token
```

This opens Spotify's auth page. Approve access; the script prints
`SPOTIFY_REFRESH_TOKEN=...`. Paste that into `.env.local`.

## 4. Add the featured playlist

Open your **"Old Music"** playlist in Spotify → **Share → Copy link**. The link
looks like `https://open.spotify.com/playlist/XXXXXXXXXXXX`. Put the ID
(`XXXXXXXXXXXX`) into `content/integrations.ts` → `spotify.featuredPlaylistId`.

## 5. Run it

```
pnpm dev
```

Visit `/media/music` — you should see live sections with a "Live · Spotify" badge.

## 6. Deploy

In Vercel → Project → **Settings → Environment Variables**, add the same three:
`SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
(Production + Preview). Redeploy. Data refreshes hourly (ISR).

> Adjust `timeRange`, limits, and the playlist title in `content/integrations.ts`.
