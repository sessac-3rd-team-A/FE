'use client';
import ImageGallery from '@/components/imageGallery';
import React, { useState } from 'react';

const MemeRank: React.FC = () => {
  const [gender, setGender] = useState<string>('여자');
  const [ageGroup, setAgeGroup] = useState<string>('20대');

  return (
    <div>
      <ImageGallery category={`${gender}_${ageGroup}`} />
      <div>
        <label>성별:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="남자">남자</option>
          <option value="여자">여자</option>
        </select>
      </div>
      <div>
        <label>연령대:</label>
        <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
          <option value="10대">10대</option>
          <option value="20대">20대</option>
          <option value="30대">30대</option>
          <option value="40대">40대</option>
          <option value="50대이상">50대이상</option>
        </select>
      </div>
    </div>
  );
};

export default MemeRank;
