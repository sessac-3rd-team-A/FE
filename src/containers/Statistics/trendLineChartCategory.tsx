import '../../styles/statistics/trendLineChartCategory.scss';
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
import { useState, useEffect } from 'react';

export default function TrendLineChartCategory() {
  const [labels, setLabels] = useState<any>([]);
  const [datasets, setDatasets] = useState<any>([]);
  const [selectedGender, setSelectedGender] = useState<string>('F');
  const [selectedAge, setSelectedAge] = useState<string>('20대');
  const [visibleDataset, setVisibleDataset] = useState<string>('all');
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [ageDropdownOpen, setAgeDropdownOpen] = useState(false);

  useEffect(() => {
    // Function to fetch data based on selectedGender and selectedAge
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/statistics?gender=${selectedGender}&age=${selectedAge}`,
        { cache: 'no-store' },
      );
      const info = await response.json();

      const currentDate = new Date();
      const label = Array.from({ length: 30 }, (_, index) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - index);
        return date.toISOString().slice(0, 10);
      }).reverse();
      setLabels(label);

      const data = [
        {
          id: 'positive',
          label: 'Positive',
          data: label.map((targetDate) => {
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
          id: 'neutral',
          label: 'Neutral',
          data: label.map((targetDate) => {
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
          data: label.map((targetDate) => {
            const matchingData = info.find(
              (entry: { date: string }) => entry.date === targetDate,
            );
            return matchingData ? matchingData.averageNegative : 0;
          }),
          borderColor: '#FF983A',
          backgroundColor: '#FF983A',
          borderWidth: 1,
        },
      ];

      setDatasets(data);
    };

    fetchData(); // Fetch data when component mounts or when selectedGender/selectedAge changes
  }, [selectedGender, selectedAge]);

  const handleButtonClick = (id: string) => {
    if (visibleDataset === id) {
      setVisibleDataset('all'); // 이미 선택된 id를 다시 클릭하면 선택 해제
    } else {
      setVisibleDataset(id); // 그렇지 않으면 선택
      console.log(id);
    }
  };
  const filteredDatasets = datasets.filter(
    (dataset: any) => visibleDataset === 'all' || dataset.id === visibleDataset,
  );

  const newLabels = Array.from({ length: 31 }, (_, i) => i).reverse();
  return (
    <div className="chart">
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
              // text: '당신의 기분을 알려드려요 : )',
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
      ></Line>
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
              className={`item ${visibleDataset === item.id ? 'selected' : ''}`}
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
        {/* 성별 선택 드롭다운 */}
        <div className="custom-select-wrapper">
          <div
            className={`custom-select ${genderDropdownOpen ? 'opened' : ''}`}
          >
            <span
              className="custom-select-trigger"
              onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
            >
              <div className="custom-select-cover">
                {selectedGender === 'F' ? '여성' : '남성'}
              </div>
            </span>
            <div className="custom-options">
              <span
                className={`custom-option ${
                  selectedGender === 'F' ? 'selection' : ''
                }`}
                onClick={() => {
                  setSelectedGender('F');
                  setGenderDropdownOpen(false);
                }}
              >
                여성
              </span>
              <span
                className={`custom-option ${
                  selectedGender === 'M' ? 'selection' : ''
                }`}
                onClick={() => {
                  setSelectedGender('M');
                  setGenderDropdownOpen(false);
                }}
              >
                남성
              </span>
            </div>
          </div>
        </div>

        {/* 연령 선택 드롭다운 */}
        <div className="custom-select-wrapper">
          <div className={`custom-select ${ageDropdownOpen ? 'opened' : ''}`}>
            <span
              className="custom-select-trigger"
              onClick={() => setAgeDropdownOpen(!ageDropdownOpen)}
            >
              <div className="custom-select-cover">{selectedAge}</div>
            </span>
            <div className="custom-options">
              {['10대', '20대', '30대', '40대', '50+'].map((age) => (
                <span
                  key={age}
                  className={`custom-option ${
                    selectedAge === age ? 'selection' : ''
                  }`}
                  onClick={() => {
                    setSelectedAge(age);
                    setAgeDropdownOpen(false);
                  }}
                >
                  {age}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
