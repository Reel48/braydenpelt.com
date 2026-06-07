"use client";

import { useEffect, useState } from "react";
import type { NowPlaying } from "@/lib/integrations/spotify";

/**
 * Small banner showing what's playing on Spotify right now. Polls the
 * /api/now-playing route every ~45s so the page itself stays static/ISR.
 * Renders nothing when nothing is playing (or Spotify isn't configured).
 */
export function SpotifyNowPlaying() {
  const [np, setNp] = useState<NowPlaying | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const res = await fetch("/api/now-playing");
        if (!res.ok) return;
        const data = (await res.json()) as NowPlaying | null;
        if (active) setNp(data);
      } catch {
        /* ignore transient errors */
      }
    }
    load();
    const id = setInterval(load, 45_000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  if (!np) return null;

  return (
    <a
      href={np.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-8 flex items-center gap-4 rounded-[14px] border border-card-border bg-card p-4 shadow-soft transition-colors hover:border-accent"
    >
      {np.cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={np.cover}
          alt={np.title}
          className="h-14 w-14 flex-none rounded-md object-cover"
        />
      ) : null}
      <div className="min-w-0">
        <div className="flex items-center gap-2 font-sans text-xs text-muted">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-success" />
          {np.isPlaying ? "Now playing" : "Last played"} · Spotify
        </div>
        <p className="mt-0.5 truncate font-serif text-[1.1rem] text-ink">
          {np.title}
        </p>
        <p className="truncate font-sans text-sm text-muted">{np.artist}</p>
      </div>
    </a>
  );
}
