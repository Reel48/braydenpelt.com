import type { Movie } from "@/lib/types";

/**
 * Manual movie entries — used as a fallback when the Letterboxd integration
 * (content/integrations.ts) isn't configured. Shape:
 *   { title, year?, director?, rating?, note?, poster?, link? }
 * Once Letterboxd is connected, your diary streams in live and these are ignored.
 */
export const movies: Movie[] = [];
