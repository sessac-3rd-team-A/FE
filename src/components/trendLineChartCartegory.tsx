// import '../styles/statistics/trend/cartegory.scss';

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

export default function TrendLineChartCartegory() {
  const [labels, setLabels] = useState<any>([]);
  const [datasets, setDatasets] = useState<any>([]);
  const [selectedGender, setSelectedGender] = useState<string>('F');
  const [selectedAge, setSelectedAge] = useState<string>('10대');

  useEffect(() => {
    // Function to fetch data based on selectedGender and selectedAge
    const fetchData = async () => {
      console.log('보내봄11');
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
        {
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
      ];

      setDatasets(data);
    };
    console.log('보내봄22');

    fetchData(); // Fetch data when component mounts or when selectedGender/selectedAge changes
  }, [selectedGender, selectedAge]);

  return (
    <div className="trend-select-gender">
      <div>
        <label>Select Gender:</label>
        <select
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          <option value="F">Female</option>
          <option value="M">Male</option>
        </select>
      </div>
      <div className="trend-select-age">
        <label>Select Age:</label>
        <select
          value={selectedAge}
          onChange={(e) => setSelectedAge(e.target.value)}
        >
          <option value="10대">10s</option>
          <option value="20대">20s</option>
          <option value="30대">30s</option>
          <option value="40대">40s</option>
          <option value="50대">50s</option>
        </select>
      </div>
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
    </div>
  );
}
