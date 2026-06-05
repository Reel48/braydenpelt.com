import type { Place } from "@/lib/types";

/**
 * Food & drinks — places you love. Shape:
 *   { name, cuisine?, city?, rating?, note?, image?, url? }
 *
 * Note: Beli has no public API/RSS, so this is manual for now. If Beli ever
 * opens an integration, this section can stream live like Books/Movies.
 */
export const places: Place[] = [];
