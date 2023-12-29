'use client';
import React, { useState, useEffect } from 'react';
import '../../styles/statistics/threebox.scss';
import TrendLineChart from './trendLineChart';

import TrendLineChartCategory from './trendLineChartCategory';
import MemeComponent from './memeComponent';

export default function ThreeBox(
  { statisticsInfo }: any,
  // { gender }: { gender: string | null },
  // { age }: { age: string | null },
) {
  const [selectedMenu, setSelectedMenu] = useState<string>('menu1'); // 현재 선택된 메뉴이름

  const handleMenuChange = (menuId: string) => {
    setSelectedMenu(menuId);
  };


  const labeLText: string[] = ['ALL', 'GROUP', 'MEME'];
  return (
    <>
      <div className="three-box-wrap">
        {/* Repeat the structure for each menu */}
        {Array.from({ length: 3 }, (_, index) => {
          const menuId = `menu${index + 1}`; // 반복도는 메뉴이름
          const componentsToRender = [
            <TrendLineChart
              key="trendLineChart"
              statisticsInfo={statisticsInfo}
            />,
            <TrendLineChartCategory key="trendLineChart" />,
            <MemeComponent key="memeComponent" />,
          ];

          return (
            <React.Fragment key={menuId}>
              <input
                type="radio"
                name="navigation"
                id={menuId}
                className="three-box-button"
                checked={selectedMenu === menuId}
                onChange={() => handleMenuChange(menuId)} //임시 주석처리
              />
              {menuId !== selectedMenu && (
                <label
                  htmlFor={menuId}
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
                <div className="three-box-inner">
                  {componentsToRender[index]}
                </div>
                <div className="three-box-description">
                  <div className="label-message">{`${labeLText[index]}`}</div>

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
