import HighchartsChart from '@/components/HighchartsChart'
import Highcharts from 'highcharts'

export default function BarChartPage() {
  const options: Highcharts.Options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Sample Bar Chart',
    },
    xAxis: {
      categories: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
      title: {
        text: 'Categories',
      },
    },
    yAxis: {
      title: {
        text: 'Values',
      },
    },
    series: [
      {
        name: 'Data Series',
        type: 'column',
        data: [45, 78, 52, 89, 65],
        color: '#0ea5e9',
      },
    ],
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
        },
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">Bar Chart Example</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <HighchartsChart options={options} />
      </div>
      <div className="mt-8 prose dark:prose-invert">
        <p>
          This is a sample bar chart (column chart) created with Highcharts. 
          Perfect for comparing values across different categories.
        </p>
      </div>
    </div>
  )
}

