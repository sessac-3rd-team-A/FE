import { useEffect, useState } from 'react';
import { SighResultType } from '@/types';

interface ResultChartProps {
  sighResult: SighResultType;
}

export default function ResultChart({ sighResult }: ResultChartProps) {
  const [negativeData, setNegativeData] = useState<number>(0);
  const [positiveData, setPositiveData] = useState<number>(0);
  const [neutralData, setNeutralData] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowDimensions = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const leftStyle = (dataValue: number) => {
    if (windowWidth <= 1080) {
      return { left: dataValue >= 0 && dataValue < 3 ? '-1%' : '-2%' };
    }
    return {
      left: dataValue >= 0 && dataValue < 3 ? '-1.5%' : '-3%',
    };
  };

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
            style={leftStyle(negativeData)}
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
            style={leftStyle(negativeData)}
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
            style={leftStyle(negativeData)}
          />
        </div>
      </div>
    </article>
  );
}
