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

const NAMED_ENTITIES: Record<string, string> = {
  quot: '"',
  apos: "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
};

function decodeOnce(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-zA-Z]+);/g, (m, name) => NAMED_ENTITIES[name] ?? m)
    // &amp; last so double-encoded values (e.g. "&amp;#039;") resolve on the next pass.
    .replace(/&amp;/g, "&");
}

/** Decode HTML/XML entities, including double-encoded ones (e.g. "It&#039;s" → "It's"). */
function decodeEntities(str: string): string {
  let prev: string;
  let out = str;
  let i = 0;
  do {
    prev = out;
    out = decodeOnce(out);
    i++;
  } while (out !== prev && i < 3);
  return out;
}

/** Coerce a parsed XML node value to a trimmed, entity-decoded string. */
export function asText(value: unknown): string {
  if (value == null) return "";
  let raw: string;
  if (typeof value === "string") raw = value;
  else if (typeof value === "number") raw = String(value);
  else if (
    typeof value === "object" &&
    "#text" in (value as Record<string, unknown>)
  ) {
    raw = String((value as Record<string, unknown>)["#text"]);
  } else {
    raw = String(value);
  }
  return decodeEntities(raw).trim();
}
