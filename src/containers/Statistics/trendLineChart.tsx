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

type StatisticsData = {
  date: string;
  averagePositive: number;
  averageNegative: number;
  averageNeutral: number;
  count: number;
}[];

export default function TrendLineChart({
  statisticsInfo,
}: {
  statisticsInfo: StatisticsData;
}) {
  const [labels, setLabels] = useState<any>([]);
  const [datasets, setDatasets] = useState<any>([]);
  const [visibleDataset, setVisibleDataset] = useState<string>('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const label = Array.from({ length: 31 }, (_, index) => {
          const date = new Date(currentDate);
          date.setDate(date.getDate() - index);
          return date.toISOString().slice(0, 10);
        }).reverse();
        setLabels(label);

        const data = [
          {
            id: 'positive',
            label: 'Positive',
            data: Array.from({ length: 31 }, (_, index) => {
              const targetDate = label[index];
              const matchingData = statisticsInfo.find(
                (entry: { date: string }) => entry.date === targetDate,
              );
              return matchingData ? matchingData.averagePositive : 0;
            }),
            borderColor: '#FF983A',
            backgroundColor: '#FF983A',
            borderWidth: 2,
          },
          {
            id: 'neutral',
            label: 'Neutral',
            data: Array.from({ length: 31 }, (_, index) => {
              const targetDate = label[index];
              const matchingData = statisticsInfo.find(
                (entry: { date: string }) => entry.date === targetDate,
              );
              return matchingData ? matchingData.averageNeutral : 0;
            }),
            borderColor: '#8F8F8F',
            backgroundColor: '#8F8F8F',
            borderWidth: 2,
          },
          {
            id: 'negative',
            label: 'Negative',
            data: Array.from({ length: 31 }, (_, index) => {
              const targetDate = label[index];
              const matchingData = statisticsInfo.find(
                (entry: { date: string }) => entry.date === targetDate,
              );
              return matchingData ? matchingData.averageNegative : 0;
            }),
            borderColor: '#4866D2',
            backgroundColor: '#4866D2',
            borderWidth: 2,
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
  //선택된 데이터셋만 필터링하여 filteredDatasets 변수에 저장
  const filteredDatasets = datasets.filter(
    (dataset: any) => visibleDataset === 'all' || dataset.id === visibleDataset,
  );

  //차트의 x축 레이블을 설정하기 위해 newLabels 변수에 숫자 배열을 생성
  const newLabels = Array.from({ length: 31 }, (_, i) => i).reverse();

  return (
    <div className="chart">
      <div className="chart-inner-box">
        <Line
          data={{ labels: newLabels, datasets: filteredDatasets }}
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

                  color: 'rgba(0, 0, 0)',
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
                    return labels[index] ? labels[index].toString() : '';
                  },
                },
              },
            },
          }}
        />
        <div className="legend-line-box">
          {(() => {
            // 모든 데이터셋의 평균을 계산
            const totalAverage = datasets.reduce(
              (total: number, current: any) => {
                // 현재 데이터셋의 0이 아닌 값들로 평균을 계산
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
            // 각 데이터셋의 비율을 전체 평균에 기반하여 계산
            let percentages = datasets.map((dataset: any) => {
              // 현재 데이터셋의 0이 아닌 값들로 평균을 계산
              const average = dataset.data.filter(
                (value: number) => value !== 0,
              ).length
                ? dataset.data.reduce((a: number, b: number) => a + b, 0) /
                  dataset.data.filter((value: number) => value !== 0).length
                : 0;
              return {
                id: dataset.id,
                // 전체 평균에 대한 비율을 계산하고 반올림
                percentage: totalAverage
                  ? Math.round((average / totalAverage) * 100)
                  : 0,
              };
            });
            // 비율이 없으면 null을 반환하여 렌더링 안함
            if (percentages.length === 0) {
              return null;
            }
            // 비율을 조정하여 전체 합이 100%가 되도록 보정
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
            // 각 데이터셋에 대한 아이콘과 비율을 포함한 버튼을 렌더링
            return percentages.map(
              (item: { id: string; percentage: number }) => (
                <button
                  key={item.id}
                  id={item.id}
                  className={`item ${
                    visibleDataset === item.id ? 'selected' : ''
                  }`}
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
              ),
            );
          })()}
        </div>
      </div>
    </div>
  );
}
