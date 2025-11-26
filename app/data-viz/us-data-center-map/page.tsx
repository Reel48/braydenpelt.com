'use client'

import dynamic from 'next/dynamic'

const USDataCenterMap = dynamic(() => import('@/components/USDataCenterMap').then(mod => ({ default: mod.USDataCenterMap })), {
  ssr: false,
  loading: () => <div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading map...</p></div>,
})

export default function USDataCenterMapPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-primary">U.S. Data Center Infrastructure Rankings by State</h1>
      <p className="text-gray-600 mb-8 text-lg">
        Interactive map showing data center infrastructure rankings by state. Scores are based on Energy (35%), Incentives (20%), Network (15%), Physical (15%), and Land (15%) factors.
      </p>
      
      <div className="mb-8">
        <USDataCenterMap />
      </div>

      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600 italic">
          Data derived from 2024/2025 EIA reports, legislative analysis, and proprietary grid metrics.
        </p>
      </div>

      <div className="mt-8 prose">
        <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Pennsylvania ranks #1 with a total score of 94.2, excelling across all categories.</li>
          <li>Illinois and North Dakota follow closely with scores above 89.</li>
          <li>California ranks last at 35.1, primarily due to high energy costs and limited land availability.</li>
          <li>States in the Midwest and Great Plains regions generally score higher due to lower energy costs and available land.</li>
        </ul>
      </div>
    </div>
  )
}

