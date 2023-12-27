// 'use client';

// PGraph.js
import { Line } from 'react-chartjs-2';
import { lineOptions } from '@/utils/chartOptions'; // 공통 옵션 가져오기
import { ProfileResultType } from '@/types';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';

interface Props {
  emoData: ProfileResultType | null;
}

export default function PGraph({ emoData }: Props) {
  useEffect(() => {
    console.log('graph component emoData ::: ', emoData);
  }, [emoData]);

  const [dataList, setDataList] = useState([]);

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

  const labels = dayList.reverse();

  // 실제 데이터가 없으므로 임의의 데이터를 생성하는 부분을 주석 처리하였습니다.
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        fill: 'start',
        data: labels.map(() => faker.number.int({ min: 0, max: 100 })),
        borderColor: 'rgb(255, 229, 99)',
        backgroundColor: 'rgba(255, 211, 99, 0.1)',
      },
    ],
  };

  useEffect(() => {
    console.log(today, dayList, labels, data);
  }, []);

  return (
    <div className="profile-graph">
      <div className="graph">
        {/* Line 컴포넌트를 주석 해제하고 data prop에 실제 데이터를 전달 */}
        <Line options={lineOptions} data={data} />
      </div>
      <div className="graphText">
        <p>MOOD</p>
        <p>GRAPH</p>
      </div>
      <span>WEEKLY</span>
    </div>
  );
}
