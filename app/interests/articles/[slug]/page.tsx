import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Tag } from "@/components/ui/tag";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { ArrowLeft } from "@/components/ui/icons";
import { getArticle, getArticleSlugs } from "@/lib/content";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <Container>
      <article className="mx-auto max-w-[68ch] pt-14 pb-20">
        <Link
          href="/interests/articles"
          className="group inline-flex items-center gap-1 font-sans text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          Research
        </Link>

        <div className="mt-6 flex items-center gap-2 font-sans text-sm text-faint">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span aria-hidden>·</span>
          <span className="tnum">{article.readingTime}</span>
        </div>

        <h1 className="mt-3 font-serif text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.1] tracking-[-0.015em] text-ink">
          {article.title}
        </h1>

        {article.tags?.length ? (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        ) : null}

        <div className="mt-8">
          <MDXRemote source={article.source} components={mdxComponents} />
        </div>
      </article>
    </Container>
  );
}
