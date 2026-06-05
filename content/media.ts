import type { Media } from "@/lib/types";

/**
 * What you're reading / watching / listening to. Shapes:
 *   books:  { title, author, year?, rating?, note?, cover?, status? }
 *   movies: { title, year?, director?, rating?, note?, poster? }
 *   shows:  { title, year?, rating?, note?, poster? }
 *   music:  { title, artist, kind?, note?, cover?, url? }
 * `rating` is 1–5. Cover/poster are paths under /public (optional).
 */
export const media: Media = {
  books: [],
  movies: [],
  shows: [],
  music: [],
};
