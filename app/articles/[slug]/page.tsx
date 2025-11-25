import { notFound } from 'next/navigation'
import { getArticleSlugs, getArticleBySlug } from '@/lib/articles'
import { format } from 'date-fns'
import { remark } from 'remark'
import html from 'remark-html'
import Tag from '@/components/Tag'

export async function generateStaticParams() {
  const slugs = getArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  let article
  try {
    article = getArticleBySlug(params.slug)
  } catch {
    notFound()
  }

  const processedContent = await remark().use(html).process(article.content)
  const contentHtml = processedContent.toString()

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-heading">{article.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
          <time dateTime={article.date}>
            {format(new Date(article.date), 'MMMM d, yyyy')}
          </time>
          {article.tags && article.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {article.tags.map((tag) => (
                <Tag key={tag} size="md">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </div>
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-heading prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          prose-p:font-body prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-a:text-anchor-navy dark:prose-a:text-gray-300
          prose-strong:text-gray-900 dark:prose-strong:text-gray-100
          prose-code:text-anchor-navy dark:prose-code:text-gray-300
          prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800
          prose-li:font-body prose-ul:font-body prose-ol:font-body"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  )
}

