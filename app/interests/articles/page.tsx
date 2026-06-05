import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { EmptyState } from "@/components/ui/empty-state";
import { Tag } from "@/components/ui/tag";
import { getAllArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Research" };

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <Container>
      <PageHeader kicker="Interests" title="Research" />

      {articles.length === 0 ? (
        <EmptyState
          title="No articles yet"
          hint="Add an .mdx file to publish your first piece — see the README for the frontmatter shape."
          file="content/articles/"
        />
      ) : (
        <ul className="pb-20">
          {articles.map((a) => (
            <li key={a.slug} className="border-b border-border py-7 first:pt-0">
              <Link
                href={`/interests/articles/${a.slug}`}
                className="group block"
              >
                <div className="flex items-center gap-2 font-sans text-sm text-faint">
                  <time dateTime={a.date}>{formatDate(a.date)}</time>
                  <span aria-hidden>·</span>
                  <span className="tnum">{a.readingTime}</span>
                  {a.draft ? (
                    <span className="rounded bg-canvas px-1.5 py-0.5 text-xs text-alert">
                      draft
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-2 font-serif text-[clamp(1.5rem,3vw,2rem)] leading-tight text-ink transition-colors group-hover:text-accent">
                  {a.title}
                </h2>
                {a.excerpt ? (
                  <p className="mt-2 max-w-[60ch] font-serif text-[1.05rem] leading-[1.6] text-ink-soft">
                    {a.excerpt}
                  </p>
                ) : null}
                {a.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {a.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
