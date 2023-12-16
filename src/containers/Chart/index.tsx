import MyLineChart from '@/component/trendLineChart';
import '../../styles/chart.scss';
import Semo from '@/component/semo';

import 'animate.css';

import Image from 'next/image';
import trendText from '../../public/trendText.svg';
import ThreeBox from '@/component/threebox';

export default function ChartPage() {
  let str: string = '이재욱';
  let arr;
  return (
    <>
      <h2 className="ChartTitle"> 이 페이지는 차트입니다{str}.</h2>
      {/* <div className="ChartTitle, animate__animated animate__bounce">
        <Image src={trendText} alt="Picture of me" />
      </div> */}

      {/* <MyLineChart></MyLineChart> */}

      {/* <Semo></Semo> */}

      <ThreeBox></ThreeBox>
    </>
  );
}
