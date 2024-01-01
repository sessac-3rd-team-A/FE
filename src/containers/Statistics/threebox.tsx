'use client';
import React, { useState, useEffect } from 'react';
import '../../styles/statistics/threebox.scss';
import TrendLineChart from './trendLineChart';

import TrendLineChartCategory from './trendLineChartCategory';
import MemeComponent from './memeComponent';

type StatisticsData = {
  date: string;
  averagePositive: number;
  averageNegative: number;
  averageNeutral: number;
  count: number;
}[];

export default function ThreeBox({
  statisticsInfo,
}: {
  statisticsInfo: StatisticsData;
}) {
  // 현재 선택된 메뉴이름 상태관리
  const [selectedMenu, setSelectedMenu] = useState<string>('menu1');

  // 메뉴 변경 시 실행되는 함수를 정의
  const handleMenuChange = (menuId: string) => {
    setSelectedMenu(menuId);
  };
  // 각 메뉴에 해당하는 텍스트를 배열로 정의
  const labeLText: string[] = ['ALL', 'GROUP', 'MEME'];
  return (
    <>
      <div className="three-box-wrap">
        {/* 세 번 반복하여 각 메뉴의 구조 생성 */}
        {Array.from({ length: 3 }, (_, index) => {
          // 반복도는 메뉴이름 생성
          const menuId = `menu${index + 1}`;
          // 각 메뉴에 해당하는 컴포넌트들을 배열로 정의
          const componentsToRender = [
            <TrendLineChart
              key="trendLineChart"
              statisticsInfo={statisticsInfo}
            />,
            <TrendLineChartCategory key="trendLineChart" />,
            <MemeComponent key="memeComponent" />,
          ];

          return (
            // 반복 요소를 감싸는 Fragment
            <React.Fragment key={menuId}>
              {/* 라디오 버튼으로 메뉴를 선택할 수 있도록 설정 */}
              <input
                type="radio"
                name="navigation"
                id={menuId}
                className="three-box-button"
                checked={selectedMenu === menuId}
                onChange={() => handleMenuChange(menuId)}
              />
              {/* 이미 선택된 메뉴가 아닌 다른 메뉴를 클릭 할 때만 렌더링 */}
              {menuId !== selectedMenu && (
                <label
                  htmlFor={menuId}
                  //메뉴마다 다른 스타일을 적용하기위해
                  //인덱스에 기반하여 three-box-label 뒤에 알파벳 순서의 문자를 생성
                  className={`three-box-label ${String.fromCharCode(
                    97 + index,
                  )}`}
                >
                  <span className="three-box-rotate">
                    <p>{`${labeLText[index]}`}</p>
                    <div className="label-circle">
                      <br></br>
                      {`0${index + 1}`}
                    </div>
                  </span>
                </label>
              )}
              <div className="three-box-contents">
                <div className={`three-box-inner`}>
                  {/* 해당 메뉴에 대응하는 컴포넌트를 렌더링. */}
                  {componentsToRender[index]}
                </div>
                <div className="three-box-description">
                  {/* 메뉴에 해당하는 텍스트를 출력 */}
                  <div className="label-message">{`${labeLText[index]}`}</div>
                  {/*숫자와 함께 원 표시*/}
                  <div className="label-circle">
                    <br></br>
                    {`0${index + 1}`}
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div></div>
    </>
  );
}
