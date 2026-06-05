import type { Resource } from "@/lib/types";

/**
 * Resources, split by subpage. Each entry's shape:
 *   { title, url, description?, category? }
 * `category` is optional and only used to sub-group within a single page.
 */

/** Companies worth knowing / following. */
export const companies: Resource[] = [];

/** Products and apps you recommend. */
export const products: Resource[] = [];

/** Tools & utilities you reach for (dev tools, CLIs, services). */
export const tools: Resource[] = [];

/** Courses, books, channels, and other ways to learn. */
export const education: Resource[] = [];

/** Developer APIs worth building with. */
export const apis: Resource[] = [];
