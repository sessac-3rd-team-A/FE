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
import { useRecoilState } from 'recoil';
import { userState } from '@/utils/state';

export default function TrendLineChartCategory() {
  // 차트의 날짜 라벨, 데이터셋, 선택된 성별 및 나이, 선택된 데이터셋 등을 상태 변수로 선언
  const [labels, setLabels] = useState<any>([]);
  const [datasets, setDatasets] = useState<any>([]);
  const [user, setUser] = useRecoilState(userState);
  const { gender, age } = user;

  const [selectedGender, setSelectedGender] = useState<string>(gender || 'F');
  const [selectedAge, setSelectedAge] = useState<string>(age || '20대');
  const [visibleDataset, setVisibleDataset] = useState<string>('all');
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [ageDropdownOpen, setAgeDropdownOpen] = useState(false);
  // 선택 옵션의 목록 정의
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
  // API 요청 URL 초기화
  let url = `${process.env.NEXT_PUBLIC_API_SERVER}/api/statistics`;
  // 선택된 성별 또는 나이가 '전체'가 아닌 경우, URL에 추가
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
  // useEffect 훅을 사용하여 컴포넌트가 마운트되거나 selectedGender/selectedAge가 변경될 때 데이터를 가져오는 함수 호출
  useEffect(() => {
    // 선택된 성별과 나이에 기반하여 데이터를 가져오는 비동기 함수
    const fetchData = async () => {
      const response = await fetch(url, { cache: 'no-store' });
      const info = await response.json();
      // 현재 날짜 생성
      const currentDate = new Date();
      console.log(currentDate + '1');
      // 길이가 31인 배열을 생성하며, 배열의 각 요소는 index 값을 사용하여 채워지고
      //index는 0에서 30까지의 값을 가지게 된다.
      const label = Array.from({ length: 31 }, (_, index) => {
        // 변수에 저장된 현재 날짜를 기반으로 새로운 Date 객체를 생성
        const date = new Date(currentDate);
        //setDate(현재 일 - 0~30까지의 인덱스) so 해당 월에 28일 까지 있다면 다음달 1 ,2 ,3 일도 계산
        date.setDate(date.getDate() - index);
        //YYYY-MM-DD  label 에 반환
        return date.toISOString().slice(0, 10);
      }).reverse();
      setLabels(label);

      // 차트 데이터셋 생성
      const data = [
        {
          id: 'positive',
          label: 'Positive',
          //targetDate는 현재 반복되고 있는 label 배열의 각 요소, 즉 날짜를 나타내는 변수
          data: label.map((targetDate) => {
            const matchingData = info.find(
              //find메서드는 info배열에서 주어진 targetDate를 만족하는 첫 번째 요소를 찾아 반환한다.
              (entry: string) => entry === targetDate,
            );
            //targetDate와 맞는 날짜가 있다면 해당하는 날의 평균값을 return한다. 없으면 0 return
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
              (entry: string) => entry === targetDate,
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
              (entry: string) => entry === targetDate,
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

    fetchData(); // 컴포넌트가 마운트되거나 selectedGender/selectedAge가 변경될 때 데이터를 가져오는 함수 호출
  }, [selectedGender, selectedAge]);

  // 데이터셋 선택을 처리하는 함수
  const handleButtonClick = (id: string) => {
    if (visibleDataset === id) {
      setVisibleDataset('all'); // 이미 선택된 id를 다시 클릭하면 선택 해제
    } else {
      setVisibleDataset(id); // 그렇지 않으면 선택
    }
  };
  // 선택된 데이터셋에 따라 필터링된 데이터셋 생성
  const filteredDatasets = datasets.filter(
    (dataset: any) => visibleDataset === 'all' || dataset.id === visibleDataset,
  );
  // 최근 31일간의 날짜 라벨로 새로운 배열 생성
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
        {/* 범례와 백분율을 표시하는 컴포넌트 */}
        <div className="legend-line-box">
          {(() => {
            // 모든 데이터셋의 평균을 계산
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
            // 각 데이터셋의 백분율 계산
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
            // 데이터셋이 없을 경우 null 반환
            if (percentages.length === 0) {
              return null;
            }
            // 백분율의 합과 차이 계산
            const total = percentages.reduce(
              (total: number, current: { percentage: number }) =>
                total + current.percentage,
              0,
            );
            const difference = 100 - total;
            // 최대 백분율을 가진 데이터셋의 인덱스 찾기
            const maxIndex = percentages.reduce(
              (
                iMax: number,
                x: { percentage: number },
                i: number,
                arr: { percentage: number }[],
              ) => (x.percentage > arr[iMax].percentage ? i : iMax),
              0,
            );
            // 차이를 최대 백분율에 추가하여 합이 100이 되도록 보정
            if (difference > 0) {
              percentages[maxIndex].percentage += difference;
              // 만약 한 item이 100이 되면 모든 값을 0으로 만든다.
              if (percentages[maxIndex].percentage >= 100) {
                percentages = percentages.map((item: any) => {
                  return { ...item, percentage: 0 };
                });
              }
            }
            // 백분율을 이용하여 각 아이템을 렌더링
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
                  {/* 아이템 아이콘 및 백분율 표시 */}
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
