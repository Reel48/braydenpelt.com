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
      "Consumer-electronics maker known for dependable charging gear, power banks, and cables—plus the Soundcore audio and eufy smart-home brands.",
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
      "A focused, Markdown-based notes and writing app for Apple devices—clean design, fast tag-based organization.",
  },
  {
    title: "Costco",
    url: "https://www.costco.com",
    description:
      "Membership warehouse retailer offering bulk goods at thin margins, anchored by the Kirkland Signature private label.",
  },
  {
    title: "Owala",
    url: "https://owala.com",
    description:
      "Maker of insulated stainless-steel water bottles, best known for the FreeSip spout that lets you sip through a straw or swig.",
  },
  {
    title: "Warby Parker",
    url: "https://www.warbyparker.com",
    description:
      "Direct-to-consumer eyewear brand with home try-on glasses, sunglasses, and contacts, plus a buy-a-pair-give-a-pair program.",
  },
  {
    title: "White Barn",
    url: "https://www.bathandbodyworks.com/c/white-barn",
    description:
      "Bath & Body Works' home-fragrance line—three-wick candles, Wallflowers, and room sprays in seasonal scents.",
  },
];

/** Products and apps you recommend. */
export const products: Resource[] = [
  {
    title: "Casper Hybrid Snow Pillow",
    url: "https://casper.com/products/hybrid-snow-pillow",
    image: "/images/products/casper-hybrid-snow-pillow.webp",
    description:
      "Cooling pillow with Snow Technology—phase-change material and heat-wicking bands over foam and down-alternative fiber for a balanced, cooler-sleeping feel.",
  },
  {
    title: "Docket Gold Narrow Ruled Pads",
    url: "https://www.amazon.com/dp/B003FLMJL4",
    image: "/images/products/docket-gold-narrow-ruled.jpg",
    description:
      "TOPS’s premium legal pad—thick, smooth yellow paper with a narrow rule that resists ink bleed, bound to a sturdy back that stays firm in the hand. Made in the USA and sold six pads to a pack.",
  },
  {
    title: "Kindle Paperwhite",
    url: "https://www.amazon.com/Kindle-Paperwhite/b?node=11624010011",
    image: "/images/products/kindle-paperwhite.jpg",
    description:
      "Amazon's e-reader with a glare-free 300-ppi display, adjustable warm light, waterproofing, and weeks of battery—reads like paper in any light.",
  },
  {
    title: "OGIO Renegade RSS",
    url: "https://www.ogio.com/backpacks/ogio-backpack-2017-renegade-rss.html?pid=spr4704946",
    image: "/images/products/ogio-renegade-rss.webp",
    description:
      "Commuter backpack with an armored, foam-lined bay for 15-inch laptops (and slim 17-inch ones), a crush-proof tech vault for fragile gear, and OGIO's padded RSS straps that spread the load across your shoulders.",
  },
  {
    title: "Pilot G2",
    url: "https://pilotpen.us",
    image: "/images/products/pilot-g2.jpg",
    description:
      "Refillable retractable gel-ink rollerball with a contoured grip—smooth, quick-drying, and America's best-selling gel pen.",
  },
  {
    title: "Tecovas Leather Wallets",
    url: "https://www.tecovas.com/shop/wallets",
    image: "/images/products/tecovas-leather-wallets.avif",
    description:
      "Full-grain leather wallets from the Western-heritage brand best known for its handmade boots—clean, durable, and made to patina with age.",
  },
];

/** Tools & utilities you reach for (dev tools, CLIs, services). */
export const tools: Resource[] = [
  {
    title: "Animations.dev",
    url: "https://animations.dev/",
    description:
      "A course on crafting polished interface animations and interactions on the web, by Emil Kowalski.",
  },
  {
    title: "Apple Developer",
    url: "https://developer.apple.com/",
    description:
      "Apple's developer hub—documentation, SDKs, Xcode, and the Human Interface Guidelines.",
  },
  {
    title: "Awwwards",
    url: "https://www.awwwards.com/",
    description:
      "Awards site recognizing the best in web design and development—a deep well of design inspiration.",
  },
  {
    title: "Transitions.dev",
    url: "https://transitions.dev/",
    description:
      "A curated, copy-paste collection of essential UI transitions for web apps, by Jakub Antalik.",
  },
];

/** Courses, books, channels, and other ways to learn. */
export const education: Resource[] = [];

/** Developer APIs worth building with. */
export const apis: Resource[] = [];
