/**
 * Content types for braydenpelt.com.
 *
 * These double as documentation: each `content/*.ts` data file exports a typed
 * array using these shapes. Add real entries there — never invent placeholder
 * copy here.
 */

/* ---- Profile (home/about identity) ---- */
export interface SocialLink {
  label: string; // e.g. "GitHub", "LinkedIn", "Email"
  url: string;
}

export interface Profile {
  name: string;
  /** Short one-liner under the name. Leave "" until you write your own. */
  tagline: string;
  /** Optional role words shown as the hero kicker, e.g. ["Researcher", "Builder"]. */
  descriptors: string[];
  location?: string;
  email?: string;
  socials: SocialLink[];
}

/* ---- Quotes ---- */
export interface Quote {
  text: string;
  author: string;
  /** Where it's from — book, talk, song, etc. */
  source?: string;
  /** Optional note on why it resonates with you. */
  note?: string;
}

/* ---- Work & Education ---- */
export interface WorkEntry {
  role: string;
  organization: string;
  location?: string;
  /** Free-form, e.g. "2023" or "Jan 2023". */
  start: string;
  /** Omit or use "Present" for current roles. */
  end?: string;
  summary?: string;
  highlights?: string[];
  url?: string;
}

export interface EducationEntry {
  credential: string; // e.g. "B.S. Computer Science"
  institution: string;
  field?: string;
  location?: string;
  start: string;
  end?: string;
  notes?: string;
}

/* ---- Portfolio ---- */
export interface Project {
  title: string;
  /** Optional stable id (used for keys / future detail pages). */
  slug?: string;
  year?: string;
  role?: string;
  summary: string;
  tags?: string[];
  /** Live link. */
  url?: string;
  repo?: string;
  /** Path under /public, e.g. "/images/portfolio/foo.png". */
  image?: string;
}

/* ---- Sports ---- */
export interface SportEntry {
  sport: string;
  role?: string; // e.g. "Midfielder", "Captain"
  team?: string;
  period?: string; // e.g. "2018–2022"
  note?: string;
  achievements?: string[];
  image?: string;
}

/* ---- Art ---- */
export interface ArtPiece {
  title: string;
  medium?: string; // e.g. "Oil on canvas", "Digital"
  year?: string;
  note?: string;
  /** Required — art is visual. Path under /public. */
  image: string;
  url?: string;
}

/* ---- Media (books · movies · tv · music) ---- */
export type MediaStatus = "loved" | "liked" | "current" | "queued";

export interface Book {
  title: string;
  author: string;
  year?: string;
  rating?: number; // 1–5
  note?: string;
  cover?: string;
  status?: MediaStatus;
  /** External link (e.g. the Goodreads review/book page). */
  link?: string;
}

export interface Movie {
  title: string;
  year?: string;
  director?: string;
  rating?: number;
  note?: string;
  poster?: string;
  /** External link (e.g. the Letterboxd entry). */
  link?: string;
}

export interface Show {
  title: string;
  year?: string;
  rating?: number;
  note?: string;
  poster?: string;
}

export interface MusicItem {
  title: string; // album or song name
  artist: string;
  kind?: "album" | "song" | "artist";
  note?: string;
  cover?: string;
  url?: string;
}

export interface Media {
  books: Book[];
  movies: Movie[];
  shows: Show[];
  music: MusicItem[];
}

/* ---- Articles (MDX frontmatter + computed) ---- */
export interface ArticleFrontmatter {
  title: string;
  /** ISO date string, e.g. "2026-06-05". */
  date: string;
  excerpt?: string;
  tags?: string[];
  draft?: boolean;
}

export interface ArticleListItem extends ArticleFrontmatter {
  slug: string;
  readingTime: string; // e.g. "8 min read"
}

export interface Article extends ArticleListItem {
  /** Raw MDX body (rendered by next-mdx-remote). */
  source: string;
}
