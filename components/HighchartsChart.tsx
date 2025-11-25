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
    // Ensure Highcharts is available
    if (typeof window !== 'undefined' && chartRef.current?.chart) {
      chartRef.current.chart.reflow()
    }
  }, [])

  const defaultOptions: Highcharts.Options = {
    chart: {
      backgroundColor: 'transparent',
      style: {
        fontFamily: 'inherit',
      },
    },
    credits: {
      enabled: false,
    },
    title: {
      text: title || '',
      style: {
        color: '#1f2937',
      },
    },
    legend: {
      itemStyle: {
        color: '#4b5563',
      },
    },
    ...options,
  }

  // Apply dark mode styles if needed
  if (typeof window !== 'undefined') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (isDark) {
      defaultOptions.title!.style!.color = '#f3f4f6'
      defaultOptions.legend!.itemStyle!.color = '#d1d5db'
      defaultOptions.xAxis = {
        ...defaultOptions.xAxis,
        labels: {
          style: { color: '#d1d5db' },
        },
        title: {
          style: { color: '#d1d5db' },
        },
      }
      defaultOptions.yAxis = {
        ...defaultOptions.yAxis,
        labels: {
          style: { color: '#d1d5db' },
        },
        title: {
          style: { color: '#d1d5db' },
        },
      }
    }
  }

  return (
    <div className="w-full">
      <HighchartsReact
        highcharts={Highcharts}
        options={defaultOptions}
        ref={chartRef}
      />
    </div>
  )
}

