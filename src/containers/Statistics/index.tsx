import '../../styles/statistics/chart.scss';
import Semo from '@/containers/Statistics/semo';

import 'animate.css';

import Image from 'next/image';
import trendText from '../../../public/statistics/trendText.svg';
import ThreeBox from '@/containers/Statistics/threebox';

export default function StatisticsPage() {
  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/api/statistics/meme', {
      cache: 'no-store',
    });
    const info = await response.json();
    console.log(info);
  };

  fetchData();

  let str: string = '트렌드';
  let arr;
  return (
    <div className="trend-container">
      <div className="chart-title, animate__animated animate__bounce">
        <Image src={trendText} alt="Picture of me" className="chart-text" />
      </div>

      <ThreeBox />
      {/* <Semo></Semo> */}
    </div>
  );
}
