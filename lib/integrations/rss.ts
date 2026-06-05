import { XMLParser } from "fast-xml-parser";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

// Letterboxd (and some others) 403 default bot user-agents, so present as a browser.
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

type FeedItem = Record<string, unknown>;

/**
 * Fetch an RSS feed (with ISR revalidation) and return its <item> nodes,
 * always as an array. Throws on non-OK responses; callers handle fallback.
 */
export async function fetchFeedItems(
  url: string,
  revalidate: number,
): Promise<FeedItem[]> {
  const res = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "application/rss+xml, application/xml, text/xml" },
    next: { revalidate },
  });
  if (!res.ok) throw new Error(`Feed ${url} -> ${res.status}`);

  const xml = await res.text();
  const data = parser.parse(xml) as {
    rss?: { channel?: { item?: FeedItem | FeedItem[] } };
  };
  const items = data?.rss?.channel?.item;
  if (!items) return [];
  return Array.isArray(items) ? items : [items];
}

/** Coerce a parsed XML node value to a trimmed string. */
export function asText(value: unknown): string {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  if (typeof value === "object" && "#text" in (value as Record<string, unknown>)) {
    return String((value as Record<string, unknown>)["#text"]).trim();
  }
  return String(value).trim();
}
