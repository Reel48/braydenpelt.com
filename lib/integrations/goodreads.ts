import { integrations } from "@/content/integrations";
import type { Book } from "@/lib/types";
import { fetchFeedItems, asText } from "@/lib/integrations/rss";

/**
 * Live books from a Goodreads shelf RSS feed.
 * Returns [] when not configured or on any fetch/parse error (the Books page
 * then falls back to manual entries).
 */
export async function getGoodreadsBooks(): Promise<Book[]> {
  const { userId, shelf, limit } = integrations.goodreads;
  if (!userId) return [];

  const url = `https://www.goodreads.com/review/list_rss/${encodeURIComponent(
    userId,
  )}?shelf=${encodeURIComponent(shelf)}`;

  try {
    const items = await fetchFeedItems(url, integrations.revalidateSeconds);
    return items
      .map((it): Book => {
        const rating = Number(asText(it.user_rating));
        return {
          title: asText(it.title),
          author: asText(it.author_name),
          year: asText(it.book_published) || undefined,
          rating: rating > 0 ? rating : undefined,
          cover:
            asText(it.book_large_image_url) ||
            asText(it.book_medium_image_url) ||
            asText(it.book_image_url) ||
            undefined,
          link: asText(it.link) || undefined,
          status:
            (shelf as string) === "currently-reading" ? "current" : undefined,
        };
      })
      .filter((b) => b.title)
      .slice(0, limit);
  } catch {
    return [];
  }
}
