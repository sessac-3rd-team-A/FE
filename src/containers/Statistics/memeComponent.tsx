'use client';
import '../../styles/statistics/memeComponent.scss';
import { useState } from 'react';
import MemeComponentImg from './memeComponentImg';

const MemeComponent = () => {
  const [gender, setGender] = useState('F');
  const [age, setAge] = useState('20대');

  const handleGenderChange = (e: any) => setGender(e.target.value);
  const handleAgeChange = (e: any) => setAge(e.target.value);

  return (
    <>
      <MemeComponentImg gender={gender} age={age} />
      <select
        value={gender}
        onChange={handleGenderChange}
        className="trend-select-gender"
      >
        <option value="">전체</option>
        <option value="M">남자</option>
        <option value="F">여자</option>
      </select>
      <select
        value={age}
        onChange={handleAgeChange}
        className="trend-select-age"
      >
        <option value="">전체</option>
        <option value="10대">10대</option>
        <option value="20대">20대</option>
        <option value="30대">30대</option>
        <option value="40대">40대</option>
        <option value="50대">50+</option>
      </select>
    </>
  );
};

export default MemeComponent;
