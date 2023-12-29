'use client';

import Image from 'next/image';

import '@/styles/profile/diaryModal.scss';
import { useEffect, useState } from 'react';
import { ProfileCalendarType } from '@/types';

interface Props {
  emoData: ProfileCalendarType | null;
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

  const handleClick = () => {
    setIsFront(!isFront);
  };

  return (
    <div className="diaryModal-3d-wrap">
      <div className={`diaryModal-3d-wrapper ${isFront ? 'flip' : ''}`}>
        <div className="diaryModal-container front" onClick={handleClick}>
          <div className="date">{modalDate.split('-').join('.')}</div>
          {diaryPath && (
            <div className="diaryImg">
              <Image
                src={diaryPath}
                alt="picture diary"
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw"
              />
              <span>그림일기</span>
            </div>
          )}
        </div>
        <div className="diaryModal-container back" onClick={handleClick}>
          <div className="date">{modalDate.split('-').join('.')}</div>

          {gifPath && (
            <div className={`gifImg`}>
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
      </div>
    </div>
  );
}
