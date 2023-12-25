'use client';
import '../../styles/statistics/memeComponent.scss';
import { useState } from 'react';
import MemeComponentImg from './memeComponentImg';

const MemeComponent = () => {
  const [gender, setGender] = useState('F');
  const [age, setAge] = useState('20대');
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [ageDropdownOpen, setAgeDropdownOpen] = useState(false);

  const genders = [
    { label: '전체', value: '' },
    { label: '남자', value: 'M' },
    { label: '여자', value: 'F' },
  ];
  const ages = [
    { label: '전체', value: '' },
    { label: '10대', value: '10대' },
    { label: '20대', value: '20대' },
    { label: '30대', value: '30대' },
    { label: '40대', value: '40대' },
    { label: '50대', value: '50+' },
  ];

  return (
    <>
      <MemeComponentImg gender={gender} age={age} />
      <div className="custom-select-wrapper">
        <div className={`custom-select ${genderDropdownOpen ? 'opened' : ''}`}>
          <span
            className="custom-select-trigger"
            onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
          >
            {genders.find((g) => g.value === gender)?.label}
          </span>
          <div className="custom-options">
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
      <div className="custom-select-wrapper">
        <div className={`custom-select ${ageDropdownOpen ? 'opened' : ''}`}>
          <span
            className="custom-select-trigger"
            onClick={() => setAgeDropdownOpen(!ageDropdownOpen)}
          >
            {ages.find((a) => a.value === age)?.label}
          </span>
          <div className="custom-options">
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
    </>
  );
};

export default MemeComponent;
