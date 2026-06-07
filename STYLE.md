# Content style guide

The site's prose follows the **Chicago Manual of Style** (CMOS). Content lives in
typed data files under `content/` and renders through `components/cards/` and a
few page files. When adding or editing copy, follow the rules below.

## Titles of works

- *Italic* for major / standalone works: books, films, TV series, albums,
  artworks, plays, long poems.
- "Quotation marks" for parts of works: songs, articles, chapters, episodes,
  short poems.
- In prose fields (notes, descriptions, summaries, quote sources), write italics
  inline with `*asterisks*` — e.g. `Panini's *Ancient Rome*`. The `renderInline`
  helper (`lib/inline.tsx`) converts `*…*` to italic and is applied at every
  prose render site.
- Discrete title fields (art / book / movie / album `title`) are italicized by
  their card component, so don't add asterisks there. Song titles get quotation
  marks, not italics. **Artist and people names are never italicized.**

## Dashes

- **Em dash — closed/unspaced**: `charging gear—plus the audio brands`. Never
  ` — ` with spaces.
- **En dash** for number/score ranges only: `11–3`, `1–5`, `1888–90`.
- Hyphen for compound modifiers: `three-wick`, `heat-wicking`, `300-ppi`.

## Quotation marks and apostrophes

- Use curly quotes: `“ ”` `‘ ’` and curly apostrophes `’`. No straight `'` or `"`
  in prose. The `renderInline` helper also converts straight quotes to curly, so
  either is acceptable in the source data, but prefer curly.
- American placement: periods and commas go **inside** closing quotation marks.
- Double quotes for quoted phrases in prose; single quotes only for a quote
  within a quote.

## Numbers

- Spell out whole numbers **zero through one hundred** in running prose:
  `three-wick candles`, not `3-wick`.
- Use numerals for years (`1888`), measurements with units (`300-ppi`), model
  names, percentages, and large or round numbers (`10,000`).
- Numeric data fields (`year`, `rating`, `since`, `record`) stay as numerals.

## Punctuation and names

- **Serial (Oxford) comma** always: `power banks, and cables`.
- Use **and** in running prose; reserve `&` for proper names (`Bath & Body
  Works`) and short UI labels (`Food & drinks`).
- Space between initials: `J. K. Rowling`, `Harry S. Truman`, `Thomas A. Edison`.
- Singular names ending in *s* take `’s`: `Truman’s`.
- Acronyms take no periods: `APIs`, `SDKs`, `CLI`.

## Dates

- Month Day, Year: `June 5, 2026` (handled by `formatDate` in `lib/format.ts`).
- ISO strings (`2026-06-05`) in data; never hand-format display dates.
