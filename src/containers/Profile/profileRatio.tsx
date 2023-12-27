'use client';

import { Pie } from 'react-chartjs-2';
import { pieOptions } from '@/utils/chartOptions';
import { useEffect, useState } from 'react';
import responseInterceptor from '@/utils/fetch';

export default function PRatio() {
  const [ratioList, setRatioList] = useState<number[]>([]);

  const ratioData = {
    labels: ['Positive', 'Negative', 'Neutral'],
    datasets: [
      {
        label: ' 감정 지수',
        data: ratioList,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
        cutout: '75%',
      },
    ],
  };

  const getData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/profile/dashboard/ratio`,
      {
        cache: 'no-store',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    );
    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      console.log('response data :: ', data);
      console.log({ ...data.currentMonthStatistics });
      // setRatioList([Object.values(...data.currentMonthStatistics)]);
    }
  };

  useEffect(() => {
    responseInterceptor();
    getData();
  }, []);

  return (
    <div className="profile-ratio">
      <div className="ratio">
        <Pie options={pieOptions} data={ratioData} />
      </div>
      <div className="ratioText">
        <p>MOOD</p>
        <p>RATIO</p>
      </div>
      <span>monthly</span>
    </div>
  );
}
