import { Line } from 'react-chartjs-2';
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

export default async function TrendLineChart() {
  const response = await fetch('http://localhost:8080/api/statistics', {
    cache: 'no-store',
  });
  const info = await response.json();

  const currentDate = new Date(); // Assuming the current date is available as a JavaScript Date object
  const labels = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - index);
    return date.toISOString().slice(0, 10);
  }).reverse();

  const datasets = [
    {
      label: 'Negative',
      data: Array.from({ length: 30 }, (_, index) => {
        const targetDate = labels[index];
        const matchingData = info.find(
          (entry: { date: string }) => entry.date === targetDate,
        );
        return matchingData ? matchingData.averageNegative : 0;
      }),
      borderColor: '#FF983A',
      backgroundColor: '#FF983A',
      borderWidth: 1,
    },
    {
      label: 'Positive',
      data: Array.from({ length: 30 }, (_, index) => {
        const targetDate = labels[index];
        const matchingData = info.find(
          (entry: { date: string }) => entry.date === targetDate,
        );
        return matchingData ? matchingData.averagePositive : 0;
      }),
      borderColor: '#4866D2',
      backgroundColor: '#4866D2',
      borderWidth: 1,
    },
    {
      label: 'Neutral',
      data: Array.from({ length: 30 }, (_, index) => {
        const targetDate = labels[index];
        const matchingData = info.find(
          (entry: { date: string }) => entry.date === targetDate,
        );
        return matchingData ? matchingData.averageNeutral : 0;
      }),
      borderColor: '#8F8F8F',
      backgroundColor: '#8F8F8F',
      borderWidth: 1,
    },
  ];

  return (
    <Line
      data={{ labels, datasets }}
      options={{
        maintainAspectRatio: false,
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
            align: 'start',
            position: 'right' as const,
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
}
