'use client'

import { DataCenterEnergyConsumptionChart, DataCenterShareChart } from '@/components/DataCenterEnergyChart'

export default function DataCenterEnergyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-primary dark:text-gray-100">US Data Center Energy Consumption</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
        Projected growth of data center energy consumption and its share of total US power demand from 2023 to 2030.
      </p>
      
      <div className="space-y-8 mb-8">
        <DataCenterEnergyConsumptionChart />
        <DataCenterShareChart />
      </div>

      <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          Source: Global Energy Perspective 2023, McKinsey, October 18, 2023; McKinsey analysis
        </p>
      </div>

      <div className="mt-8 prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Energy consumption is projected to grow from 147 TWh in 2023 to 606 TWh in 2030, a 4.1x increase.</li>
          <li>The share of total US power demand is expected to rise from 3.7% to 11.7% over the same period.</li>
          <li>This represents a significant increase in the energy footprint of data centers.</li>
        </ul>
      </div>
    </div>
  )
}

