'use client';

import Image from 'next/image';

import '@/styles/profile/diaryModal.scss';
import { useEffect, useState } from 'react';

interface Props {
  // emoData: sighResultType[];
  emoData: object;
  modalDate: string;
}

export default function DiaryModal({ emoData, modalDate }: Props) {
  const [diaryPath, setDiaryPath] = useState('');

  useEffect(() => {
    for (let key in emoData) {
      if (key === modalDate) {
        setDiaryPath(emoData[key].result.recommendedGif);
      }
    }
  }, [modalDate]);

  return (
    <div className="diaryModal-container">
      <div className="date">{modalDate.split('-').join('.')}</div>
      {diaryPath && (
        <div className="img">
          <Image
            src={diaryPath}
            alt="picture diary"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 100vw"
          />
        </div>
      )}
    </div>
  );
}
