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
  { label: "Resume", href: "/resume" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Resources", href: "/resources" },
  {
    label: "Interests",
    href: "/interests",
    children: [
      { label: "Art", href: "/interests/art" },
      { label: "Books", href: "/interests/books" },
      { label: "Quotes", href: "/interests/quotes" },
      { label: "Food & Drinks", href: "/interests/food" },
      { label: "Research Articles", href: "/interests/articles" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Movies", href: "/media/movies" },
      { label: "TV Shows", href: "/media/tv" },
      { label: "YouTube Videos", href: "/media/youtube" },
    ],
  },
  {
    label: "Sports",
    href: "/sports",
    children: [
      { label: "Favorite Teams", href: "/sports/teams" },
      { label: "Fantasy Football", href: "/sports/fantasy" },
    ],
  },
];

/** Top-level destinations except Home — used by the home page "explore" grid. */
export const exploreNav = nav.filter((i) => i.href !== "/");
