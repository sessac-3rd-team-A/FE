import MyLineChart from '@/components/trendLineChart';
import '../../styles/trend/chart.scss';
import Semo from '@/components/semo';

import 'animate.css';

import Image from 'next/image';
import trendText from '../../../public/trend/trendText.svg';
import ThreeBox from '@/components/threebox';

export default function TrendPage() {
  let str: string = '트렌드';
  let arr;
  return (
    <>
      <h2 className="ChartTitle"> 이 페이지는 {str}페이지 입니다.</h2>
      <div className="ChartTitle, animate__animated animate__bounce">
        <Image src={trendText} alt="Picture of me" />
      </div>

      {/* <Semo></Semo> */}

      <ThreeBox></ThreeBox>
    </>
  );
}
