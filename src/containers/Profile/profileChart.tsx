'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '감정 그래프',
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      // border: {
      //   display: false,
      // },
      ticks: {
        display: false,
      },
      grid: {
        // color: '#E3E3E3',
        display: false,
      },
    },
  },
};

const today = Date.now();
const dayList = [];
for (let i = 0; i < 7; i++) {
  dayList.push(
    new Date(today - i * 1000 * 60 * 60 * 24)
      .toString()
      .split(' ')
      .slice(1, 3)
      .join(' '),
  );
}
// console.log(dayList);

const labels = dayList.reverse();

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      fill: true,
      // data 부분 실제 데이터로 교체!
      data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.1)',
    },
  ],
};

export default function PChart() {
  return (
    // <div style={{ marginTop: '100px' }}>
    //   {/* 프로필 차트 레츠고 */}
    //   <div
    //     style={{
    //       width: '1000px',
    //       height: '500px',
    //       backgroundColor: 'rgba(0, 0, 0, 0.3)',
    //     }}
    //   >
    <Line options={options} data={data} />
    //   </div>
    // </div>
  );
}
