import HighchartsChart from '@/components/HighchartsChart'
import Highcharts from 'highcharts'

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
          { name: 'Chrome', y: 61.41, color: '#0ea5e9' },
          { name: 'Internet Explorer', y: 11.84, color: '#8b5cf6' },
          { name: 'Firefox', y: 10.85, color: '#10b981' },
          { name: 'Edge', y: 4.67, color: '#f59e0b' },
          { name: 'Safari', y: 4.18, color: '#ef4444' },
          { name: 'Other', y: 7.05, color: '#6b7280' },
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

