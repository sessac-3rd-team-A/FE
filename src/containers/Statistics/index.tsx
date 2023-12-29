import '../../styles/statistics/chart.scss';
import Semo from '@/containers/Statistics/semo';

import 'animate.css';

import Image from 'next/image';
import trendText from '../../../public/statistics/trendText.svg';
import ThreeBox from '@/containers/Statistics/threebox';
// import { StatisticsTypeArray } from '@/types';

export default async function StatisticsPage() {
  let statisticsInfo: any;

  const statisticsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/api/statistics`,
    {
      cache: 'no-store',
    },
  );
  statisticsInfo = await statisticsResponse.json();


  return (
    <div className="trend-container">
      <div className="chart-title">
        <Image src={trendText} alt="Picture of me" className="chart-text" />
      </div>
      <ThreeBox statisticsInfo={statisticsInfo} />
      <div className=" animate__animated animate__shakeY animate__infinite">
        <Semo />
      </div>
    </div>
  );
}
