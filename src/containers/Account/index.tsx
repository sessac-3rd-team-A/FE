'use client';

import '@/styles/profile/account.scss';
import '@/styles/profile/accountForm.scss';
import ProfileMenu from '@/containers/Profile/profileMenu';
import React, { useState, FormEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@/utils/state';


export default function MySettingPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [complete, setComplete] = useState<string | null>(null);
  const [user, setUser] = useRecoilState(userState);
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [nickname, setNickname] = useState('');

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

      console.log('accessToken >>>', accessToken);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/profile/account`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            userId: formattedData.id,
            age: formattedData.age,
            gender: formattedData.gender,
          }),
        },
      );

      if (!res.ok) {
        throw new Error('Failed to submit the data. Please try again.');
      }
      const data = await res.json();
      console.log('res.body >>>', res.body);
      setComplete(
        `${formattedData.id}와 ${formattedData.age}, ${
          formattedData.gender == 'F' ? '여자' : '남자'
        }로 변경 완료되었습니다.`,
      );
      // recoil 상태 업데이트
      setUser({
        userId: data.userId,
        nickname: data.nickname,
        age: data.age,
        gender: data.gender,
        isLogin: true,
      });

    } catch (error) {
      setError('값을 다 안채웠거나, 이미 존재하는 아이디입니다.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="setting-page-container">
      <section className="whiteGradientBg" />
      <div className="header-temp"></div>
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
                <select id="age" name="age" defaultValue={user.age}>
                  <option value="" aria-disabled hidden>
                    Age
                  </option>
                  <option value="10대">10 대</option>
                  <option value="20대">20 대</option>
                  <option value="30대">30 대</option>
                  <option value="40대">40 대</option>
                  <option value="50대">50 대 이상</option>
                </select>
                <select id="gender" name="gender" defaultValue={user.gender === 'F' ? '여자' : '남자'}>
                  <option value="" disabled hidden>
                    Gender
                  </option>
                  <option value="F">여자</option>
                  <option value="M">남자</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="submit-button"
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </button>
            </form>
            {error && <div className="error-box">{error}</div>}

            {complete && <div className="complete-box">{complete}</div>}
          </div>
        </div>
      </div>
      <ProfileMenu />
    </div>
  );
}
