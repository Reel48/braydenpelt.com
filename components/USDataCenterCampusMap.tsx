'use client'

import { useEffect, useState, useRef } from 'react'

// Campus data
const campusData = [
  {
    name: 'Quantum Loophole Frederick Campus',
    state: 'Maryland',
    county: 'Frederick County',
    company: 'Quantum Loophole (Developer)',
    capacity: 2400,
    lat: 39.4143,
    lon: -77.4105,
  },
  {
    name: 'Tract Buckeye Data Center Park',
    state: 'Arizona',
    county: 'Maricopa County',
    company: 'Tract',
    capacity: 1800,
    lat: 33.3703,
    lon: -112.5838,
  },
  {
    name: 'Meta Altoona Campus',
    state: 'Iowa',
    county: 'Polk County',
    company: 'Meta (Facebook)',
    capacity: 1401,
    lat: 41.6445,
    lon: -93.4646,
  },
  {
    name: 'Meta Prineville Campus',
    state: 'Oregon',
    county: 'Crook County',
    company: 'Meta (Facebook)',
    capacity: 1289,
    lat: 44.2992,
    lon: -120.8342,
  },
  {
    name: 'Advanced Energy and Intelligence Campus',
    state: 'Texas',
    county: 'Lubbock County (Est)',
    company: 'Fermi America / Texas Tech',
    capacity: 11000,
    lat: 33.5779,
    lon: -101.8552,
  },
  {
    name: 'Quantica AI Data Center Campus',
    state: 'Montana',
    county: 'Yellowstone County',
    company: 'Quantica Infrastructure',
    capacity: 1000,
    lat: 45.7844,
    lon: -108.5007,
  },
  {
    name: 'Texas Critical Data Centers (Ector)',
    state: 'Texas',
    county: 'Ector County',
    company: 'New Era Energy / Sharon AI',
    capacity: 1000,
    lat: 31.8457,
    lon: -102.3676,
  },
  {
    name: 'Switch Tahoe Reno (The Citadel)',
    state: 'Nevada',
    county: 'Storey County',
    company: 'Switch',
    capacity: 1000,
    lat: 39.5296,
    lon: -119.2238,
  },
  {
    name: 'Tract Reno/Storey County Campus',
    state: 'Nevada',
    county: 'Storey County',
    company: 'Tract',
    capacity: 1000,
    lat: 39.5296,
    lon: -119.2238,
  },
  {
    name: 'Atlas Point (Planned)',
    state: 'Virginia',
    county: 'Spotsylvania County',
    company: 'Amazon Web Services (AWS)',
    capacity: 1000,
    lat: 38.2015,
    lon: -77.5892,
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

      // Convert campus data to map points
      const mapPoints = campusData.map(campus => ({
        name: campus.name,
        lat: campus.lat,
        lon: campus.lon,
        z: campus.capacity, // Size based on capacity
        capacity: campus.capacity,
        state: campus.state,
        county: campus.county,
        company: campus.company,
      }))

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
            tooltip: {
              pointFormat: '<b>{point.name}</b><br/>' +
                'Capacity: <b>{point.capacity} MW</b><br/>' +
                'State: {point.state}<br/>' +
                'County: {point.county}<br/>' +
                'Company: {point.company}',
            },
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
            // Data center campuses
            type: 'mappoint',
            name: 'Data Center Campus',
            color: '#1b2b41',
            data: mapPoints,
            marker: {
              fillColor: '#1b2b41',
              lineColor: '#fff',
              lineWidth: 2,
              radius: 8,
            },
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

