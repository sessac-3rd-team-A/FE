'use client';
import React, { useEffect } from 'react';
import cx from 'clsx';
import '../styles/signIn/movingEye.scss';

const MovingEye = ({ cName, eRef, cord, setCord }: any) => {
  // const originRef = useRef<HTMLDivElement>(null);
  // const [cord, setCord] = useRafState({
  //   top: false,
  //   right: false,
  //   bottom: false,
  //   left: false,
  // });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent): void => {
      if (!eRef.current) return;

      const { x: x1, y: y1 } = e;
      const { x: x2, y: y2 } = eRef?.current?.getBoundingClientRect();

      let rad = Math.atan2(y2 - y1, x2 - x1);
      if (rad < 0) rad += Math.PI * 2;
      rad = (rad * 180) / Math.PI;

      if (rad < 22.5) {
        // L
        setCord({
          top: false,
          right: false,
          bottom: false,
          left: true,
        });
      } else if (rad < 67.5) {
        // TL
        setCord({
          top: true,
          right: false,
          bottom: false,
          left: true,
        });
      } else if (rad < 112.5) {
        // T
        setCord({
          top: true,
          right: false,
          bottom: false,
          left: false,
        });
      } else if (rad < 157.5) {
        // TR
        setCord({
          top: true,
          right: true,
          bottom: false,
          left: false,
        });
      } else if (rad < 202.5) {
        // R
        setCord({
          top: false,
          right: true,
          bottom: false,
          left: false,
        });
      } else if (rad < 247.5) {
        // BR
        setCord({
          top: false,
          right: true,
          bottom: true,
          left: false,
        });
      } else if (rad < 292.5) {
        // B
        setCord({
          top: false,
          right: false,
          bottom: true,
          left: false,
        });
      } else if (rad < 337.5) {
        // BL
        setCord({
          top: false,
          right: false,
          bottom: true,
          left: true,
        });
      } else if (rad < 360) {
        // L
        setCord({
          top: false,
          right: false,
          bottom: false,
          left: true,
        });
      }
    };
    if (eRef) {
      window.addEventListener('mousemove', onMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  });
  return (
    <div className={`fancyEyeBall ${cName}`} ref={eRef || null}>
      <div className="eyeTemplate" />
      <div
        className={cx('eyeBall', {
          ['top']: cord.top,
          ['bottom']: cord.bottom,
          ['left']: cord.left,
          ['right']: cord.right,
        })}
      />
    </div>
  );
};
export default MovingEye;
