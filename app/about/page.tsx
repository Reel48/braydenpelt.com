export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
          Welcome to my personal website! I&apos;m Brayden Pelt, and this is my space 
          for sharing articles, data visualizations, and more.
        </p>

        <h2>What You&apos;ll Find Here</h2>
        <ul>
          <li><strong>Articles:</strong> Thoughts, insights, and tutorials on various topics</li>
          <li><strong>Data Visualizations:</strong> Interactive charts and graphs powered by Highcharts</li>
          <li><strong>Projects:</strong> Showcase of my work and experiments</li>
        </ul>

        <h2>About This Website</h2>
        <p>
          This website is built with Next.js and deployed on Vercel. It features:
        </p>
        <ul>
          <li>Modern, responsive design with Tailwind CSS</li>
          <li>Blog/article system with Markdown support</li>
          <li>Interactive data visualizations with Highcharts</li>
          <li>Dark mode support</li>
          <li>Fast, optimized performance</li>
        </ul>

        <h2>Get in Touch</h2>
        <p>
          Feel free to reach out through the social links in the footer, or check out 
          my articles and data visualizations to learn more about what I&apos;m working on.
        </p>
      </div>
    </div>
  )
}

