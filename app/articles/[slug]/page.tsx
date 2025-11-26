import { notFound } from 'next/navigation'
import { getArticleSlugs, getArticleBySlug } from '@/lib/articles'
import { format } from 'date-fns'
import { remark } from 'remark'
import html from 'remark-html'
import Tag from '@/components/Tag'
import { getGraphById } from '@/lib/graphs'
import { Suspense } from 'react'

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

  // Extract graph markers BEFORE processing markdown to HTML
  // This ensures HTML comments aren't stripped by remark-html
  const graphMarkerRegex = /<!--GRAPH:([a-z0-9-]+)-->/g
  const parts: (string | { type: 'graph'; id: string })[] = []
  let lastIndex = 0
  let match

  // Find all graph markers in the raw markdown content
  while ((match = graphMarkerRegex.exec(article.content)) !== null) {
    // Add content before the marker
    if (match.index > lastIndex) {
      parts.push(article.content.substring(lastIndex, match.index))
    }
    // Add the graph marker
    parts.push({ type: 'graph', id: match[1] })
    lastIndex = match.index + match[0].length
  }
  // Add remaining content
  if (lastIndex < article.content.length) {
    parts.push(article.content.substring(lastIndex))
  }

  // Process each text part through remark, keeping graph markers separate
  const contentParts: (string | JSX.Element)[] = []
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (typeof part === 'object' && part.type === 'graph') {
      // This is a graph marker - render the graph component
      const graph = getGraphById(part.id)
      if (graph) {
        const GraphComponent = graph.component
        contentParts.push(
          <div key={`graph-${part.id}-${i}`} className="my-8">
            <Suspense fallback={<div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading graph...</p></div>}>
              <GraphComponent />
            </Suspense>
            {graph.source && (
              <div className="mt-3 py-2 px-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs text-gray-600 italic leading-tight">
                  {graph.source}
                </p>
              </div>
            )}
          </div>
        )
      } else {
        // Graph not found - show placeholder
        contentParts.push(
          <div key={`graph-error-${part.id}-${i}`} className="my-8 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-sm text-red-600">
              Graph with id &quot;{part.id}&quot; not found in registry
            </p>
          </div>
        )
      }
    } else if (typeof part === 'string' && part.trim()) {
      // Process this text part through remark
      const processedContent = await remark().use(html).process(part)
      const contentHtml = processedContent.toString()
      if (contentHtml.trim()) {
        contentParts.push(contentHtml)
      }
    }
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 font-heading">{article.title}</h1>
        <div className="flex items-center gap-4 text-gray-600">
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

      <div className="prose prose-lg max-w-none
          prose-headings:font-heading prose-headings:text-gray-900
          prose-p:font-body prose-p:text-gray-700
          prose-a:text-primary
          prose-strong:text-gray-900
          prose-code:text-primary
          prose-pre:bg-gray-900
          prose-li:font-body prose-ul:font-body prose-ol:font-body">
        {contentParts.map((part, index) => {
          if (typeof part === 'string') {
            return <div key={`content-${index}`} dangerouslySetInnerHTML={{ __html: part }} />
          }
          // This is a React element (graph component)
          return part
        })}
      </div>
    </article>
  )
}

