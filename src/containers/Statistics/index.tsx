import '../../styles/statistics/chart.scss';
import Semo from '@/containers/Statistics/semo';

import 'animate.css';

import Image from 'next/image';
import trendText from '../../../public/statistics/trendText.svg';
import ThreeBox from '@/containers/Statistics/threebox';
// import { StatisticsTypeArray } from '@/types';

export default async function StatisticsPage() {
  // const selectedGender: string = 'F';
  // const selectedAge: string = '20대';
  let statisticsInfo: any;
  // let statisticsCategoryInfo: any;
  // let memeImgInfo: any;
  // const gender = (gen: string) => {
  //   gen;
  // };
  // const age = (ag: string) => {
  //   age;
  // };

  // let url = `${process.env.NEXT_PUBLIC_API_SERVER}/api/statistics/meme`;
  // if (gender && age) {
  //   url += `?gender=${gender}&age=${age}`;
  // } else if (gender) {
  //   url += `?gender=${gender}`;
  // } else if (age) {
  //   url += `?age=${age}`;
  // }

  //잘못했던 방법
  // const fetchMemeImg = async () => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_SERVER}/api/statistics/meme`,
  //     {
  //       cache: 'no-store',
  //     },
  //   );
  //   memeImgInfo = await response.json();
  // };

  // fetchMemeImg();

  const statisticsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/api/statistics`,
    {
      cache: 'no-store',
    },
  );
  statisticsInfo = await statisticsResponse.json();

  // const statisticsCategoryResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_SERVER}/api/statistics?gender=${selectedGender}&age=${selectedAge}`,
  //   {
  //     cache: 'no-store',
  //   },
  // );
  // statisticsCategoryInfo = await statisticsCategoryResponse.json();

  // const memeImgInfoResponse = await fetch(
  //   url, {
  //   cache: 'no-store',
  // });
  // memeImgInfo = await memeImgInfoResponse.json();

  return (
    <div className="trend-container">
      <div className="chart-title">
        <Image src={trendText} alt="Picture of me" className="chart-text" />
      </div>
      <ThreeBox
        statisticsInfo={statisticsInfo}
        // statisticsCategoryInfo={statisticsCategoryInfo}
        // memeImgInfo={memeImgInfo}
        // gender={gender}
        // age={age}
      />
      <div className=" animate__animated animate__shakeY animate__infinite">
        <Semo />
      </div>
    </div>
  );
}
