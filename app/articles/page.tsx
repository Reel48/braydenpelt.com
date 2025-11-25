import Link from 'next/link'
import { getArticles } from '@/lib/articles'
import { format } from 'date-fns'
import Tag from '@/components/Tag'

export default function ArticlesPage() {
  const articles = getArticles()

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Articles</h1>
      
      {articles.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
            No articles yet. Check back soon!
          </p>
          <p className="text-gray-500 text-sm">
            Articles are stored in <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">content/articles/</code>
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {format(new Date(article.date), 'MMMM d, yyyy')}
                </p>
                {article.tags && article.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Tag key={tag} size="sm">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

