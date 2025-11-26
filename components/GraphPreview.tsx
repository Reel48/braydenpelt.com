'use client'

import dynamic from 'next/dynamic'
import Highcharts from 'highcharts'

const HighchartsChart = dynamic(() => import('@/components/HighchartsChart'), {
  ssr: false,
})

interface GraphPreviewProps {
  type: 'line' | 'bar' | 'pie' | 'area' | 'map'
  title: string
  href: string
  description: string
}

export default function GraphPreview({ type, title, href, description }: GraphPreviewProps) {
  const getPreviewOptions = (): Highcharts.Options => {
    const baseOptions: Highcharts.Options = {
      chart: {
        type: type === 'bar' ? 'column' : type,
        height: 200,
        spacing: [10, 10, 10, 10],
      },
      title: {
        text: '',
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
    }

    switch (type) {
      case 'line':
        return {
          ...baseOptions,
          chart: {
            ...baseOptions.chart,
            type: 'column',
          },
          xAxis: {
            categories: ['2023', '2024', '2025', '2026'],
            labels: { enabled: false },
            title: { text: '' },
            lineWidth: 0,
            tickWidth: 0,
          },
          yAxis: {
            labels: { enabled: false },
            title: { text: '' },
            gridLineWidth: 0,
          },
          series: [
            {
              name: 'Energy (TWh)',
              type: 'column',
              data: [147, 178, 224, 292],
              color: '#3b82f6',
            },
          ],
        }
      case 'bar':
        return {
          ...baseOptions,
          xAxis: {
            categories: ['A', 'B', 'C', 'D', 'E'],
            labels: { enabled: false },
            title: { text: '' },
            lineWidth: 0,
            tickWidth: 0,
          },
          yAxis: {
            labels: { enabled: false },
            title: { text: '' },
            gridLineWidth: 0,
          },
          series: [
            {
              name: 'Data',
              type: 'column',
              data: [45, 78, 52, 89, 65],
              color: '#3b82f6',
            },
          ],
        }
      case 'pie':
        return {
          ...baseOptions,
          plotOptions: {
            pie: {
              dataLabels: { enabled: false },
            },
          },
          series: [
            {
              name: 'Share',
              type: 'pie',
              data: [
                { name: 'A', y: 35, color: '#3b82f6' },
                { name: 'B', y: 25, color: '#a855f7' },
                { name: 'C', y: 20, color: '#22c55e' },
                { name: 'D', y: 20, color: '#eab308' },
              ],
            },
          ],
        }
      case 'area':
        return {
          ...baseOptions,
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            labels: { enabled: false },
            title: { text: '' },
            lineWidth: 0,
            tickWidth: 0,
          },
          yAxis: {
            labels: { enabled: false },
            title: { text: '' },
            gridLineWidth: 0,
          },
          plotOptions: {
            area: {
              stacking: 'normal',
            },
          },
          series: [
            {
              name: 'Series 1',
              type: 'area',
              data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0],
              color: '#3b82f6',
            },
            {
              name: 'Series 2',
              type: 'area',
              data: [65.2, 58.6, 32.4, 35.5, 48.9, 38.8],
              color: '#06b6d4',
            },
          ],
        }
      case 'map':
        // For map preview, show a simple placeholder since maps require special setup
        return {
          chart: {
            type: 'bar',
            height: 200,
            spacing: [10, 10, 10, 10],
          },
          title: { text: '' },
          credits: { enabled: false },
          legend: { enabled: false },
          tooltip: { enabled: false },
          xAxis: {
            categories: ['ERCOT', 'Eastern', 'Western'],
            labels: { enabled: false },
            lineWidth: 0,
            tickWidth: 0,
          },
          yAxis: {
            labels: { enabled: false },
            gridLineWidth: 0,
          },
          series: [
            {
              type: 'column',
              data: [
                { y: 1, color: '#3b82f6' },
                { y: 2, color: '#22c55e' },
                { y: 3, color: '#eab308' },
              ],
            },
          ],
        }
      default:
        return baseOptions
    }
  }

  return (
    <a
      href={href}
      className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 group"
    >
      <h2 className="text-xl font-semibold mb-2 text-primary group-hover:text-primary/80 transition-colors">
        {title}
      </h2>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <div className="w-full h-48 bg-gray-50 rounded border border-gray-200 overflow-hidden">
        <HighchartsChart options={getPreviewOptions()} />
      </div>
    </a>
  )
}

