'use client';

import Image from 'next/image';

import '@/styles/profile/diaryModal.scss';
import { useEffect, useState } from 'react';
import { ProfileResultType } from '@/types';

interface Props {
  emoData: ProfileResultType | null;
  modalDate: string;
}

export default function DiaryModal({ emoData, modalDate }: Props) {
  const [diaryPath, setDiaryPath] = useState('');
  const [gifPath, setGifPath] = useState('');
  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    emoData?.calendar.map((el) => {
      if (el.date === modalDate) {
        setDiaryPath(el.result.pictureDiary);
        setGifPath(el.result.recommendedGif);
      }
    });
  }, [modalDate]);

  // console.log(emoData);
  console.log('path :: ', gifPath, diaryPath);
  const handleClick = () => {
    setIsFront(!isFront);
  };

  return (
    <div className="diaryModal-container">
      <div className="date">{modalDate.split('-').join('.')}</div>
      {diaryPath && isFront && (
        <div className="diaryImg" onClick={handleClick}>
          <Image
            src={diaryPath}
            alt="picture diary"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw"
          />
          <span>그림일기</span>
        </div>
      )}
      {gifPath && !isFront && (
        <div className="gifImg" onClick={handleClick}>
          <Image
            src={gifPath}
            alt="picture diary"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw"
          />
          <span>추천짤</span>
        </div>
      )}
    </div>
  );
}
