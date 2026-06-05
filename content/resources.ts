import type { Resource } from "@/lib/types";

/**
 * Links, tools, and references worth sharing. Shape:
 *   { title, url, description?, category? }
 * If you set `category` on entries, they group under those headings;
 * otherwise they render as one flat list.
 */
export const resources: Resource[] = [];
