import { useEffect, useState } from 'react';
import useFetch from './memeFetch';
import '../../styles/statistics/memeComponentImg.scss';

interface MemeComponentProps {
  gender: string | null;
  age: string | null;
}

const MemeComponentImg: React.FC<MemeComponentProps> = ({ gender, age }) => {
  let url = 'http://localhost:8080/api/statistics/meme';
  if (gender && age) {
    url += `?gender=${gender}&age=${age}`;
  } else if (gender) {
    url += `?gender=${gender}`;
  } else if (age) {
    url += `?age=${age}`;
  }
  const [data, loading] = useFetch(url);
  const [selectedRank, setSelectedRank] = useState<number | null>(null);

  useEffect(() => {
    if (data && data.ranking && data.ranking.length > 0) {
      setSelectedRank(data.ranking[0].rank);
    }
  }, [data]);

  if (loading) return <div>로딩중...</div>;
  if (!data || !data.success)
    return (
      // <div>데이터가 없습니다</div>
      // <div style={{ width: '85%', display: 'flex' }}>
      //   데이터가 없습니다.
      //   <div className="meme-picture-container">
      //     <img
      //       className="meme-picture"
      //       src={
      //         'https://media1.jjalkey.com/media/1545404456423-feb7500233.png'
      //       }
      //     />
      //   </div>
      // </div>
      <div className="meme-left-container">
        {/* <div className="meme-picture-container">
          <img
            className="meme-picture"
            src={'/statistics/nothing.png'} // 기본 이미지 URL
            alt="default meme"
          />
        </div> */}
        <div className="meme-picture-message">데이터가 없습니다</div>
      </div>
    );

  const handleClick = (rank: number) => {
    setSelectedRank(rank);
  };

  return (
    <div className="meme-left-container">
      <div className="meme-picture-container">
        {data.ranking
          .filter((meme) => meme.rank === selectedRank)
          .map((meme) => (
            <img
              className="meme-picture"
              key={meme.rank}
              src={meme.imageUrl}
              alt={`meme ${meme.rank}`}
            />
          ))}
      </div>
      <div>
        {data.ranking.map((meme, index) => (
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
};

export default MemeComponentImg;
