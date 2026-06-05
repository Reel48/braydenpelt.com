import { integrations } from "@/content/integrations";
import type { Movie } from "@/lib/types";
import { fetchFeedItems, asText } from "@/lib/integrations/rss";

function posterFromDescription(desc: string): string | undefined {
  const match = desc.match(/<img[^>]+src="([^"]+)"/i);
  return match ? match[1] : undefined;
}

/**
 * Live recently-watched films from a Letterboxd member RSS feed.
 * Returns [] when not configured or on any fetch/parse error (the Movies page
 * then falls back to manual entries).
 */
export async function getLetterboxdMovies(): Promise<Movie[]> {
  const { username, limit } = integrations.letterboxd;
  if (!username) return [];

  const url = `https://letterboxd.com/${encodeURIComponent(username)}/rss/`;

  try {
    const items = await fetchFeedItems(url, integrations.revalidateSeconds);
    return items
      // Diary watches have a film title; lists/other activity don't — skip those.
      .filter((it) => asText(it["letterboxd:filmTitle"]))
      .map((it): Movie => {
        const rating = Number(asText(it["letterboxd:memberRating"]));
        return {
          title: asText(it["letterboxd:filmTitle"]),
          year: asText(it["letterboxd:filmYear"]) || undefined,
          rating: rating > 0 ? rating : undefined,
          poster: posterFromDescription(asText(it.description)),
          link: asText(it.link) || undefined,
        };
      })
      .slice(0, limit);
  } catch {
    return [];
  }
}
