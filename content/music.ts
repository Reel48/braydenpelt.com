import type { MusicItem } from "@/lib/types";

/**
 * Music — albums, songs, or artists you love. Shape:
 *   { title, artist, kind?, note?, cover?, url? }
 * (Could later stream from Last.fm or Spotify via their APIs.)
 */
export const music: MusicItem[] = [];
