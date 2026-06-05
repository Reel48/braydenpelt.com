/**
 * Live data integrations.
 *
 * These pull from official, public RSS feeds (no scraping, no private APIs).
 * Leave a field blank to disable that integration — the Media page then falls
 * back to the manual entries in `content/media.ts`.
 *
 * Data refreshes automatically (ISR) every `revalidateSeconds`.
 */
export const integrations = {
  goodreads: {
    /**
     * Your numeric Goodreads user ID — from your profile URL:
     * goodreads.com/user/show/<THIS_NUMBER>-name
     */
    userId: "", // TODO: e.g. "152185079"
    /** Which shelf to stream. Common: "read", "currently-reading". */
    shelf: "read",
    /** Max books to show (RSS returns up to the last 100 on the shelf). */
    limit: 24,
  },
  letterboxd: {
    /** Your Letterboxd username — from letterboxd.com/<THIS> */
    username: "", // TODO: e.g. "davepelt"
    /** Max recently-watched films to show. */
    limit: 24,
  },
  /** How often (seconds) the live feeds re-fetch. 3600 = hourly. */
  revalidateSeconds: 3600,
} as const;
