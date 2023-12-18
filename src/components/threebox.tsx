'use client';
import React, { useState } from 'react';
import '../styles/threeBox.scss';
import { Chart } from 'chart.js';
const ThreeBox: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('menu6');

  const handleMenuChange = (menuId: string) => {
    setSelectedMenu(menuId);
  };

  return (
    <div className="threeBoxWrap">
      {/* Repeat the structure for each menu */}
      {Array.from({ length: 3 }, (_, index) => {
        const menuId = `menu${index + 1}`;

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
              <div className="threeBoxInner">
                <div className="threeBoxDescription">
                  <h3>{`TITLE ${3 - index}`}</h3>
                </div>
              </div>
            </div>
            <label
              htmlFor={menuId}
              className={`threeBoxLabel ${String.fromCharCode(97 + index)}`}
            >
              <span className="threeBoxRotate">
                <p>{`MENU ${3 - index}`}</p>
              </span>
            </label>
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
        onChange={() => handleMenuChange('menu6')}
      /> */}
    </div>
  );
};

export default ThreeBox;
