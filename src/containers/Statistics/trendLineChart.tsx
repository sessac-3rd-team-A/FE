import React, { useEffect, useState } from 'react';
import '../../styles/statistics/trendLineChart.scss';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

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
  const [visibleDataset, setVisibleDataset] = useState<string>('all');
  const [labelsFullDate, setLabelsFullDate] = useState<any>([]); // 새로운 state 추가

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
          let day = date.getDate().toString(); // 일(day) 부분만 추출
          return day.startsWith('0') ? day.slice(1) : day; // '0'으로 시작하면 '0'을 제거
        }).reverse();
        setLabels(label);

        const labelFullDate = Array.from({ length: 30 }, (_, index) => {
          const date = new Date(currentDate);
          date.setDate(date.getDate() - index);
          return date.toISOString().slice(0, 10); // yyyy-mm-dd 형식
        }).reverse();
        setLabelsFullDate(labelFullDate); // labelsFullDate 업데이트

        const data = [
          {
            id: 'positive',
            label: 'Positive',
            data: Array.from({ length: 30 }, (_, index) => {
              const targetDate = label[index];
              const matchingData = info.find(
                (entry: { date: string }) => entry.date === targetDate,
              );
              return matchingData ? matchingData.averagePositive : 0;
            }),
            borderColor: '#FF983A',
            backgroundColor: '#FF983A',
            borderWidth: 1,
          },
          {
            id: 'neutral',
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
          {
            id: 'negative',
            label: 'Negative',
            data: Array.from({ length: 30 }, (_, index) => {
              const targetDate = label[index];
              const matchingData = info.find(
                (entry: { date: string }) => entry.date === targetDate,
              );
              return matchingData ? matchingData.averageNegative : 0;
            }),

            borderColor: '#4866D2',
            backgroundColor: '#4866D2',
            borderWidth: 1,
          },
        ];

        setDatasets(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (id: string) => {
    if (visibleDataset === id) {
      setVisibleDataset('all'); // 이미 선택된 id를 다시 클릭하면 선택 해제
    } else {
      setVisibleDataset(id); // 그렇지 않으면 선택
    }
  };

  const filteredDatasets = datasets.filter(
    (dataset: any) => visibleDataset === 'all' || dataset.id === visibleDataset,
  );
  // const newLabels = Array.from({ length: 31 }, (_, i) => i).reverse();

  return (
    <div className="chart">
      <Line
        data={{ labels, datasets: filteredDatasets }}
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
              ticks: {
                color: 'rgba(0, 0, 0)',
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                maxRotation: 0,
                minRotation: 0,
                // font: {
                //   size: 10,
                // },
                color: 'rgba(0, 0, 0)',
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
              display: false,
            },
            title: {
              display: true,
            },
            tooltip: {
              mode: 'index' as const,
              intersect: false,
              callbacks: {
                title: function (context) {
                  const index = context[0].dataIndex;
                  return labelsFullDate[index]
                    ? labelsFullDate[index].toString()
                    : '';
                },
              },
            },
          },
        }}
      />
      <div className="legendBox">
        {(() => {
          const totalAverage = datasets.reduce(
            (total: number, current: any) => {
              const average = current.data.filter(
                (value: number) => value !== 0,
              ).length
                ? current.data.reduce((a: number, b: number) => a + b, 0) /
                  current.data.filter((value: number) => value !== 0).length
                : 0;
              return total + average;
            },
            0,
          );

          let percentages = datasets.map((dataset: any) => {
            const average = dataset.data.filter((value: number) => value !== 0)
              .length
              ? dataset.data.reduce((a: number, b: number) => a + b, 0) /
                dataset.data.filter((value: number) => value !== 0).length
              : 0;
            return {
              id: dataset.id,
              percentage: totalAverage
                ? Math.round((average / totalAverage) * 100)
                : 0,
            };
          });

          if (percentages.length === 0) {
            return null;
          }

          const total = percentages.reduce(
            (total: number, current: { percentage: number }) =>
              total + current.percentage,
            0,
          );
          const difference = 100 - total;
          const maxIndex = percentages.reduce(
            (
              iMax: number,
              x: { percentage: number },
              i: number,
              arr: { percentage: number }[],
            ) => (x.percentage > arr[iMax].percentage ? i : iMax),
            0,
          );
          percentages[maxIndex].percentage += difference;

          return percentages.map((item: { id: string; percentage: number }) => (
            <button
              key={item.id}
              id={item.id}
              className="item"
              onClick={() => handleButtonClick(item.id)}
            >
              {item.id === 'positive' && (
                <img src="/statistics/positive.svg" alt="" />
              )}
              {item.id === 'negative' && (
                <img src="/statistics/negative.svg" alt="" />
              )}
              {item.id === 'neutral' && (
                <img src="/statistics/neutral.svg" alt="" />
              )}
              &nbsp;{item.percentage}%
            </button>
          ));
        })()}
      </div>
    </div>
  );
}
