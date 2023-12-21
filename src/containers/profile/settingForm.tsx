'use client';
import React, { useState, FormEvent } from 'react';
import '@/styles/profile/settingForm.scss';

export default function SettingForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const d = Object.fromEntries(formData);
      console.log(d);
      const response = await fetch('/profile/setting', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit the data. Please try again.');
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      // setError(error.message)
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="setting-form-container2">
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={onSubmitForm} className="setting-form">
        <input
          type="text"
          id="nickName"
          placeholder="개피곤한 인간말종"
          readOnly
        />
        <input
          name="id"
          type="text"
          id="id"
          placeholder="Your ID"
          minLength={2}
          maxLength={100}
          readOnly
        />
        <div className="age-and-gender">
          <select id="age" name="age">
            <option value="" disabled selected hidden>
              Age
            </option>
            <option value="10대">10 대</option>
            <option value="20대">20 대</option>
            <option value="20대">20 대</option>
            <option value="20대">20 대</option>
            <option value="50대">50 대 이상</option>
          </select>
          <select id="gender" name="gender">
            <option value="" disabled selected hidden>
              Gender
            </option>
            <option value="female">여자</option>
            <option value="male">남자</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
