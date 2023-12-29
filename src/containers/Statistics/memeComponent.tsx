'use client';
import '../../styles/statistics/memeComponent.scss';
import { useState } from 'react';
import MemeComponentImg from './memeComponentImg';
import { relative } from 'path';

const MemeComponent = (
  { memeImgInfo }: any,
  // { gender }: { gender: string | null },
  // { age }: { age: string | null },
) => {
  const [gender, setGender] = useState('F');
  const [age, setAge] = useState('20대');
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [ageDropdownOpen, setAgeDropdownOpen] = useState(false);

  const genders = [
    { label: '전체', value: '' },
    { label: '남성', value: 'M' },
    { label: '여성', value: 'F' },
  ];
  const ages = [
    { label: '전체', value: '' },
    { label: '10대', value: '10대' },
    { label: '20대', value: '20대' },
    { label: '30대', value: '30대' },
    { label: '40대', value: '40대' },
    { label: '50+', value: '50대' },
  ];

  return (
    <>
      <MemeComponentImg
        gender={gender}
        age={age}
        // memeImgInfo={memeImgInfo}
      />

      <div className="legendBox">
        <button className="item" style={{ visibility: 'hidden' }}>
          {<img src="/statistics/positive.svg" alt="" />}
          <br />
          {<img src="/statistics/negative.svg" alt="" />}
          <br />
          {<img src="/statistics/neutral.svg" alt="" />}
          <br />
        </button>
        <div className="custom-select-wrapper-testing">
          <div
            className={`custom-select ${genderDropdownOpen ? 'opened' : ''}`}
          >
            <span
              className="custom-select-trigger"
              // style={{''}}
              onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
            >
              <div className="custom-select-cover">
                {genders.find((g) => g.value === gender)?.label}
              </div>
            </span>
            <div className="custom-options-testing">
              {genders.map((g) => (
                <span
                  key={g.value}
                  className={`custom-option ${
                    gender === g.value ? 'selection' : ''
                  }`}
                  onClick={() => {
                    setGender(g.value);
                    setGenderDropdownOpen(false);
                  }}
                >
                  {g.label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="custom-select-wrapper-testing">
          <div className={`custom-select ${ageDropdownOpen ? 'opened' : ''}`}>
            <span
              className="custom-select-trigger"
              onClick={() => setAgeDropdownOpen(!ageDropdownOpen)}
            >
              <div className="custom-select-cover">
                {ages.find((a) => a.value === age)?.label}
              </div>
            </span>
            <div className="custom-options-testing">
              {ages.map((a) => (
                <span
                  key={a.value}
                  className={`custom-option ${
                    age === a.value ? 'selection' : ''
                  }`}
                  onClick={() => {
                    setAge(a.value);
                    setAgeDropdownOpen(false);
                  }}
                >
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemeComponent;
