import type { YouTubeVideo } from "@/lib/types";

/**
 * Favorite / noteworthy YouTube videos. Shape:
 *   { title, url, channel?, note?, thumbnail?, date? }
 * (Could later auto-populate from a YouTube playlist via the YouTube Data API.)
 */
export const videos: YouTubeVideo[] = [];
