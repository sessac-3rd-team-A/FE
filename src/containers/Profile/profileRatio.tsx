'use client';

import { Pie } from 'react-chartjs-2';
import { pieOptions } from '@/utils/chartOptions';
import { useEffect, useState } from 'react';
import responseInterceptor from '@/utils/fetch';
import Image from 'next/image';
import { ProfileRatioType } from '@/types';

export default function PRatio() {
  const [ratioList, setRatioList] = useState<string[]>([]);

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
    try {
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
        const data: ProfileRatioType = await res.json();
        // console.log('response data :: ', data);

        // 데이터의 타입을 확인하고, 해당 타입에 맞게 타입 지정
        const { positiveRatio, negativeRatio, neutralRatio } =
          data.currentMonthStatistics;

        if (
          typeof positiveRatio === 'number' &&
          typeof negativeRatio === 'number' &&
          typeof neutralRatio === 'number'
        ) {
          setRatioList([
            positiveRatio.toFixed(2),
            negativeRatio.toFixed(2),
            neutralRatio.toFixed(2),
          ]);
        } else {
          console.error('Invalid data types for ratios');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    responseInterceptor();
    // console.log('인터셉터 실행!!!');

    getData();
    // console.log('getData 실행!!!!');
  }, []);

  return (
    <div className="profile-ratio">
      <div className="profile-ratioLegendWrap">
        {ratioList.map((el, index) => {
          let path;
          switch (index) {
            case 0:
              path = '/statistics/positive.svg';
              break;
            case 1:
              path = '/statistics/negative.svg';
              break;
            case 2:
              path = '/statistics/neutral.svg';
              break;
          }

          return (
            <div key={index} className="profile-ratioLegend">
              {path && (
                <div className="profile-ratioImgWrap">
                  <Image
                    src={path}
                    alt="emotion legend"
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw"
                  />
                </div>
              )}
              <p>{el}%</p>
            </div>
          );
        })}
      </div>
      <div className="profile-ratioChart">
        <Pie options={pieOptions} data={ratioData} />
      </div>
      <div className="profile-ratioText">
        <p>mood</p>
        <p>ratio</p>
      </div>
      <span>monthly</span>
    </div>
  );
}
