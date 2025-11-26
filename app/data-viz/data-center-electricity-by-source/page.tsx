'use client'

import { DataCenterElectricityBySourceChart } from '@/components/DataCenterElectricityBySourceChart'

export default function DataCenterElectricityBySourcePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-primary">U.S. Data Center Electricity Generation by Fuel Source (2010-2035)</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Stacked area chart showing the evolution of electricity generation by fuel source for U.S. data centers from 2010 to 2035.
      </p>
      
      <div className="mb-8">
        <DataCenterElectricityBySourceChart />
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 italic">
          Source: IEA (International Energy Agency)
        </p>
      </div>

      <div className="mt-8 prose">
        <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Natural gas is the largest source of electricity for data centers, growing from 16.8 TWh in 2010 to a peak of 86.5 TWh in 2031, then declining to 72.0 TWh by 2035.</li>
          <li>Solar and wind show the most dramatic growth, with solar increasing from 0.2 TWh in 2010 to 205.0 TWh in 2035, and wind growing from 2.1 TWh to 115.0 TWh over the same period.</li>
          <li>Coal generation declines significantly, from 31.5 TWh in 2010 to 4.0 TWh in 2035, representing a 87% reduction.</li>
          <li>Nuclear power increases steadily, particularly after 2030 with the introduction of SMRs, growing from 14.0 TWh in 2010 to 53.0 TWh in 2035.</li>
          <li>By 2035, low-emissions sources (nuclear, hydro, wind, solar) account for over 50% of total data center electricity generation.</li>
        </ul>
      </div>
    </div>
  )
}

