'use client';
import Image from 'next/image';
import '@/styles/sigh/result.scss';
import { useEffect, useState } from 'react';
import resultDoodle from '/public/sigh/result_doodle_1.png';
import Link from 'next/link';
import { sighResultType } from '@/types';
import { usePathname, useSearchParams } from 'next/navigation';

export default function SighResultPage() {
  // useState를 사용하여 상태를 관리
  const [sighResult, setSighResult] = useState<sighResultType | null>(null);
  const [negativeData, setNegativeData] = useState<number>(0);
  const [positiveData, setPositiveData] = useState<number>(0);
  const [neutralData, setNeutralData] = useState<number>(0);
  const pathname = usePathname();
  console.log(pathname);

  useEffect(() => {
    // 로컬 스토리지에서 데이터를 검색
    const storedData = localStorage.getItem('sighResult');
    if (storedData) {
      setSighResult(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (sighResult) {
      const roundToInteger = (value: number) => Math.round(value);
      setNegativeData(roundToInteger(sighResult.negativeRatio));
      setPositiveData(roundToInteger(sighResult.positiveRatio));
      setNeutralData(roundToInteger(sighResult.neutralRatio));
    }
  }, [sighResult]);

  return (
    <div className="result-container">
      <main className="result-mainContainer">
        <section className="result-section result-paint">
          <h3>TODAY'S AH-WHEW</h3>
          {sighResult && sighResult.pictureDiary && (
            <img
              src={sighResult.pictureDiary}
              alt="그림일기"
              className="result-painting"
            />
          )}
        </section>

        <section className="result-section result-meme">
          <h3>MAYBE... YOU NEED THIS GIF</h3>
          {sighResult && sighResult.recommendedGif && (
            <img
              src={sighResult.recommendedGif}
              alt="짤"
              className="result-memeImg"
            />
          )}
        </section>
        <section className="result-section result-sentiment">
          <h3>SENTIMENT</h3>
          <article className="result-sentimentArticle">
            <div className="result-sentimentLabel">
              <label>Negative</label>
              <label>Positive</label>
              <label>Neutral</label>
            </div>
            <div className="result-sentimentChart">
              <div className="result-sentimentData result-negativeData">
                <div
                  style={{
                    width: `${negativeData}%`,
                  }}
                />
                <img
                  src="/sigh/negative.svg"
                  alt="😢"
                  style={{
                    left:
                      negativeData >= 0 && negativeData < 3 ? '-1.5%' : '-3%',
                  }}
                />
              </div>
              <div className="result-sentimentData result-positiveData">
                <div
                  style={{
                    width: `${positiveData}%`,
                  }}
                />
                <img
                  src="/sigh/positive.svg"
                  alt="😄"
                  style={{
                    left:
                      positiveData >= 0 && positiveData < 3 ? '-1.5%' : '-3%',
                  }}
                />
              </div>
              <div className="result-sentimentData result-neutralData">
                <div
                  style={{
                    width: `${neutralData}%`,
                  }}
                />
                <img
                  src="/sigh/neutral.svg"
                  alt="😐"
                  style={{
                    left: neutralData >= 0 && neutralData < 3 ? '-1.5%' : '-3%',
                  }}
                />
              </div>
            </div>
          </article>
        </section>
        <section className="result-btns">
          <Link href={'/sigh'}>
            <button>RESTART</button>
          </Link>
          <button>SAVE</button>
        </section>
      </main>
      <div className="result-bgText">
        <p>AH-</p>
        <p>WHEW!</p>
      </div>
      <Image src={resultDoodle} alt="doodle" className="result-doodle" />
    </div>
  );
}
