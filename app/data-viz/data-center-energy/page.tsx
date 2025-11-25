import dynamic from 'next/dynamic'
import Highcharts from 'highcharts'

const HighchartsChart = dynamic(() => import('@/components/HighchartsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading chart...</p></div>,
})

export default function DataCenterEnergyPage() {
  const years = [2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
  const energyConsumption = [147, 178, 224, 292, 371, 450, 513, 606] // TWh
  const shareOfTotal = [3.7, 4.3, 5.2, 6.5, 8.0, 9.3, 10.3, 11.7] // Percentage

  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'US Data Center Energy Consumption',
    },
    xAxis: {
      categories: years.map(String),
      title: {
        text: 'Year',
      },
    },
    yAxis: [
      {
        title: {
          text: 'Energy Consumption (TWh)',
        },
        labels: {
          format: '{value} TWh',
        },
      },
      {
        title: {
          text: 'Share of Total US Power Demand (%)',
        },
        labels: {
          format: '{value}%',
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
      formatter: function (this: any): string {
        const point = this.points?.[0]
        const point2 = this.points?.[1]
        if (!point || !point2) return ''
        return `
          <b>${point.category}</b><br/>
          Energy Consumption: <b>${point.y} TWh</b><br/>
          Share of Total: <b>${point2.y}%</b>
        `
      },
    },
    series: [
      {
        name: 'Energy Consumption (TWh)',
        type: 'column',
        data: energyConsumption,
        color: '#3b82f6', // blue-500
        yAxis: 0,
      },
      {
        name: 'Share of Total US Power Demand (%)',
        type: 'line',
        data: shareOfTotal,
        color: '#22c55e', // green-500
        yAxis: 1,
        marker: {
          enabled: true,
          radius: 4,
        },
      },
    ],
    legend: {
      enabled: true,
    },
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-4 text-primary dark:text-gray-100">US Data Center Energy Consumption</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
        Projected growth of data center energy consumption and its share of total US power demand from 2023 to 2030.
      </p>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
        <HighchartsChart options={options} />
      </div>

      <div className="mt-8 prose dark:prose-invert">
        <h2 className="text-2xl font-bold mb-4">Key Insights</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Energy consumption is projected to grow from 147 TWh in 2023 to 606 TWh in 2030, a 4.1x increase.</li>
          <li>The share of total US power demand is expected to rise from 3.7% to 11.7% over the same period.</li>
          <li>This represents a significant increase in the energy footprint of data centers.</li>
        </ul>
      </div>
    </div>
  )
}

