import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
// import {faker} from "faker"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ChartData,
    LineController,
    ChartOptions,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    LineController,
);
// ChartJS.
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const totalDuration = 1000;
const delayBetweenPoints = totalDuration / labels.length;
const previousY = (ctx) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
const animation = {
  x: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: NaN, // the point is initially skipped
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.xStarted) {
        return 0;
      }
      ctx.xStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  },
  y: {
    type: 'number',
    easing: 'linear',
    duration: delayBetweenPoints,
    from: previousY,
    delay(ctx) {
      if (ctx.type !== 'data' || ctx.yStarted) {
        return 0;
      }
      ctx.yStarted = true;
      return ctx.index * delayBetweenPoints;
    }
  }
};


export const options: ChartOptions = {

        animations: {
          radius: {
            duration: 400,
            easing: 'linear',
            loop: (context) => context.active
          }
        },
        hoverRadius: 12,
        hoverBackgroundColor: 'yellow',
        interaction: {
          mode: 'nearest',
          intersect: false,
          axis: 'x'
        },
        plugins: {
          tooltip: {
            enabled: false
          }
        }
    ,animation,
    borderColor:"orange"
};
interface iChartData {
    chartData: ChartData
}
export const data = {
    labels,
    datasets: [
        {
            fill: true,
            label: 'Dataset 2',
            data: labels.map(() => Math.random() * 1000),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};
export function AreaChart({ chartData }: iChartData) {
    const data: ChartData = {
        ...chartData,
        datasets: chartData.datasets.map(dataset => ({
            fill: true,
            ...dataset
        })),

    }
    // chartData.datasets
    // const data = useRef(chartData)

    return <Line options={options} data={data} />;
}
export function LineChart({ chartData }: iChartData) {
    return <Line options={options} data={chartData} />;
}
export function BarChart({ chartData }) {
    return <Bar options={options} data={chartData} />;
}
