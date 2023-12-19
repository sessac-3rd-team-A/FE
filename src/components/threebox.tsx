'use client';
import React, { useState, useEffect } from 'react';
import '../styles/trend/threeBox.scss';
import TrendLineChart from './trendLineChart';

const ThreeBox: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('menu6'); // 현재 선택된 메뉴이름

  const handleMenuChange = (menuId: string) => {
    setSelectedMenu(menuId);
  };

  useEffect(() => {
    console.log(selectedMenu);
  }, [selectedMenu]);

  const labeLText: string[] = ['MAIN', 'GROUP', 'MEME'];

  return (
    <div className="threeBoxWrap">
      {/* Repeat the structure for each menu */}
      {Array.from({ length: 3 }, (_, index) => {
        const menuId = `menu${index + 1}`; // 반복도는 메뉴이름

        return (
          <React.Fragment key={menuId}>
            <input
              type="radio"
              name="navigation"
              id={menuId}
              className="threeBoxButton"
              checked={selectedMenu === menuId}
              onChange={() => handleMenuChange(menuId)}
            />
            <div className="threeBoxContents">
              <div className="threeBoxInner"></div>
              <span className="threeBoxDescription">
                <p>{`${labeLText[index]}`}</p>
                {/* <h3>{`TITLE ${3 - index}`}</h3> */}
                <div className="labelCircle">
                  <br></br>
                  {`0${index + 1}`}
                </div>
              </span>
            </div>
            {menuId !== selectedMenu && (
              <label
                htmlFor={menuId}
                className={`threeBoxLabel ${String.fromCharCode(97 + index)}`}
              >
                <span className="threeBoxRotate">
                  <p>{`${labeLText[index]}`}</p>
                  <div className="labelCircle">
                    <br></br>
                    {`0${index + 1}`}
                  </div>
                </span>
              </label>
            )}
          </React.Fragment>
        );
      })}

      {/* Close button */}
      {/* <input
        type="radio"
        name="navigation"
        id="menu6"
        className="threeBox button close"
        checked={selectedMenu === 'menu6'}
        onChange={() => handleMenuChange
          ('menu6')}
      /> */}
    </div>
  );
};

export default ThreeBox;
