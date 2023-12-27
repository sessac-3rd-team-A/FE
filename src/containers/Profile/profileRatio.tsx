// 'use client';

// import { Pie } from 'react-chartjs-2';
// import { pieOptions } from '@/utils/chartOptions';
import { refreshAccess } from '@/utils/httpRequest';
// import { useEffect, useState } from 'react';
import { cookies } from 'next/headers';

const ratioData = {
  labels: ['Positive', 'Negative', 'Neutral'],
  datasets: [
    {
      label: ' 감정 지수',
      // data: [positiveRatio, negativeRatio, neutralRatio],
      data: [18, 30, 52],
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

export default async function PRatio() {
  // const [data, setData] = useState({});
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/profile/dashboard/ratio`,
    {
      credentials: 'include',
      cache: 'no-store',
      method: 'GET',
      headers: {
        Cookie: `accessToken=${accessToken.value}; refreshToken=${refreshToken.value}`,
      },
    },
  );

  console.log('profile ratio raw response :: ', res);

  if (res.status === 401) {
    await refreshAccess();
    // const res2 = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_SERVER}/profile/dashboard/ratio`,
    //   {
    //     credentials: 'include',
    //     cache: 'no-store',
    //     method: 'GET',
    //     headers: {
    //       Cookie: `accessToken=${newAccessToken}`,
    //     },
    //   },
    // );
    // const realData = res2.json();
    // setData(realData);
  }

  // useEffect(() => {
  // getRatioData();
  // }, []);

  // useEffect(() => {
  // console.log('데이터 ::: ', data);
  // }, [data]);

  return (
    <div className="profile-ratio">
      <div className="ratio">
        {/* <Pie options={pieOptions} data={ratioData} /> */}
      </div>
      <div className="ratioText">
        <p>MOOD</p>
        <p>RATIO</p>
      </div>
      <span>monthly</span>
    </div>
  );
}
