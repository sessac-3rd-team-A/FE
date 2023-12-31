import { useEffect, useState } from 'react';
import '../../styles/statistics/memeComponentImg.scss';
import Image from 'next/image';
interface MemeComponentProps {
  gender: string | null;
  age: string | null;
}
const imageStyle = {
  width: 'toSizeM(643)',
  height: 'toSizeM(363)',
};

// API 요청 URL 생성 함수
const createURL = (gender: string | null, age: string | null): string => {
  let url: string = `${process.env.NEXT_PUBLIC_API_SERVER}/api/statistics/meme`;
  if (gender && age) {
    url += `?gender=${gender}&age=${age}`;
  } else if (gender) {
    url += `?gender=${gender}`;
  } else if (age) {
    url += `?age=${age}`;
  }
  return url;
};

export default function MemeComponentImg({ gender, age }: MemeComponentProps) {
  const url = createURL(gender, age);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, [url]);

  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  useEffect(() => {
    if (data && data.ranking && data.ranking.length > 0) {
      setSelectedRank(data.ranking[0].rank);
    }
  }, [data]);

  const handleClick = (rank: number) => {
    setSelectedRank(rank);
  };

  if (loading) return <div>로딩중...</div>;
  if (!data || !data.success)
    return (
      <div className="meme-left-container">
        <div className="meme-picture-container meme-default-container">
          <Image
            width={400}
            height={400}
            style={imageStyle}
            className="meme-picture"
            src="/statistics/sorry.png" // 기본 이미지 URL
            alt="default meme"
          />
        </div>
        <div className="meme-picture-message">SORRY, NO DATA</div>
      </div>
    );

  return (
    <div className="meme-left-container">
      <div className="meme-picture-container">
        {data.ranking
          .filter((meme: any) => meme.rank === selectedRank)
          .map((meme: any) => (
            <Image
              fill
              sizes="null"
              className="meme-picture"
              key={meme.rank}
              src={meme.imageUrl}
              alt={`meme ${meme.rank}`}
            />
          ))}
      </div>
      <div className="meme-picture-button">
        {data.ranking.map((meme: any, index: any) => (
          <span key={index}>
            <button
              onClick={() => handleClick(meme.rank)}
              className={`meme-rank-button ${
                selectedRank === meme.rank ? 'selected' : ''
              }`}
            >
              #{index + 1}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
