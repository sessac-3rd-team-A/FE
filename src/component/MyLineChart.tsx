// components/MyLineChart.tsx
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

const MyLineChart = () => {
  return (
    <div>
      <Line
        data={{
          labels: [
            '2023-01',
            '2023-02',
            '2023-03',
            '2023-04',
            '2023-05',
            '2023-06',
            '2023-07',
          ],
          datasets: [
            {
              label: 'Data 1',
              data: [100, 120, 115, 134, 168, 132, 200],
              backgroundColor: 'purple',
            },
            {
              label: 'Data 2',
              data: [1, 12, 11, 13, 16, 13, 20],
              backgroundColor: 'green',
            },
          ],
        }}
      />
    </div>
  );
};
export default MyLineChart;
