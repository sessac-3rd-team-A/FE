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

const trendLineChart = () => {
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
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: 'Data 2',
              data: [110, 110, 100, 170, 200, 100, 90],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Data 3',
              data: [150, 112, 130, 100, 210, 130, 190],
              borderColor: 'rgb(17, 159, 29)',
              backgroundColor: 'rgba(17, 159, 29, 0.5)',
            },
          ],
        }}
      />
    </div>
  );
};
export default trendLineChart;
