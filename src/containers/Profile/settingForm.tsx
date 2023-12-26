'use client';
import React, { useState, FormEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import '@/styles/profile/settingForm.scss';
import { userState } from '@/utils/state';
import { TokenType, userDataType } from '@/types'

// async function updateUser(accessToken: string, refreshToken: string) {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/profile/account`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         'Cookie': `accessToken=${accessToken}; refreshToken=${refreshToken}`
//       },
//     });
//     // console.log('res >>>',res);
//     return res;
//   } catch (err) {
//     throw new Error(`HTTP error! Status: ${err}`);
//   }
// } 

export default async function SettingForm(Token: TokenType) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useRecoilState(userState);

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
        'Cookie': `accessToken=${Token.accessToken}; refreshToken=${Token.refreshToken}`
      },
      body: JSON.stringify({
        userId: formattedData.id,
        age: formattedData.age,
        gender: formattedData.gender,
      }),
    });
    console.log('res >>>', res);
    if (!res.ok) {
      throw new Error('Failed to submit the data. Please try again.');
    }
    const data = await res.json();
    console.log(data);
    } catch (error) {
      setError('Error!!');
    } finally {
      setIsLoading(false);
    }
}

  return (
    <div className="setting-form-container2">
       <p>ACCOUNT</p>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmitForm} className="setting-form">
        <input
          type="text"
          id="nickName"
          placeholder={user.nickname}
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
          <select id="age" name="age">
            <option value="" disabled selected hidden>
              Age
            </option>
            <option value="10대">10 대</option>
            <option value="20대">20 대</option>
            <option value="20대">30 대</option>
            <option value="20대">40 대</option>
            <option value="50대">50 대 이상</option>
          </select>
          <select id="gender" name="gender">
            <option value="" disabled selected hidden>
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
    </div>
  );
}
