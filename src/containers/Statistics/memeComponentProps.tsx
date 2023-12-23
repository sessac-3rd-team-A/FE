import { useEffect, useState } from 'react';
import useFetch from './memeFetch';

interface MemeComponentProps {
  gender: string | null;
  age: string | null;
}

const MemeComponentProps: React.FC<MemeComponentProps> = ({ gender, age }) => {
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
  if (!data || !data.success) return <div>데이터가 없습니다.</div>;

  const handleClick = (rank: number) => {
    setSelectedRank(rank);
  };

  return (
    <div>
      {data.ranking.map((meme, index) => (
        <div key={index}>
          <div>{meme.rank}</div>
          <button onClick={() => handleClick(meme.rank)}>보기</button>
          {selectedRank === meme.rank && (
            <img src={meme.imageUrl} alt={`meme ${meme.rank}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default MemeComponentProps;
