import Link from 'next/link'

const visualizations = [
  {
    title: 'Sample Line Chart',
    description: 'A simple line chart showing sample data over time',
    href: '/data-viz/line-chart',
  },
  {
    title: 'Sample Bar Chart',
    description: 'A bar chart comparing different categories',
    href: '/data-viz/bar-chart',
  },
  {
    title: 'Sample Pie Chart',
    description: 'A pie chart showing distribution of data',
    href: '/data-viz/pie-chart',
  },
  {
    title: 'Sample Area Chart',
    description: 'An area chart with multiple series',
    href: '/data-viz/area-chart',
  },
]

export default function DataVizPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Data Visualizations</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
        Interactive charts and visualizations powered by Highcharts
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visualizations.map((viz) => (
          <Link
            key={viz.href}
            href={viz.href}
            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{viz.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{viz.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

