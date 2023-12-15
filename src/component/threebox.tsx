'use client';
import React, { useState } from 'react';
import '../styles/threebox.scss';
const threeBox: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string>('menu6');

  const handleMenuChange = (menuId: string) => {
    setSelectedMenu(menuId);
  };

  return (
    <div className="wrap">
      {/* Repeat the structure for each menu */}
      {Array.from({ length: 3 }, (_, index) => {
        const menuId = `menu${index + 1}`;

        return (
          <React.Fragment key={menuId}>
            <input
              type="radio"
              name="navigation"
              id={menuId}
              className="button"
              checked={selectedMenu === menuId}
              onChange={() => handleMenuChange(menuId)}
            />
            <div className="contents">
              <div className="inner">
                <div className="description">
                  <h3>{`TITLE ${3 - index}`}</h3>
                  <p>다람쥐 헌 챗바퀴에 타고파. 다람쥐 헌 챗바퀴에 타고파.</p>
                </div>
              </div>
            </div>
            <label
              htmlFor={menuId}
              className={`label ${String.fromCharCode(97 + index)}`}
            >
              <span className="rotate">
                <p>{`MENU ${3 - index}`}</p>
              </span>
            </label>
          </React.Fragment>
        );
      })}

      {/* Close button */}
      <input
        type="radio"
        name="navigation"
        id="menu6"
        className="button close"
        checked={selectedMenu === 'menu6'}
        onChange={() => handleMenuChange('menu6')}
      />
    </div>
  );
};

export default threeBox;
