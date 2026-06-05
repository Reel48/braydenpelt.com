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
| Writing | `content/articles/*.mdx` (see `content/articles/README.md`) |
| Work & Education | `content/work.ts` |
| Portfolio | `content/portfolio.ts` |
| Quotes | `content/quotes.ts` |
| Sports | `content/sports.ts` |
| Art | `content/art.ts` |
| Media | `content/media.ts` (books · movies · shows · music) |

Images go in `public/images/…` and are referenced by path (e.g.
`/images/portfolio/foo.png`). Each data file documents its object shape inline.

## Structure

- `app/` — routes (one folder per page) + `globals.css`
- `components/ui/` — typographic + UI primitives (the design system in code)
- `components/cards/`, `components/nav/`, `components/mdx/` — composed pieces
- `lib/` — content loaders, types, nav config, helpers
- `content/` — your data + articles
