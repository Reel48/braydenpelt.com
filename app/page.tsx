import Link from 'next/link'
import { getArticles } from '@/lib/articles'
import { format } from 'date-fns'

export default async function Home() {
  const articles = getArticles().slice(0, 3) // Show latest 3 articles

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-anchor-navy to-primary-blue bg-clip-text text-transparent">
          Welcome to My Website
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I&apos;m Brayden Pelt. This is my personal space for sharing articles, 
          data visualizations, and more.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-3 text-anchor-navy dark:text-primary-blue">Articles</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Read my latest thoughts and insights on various topics.
            </p>
            <Link 
              href="/articles" 
              className="text-primary-blue hover:text-anchor-navy dark:hover:text-secondary-blue font-medium mt-4 inline-block"
            >
              View All Articles →
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-3 text-anchor-navy dark:text-primary-blue">Data Viz</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Interactive charts and data visualizations powered by Highcharts.
            </p>
            <Link 
              href="/data-viz" 
              className="text-primary-blue hover:text-anchor-navy dark:hover:text-secondary-blue font-medium mt-4 inline-block"
            >
              Explore Visualizations →
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-3 text-anchor-navy dark:text-primary-blue">About</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Learn more about me, my background, and what I&apos;m working on.
            </p>
            <Link 
              href="/about" 
              className="text-primary-blue hover:text-anchor-navy dark:hover:text-secondary-blue font-medium mt-4 inline-block"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                {article.excerpt}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(article.date), 'MMMM d, yyyy')}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

