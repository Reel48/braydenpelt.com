import type { Book } from "@/lib/types";

/**
 * Manual book entries — used as a fallback when the Goodreads integration
 * (content/integrations.ts) isn't configured. Shape:
 *   { title, author, year?, rating?, note?, cover?, status?, link? }
 * Once Goodreads is connected, your shelf streams in live and these are ignored.
 */
export const books: Book[] = [];
