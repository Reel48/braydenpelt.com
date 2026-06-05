/**
 * Single source of truth for site navigation.
 * Drives the header, the "More" menu, and the footer.
 */
export interface NavItem {
  label: string;
  href: string;
}

/** Shown directly in the header. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Writing", href: "/writing" },
  { label: "Work", href: "/work" },
  { label: "Portfolio", href: "/portfolio" },
];

/** Grouped under the header "More" menu. */
export const moreNav: NavItem[] = [
  { label: "Quotes", href: "/quotes" },
  { label: "Sports", href: "/sports" },
  { label: "Art", href: "/art" },
  { label: "Media", href: "/media" },
];

/** Everything, for the footer. */
export const allNav: NavItem[] = [...primaryNav, ...moreNav];
