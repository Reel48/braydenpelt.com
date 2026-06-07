/**
 * Single source of truth for site navigation.
 * Drives the header (with hover/click dropdowns), the mobile menu, and the footer.
 * Top-level items with `children` render a subnav and also link to a hub page.
 */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Resume", href: "/resume" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Companies", href: "/resources/companies" },
      { label: "Products", href: "/resources/products" },
      { label: "Tools", href: "/resources/tools" },
      { label: "Education", href: "/resources/education" },
      { label: "APIs", href: "/resources/apis" },
    ],
  },
  {
    label: "Interests",
    href: "/interests",
    children: [
      { label: "Art", href: "/interests/art" },
      { label: "Books", href: "/interests/books" },
      { label: "Quotes", href: "/interests/quotes" },
      { label: "Food & Drinks", href: "/interests/food" },
      { label: "Research", href: "/interests/articles" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Movies & TV", href: "/media/movies" },
      { label: "Music", href: "/media/music" },
      { label: "YouTube", href: "/media/youtube" },
    ],
  },
  {
    label: "Sports",
    href: "/sports",
    children: [
      { label: "Favorite Teams", href: "/sports/teams" },
      { label: "Fantasy", href: "/sports/fantasy" },
    ],
  },
];

/** Top-level destinations except Home — used by the home page "explore" grid. */
export const exploreNav = nav.filter((i) => i.href !== "/");

/**
 * Resolve a pathname to its top-level section key (home|about|resources|
 * interests|media|sports), matching a section's hub OR any of its children
 * (so /resume and /portfolio resolve to "about"). Drives per-section theming.
 */
export function sectionForPath(pathname: string): string {
  for (const item of nav) {
    const hrefs = [item.href, ...(item.children?.map((c) => c.href) ?? [])];
    const hit = hrefs.some((h) =>
      h === "/" ? pathname === "/" : pathname === h || pathname.startsWith(h + "/"),
    );
    if (hit) return item.label.toLowerCase();
  }
  return "home";
}
