'use client'

import { useEffect, useState, useRef } from 'react'

// Campus data
const campusData = [
  {
    name: 'Altoona Data Center',
    state: 'IA',
    county: 'Polk',
    company: 'Meta',
    capacity: 1400,
    status: 'Operational / Expanding',
    lat: 41.6445,
    lon: -93.4646,
  },
  {
    name: 'Prineville Data Center',
    state: 'OR',
    county: 'Crook',
    company: 'Meta',
    capacity: 1290,
    status: 'Operational',
    lat: 44.2992,
    lon: -120.8342,
  },
  {
    name: 'Council Bluffs Campus',
    state: 'IA',
    county: 'Pottawattamie',
    company: 'Google',
    capacity: 1000,
    status: 'Operational / Expanding',
    lat: 41.2619,
    lon: -95.8608,
  },
  {
    name: 'Quincy Campus',
    state: 'WA',
    county: 'Grant',
    company: 'Microsoft',
    capacity: 1000,
    status: 'Operational',
    lat: 47.2343,
    lon: -119.8526,
  },
  {
    name: 'Boydton Campus',
    state: 'VA',
    county: 'Mecklenburg',
    company: 'Microsoft',
    capacity: 1000,
    status: 'Operational / Expanding',
    lat: 36.6676,
    lon: -78.3875,
  },
  {
    name: 'The Citadel (Tahoe Reno)',
    state: 'NV',
    county: 'Storey/Washoe',
    company: 'Switch',
    capacity: 1000,
    status: 'Operational / Planned',
    lat: 39.5296,
    lon: -119.2238,
  },
  {
    name: 'Prince William Digital Gateway',
    state: 'VA',
    county: 'Prince William',
    company: 'QTS / Compass',
    capacity: 3000,
    status: 'Planned (Rezoned)',
    lat: 38.6318,
    lon: -77.2494,
  },
  {
    name: 'Susquehanna (Cumulus)',
    state: 'PA',
    county: 'Luzerne',
    company: 'AWS / Talen',
    capacity: 960,
    status: 'Planned (Contested)',
    lat: 41.2451,
    lon: -75.8813,
  },
  {
    name: 'Crane Clean Energy Center',
    state: 'PA',
    county: 'Dauphin',
    company: 'Microsoft',
    capacity: 835,
    status: 'Planned (Restart 2028)',
    lat: 40.2659,
    lon: -76.8863,
  },
  {
    name: 'Hanover Technology Park',
    state: 'VA',
    county: 'Hanover',
    company: 'Tract',
    capacity: 2400,
    status: 'Planned (Zoned)',
    lat: 37.7660,
    lon: -77.3683,
  },
  {
    name: 'Caldwell Technology Park',
    state: 'TX',
    county: 'Caldwell',
    company: 'Tract',
    capacity: 2000,
    status: 'Planned (Land Acquired)',
    lat: 29.8849,
    lon: -97.6728,
  },
  {
    name: 'Frontier Mega-Campus',
    state: 'TX',
    county: 'Shackelford',
    company: 'Vantage',
    capacity: 1400,
    status: 'Planned',
    lat: 32.7354,
    lon: -99.3161,
  },
  {
    name: 'Lighthouse (Stargate)',
    state: 'WI',
    county: 'Ozaukee',
    company: 'Vantage / Oracle',
    capacity: 1000,
    status: 'Planned',
    lat: 43.3870,
    lon: -87.8756,
  },
  {
    name: 'Frederick Campus',
    state: 'MD',
    county: 'Frederick',
    company: 'Quantum Loophole',
    capacity: 1000,
    status: 'Under Construction',
    lat: 39.4143,
    lon: -77.4105,
  },
  {
    name: 'Golden Plains Tech Park',
    state: 'MO',
    county: 'Clay/Platte',
    company: 'Diode / Meta / Google',
    capacity: 1000,
    status: 'Under Construction',
    lat: 39.2467,
    lon: -94.4194,
  },
  {
    name: 'Madison/Warren Complex',
    state: 'MS',
    county: 'Madison/Warren',
    company: 'AWS',
    capacity: 2000,
    status: 'Planned',
    lat: 32.4618,
    lon: -90.1154,
  },
  {
    name: 'Colossus',
    state: 'TN',
    county: 'Shelby',
    company: 'xAI',
    capacity: 1000,
    status: 'Operational / Expanding',
    lat: 35.1495,
    lon: -90.0490,
  },
]

export function USDataCenterCampusMap() {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<any>(null)
  const [topology, setTopology] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [highchartsInitialized, setHighchartsInitialized] = useState(false)

  useEffect(() => {
    const initMap = async () => {
      try {
        // Import Highcharts and Maps module
        const Highcharts = (await import('highcharts')).default
        const HighchartsMapModule = (await import('highcharts/modules/map')).default
        
        // Initialize Highcharts Maps module
        HighchartsMapModule(Highcharts)
        setHighchartsInitialized(true)

        // Load US map topology
        const response = await fetch(
          'https://code.highcharts.com/mapdata/countries/us/us-all.topo.json'
        )
        if (!response.ok) {
          throw new Error(`Failed to fetch map data: ${response.statusText}`)
        }
        const data = await response.json()
        
        setTopology(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error loading map data:', error)
        setIsLoading(false)
      }
    }

    initMap()
  }, [])

  // Create chart when everything is ready
  useEffect(() => {
    if (!chartContainerRef.current || !topology || !highchartsInitialized) {
      return
    }

    const createChart = async () => {
      const Highcharts = (await import('highcharts')).default
      
      // Destroy existing chart if any
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }

      // Color mapping based on status
      const getStatusColor = (status: string): string => {
        if (status.includes('Operational') && !status.includes('Planned')) {
          return '#22c55e' // Green for operational
        } else if (status.includes('Operational / Expanding')) {
          return '#10b981' // Emerald green for expanding
        } else if (status.includes('Operational / Planned')) {
          return '#84cc16' // Lime green for operational/planned
        } else if (status.includes('Under Construction')) {
          return '#f97316' // Orange for under construction
        } else if (status.includes('Planned')) {
          return '#3b82f6' // Blue for planned
        }
        return '#1b2b41' // Default primary color
      }

      // Convert campus data to map points and group by status for legend
      const mapPoints = campusData.map(campus => ({
        name: campus.name,
        lat: campus.lat,
        lon: campus.lon,
        z: campus.capacity, // Size based on capacity
        capacity: campus.capacity,
        state: campus.state,
        county: campus.county,
        company: campus.company,
        status: campus.status,
        color: getStatusColor(campus.status),
        statusCategory: campus.status.includes('Operational') && !campus.status.includes('Planned')
          ? 'Operational'
          : campus.status.includes('Under Construction')
          ? 'Under Construction'
          : 'Planned',
      }))

      // Group points by status category
      const operationalPoints = mapPoints.filter(p => p.statusCategory === 'Operational')
      const underConstructionPoints = mapPoints.filter(p => p.statusCategory === 'Under Construction')
      const plannedPoints = mapPoints.filter(p => p.statusCategory === 'Planned')

      const options: any = {
        chart: {
          type: 'map',
          map: topology,
          height: 600,
        },
        title: {
          text: 'U.S. Data Center Campuses with 1+ GW Capacity',
        },
        subtitle: {
          text: 'Existing and Planned Data Center Campuses',
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            verticalAlign: 'bottom',
          },
        },
        legend: {
          enabled: true,
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          itemStyle: {
            fontSize: '12px',
          },
        },
        plotOptions: {
          mappoint: {
            cluster: {
              enabled: true,
              allowOverlap: false,
              animation: {
                duration: 450,
              },
              layoutAlgorithm: {
                type: 'grid',
                gridSize: 50,
              },
              zones: [
                {
                  from: 1,
                  to: 2,
                  marker: {
                    radius: 13,
                  },
                },
                {
                  from: 3,
                  to: 10,
                  marker: {
                    radius: 15,
                  },
                },
                {
                  from: 11,
                  to: 100,
                  marker: {
                    radius: 17,
                  },
                },
              ],
            },
            dataLabels: {
              enabled: false,
            },
          },
        },
        tooltip: {
          useHTML: true,
          pointFormatter: function(this: any): string {
            // Access properties directly from the point
            const name = this.name || 'Unknown'
            const state = this.state || 'Unknown'
            const county = this.county || 'Unknown'
            const company = this.company || 'Unknown'
            const capacity = this.capacity || this.z || 0
            const status = this.status || 'Unknown'
            
            return `<b>${name}</b><br/>` +
              `State: ${state}<br/>` +
              `County: ${county}<br/>` +
              `Company: ${company}<br/>` +
              `Capacity: <b>${capacity} MW</b><br/>` +
              `Status: ${status}`
          },
        },
        series: [
          {
            // Base map
            type: 'map',
            name: 'United States',
            mapData: topology,
            nullColor: '#e0e0e0',
            borderColor: '#999',
            borderWidth: 1,
            showInLegend: false,
          },
          {
            // Operational campuses
            type: 'mappoint',
            name: 'Operational',
            color: '#22c55e',
            marker: {
              symbol: 'circle',
              radius: 8,
              lineColor: '#fff',
              lineWidth: 2,
            },
            data: operationalPoints.map(point => ({
              ...point,
              marker: {
                symbol: 'circle',
                fillColor: point.color,
                lineColor: '#fff',
                lineWidth: 2,
                radius: 8,
              },
            })),
          },
          {
            // Under Construction campuses
            type: 'mappoint',
            name: 'Under Construction',
            color: '#f97316',
            marker: {
              symbol: 'circle',
              radius: 8,
              lineColor: '#fff',
              lineWidth: 2,
            },
            data: underConstructionPoints.map(point => ({
              ...point,
              marker: {
                symbol: 'circle',
                fillColor: point.color,
                lineColor: '#fff',
                lineWidth: 2,
                radius: 8,
              },
            })),
          },
          {
            // Planned campuses
            type: 'mappoint',
            name: 'Planned',
            color: '#3b82f6',
            marker: {
              symbol: 'circle',
              radius: 8,
              lineColor: '#fff',
              lineWidth: 2,
            },
            data: plannedPoints.map(point => ({
              ...point,
              marker: {
                symbol: 'circle',
                fillColor: point.color,
                lineColor: '#fff',
                lineWidth: 2,
                radius: 8,
              },
            })),
          },
        ],
      }

      try {
        chartInstanceRef.current = (Highcharts as any).mapChart(chartContainerRef.current, options)
        console.log('Campus map chart created successfully', chartInstanceRef.current)
      } catch (error) {
        console.error('Error creating campus map chart:', error)
      }
    }

    createChart()

    // Cleanup
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
        chartInstanceRef.current = null
      }
    }
  }, [topology, highchartsInitialized])

  if (isLoading || !highchartsInitialized || !topology) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg" style={{ minHeight: '600px' }}>
      <div ref={chartContainerRef} style={{ width: '100%', height: '600px' }} />
    </div>
  )
}

