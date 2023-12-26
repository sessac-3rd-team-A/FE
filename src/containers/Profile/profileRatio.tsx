import { Pie } from 'react-chartjs-2';
import { pieOptions } from '@/utils/chartOptions';
import { httpRequest } from '@/utils/httpRequest';

export const ratioData = {
  labels: ['Positive', 'Negative', 'Neutral'],
  datasets: [
    {
      label: ' 감정 지수',
      data: [],
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

async function getData() {
  // // 예시 success 콜백 함수
  // function handleSuccess(data: any) {
  //   console.log('HTTP 요청이 성공했습니다. 받은 데이터:', data);
  //   // 성공했을 때 추가적으로 처리해야 하는 로직을 여기에 추가
  // }

  // // 예시 fail 콜백 함수
  // function handleFail() {
  //   console.error('HTTP 요청이 실패했습니다.');
  //   // 실패했을 때 추가적으로 처리해야 하는 로직을 여기에 추가
  // }

  // 예시: GET 요청을 보내는 경우
  // return httpRequest(
  //   'GET',
  //   `${process.env.NEXT_PUBLIC_API_SERVER}/profile/dashboard/ratio`,
  //   null,
  // );
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/profile/dashboard/ratio`,
    {
      method: 'GET',
      credentials: 'include',
    },
  );
  // const data = await res.json();
  return res;
}

export default async function PRatio() {
  const data = await httpRequest(
    'get',
    `${process.env.NEXT_PUBLIC_API_SERVER}/profile/dashboard/ratio`,
    null,
  );
  console.log('데이터 :::: ', data);
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
