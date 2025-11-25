import dynamic from 'next/dynamic'
import Highcharts from 'highcharts'

const HighchartsChart = dynamic(() => import('@/components/HighchartsChart'), {
  ssr: false,
  loading: () => <div className="w-full h-96 flex items-center justify-center"><p className="text-gray-500">Loading chart...</p></div>,
})

export default function PieChartPage() {
  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Sample Pie Chart',
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
        },
      },
    },
    series: [
      {
        name: 'Share',
        type: 'pie',
        data: [
          { name: 'Chrome', y: 61.41, color: '#3b82f6' }, // blue-500
          { name: 'Internet Explorer', y: 11.84, color: '#a855f7' }, // purple-500
          { name: 'Firefox', y: 10.85, color: '#22c55e' }, // green-500
          { name: 'Edge', y: 4.67, color: '#eab308' }, // yellow-500
          { name: 'Safari', y: 4.18, color: '#ef4444' }, // red-500
          { name: 'Other', y: 7.05, color: '#ec4899' }, // pink-500
        ],
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">Pie Chart Example</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <HighchartsChart options={options} />
      </div>
      <div className="mt-8 prose dark:prose-invert">
        <p>
          This is a sample pie chart created with Highcharts. Great for showing 
          proportions and distributions of data.
        </p>
      </div>
    </div>
  )
}

