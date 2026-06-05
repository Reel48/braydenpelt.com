import type { Resource } from "@/lib/types";

/**
 * Resources, split by subpage. Each entry's shape:
 *   { title, url, description?, category? }
 * `category` is optional and only used to sub-group within a single page.
 */

/** Companies worth knowing / following. */
export const companies: Resource[] = [];

/** Products, apps, and tools you recommend. */
export const products: Resource[] = [];

/** Courses, books, channels, and other ways to learn. */
export const education: Resource[] = [];

/** Developer APIs worth building with. */
export const apis: Resource[] = [];
