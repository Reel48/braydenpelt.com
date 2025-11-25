'use client'

import { useEffect, useRef } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface HighchartsChartProps {
  options: Highcharts.Options
  title?: string
}

export default function HighchartsChart({ options, title }: HighchartsChartProps) {
  const chartRef = useRef<HighchartsReact.RefObject>(null)

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
        color: '#4b5563',
      },
      ...options.legend,
    },
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

