'use client';
import Image from 'next/image';
import '@/styles/sigh/result.scss';
import { useEffect, useState } from 'react';
import resultDoodle from '/public/sigh/result_doodle_1.png';
import Link from 'next/link';
import { sighResultType } from '@/types';

export default function SighResultPage({
  sighResult,
}: {
  sighResult: sighResultType;
}) {
  // 임시데이터
  // const sighResult: resultType = {
  //   painting:
  //     'https://mblogthumb-phinf.pstatic.net/MjAxODAxMThfNzEg/MDAxNTE2MjQ5ODE4MjEy.iLPbjW9BLeAjkI1ppclbNdn5kwzTW585Abkz7Qte7c4g.LntCl6JMg0i88zWyCUpQ_bTtcvQuitpFLL29CXgUl0sg.JPEG.qe4865/23.jpg?type=w800',
  //   meme: 'https://media1.jjalkey.com/media/1536141519140-6143a3e3c9.gif',
  //   sentiment: 'negative',
  //   confidence: {
  //     negative: 97.326324,
  //     positive: 0.29289702,
  //     neutral: 2.3807814,
  //   },
  // };

  //   {
  //     "id": 9,
  //     "userId": "d1426c08-75ad-4957-8739-80a2ad60eeb6",
  //     "pictureDiary": "https://example-bucket-seeun.s3.ap-northeast-2.amazonaws.com/3cba1799-3572-49e9-9f59-18cef2a8f9b8.jpeg",
  //     "recommendedGif": "https://media1.jjalkey.com/link/1606606281599-e14c8a2348.jpg",
  //     "sentiment": "neutral",
  //     "positiveRatio": 0.43071458,
  //     "negativeRatio": 0.14317966,
  //     "neutralRatio": 99.42611,
  //     "date": "2023-12-21"
  // }

  const [negativeData, setNegativeData] = useState<number>(0);
  const [positiveData, setPositiveData] = useState<number>(0);
  const [neutralData, setNeutralData] = useState<number>(0);

  useEffect(() => {
    if (sighResult) {
      const roundToInteger = (value: number) => Math.round(value);
      setNegativeData(roundToInteger(sighResult.positiveRatio));
      setPositiveData(roundToInteger(sighResult.negativeRatio));
      setNeutralData(roundToInteger(sighResult.neutralRatio));
    }
    console.log(sighResult);
  }, [sighResult]);

  return (
    <div className="result-container">
      <main className="result-mainContainer">
        <section className="result-section result-paint">
          <h3>TODAY'S AH-WHEW</h3>
          {sighResult.pictureDiary && (
            <img
              src={sighResult.pictureDiary}
              alt="그림일기"
              className="result-painting"
            />
          )}
        </section>
        <section className="result-section result-meme">
          <h3>MAYBE... YOU NEED THIS GIF</h3>
          <img
            src={sighResult.recommendedGif}
            alt="짤"
            className="result-memeImg"
          />
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
