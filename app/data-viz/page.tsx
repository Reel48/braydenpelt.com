import GraphPreview from '@/components/GraphPreview'

const graphs = [
  {
    title: 'Sample Line Chart',
    description: 'A simple line chart showing sample data over time',
    href: '/data-viz/line-chart',
    type: 'line' as const,
  },
  {
    title: 'Sample Bar Chart',
    description: 'A bar chart comparing different categories',
    href: '/data-viz/bar-chart',
    type: 'bar' as const,
  },
  {
    title: 'Sample Pie Chart',
    description: 'A pie chart showing distribution of data',
    href: '/data-viz/pie-chart',
    type: 'pie' as const,
  },
  {
    title: 'Sample Area Chart',
    description: 'An area chart with multiple series',
    href: '/data-viz/area-chart',
    type: 'area' as const,
  },
]

export default function GraphsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-primary dark:text-gray-100">Graphs</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">
        Interactive charts and visualizations powered by Highcharts
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {graphs.map((graph) => (
          <GraphPreview
            key={graph.href}
            type={graph.type}
            title={graph.title}
            href={graph.href}
            description={graph.description}
          />
        ))}
      </div>
    </div>
  )
}

