# braydenpelt.com

Personal website — Next.js (App Router) + Tailwind v4, deployed on Vercel.

## Develop

```bash
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm typecheck  # tsc --noEmit
pnpm lint       # eslint
```

## Design system

- **Palette:** "Serene Elegance" — light-gray canvas, **steel-blue** primary,
  **sage** secondary, plus purposeful gold / clay / plum. Defined as tokens in
  [`app/globals.css`](app/globals.css) (`@theme`), exposed as Tailwind utilities
  (`bg-canvas`, `text-ink`, `text-accent`, `bg-sage-100`, …).
- **Type:** Georgia (serif — voice/headings/prose) + Inter (sans — UI/labels/data).
- **Dark mode:** light-first but dark-ready — uncomment the `[data-theme="dark"]`
  block in `globals.css` and mount `<ThemeToggle/>` to enable.
- **Live styleguide:** [`/design-system`](app/design-system/page.tsx).

## Adding content (this is where *you* make it yours)

No content is invented. Each section reads from a typed data file or MDX and
shows an empty state until you add your own. Edit:

| Page | Add content in |
| --- | --- |
| Home hero | `content/profile.ts` (tagline, kicker words, socials) |
| Resume | `content/work.ts` (experience + education) |
| Portfolio | `content/portfolio.ts` |
| Interests → Art | `content/art.ts` |
| Interests → Books | **Live: Goodreads** (`content/integrations.ts`); fallback `content/books.ts` |
| Interests → Quotes | `content/quotes.ts` |
| Interests → Food & Drinks | `content/food.ts` (Beli has no API — manual) |
| Interests → Research Articles | `content/articles/*.mdx` (see `content/articles/README.md`) |
| Media → Movies | **Live: Letterboxd** (`content/integrations.ts`); fallback `content/movies.ts` |
| Media → TV Shows | `content/tv.ts` |
| Media → YouTube Videos | `content/youtube.ts` |
| Sports → Favorite Teams | `content/teams.ts` |
| Sports → Fantasy Football | `content/fantasy.ts` |

Navigation lives in `lib/nav.ts` (one nested config drives the header dropdowns,
mobile menu, and footer). Images go in `public/images/…`, referenced by path
(e.g. `/images/portfolio/foo.png`). Each data file documents its object shape inline.

## Structure

- `app/` — routes (one folder per page) + `globals.css`
- `components/ui/` — typographic + UI primitives (the design system in code)
- `components/cards/`, `components/nav/`, `components/mdx/` — composed pieces
- `lib/` — content loaders, types, nav config, helpers
- `content/` — your data + articles
