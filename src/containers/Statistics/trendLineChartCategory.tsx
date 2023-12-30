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
  const genderOptions = [
    { value: '전체', label: '전체' },
    { value: 'F', label: '여성' },
    { value: 'M', label: '남성' },
  ];
  const ageOptions = [
    { value: '전체', label: '전체' },
    { value: '10대', label: '10대' },
    { value: '20대', label: '20대' },
    { value: '30대', label: '30대' },
    { value: '40대', label: '40대' },
    { value: '50대', label: '50+' },
  ];

  let url = `${process.env.NEXT_PUBLIC_API_SERVER}/api/statistics`;
  if (selectedGender !== '전체' || selectedAge !== '전체') {
    url += '?';
    if (selectedGender !== '전체') {
      url += `gender=${selectedGender}`;
    }
    if (selectedAge !== '전체') {
      if (url.endsWith('?')) {
        url += `age=${selectedAge}`;
      } else {
        url += `&age=${selectedAge}`;
      }
    }
  }
  useEffect(() => {
    // Function to fetch data based on selectedGender and selectedAge
    const fetchData = async () => {
      const response = await fetch(url, { cache: 'no-store' });
      const info = await response.json();

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
          data: label.map((targetDate) => {
            const matchingData = info.find(
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
          data: label.map((targetDate) => {
            const matchingData = info.find(
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
          data: label.map((targetDate) => {
            const matchingData = info.find(
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
                  display: false,
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
              const average = dataset.data.filter(
                (value: number) => value !== 0,
              ).length
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
            if (difference > 0) {
              percentages[maxIndex].percentage += difference;
              // 만약 한 item이 100이 되면 모든 값을 0으로 만듭니다.
              if (percentages[maxIndex].percentage >= 100) {
                percentages = percentages.map((item: any) => {
                  return { ...item, percentage: 0 };
                });
              }
            }

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
                  {
                    genderOptions.find(
                      (option) => option.value === selectedGender,
                    )?.label
                  }
                </div>
              </span>
              <div className="custom-options">
                {genderOptions.map((option) => (
                  <span
                    className={`custom-option ${
                      selectedGender === option.value ? 'selection' : ''
                    }`}
                    onClick={() => {
                      setSelectedGender(option.value);
                      setGenderDropdownOpen(false);
                    }}
                    key={option.value}
                  >
                    {option.label}
                  </span>
                ))}
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
                <div className="custom-select-cover">
                  {
                    ageOptions.find((option) => option.value === selectedAge)
                      ?.label
                  }
                </div>
              </span>
              <div className="custom-options">
                {ageOptions.map((option) => (
                  <span
                    className={`custom-option ${
                      selectedAge === option.value ? 'selection' : ''
                    }`}
                    onClick={() => {
                      setSelectedAge(option.value);
                      setAgeDropdownOpen(false);
                    }}
                    key={option.value}
                  >
                    {option.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
