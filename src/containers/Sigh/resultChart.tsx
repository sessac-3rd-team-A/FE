'use client';

import { useEffect, useState } from 'react';
import { SighResultType } from '@/types';

interface ResultChartProps {
  sighResult: SighResultType;
}

export default async function ResultChart({ sighResult }: ResultChartProps) {
  const [negativeData, setNegativeData] = useState<number>(0);
  const [positiveData, setPositiveData] = useState<number>(0);
  const [neutralData, setNeutralData] = useState<number>(0);

  useEffect(() => {
    if (sighResult) {
      const roundToInteger = (value: number) => Math.round(value);
      setNegativeData(roundToInteger(sighResult.negativeRatio));
      setPositiveData(roundToInteger(sighResult.positiveRatio));
      setNeutralData(roundToInteger(sighResult.neutralRatio));
    }
  }, [sighResult]);
  return (
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
              left: negativeData >= 0 && negativeData < 3 ? '-1.5%' : '-3%',
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
              left: positiveData >= 0 && positiveData < 3 ? '-1.5%' : '-3%',
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
  );
}
