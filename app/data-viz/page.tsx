import GraphPreview from '@/components/GraphPreview'
import { getAllGraphs } from '@/lib/graphs'

export default function GraphsPage() {
  const graphs = getAllGraphs()
  
  // Group graphs by href to show combined graphs on the same card
  const graphGroups = new Map<string, typeof graphs>()
  
  graphs.forEach((graph) => {
    const href = graph.href || `/data-viz/${graph.id}`
    if (!graphGroups.has(href)) {
      graphGroups.set(href, [])
    }
    graphGroups.get(href)!.push(graph)
  })

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-primary">Graphs</h1>
      <p className="text-gray-600 mb-12 text-lg">
        Interactive charts and visualizations powered by Highcharts
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from(graphGroups.entries()).map(([href, groupGraphs]) => {
          // Use the first graph in the group for preview
          const primaryGraph = groupGraphs[0]
          const combinedTitle = groupGraphs.length > 1 
            ? groupGraphs.map(g => g.title).join(' & ')
            : primaryGraph.title
          const combinedDescription = groupGraphs.length > 1
            ? groupGraphs.map(g => g.description).join(' ')
            : primaryGraph.description

          return (
            <GraphPreview
              key={href}
              type={primaryGraph.type}
              title={combinedTitle}
              href={href}
              description={combinedDescription}
            />
          )
        })}
      </div>
    </div>
  )
}

