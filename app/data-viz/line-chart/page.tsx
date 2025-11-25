import dynamic from 'next/dynamic'
import Highcharts from 'highcharts'

const HighchartsChart = dynamic(() => import('@/components/HighchartsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading chart...</p></div>,
})

export default function LineChartPage() {
  const options: Highcharts.Options = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Sample Data Over Time',
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: 'Month',
      },
    },
    yAxis: {
      title: {
        text: 'Value',
      },
    },
    series: [
      {
        name: 'Series 1',
        type: 'line',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color: '#0ea5e9',
      },
      {
        name: 'Series 2',
        type: 'line',
        data: [65.2, 58.6, 32.4, 35.5, 48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6],
        color: '#8b5cf6',
      },
    ],
    plotOptions: {
      line: {
        dataLabels: {
          enabled: false,
        },
        enableMouseTracking: true,
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">Line Chart Example</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <HighchartsChart options={options} />
      </div>
      <div className="mt-8 prose dark:prose-invert">
        <p>
          This is a sample line chart created with Highcharts. You can customize the data,
          colors, and styling to match your needs.
        </p>
      </div>
    </div>
  )
}

