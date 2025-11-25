import GraphPreview from '@/components/GraphPreview'

const graphs = [
  {
    title: 'US Data Center Energy Consumption',
    description: 'Projected growth of data center energy consumption and share of total US power demand (2023-2030)',
    href: '/data-viz/data-center-energy',
    type: 'line' as const,
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

