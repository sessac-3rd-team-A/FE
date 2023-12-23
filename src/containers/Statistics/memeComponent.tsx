'use client';

import { useEffect, useState } from 'react';
import MemeComponentProps from './memeComponentProps';

const MemeComponent = () => {
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    setGender('F'); // 컴포넌트가 마운트될 때 성별을 'F'로 설정
    setAge('20대'); // 컴포넌트가 마운트될 때 연령을 '20대'로 설정
  }, []);

  const handleGenderChange = (e: any) => setGender(e.target.value);
  const handleAgeChange = (e: any) => setAge(e.target.value);

  return (
    <div>
      <select onChange={handleGenderChange}>
        <option value="">전체</option>
        <option value="M">남자</option>
        <option value="F">여자</option>
      </select>
      <select onChange={handleAgeChange}>
        <option value="">전체</option>
        <option value="10대">10대</option>
        <option value="20대">20대</option>
        <option value="30대">30대</option>
        <option value="40대">40대</option>
        <option value="50대">50대 이상</option>
      </select>
      <MemeComponentProps gender={gender} age={age} />
    </div>
  );
};

export default MemeComponent;
