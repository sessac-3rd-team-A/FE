'use client'

import '@/styles/profile/setting.scss';
import ProfileMenu from '@/containers/Profile/profileMenu';
// import SettingForm from '@/containers/Profile/settingForm';
import React, { useState, FormEvent, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import '@/styles/profile/settingForm.scss';
import { userState } from '@/utils/state';

export default function MySettingPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useRecoilState(userState);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [nickname, setNickname] = useState('')

  useEffect(() => {
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    setAccessToken(storedAccessToken || '');
    setRefreshToken(storedRefreshToken || '');
    setNickname(user.nickname);

  }, [nickname]);
  
  async function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const formattedData = Object.fromEntries(formData);
      
      console.log('formattedData >>>', formattedData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/profile/account`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`
      },
      body: JSON.stringify({
        userId: formattedData.id,
        age: formattedData.age,
        gender: formattedData.gender,
        // userId: 'asdf',
        // age: '30대',
        // gender: 'F',
      }),
    });
    console.log('res >>>', res);
    if (!res.ok) {
      throw new Error('Failed to submit the data. Please try again.');
    }
    const data = await res.json();
    console.log(data);
    } catch (error) {
      setError('Fail submit! Try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="setting-page-container">
      <section className="whiteGradientBg" />
      <div className='header-temp'></div>
      <div className="setting-container">
        <div className="setting-form-container">
        <div className="setting-form-container2">
      <p>ACCOUNT</p>
      <form onSubmit={onSubmitForm} className="setting-form">
        <input
          type="text"
          id="nickName"
          placeholder={nickname}
          readOnly
        />
        <input
          type="text"
          id="id"
          name="id"
          placeholder="Your ID"
          minLength={2}
          maxLength={100}
        />
        <div className="age-and-gender">
          <select id="age" name="age" defaultValue='10대'>
            <option value="" aria-disabled hidden>
              Age
            </option>
            <option value="10대">10 대</option>
            <option value="20대">20 대</option>
            <option value="30대">30 대</option>
            <option value="40대">40 대</option>
            <option value="50대">50 대 이상</option>
          </select>
          <select id="gender" name="gender" defaultValue="F">
            <option value="" disabled hidden>
              Gender
            </option>
            <option value="F">여자</option>
            <option value="M">남자</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {error && <div className='error-box'>{error}</div>}
    </div>
        </div>
      </div>
      <ProfileMenu />
    </div>
  );
}