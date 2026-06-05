import type { Resource } from "@/lib/types";

/**
 * Resources, split by subpage. Each entry's shape:
 *   { title, url, description?, category? }
 * `category` is optional and only used to sub-group within a single page.
 */

/** Companies worth knowing / following. */
export const companies: Resource[] = [
  {
    title: "Anker",
    url: "https://www.anker.com",
    description:
      "Consumer-electronics maker known for dependable charging gear, power banks, and cables — plus the Soundcore audio and eufy smart-home brands.",
  },
  {
    title: "Apple",
    url: "https://www.apple.com",
    description:
      "Designs the iPhone, Mac, iPad, and Apple Watch, and the tightly integrated software and services that connect them.",
  },
  {
    title: "Bear",
    url: "https://bear.app",
    description:
      "A focused, Markdown-based notes and writing app for Apple devices — clean design, fast tag-based organization.",
  },
  {
    title: "Costco",
    url: "https://www.costco.com",
    description:
      "Membership warehouse retailer offering bulk goods at thin margins, anchored by the Kirkland Signature private label.",
  },
];

/** Products and apps you recommend. */
export const products: Resource[] = [
  {
    title: "Pilot G2",
    url: "https://pilotpen.us",
    description:
      "Refillable retractable gel-ink rollerball with a contoured grip — smooth, quick-drying, and America's best-selling gel pen.",
  },
];

/** Tools & utilities you reach for (dev tools, CLIs, services). */
export const tools: Resource[] = [];

/** Courses, books, channels, and other ways to learn. */
export const education: Resource[] = [];

/** Developer APIs worth building with. */
export const apis: Resource[] = [];
