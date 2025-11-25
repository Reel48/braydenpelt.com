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
          { name: 'Chrome', y: 61.41, color: '#2a94d6' },
          { name: 'Internet Explorer', y: 11.84, color: '#717ecd' },
          { name: 'Firefox', y: 10.85, color: '#4ab471' },
          { name: 'Edge', y: 4.67, color: '#f3ae4e' },
          { name: 'Safari', y: 4.18, color: '#cf5c60' },
          { name: 'Other', y: 7.05, color: '#d96383' },
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

