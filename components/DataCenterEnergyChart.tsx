'use client'

import dynamic from 'next/dynamic'
import Highcharts from 'highcharts'

const HighchartsChart = dynamic(() => import('@/components/HighchartsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading chart...</p></div>,
})

export function DataCenterEnergyConsumptionChart() {
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const energyConsumption = [147, 178, 224, 292, 371, 450, 513, 606] // TWh

  const options: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'US Data Center Energy Consumption (TWh)',
    },
    xAxis: {
      categories: years.map(String),
      title: {
        text: 'Year',
      },
    },
    yAxis: {
      title: {
        text: 'Energy Consumption (TWh)',
      },
      labels: {
        format: '{value} TWh',
      },
    },
    tooltip: {
      formatter: function (this: any): string {
        return `<b>${this.x}</b><br/>Energy Consumption: <b>${this.y} TWh</b>`
      },
    },
    series: [
      {
        name: 'Energy Consumption (TWh)',
        type: 'line',
        data: energyConsumption,
        color: '#3b82f6', // blue-500
        marker: {
          enabled: true,
          radius: 5,
        },
      },
    ],
    legend: {
      enabled: false,
    },
  }

  return (
    <div className="my-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <HighchartsChart options={options} />
    </div>
  )
}

export function DataCenterShareChart() {
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const shareOfTotal = [3.7, 4.3, 5.2, 6.5, 8.0, 9.3, 10.3, 11.7] // Percentage

  const options: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Share of Total US Power Demand (%)',
    },
    xAxis: {
      categories: years.map(String),
      title: {
        text: 'Year',
      },
    },
    yAxis: {
      title: {
        text: 'Share of Total US Power Demand (%)',
      },
      labels: {
        format: '{value}%',
      },
    },
    tooltip: {
      formatter: function (this: any): string {
        return `<b>${this.x}</b><br/>Share of Total: <b>${this.y}%</b>`
      },
    },
    series: [
      {
        name: 'Share of Total US Power Demand (%)',
        type: 'line',
        data: shareOfTotal,
        color: '#22c55e', // green-500
        marker: {
          enabled: true,
          radius: 5,
        },
      },
    ],
    legend: {
      enabled: false,
    },
  }

  return (
    <div className="my-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <HighchartsChart options={options} />
    </div>
  )
}

