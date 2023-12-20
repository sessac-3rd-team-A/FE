'use client';
import Image from 'next/image';
import '@/styles/sigh/result.scss';
import { useEffect, useState } from 'react';
import resultDoodle from '/public/sigh/result_doodle_1.png';

export default function SighResultPage() {
  type resultType = {
    painting: string;
    meme: string;
    sentiment: string;
    confidence: {
      negative: number;
      positive: number;
      neutral: number;
    };
  };

  const sighResult: resultType = {
    painting:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAxMThfNzEg/MDAxNTE2MjQ5ODE4MjEy.iLPbjW9BLeAjkI1ppclbNdn5kwzTW585Abkz7Qte7c4g.LntCl6JMg0i88zWyCUpQ_bTtcvQuitpFLL29CXgUl0sg.JPEG.qe4865/23.jpg?type=w800',
    meme: 'https://media1.jjalkey.com/media/1536141519140-6143a3e3c9.gif',
    sentiment: 'negative',
    confidence: {
      negative: 97.326324,
      positive: 0.29289702,
      neutral: 2.3807814,
    },
  };

  const [negativeData, setNegativeData] = useState<number>();
  const [positiveData, setPositiveData] = useState<number>();
  const [neutralData, setNeutralData] = useState<number>();

  useEffect(() => {
    if (sighResult.confidence) {
      const roundToInteger = (value: number) => Math.round(value);
      setNegativeData(roundToInteger(sighResult.confidence.negative));
      setPositiveData(roundToInteger(sighResult.confidence.positive));
      setNeutralData(roundToInteger(sighResult.confidence.neutral));
    }
  }, [sighResult.confidence]);

  return (
    <div className="resultContainer">
      <main className="resultMainContainer">
        <section className="resultSection resultPaint">
          <h3>TODAY'S AH-WHEW</h3>
          <img
            src={sighResult.painting}
            alt="그림일기"
            className="sighPainting"
          />
        </section>
        <section className="resultSection resultMeme">
          <h3>MAYBE... YOU NEED THIS GIF</h3>
          <img src={sighResult.meme} alt="짤" className="sighMeme" />
        </section>
        <section className="resultSection resultSentiment">
          <h3>SENTIMENT</h3>
          <article className="resultSentimentArticle">
            <div className="resultSentimentLabel">
              <label>Negative</label>
              <label>Positive</label>
              <label>Neutral</label>
            </div>
            <div className="resultSentimentChart">
              <div className="resultSentimentData resultNegativeData">
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
              <div className="resultSentimentData resultPositiveData">
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
              <div className="resultSentimentData resultNeutralData">
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
        <section className="resultBtns">
          <button>RESTART</button>
          <button>SAVE</button>
        </section>
      </main>
      <div className="resultBgText">
        <p>AH-</p>
        <p>WHEW!</p>
      </div>
      <Image src={resultDoodle} alt="doodle" className="resultDoodle" />
    </div>
  );
}
