# Graph Integration Guide

This guide explains how to integrate graphs into both articles and the graphs page.

## Overview

The graph system uses a centralized registry (`lib/graphs.ts`) that allows graphs to be:
- **Embedded in articles** using simple markdown comments
- **Listed on the graphs page** automatically
- **Reused** across multiple articles without duplication

## Adding a New Graph

### Step 1: Create the Graph Component

Create a new React component in `components/` that renders your graph:

```tsx
// components/MyNewChart.tsx
'use client'

import dynamic from 'next/dynamic'
import Highcharts from 'highcharts'

const HighchartsChart = dynamic(() => import('@/components/HighchartsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading chart...</p></div>,
})

export function MyNewChart() {
  const options: Highcharts.Options = {
    // Your Highcharts configuration
    chart: { type: 'line' },
    title: { text: 'My Chart Title' },
    // ... rest of config
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <HighchartsChart options={options} />
    </div>
  )
}
```

### Step 2: Register the Graph

Add your graph to the registry in `lib/graphs.ts`:

```ts
import { MyNewChart } from '@/components/MyNewChart'

export const graphs: GraphDefinition[] = [
  // ... existing graphs
  {
    id: 'my-new-chart', // Used in <!--GRAPH:my-new-chart-->
    title: 'My Chart Title',
    description: 'Description shown on graphs page',
    type: 'line', // 'line' | 'bar' | 'pie' | 'area' | 'map'
    component: MyNewChart,
    href: '/data-viz/my-new-chart', // Optional: for standalone page
  },
]
```

### Step 3: Use in Articles

Embed the graph in any article markdown file:

```markdown
Here's my analysis:

<!--GRAPH:my-new-chart-->

As you can see from the chart above...
```

### Step 4: (Optional) Create Standalone Page

If you want a dedicated page for the graph, create `app/data-viz/my-new-chart/page.tsx`:

```tsx
'use client'

import { MyNewChart } from '@/components/MyNewChart'

export default function MyNewChartPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">My Chart Title</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Description of the chart
      </p>
      <MyNewChart />
    </div>
  )
}
```

## How It Works

1. **Graphs Page** (`/data-viz`): Automatically lists all graphs from the registry
2. **Article Embedding**: The article renderer detects `<!--GRAPH:id-->` markers and replaces them with the actual graph component
3. **Single Source of Truth**: Graphs are defined once in the registry and reused everywhere

## Best Practices

- Use descriptive, kebab-case IDs (e.g., `data-center-energy-consumption`)
- Keep graph components focused and reusable
- If multiple graphs share a page, use the same `href` value
- Graph components should be self-contained and not depend on article context

