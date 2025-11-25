import HighchartsChart from '@/components/HighchartsChart'
import Highcharts from 'highcharts'

export default function AreaChartPage() {
  const options: Highcharts.Options = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Sample Area Chart',
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
        type: 'area',
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color: '#0ea5e9',
      },
      {
        name: 'Series 2',
        type: 'area',
        data: [65.2, 58.6, 32.4, 35.5, 48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6],
        color: '#8b5cf6',
      },
      {
        name: 'Series 3',
        type: 'area',
        data: [45.2, 38.6, 42.4, 55.5, 58.9, 48.8, 49.3, 51.4, 57.0, 58.3, 69.0, 69.6],
        color: '#10b981',
      },
    ],
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#ffffff',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#ffffff',
        },
      },
    },
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8">Area Chart Example</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <HighchartsChart options={options} />
      </div>
      <div className="mt-8 prose dark:prose-invert">
        <p>
          This is a sample stacked area chart created with Highcharts. 
          Perfect for showing cumulative values over time with multiple series.
        </p>
      </div>
    </div>
  )
}

