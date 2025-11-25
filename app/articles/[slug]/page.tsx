import { notFound } from 'next/navigation'
import { getArticleSlugs, getArticleBySlug } from '@/lib/articles'
import { format } from 'date-fns'
import { remark } from 'remark'
import html from 'remark-html'
import Tag from '@/components/Tag'
import { getGraphById } from '@/lib/graphs'

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

  // Process markdown content, preserving graph markers
  const contentWithMarkers = article.content
  const processedContent = await remark().use(html).process(contentWithMarkers)
  let contentHtml = processedContent.toString()

  // Match graph markers: <!--GRAPH:graph-id-->
  const graphMarkerRegex = /<!--GRAPH:([a-z0-9-]+)-->/g
  const parts: (string | { type: 'graph'; id: string })[] = []
  let lastIndex = 0
  let match

  // Find all graph markers and split content
  while ((match = graphMarkerRegex.exec(contentHtml)) !== null) {
    // Add content before the marker
    if (match.index > lastIndex) {
      parts.push(contentHtml.substring(lastIndex, match.index))
    }
    // Add the graph marker
    parts.push({ type: 'graph', id: match[1] })
    lastIndex = match.index + match[0].length
  }
  // Add remaining content
  if (lastIndex < contentHtml.length) {
    parts.push(contentHtml.substring(lastIndex))
  }

  // Convert parts to React elements
  const contentParts: (string | JSX.Element)[] = []
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (typeof part === 'object' && part.type === 'graph') {
      const graph = getGraphById(part.id)
      if (graph) {
        const GraphComponent = graph.component
        contentParts.push(
          <div key={`graph-${part.id}-${i}`} className="my-8">
            <GraphComponent />
          </div>
        )
      }
    } else if (typeof part === 'string' && part.trim()) {
      contentParts.push(part)
    }
  }

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

      <div className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-heading prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          prose-p:font-body prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-a:text-primary dark:prose-a:text-gray-300
          prose-strong:text-gray-900 dark:prose-strong:text-gray-100
          prose-code:text-primary dark:prose-code:text-gray-300
          prose-pre:bg-gray-900 dark:prose-pre:bg-gray-800
          prose-li:font-body prose-ul:font-body prose-ol:font-body">
        {contentParts.map((part, index) => {
          if (typeof part === 'string') {
            return <div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: part }} />
          }
          return part
        })}
      </div>
    </article>
  )
}

