'use client'

import dynamic from 'next/dynamic'
import Highcharts from 'highcharts'

const HighchartsChart = dynamic(() => import('@/components/HighchartsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading chart...</p></div>,
})

// Data from the table (2025-2035 only)
const years = [2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035]

const data = {
  coal: [16.2, 16.0, 15.5, 14.5, 13.0, 11.0, 9.5, 8.0, 6.5, 5.0, 4.0],
  naturalGas: [56.0, 64.5, 72.0, 78.5, 82.0, 85.0, 86.5, 85.0, 82.0, 78.0, 72.0],
  nuclear: [17.5, 19.0, 21.0, 23.5, 26.0, 29.0, 32.5, 36.0, 41.0, 46.5, 53.0],
  hydro: [5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0, 6.1],
  wind: [20.0, 25.0, 32.0, 40.0, 49.0, 58.0, 68.0, 79.0, 90.0, 102.0, 115.0],
  solar: [27.0, 35.0, 46.0, 58.0, 72.0, 88.0, 105.0, 125.0, 148.0, 175.0, 205.0],
  other: [1.2, 1.5, 2.0, 3.0, 4.5, 6.4, 8.8, 12.0, 16.6, 22.5, 30.0],
}

export function DataCenterElectricityBySourceChart() {
  const options: Highcharts.Options = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'U.S. Data Center Electricity Generation by Fuel Source (2025-2035)',
    },
    xAxis: {
      categories: years.map(String),
      title: {
        text: 'Year',
      },
    },
    yAxis: {
      title: {
        text: 'Electricity Generation (TWh)',
      },
      labels: {
        format: '{value} TWh',
      },
    },
    tooltip: {
      shared: true,
      formatter: function(this: any): string {
        let tooltip = `<b>${this.x}</b><br/>`
        this.points.forEach((point: any) => {
          tooltip += `${point.series.name}: <b>${point.y} TWh</b><br/>`
        })
        tooltip += `Total: <b>${this.points.reduce((sum: number, p: any) => sum + p.y, 0).toFixed(1)} TWh</b>`
        return tooltip
      },
    },
    plotOptions: {
      area: {
        stacking: 'normal',
        fillOpacity: 0.7,
        marker: {
          enabled: false,
        },
      },
    },
    series: [
      {
        name: 'Coal',
        type: 'area',
        data: data.coal,
        color: '#374151', // gray-700
      },
      {
        name: 'Natural Gas',
        type: 'area',
        data: data.naturalGas,
        color: '#3b82f6', // blue-500
      },
      {
        name: 'Nuclear',
        type: 'area',
        data: data.nuclear,
        color: '#10b981', // emerald-500
      },
      {
        name: 'Hydro',
        type: 'area',
        data: data.hydro,
        color: '#06b6d4', // cyan-500
      },
      {
        name: 'Wind',
        type: 'area',
        data: data.wind,
        color: '#8b5cf6', // violet-500
      },
      {
        name: 'Solar',
        type: 'area',
        data: data.solar,
        color: '#f59e0b', // amber-500
      },
      {
        name: 'Other',
        type: 'area',
        data: data.other,
        color: '#6b7280', // gray-500
      },
    ],
    legend: {
      enabled: true,
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
    },
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <HighchartsChart options={options} />
    </div>
  )
}

