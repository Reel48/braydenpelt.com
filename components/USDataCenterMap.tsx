'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const HighchartsChart = dynamic(() => import('@/components/HighchartsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading map...</p></div>,
})

// State name to postal code mapping - Highcharts uses lowercase with hyphens
const stateNameToCode: Record<string, string> = {
  'Pennsylvania': 'us-pa',
  'Illinois': 'us-il',
  'North Dakota': 'us-nd',
  'Ohio': 'us-oh',
  'Texas': 'us-tx',
  'Indiana': 'us-in',
  'Georgia': 'us-ga',
  'Iowa': 'us-ia',
  'Virginia': 'us-va',
  'Michigan': 'us-mi',
  'Kentucky': 'us-ky',
  'Oklahoma': 'us-ok',
  'Nebraska': 'us-ne',
  'North Carolina': 'us-nc',
  'Arizona': 'us-az',
  'South Carolina': 'us-sc',
  'Tennessee': 'us-tn',
  'Missouri': 'us-mo',
  'Kansas': 'us-ks',
  'Wisconsin': 'us-wi',
  'Alabama': 'us-al',
  'Utah': 'us-ut',
  'Nevada': 'us-nv',
  'Mississippi': 'us-ms',
  'Arkansas': 'us-ar',
  'Idaho': 'us-id',
  'Wyoming': 'us-wy',
  'South Dakota': 'us-sd',
  'West Virginia': 'us-wv',
  'Montana': 'us-mt',
  'Florida': 'us-fl',
  'Louisiana': 'us-la',
  'Minnesota': 'us-mn',
  'Colorado': 'us-co',
  'New Mexico': 'us-nm',
  'Maryland': 'us-md',
  'Delaware': 'us-de',
  'New Jersey': 'us-nj',
  'New York': 'us-ny',
  'Oregon': 'us-or',
  'Washington': 'us-wa',
  'Maine': 'us-me',
  'Vermont': 'us-vt',
  'Connecticut': 'us-ct',
  'Alaska': 'us-ak',
  'Massachusetts': 'us-ma',
  'New Hampshire': 'us-nh',
  'Rhode Island': 'us-ri',
  'Hawaii': 'us-hi',
  'California': 'us-ca',
}

// Data from the table
const stateData = [
  { state: 'Pennsylvania', score: 94.2 },
  { state: 'Illinois', score: 91.8 },
  { state: 'North Dakota', score: 89.5 },
  { state: 'Ohio', score: 88.1 },
  { state: 'Texas', score: 87.4 },
  { state: 'Indiana', score: 86.0 },
  { state: 'Georgia', score: 84.3 },
  { state: 'Iowa', score: 83.9 },
  { state: 'Virginia', score: 82.1 },
  { state: 'Michigan', score: 81.5 },
  { state: 'Kentucky', score: 80.8 },
  { state: 'Oklahoma', score: 79.5 },
  { state: 'Nebraska', score: 79.2 },
  { state: 'North Carolina', score: 78.5 },
  { state: 'Arizona', score: 77.8 },
  { state: 'South Carolina', score: 77.1 },
  { state: 'Tennessee', score: 76.9 },
  { state: 'Missouri', score: 76.4 },
  { state: 'Kansas', score: 75.8 },
  { state: 'Wisconsin', score: 75.2 },
  { state: 'Alabama', score: 74.5 },
  { state: 'Utah', score: 73.8 },
  { state: 'Nevada', score: 73.1 },
  { state: 'Mississippi', score: 72.5 },
  { state: 'Arkansas', score: 72.0 },
  { state: 'Idaho', score: 71.5 },
  { state: 'Wyoming', score: 71.2 },
  { state: 'South Dakota', score: 70.8 },
  { state: 'West Virginia', score: 70.5 },
  { state: 'Montana', score: 70.1 },
  { state: 'Florida', score: 68.5 },
  { state: 'Louisiana', score: 68.2 },
  { state: 'Minnesota', score: 67.5 },
  { state: 'Colorado', score: 66.8 },
  { state: 'New Mexico', score: 66.2 },
  { state: 'Maryland', score: 65.5 },
  { state: 'Delaware', score: 64.8 },
  { state: 'New Jersey', score: 62.5 },
  { state: 'New York', score: 61.0 },
  { state: 'Oregon', score: 60.5 },
  { state: 'Washington', score: 59.8 },
  { state: 'Maine', score: 56.5 },
  { state: 'Vermont', score: 55.2 },
  { state: 'Connecticut', score: 54.0 },
  { state: 'Alaska', score: 53.5 },
  { state: 'Massachusetts', score: 52.4 },
  { state: 'New Hampshire', score: 51.8 },
  { state: 'Rhode Island', score: 49.2 },
  { state: 'Hawaii', score: 38.5 },
  { state: 'California', score: 35.1 },
]

// Add rank to each state
const rankedData = stateData
  .sort((a, b) => b.score - a.score)
  .map((item, index) => ({
    ...item,
    rank: index + 1,
  }))

// Convert to Highcharts format with rank included
const mapData = rankedData.map(item => ({
  'hc-key': stateNameToCode[item.state],
  value: item.score,
  name: item.state,
  rank: item.rank,
}))

export function USDataCenterMap() {
  const [topology, setTopology] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [highchartsInitialized, setHighchartsInitialized] = useState(false)

  useEffect(() => {
    // Dynamically import Highcharts and Maps module only on client
    const initMap = async () => {
      try {
        // Load topology data first
        const response = await fetch(
          'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json'
        )
        if (!response.ok) {
          throw new Error(`Failed to fetch map data: ${response.statusText}`)
        }
        const data = await response.json()
        
        // Debug: Check the actual key format in the topology
        if (data.objects && data.objects.default && data.objects.default.geometries) {
          const allTopologyKeys = data.objects.default.geometries
            .map((g: any) => ({
              'hc-key': g.properties?.['hc-key'],
              name: g.properties?.name,
              'postal-code': g.properties?.['postal-code'],
              allProps: Object.keys(g.properties || {})
            }))
          console.log('Topology keys sample (first 5):', allTopologyKeys.slice(0, 5))
          console.log('All unique hc-keys in topology:', [...new Set(allTopologyKeys.map((k: any) => k['hc-key']).filter(Boolean))].slice(0, 10))
          
          // Check if our data keys match
          const ourKeys = mapData.map((d: any) => d['hc-key'])
          console.log('Our data keys (first 10):', ourKeys.slice(0, 10))
          
          // Check for matches
          const topologyKeysSet = new Set(allTopologyKeys.map((k: any) => k['hc-key']).filter(Boolean))
          const matchingKeys = ourKeys.filter((k: any) => topologyKeysSet.has(k))
          console.log(`Matched ${matchingKeys.length} out of ${ourKeys.length} keys`)
        }
        
        setTopology(data)
        setHighchartsInitialized(true)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading map data:', error)
        setIsLoading(false)
      }
    }

    initMap()
  }, [])

  // Import Highcharts types dynamically
  const options: any = {
    chart: {
      type: 'map',
      map: topology,
      height: 600,
    },
    title: {
      text: 'U.S. Data Center Infrastructure Rankings by State',
    },
    subtitle: {
      text: 'Total Score (Energy 35%, Incentives 20%, Network 15%, Physical 15%, Land 15%)',
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    colorAxis: {
      min: 0,
      max: 100,
      stops: [
        [0, '#ef4444'], // red for low scores
        [0.35, '#f97316'], // orange
        [0.5, '#eab308'], // yellow
        [0.65, '#84cc16'], // lime
        [0.8, '#22c55e'], // green
        [1, '#15803d'], // dark green for high scores
      ],
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
    },
    series: [
      {
        type: 'map',
        name: 'Total Score',
        data: mapData,
        joinBy: 'hc-key',
        nullColor: '#e0e0e0',
        borderColor: '#999',
        borderWidth: 1,
        states: {
          hover: {
            brightness: 0.1,
          },
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          allowOverlap: true,
          style: {
            fontSize: '10px',
            fontWeight: 'bold',
            textOutline: '1px contrast',
            color: '#000',
          },
        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.value}</b><br/>Rank: <b>#{point.rank}</b>',
        },
      } as any,
    ],
  }

  // Only render chart when everything is ready
  if (!topology || !highchartsInitialized) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg" style={{ minHeight: '600px' }}>
      <HighchartsChart 
        key="us-data-center-map"
        options={options} 
      />
    </div>
  )
}

