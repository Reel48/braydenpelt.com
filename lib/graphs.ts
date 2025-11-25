import { ComponentType } from 'react'
import { DataCenterEnergyConsumptionChart, DataCenterShareChart } from '@/components/DataCenterEnergyChart'

/**
 * Graph Definition Interface
 * 
 * This is the central registry for all graphs in the system.
 * Graphs defined here will automatically:
 * - Appear on the /data-viz (graphs) page
 * - Be available for embedding in articles using <!--GRAPH:graph-id-->
 * 
 * To add a new graph:
 * 1. Create a React component in components/ (e.g., MyNewChart.tsx)
 * 2. Export it as a named export
 * 3. Import it here and add it to the graphs array below
 * 4. Use <!--GRAPH:your-graph-id--> in any article markdown file
 */
export interface GraphDefinition {
  id: string // Unique identifier used in <!--GRAPH:id--> markers
  title: string // Display title (shown on graphs page and in articles)
  description: string // Description shown on graphs page
  type: 'line' | 'bar' | 'pie' | 'area' | 'map' // Chart type for preview
  component: ComponentType // React component that renders the graph
  href?: string // Optional: URL for standalone graph page (if multiple graphs share a page, use same href)
  previewData?: any // Optional: custom preview data for GraphPreview
  source?: string // Optional: Source citation for the graph
}

// Central registry of all graphs
export const graphs: GraphDefinition[] = [
  {
    id: 'data-center-energy-consumption',
    title: 'US Data Center Energy Consumption (TWh)',
    description: 'Projected growth of data center energy consumption from 2023 to 2030',
    type: 'line',
    component: DataCenterEnergyConsumptionChart,
    href: '/data-viz/data-center-energy',
    source: 'Source: Global Energy Perspective 2023, McKinsey, October 18, 2023; McKinsey analysis',
  },
  {
    id: 'data-center-share',
    title: 'Share of Total US Power Demand (%)',
    description: 'Projected share of total US power demand from data centers (2023-2030)',
    type: 'line',
    component: DataCenterShareChart,
    href: '/data-viz/data-center-energy',
    source: 'Source: Global Energy Perspective 2023, McKinsey, October 18, 2023; McKinsey analysis',
  },
]

// Helper function to get a graph by ID
export function getGraphById(id: string): GraphDefinition | undefined {
  return graphs.find((graph) => graph.id === id)
}

// Helper function to get all graphs (for listing page)
export function getAllGraphs(): GraphDefinition[] {
  return graphs
}

// Helper function to get graphs by IDs (for articles)
export function getGraphsByIds(ids: string[]): GraphDefinition[] {
  return ids.map((id) => getGraphById(id)).filter((g): g is GraphDefinition => g !== undefined)
}

