'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false,
})

// US States mapped to power grids
// ERCOT: Texas
// Eastern Interconnection: Most states east of Texas
// Western Interconnection: Western states
const powerGridData = [
  // ERCOT (Texas)
  { code: 'us-tx', value: 1, name: 'ERCOT' },
  
  // Eastern Interconnection
  { code: 'us-al', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ar', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ct', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-de', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-fl', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ga', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-il', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-in', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ia', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ky', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-la', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-me', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-md', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ma', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-mi', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ms', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-mo', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-nh', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-nj', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ny', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-nc', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-oh', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ok', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-pa', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-ri', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-sc', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-tn', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-vt', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-va', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-wv', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-wi', value: 2, name: 'Eastern Interconnection' },
  { code: 'us-dc', value: 2, name: 'Eastern Interconnection' },
  
  // Western Interconnection
  { code: 'us-ak', value: 3, name: 'Western Interconnection' },
  { code: 'us-az', value: 3, name: 'Western Interconnection' },
  { code: 'us-ca', value: 3, name: 'Western Interconnection' },
  { code: 'us-co', value: 3, name: 'Western Interconnection' },
  { code: 'us-hi', value: 3, name: 'Western Interconnection' },
  { code: 'us-id', value: 3, name: 'Western Interconnection' },
  { code: 'us-ks', value: 3, name: 'Western Interconnection' },
  { code: 'us-mt', value: 3, name: 'Western Interconnection' },
  { code: 'us-ne', value: 3, name: 'Western Interconnection' },
  { code: 'us-nv', value: 3, name: 'Western Interconnection' },
  { code: 'us-nm', value: 3, name: 'Western Interconnection' },
  { code: 'us-nd', value: 3, name: 'Western Interconnection' },
  { code: 'us-or', value: 3, name: 'Western Interconnection' },
  { code: 'us-sd', value: 3, name: 'Western Interconnection' },
  { code: 'us-ut', value: 3, name: 'Western Interconnection' },
  { code: 'us-wa', value: 3, name: 'Western Interconnection' },
  { code: 'us-wy', value: 3, name: 'Western Interconnection' },
  { code: 'us-mn', value: 3, name: 'Western Interconnection' },
]

export default function PowerGridsPage() {
  const [mapData, setMapData] = useState<any>(null)
  const [Highcharts, setHighcharts] = useState<any>(null)

  useEffect(() => {
    // Dynamically import Highcharts and Maps module
    Promise.all([
      import('highcharts'),
      import('highcharts/modules/map'),
    ]).then(([highcharts, mapModule]) => {
      const HighchartsLib = highcharts.default || highcharts
      if (typeof HighchartsLib === 'object') {
        const mapModuleFunc = mapModule.default || mapModule
        if (typeof mapModuleFunc === 'function') {
          mapModuleFunc(HighchartsLib)
        }
        setHighcharts(HighchartsLib)
      }
    })

    // Load US map data from Highcharts CDN
    fetch('https://code.highcharts.com/mapdata/countries/us/us-all.geo.json')
      .then((response) => response.json())
      .then((data) => {
        setMapData(data)
      })
      .catch((error) => {
        console.error('Error loading map data:', error)
      })
  }, [])

  if (!mapData || !Highcharts) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8">US Power Grid Interconnections</h1>
        <div className="w-full h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded">
          <p className="text-gray-500">Loading map data...</p>
        </div>
      </div>
    )
  }

  const options: any = {
    chart: {
      map: mapData,
      type: 'map',
    },
    title: {
      text: 'US Power Grid Interconnections',
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom',
      },
    },
    colorAxis: {
      min: 1,
      max: 3,
      stops: [
        [0, '#3b82f6'], // ERCOT - blue
        [0.5, '#22c55e'], // Eastern - green
        [1, '#eab308'], // Western - yellow
      ],
    },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
    },
    series: [
      {
        name: 'Power Grid',
        type: 'map',
        data: powerGridData,
        joinBy: ['postal-code', 'code'],
        states: {
          hover: {
            color: '#1b2b41',
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          pointFormat: '{point.name}: <b>{point.value}</b><br/>',
          formatter: function (): string {
            const gridNames: { [key: number]: string } = {
              1: 'ERCOT',
              2: 'Eastern Interconnection',
              3: 'Western Interconnection',
            }
            return `<b>${(this.point as any).properties?.name || 'State'}</b><br/>${gridNames[(this.point as any).value as number] || 'Unknown'}`
          },
        },
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-primary dark:text-gray-100">US Power Grid Interconnections</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
        The United States has three main power grid interconnections: ERCOT (Texas), 
        Eastern Interconnection, and Western Interconnection.
      </p>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <div className="w-full" style={{ minHeight: '600px' }}>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType="mapChart"
            options={options}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">ERCOT</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            The Electric Reliability Council of Texas serves most of Texas and operates independently from the other two interconnections.
          </p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Eastern Interconnection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Covers the eastern two-thirds of the United States, from the Great Plains to the Atlantic Coast.
          </p>
        </div>
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-semibold text-yellow-700 dark:text-yellow-300 mb-2">Western Interconnection</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Serves the western United States, from the Rocky Mountains to the Pacific Coast, including parts of Canada and Mexico.
          </p>
        </div>
      </div>

      <div className="mt-8 prose dark:prose-invert">
        <p className="text-gray-600 dark:text-gray-300">
          These three interconnections operate largely independently, with limited power transfer between them. 
          Each grid is designed to maintain reliability and balance supply and demand within its region.
        </p>
      </div>
    </div>
  )
}

