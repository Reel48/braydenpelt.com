'use client'

import { USDataCenterCampusMap } from '@/components/USDataCenterCampusMap'

export default function USDataCenterCampusesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-heading font-bold text-primary mb-4">
        U.S. Data Center Campuses with 1+ GW Capacity
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Interactive map showing existing and planned data center campuses in the United States with over 1 GW (1,000 MW) of power capacity.
      </p>
      
      <div className="mb-8">
        <USDataCenterCampusMap />
      </div>

      <div className="mt-8 space-y-4">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h2 className="text-xl font-heading font-semibold text-primary mb-3">Key Insights</h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Texas leads with the largest planned capacity: Advanced Energy and Intelligence Campus at 11 GW</li>
            <li>• Maryland hosts the second-largest campus: Quantum Loophole Frederick Campus at 2.4 GW</li>
            <li>• Meta operates two major campuses: Altoona (1.4 GW) and Prineville (1.3 GW)</li>
            <li>• Nevada has two campuses in Storey County: Switch Tahoe Reno and Tract Reno/Storey County</li>
            <li>• Total combined capacity across all campuses exceeds 20 GW</li>
          </ul>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-xs text-gray-600 italic">
          Note: Data derived from public announcements and industry reports. Capacities shown are planned or existing totals.
        </div>
      </div>
    </div>
  )
}

