import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  Article,
  ArticleFrontmatter,
  ArticleListItem,
} from "@/lib/types";

const ARTICLES_DIR = path.join(process.cwd(), "content", "articles");

function listMdxFiles(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".mdx"));
}

function slugFromFile(file: string): string {
  return file.replace(/\.mdx$/, "");
}

function readArticle(file: string): Article {
  const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = data as ArticleFrontmatter;
  return {
    slug: slugFromFile(file),
    title: fm.title ?? slugFromFile(file),
    date: fm.date ?? "",
    excerpt: fm.excerpt,
    tags: fm.tags ?? [],
    draft: fm.draft ?? false,
    readingTime: readingTime(content).text,
    source: content,
  };
}

const includeDrafts = process.env.NODE_ENV !== "production";

/** All published articles (newest first), without bodies. */
export function getAllArticles(): ArticleListItem[] {
  return listMdxFiles()
    .map(readArticle)
    .filter((a) => includeDrafts || !a.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(
      (a): ArticleListItem => ({
        slug: a.slug,
        title: a.title,
        date: a.date,
        excerpt: a.excerpt,
        tags: a.tags,
        draft: a.draft,
        readingTime: a.readingTime,
      }),
    );
}

/** Slugs for generateStaticParams(). */
export function getArticleSlugs(): string[] {
  return listMdxFiles().map(slugFromFile);
}

/** A single article with its MDX body, or null if missing/draft. */
export function getArticle(slug: string): Article | null {
  const file = `${slug}.mdx`;
  if (!fs.existsSync(path.join(ARTICLES_DIR, file))) return null;
  const article = readArticle(file);
  if (article.draft && !includeDrafts) return null;
  return article;
}
