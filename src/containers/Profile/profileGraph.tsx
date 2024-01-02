'use client';

// PGraph.js
import { Line } from 'react-chartjs-2';
import { lineOptions } from '@/utils/chartOptions'; // 공통 옵션 가져오기
import { ProfileCalendarType } from '@/types';
import { useEffect, useState } from 'react';

interface Props {
  emoData: ProfileCalendarType | null;
}

export default function PGraph({ emoData }: Props) {
  const [data1, setData1] = useState<number[]>([]);
  const [data2, setData2] = useState<number[]>([]);
  const [data3, setData3] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  console.log('그래프 데이터 :: ', emoData);

  // 날짜 리스트 설정 및 각 데이터 설정
  useEffect(() => {
    const today = Date.now();
    const dayList: string[] = [];

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(today - i * 1000 * 60 * 60 * 24);
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const day = String(newDate.getDate()).padStart(2, '0');
      const newString = `${year}-${month}-${day}`;
      dayList.push(newString);
    }

    setLabels(dayList.reverse());

    const newData1: number[] = [];
    const newData2: number[] = [];
    const newData3: number[] = [];

    dayList.forEach((newString) => {
      const emoItem = emoData?.calendar.find((el) => el.date === newString);

      if (emoItem) {
        newData1.push(emoItem.result.positiveRatio);
        newData2.push(emoItem.result.negativeRatio);
        newData3.push(emoItem.result.neutralRatio);
      } else {
        newData1.push(0);
        newData2.push(0);
        newData3.push(0);
      }
    });

    setData1(newData1);
    setData2(newData2);
    setData3(newData3);
  }, [emoData]);

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Positive',
        fill: 'start',
        data: data1,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
      },
      {
        label: 'Negative',
        fill: 'start',
        data: data2,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
      },
      {
        label: 'Neutral',
        fill: 'start',
        data: data3,
        borderColor: 'rgb(255, 205, 86)',
        backgroundColor: 'rgba(255, 205, 86, 0.1)',
      },
    ],
  };

  return (
    <div className="profile-graph">
      <div className="profile-graphChart">
        {/* Line 컴포넌트를 주석 해제하고 data prop에 실제 데이터를 전달 */}
        <Line options={lineOptions} data={lineData} />
      </div>
      <div className="profile-graphText">
        <p>MOOD</p>
        <p>GRAPH</p>
      </div>
      <span>WEEKLY</span>
    </div>
  );
}
