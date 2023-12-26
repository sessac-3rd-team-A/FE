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
import { useEffect, useState } from 'react';

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

export default function TrendLineChart() {
  const [labels, setLabels] = useState<any>([]);
  const [datasets, setDatasets] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_SERVER}/api/statistics`,
          {
            cache: 'no-store',
          },
        );
        const info = await res.json();

        const currentDate = new Date();
        const label = Array.from({ length: 30 }, (_, index) => {
          const date = new Date(currentDate);
          date.setDate(date.getDate() - index);
          return date.toISOString().slice(0, 10);
        }).reverse();
        setLabels(label);

        const data = [
          {
            label: 'Negative',
            data: Array.from({ length: 30 }, (_, index) => {
              const targetDate = label[index];
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
              const targetDate = label[index];
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
              const targetDate = label[index];
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

        setDatasets(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once on mount

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
