// 'use client';
import '@/styles/main.scss';
import { useEffect, useRef } from 'react';

export default function Main2({ section }: any) {
  return (
    <div className={`mainCardContainer ${section}`}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p className="main2-intro">{'TELL ME HOW WAS\nYOUR DAY?'}</p>
        <p className="main2-intro2">
          {
            '당신의 하루는 어땠나요?\n혹시 고민하는 일이 잘 안풀리나요?\n당신이 느끼는 모든 감정을 아휴에 풀어주세요.'
          }
        </p>
        <button className="main2-start">START</button>
      </div>
      <div className="main2-cardContainer">
        <div className="main2-card card1"></div>
        <div className="main2-card card2"></div>
        <div className="main2-card card3"></div>
      </div>
    </div>
  );
}
