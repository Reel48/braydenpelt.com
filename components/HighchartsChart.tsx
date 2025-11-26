'use client'

import { useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// Initialize Highcharts Maps if needed
let mapsInitialized = false
const initMapsIfNeeded = async () => {
  if (mapsInitialized) return
  try {
    const HighchartsMap = (await import('highcharts/modules/map')).default
    HighchartsMap(Highcharts)
    mapsInitialized = true
  } catch (error) {
    // Maps module not needed or failed to load
  }
}

interface HighchartsChartProps {
  options: Highcharts.Options
  title?: string
}

export default function HighchartsChart({ options, title }: HighchartsChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null)
  const isMapChart = options.chart?.type === 'map' || (options.series && options.series[0]?.type === 'map')
  const [mapsReady, setMapsReady] = useState(!isMapChart) // Start as false for map charts

  useEffect(() => {
    // Initialize Maps module if this is a map chart
    if (isMapChart) {
      initMapsIfNeeded().then(() => setMapsReady(true))
    }
  }, [isMapChart])

  useEffect(() => {
    // Reflow chart on window resize
    const handleResize = () => {
      if (chartRef.current?.chart) {
        chartRef.current.chart.reflow()
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Merge options - user options take precedence, but apply defaults
  const mergedOptions: Highcharts.Options = {
    ...options,
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'inherit',
      },
      ...options.chart,
    },
    credits: {
      enabled: false,
      ...options.credits,
    },
    title: title 
      ? { ...options.title, text: title }
      : options.title,
    legend: {
      itemStyle: {
        color: '#1b2b41',
      },
      ...options.legend,
    },
  }

  if (!mapsReady && (options.chart?.type === 'map' || (options.series && options.series[0]?.type === 'map'))) {
    return (
      <div className="w-full flex items-center justify-center" style={{ minHeight: '400px' }}>
        <p className="text-gray-500">Loading map...</p>
      </div>
    )
  }

  return (
    <div className="w-full" style={{ minHeight: '400px' }}>
      <HighchartsReact
        highcharts={Highcharts}
        options={mergedOptions}
        ref={chartRef}
      />
    </div>
  )
}

