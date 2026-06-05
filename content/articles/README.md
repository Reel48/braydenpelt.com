# Articles

Each article is one `.mdx` file in this folder. The **filename is the URL slug**
— `my-first-essay.mdx` → `/interests/articles/my-first-essay`.

## Frontmatter

```mdx
---
title: "Your article title"
date: "2026-06-05"        # ISO date; controls ordering (newest first)
excerpt: "One-sentence summary shown on the Writing index."
tags: ["Research", "Data"]
draft: false               # true = visible in dev, hidden in production
---

Write your article here in Markdown / MDX.
```

## Available components (no import needed)

- `<DataFigure caption="…">…</DataFigure>` — frames a table, image, or chart.
- `<Stat value="1.2M" label="Words written" />` — a big feature number.

Standard Markdown (headings, lists, links, blockquotes, tables, code) is styled
automatically to match the type system. Reading time is computed for you.

> No articles yet? The Research Articles page shows an empty state until you add one.
