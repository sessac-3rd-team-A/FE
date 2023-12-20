'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
  Title,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// Register ChartJS components using ChartJS.register
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const TrendLineChart = () => {
  return (
    <Line
      data={{
        labels: [
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
        ],
        datasets: [
          {
            label: 'Negative',
            data: [
              30, 35, 15, 45, 25, 20, 60, 45, 25, 20, 70, 25, 50, 35, 25, 45,
              25, 70, 25, 50, 15, 25, 25, 50, 10, 15, 30, 35, 70, 15, 20,
            ],
            borderColor: '#FF983A',
            backgroundColor: '#FF983A',
            borderWidth: 1,
          },
          {
            label: 'Positive',
            data: [
              45, 25, 70, 25, 50, 10, 25, 25, 50, 10, 15, 30, 35, 55, 15, 30,
              35, 15, 45, 25, 25, 60, 45, 25, 20, 70, 25, 50, 20, 25, 25,
            ],
            borderColor: '#4866D2',
            backgroundColor: '#4866D2',
            borderWidth: 1,
          },
          {
            label: 'Neutral',
            data: [
              25, 50, 15, 30, 35, 70, 15, 30, 35, 70, 15, 45, 25, 10, 60, 25,
              50, 15, 30, 35, 65, 15, 30, 35, 70, 15, 45, 25, 10, 60, 55,
            ],
            borderColor: '#8F8F8F',
            backgroundColor: '#8F8F8F',
            borderWidth: 1,
          },
        ],
      }}
      options={{
        // maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            min: 0,
            max: 100,
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        hover: {
          mode: 'nearest',
          intersect: true,
        },
        plugins: {
          legend: {
            labels: { color: 'black' },
            align: 'end',
            position: 'bottom' as const,
          },
          title: {
            display: true,
            // text: '당신의 기분을 알려드려요 : )',
          },
          tooltip: {
            mode: 'index' as const,
            intersect: false,
          },
        },
      }}
    />
  );
};
export default TrendLineChart;
