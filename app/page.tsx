import Link from 'next/link'
import { getArticles } from '@/lib/articles'
import { format } from 'date-fns'

export default async function Home() {
  const articles = getArticles().slice(0, 3) // Show latest 3 articles

  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-primary dark:text-gray-100">
          Welcome to My Website
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          I&apos;m Brayden Pelt. This is my personal space for sharing articles, 
          data visualizations, and more.
        </p>
      </section>

      <section className="mb-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-primary dark:text-gray-100">Articles</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Read my latest thoughts and insights on various topics.
            </p>
            <Link 
              href="/articles" 
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-gray-200 font-medium mt-4 inline-block transition-colors group"
            >
              View All Articles 
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-primary dark:text-gray-100">Data Viz</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Interactive charts and data visualizations powered by Highcharts.
            </p>
            <Link 
              href="/data-viz" 
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-gray-200 font-medium mt-4 inline-block transition-colors group"
            >
              Explore Visualizations 
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-primary dark:text-gray-100">About</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Learn more about me, my background, and what I&apos;m working on.
            </p>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-gray-200 font-medium mt-4 inline-block transition-colors group"
            >
              Learn More 
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-primary dark:text-gray-100">Latest Articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-700 group"
            >
              <h3 className="text-xl font-semibold mb-2 text-primary dark:text-gray-100 group-hover:text-primary/80 transition-colors">
                {article.title}
              </h3>
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

