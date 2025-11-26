'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Highcharts from 'highcharts'
import HighchartsMap from 'highcharts/modules/map'

// Initialize Highcharts Maps module
if (typeof Highcharts === 'object') {
  HighchartsMap(Highcharts)
}

const HighchartsChart = dynamic(() => import('@/components/HighchartsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading map...</p></div>,
})

// State name to postal code mapping
const stateNameToCode: Record<string, string> = {
  'Pennsylvania': 'US-PA',
  'Illinois': 'US-IL',
  'North Dakota': 'US-ND',
  'Ohio': 'US-OH',
  'Texas': 'US-TX',
  'Indiana': 'US-IN',
  'Georgia': 'US-GA',
  'Iowa': 'US-IA',
  'Virginia': 'US-VA',
  'Michigan': 'US-MI',
  'Kentucky': 'US-KY',
  'Oklahoma': 'US-OK',
  'Nebraska': 'US-NE',
  'North Carolina': 'US-NC',
  'Arizona': 'US-AZ',
  'South Carolina': 'US-SC',
  'Tennessee': 'US-TN',
  'Missouri': 'US-MO',
  'Kansas': 'US-KS',
  'Wisconsin': 'US-WI',
  'Alabama': 'US-AL',
  'Utah': 'US-UT',
  'Nevada': 'US-NV',
  'Mississippi': 'US-MS',
  'Arkansas': 'US-AR',
  'Idaho': 'US-ID',
  'Wyoming': 'US-WY',
  'South Dakota': 'US-SD',
  'West Virginia': 'US-WV',
  'Montana': 'US-MT',
  'Florida': 'US-FL',
  'Louisiana': 'US-LA',
  'Minnesota': 'US-MN',
  'Colorado': 'US-CO',
  'New Mexico': 'US-NM',
  'Maryland': 'US-MD',
  'Delaware': 'US-DE',
  'New Jersey': 'US-NJ',
  'New York': 'US-NY',
  'Oregon': 'US-OR',
  'Washington': 'US-WA',
  'Maine': 'US-ME',
  'Vermont': 'US-VT',
  'Connecticut': 'US-CT',
  'Alaska': 'US-AK',
  'Massachusetts': 'US-MA',
  'New Hampshire': 'US-NH',
  'Rhode Island': 'US-RI',
  'Hawaii': 'US-HI',
  'California': 'US-CA',
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

  useEffect(() => {
    const loadMapData = async () => {
      try {
        const response = await fetch(
          'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json'
        )
        const data = await response.json()
        setTopology(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading map data:', error)
        setIsLoading(false)
      }
    }

    loadMapData()
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    )
  }

  if (!topology) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-red-500">Error loading map data</p>
      </div>
    )
  }

  const options: Highcharts.Options = {
    chart: {
      map: topology,
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
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            fontSize: '10px',
            fontWeight: 'bold',
            textOutline: '1px contrast',
          },
        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.value}</b><br/>Rank: <b>#{point.rank}</b>',
        },
      } as any,
    ],
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <HighchartsChart options={options} />
    </div>
  )
}

