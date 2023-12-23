'use client';
import MemeComponent from '@/components/memeComponentProps';
import { useState } from 'react';

const App = () => {
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);

  const handleGenderChange = (e: any) => setGender(e.target.value);
  const handleAgeChange = (e: any) => setAge(e.target.value);

  return (
    <div>
      <div>d</div>
      <div>as</div>
      <div>asd</div>
      <div>1</div>
      <div>2</div>
      <div>32</div>
      <div>4</div>
      <div>4</div>
      <div>4</div>
      <div>4</div>
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
      <MemeComponent gender={gender} age={age} />
    </div>
  );
};

export default App;
