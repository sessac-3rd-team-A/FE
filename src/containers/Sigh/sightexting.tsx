'use client';

import '@/styles/sigh/index.scss';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/app/sigh/loading';
import { TokenType } from '@/types';

export default function SighTexting(Token: TokenType) {
  const [sighText, setSighText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('START');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value.slice(0, 1000);
    setSighText(newText);
  };

  const handleStartButtonClick = async () => {
    console.log(isLoading);

    if (buttonText === 'START') {
      setIsVisible((prevVisible) => !prevVisible);
      setButtonText((prevText) => (prevText === 'START' ? 'OK' : 'START'));
    } else if (buttonText === 'OK') {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/diary`;
      setIsLoading(true);

      let headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // 로그인유저 Cookie 헤더 추가
      if (Token.accessToken || Token.refreshToken) {
        headers.Cookie = `accessToken=${Token.accessToken}; refreshToken=${Token.refreshToken}`;
      }

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            textDiary: sighText,
          }),
        });

        if (response.ok) {
          console.log(headers);
          const data = await response.json();
          console.log('POST request successful:', data);
          setIsLoading(false);
          router.push(`/sigh/result/${data.id}`);
        } else {
          console.error(
            'POST request failed:',
            response.status,
            response.statusText,
          );
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        console.log(isLoading);
      }
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="sigh-mainContainer">
      <h1 className="sigh-title">Let me hear your sigh</h1>
      <article
        className={`sigh-write ${isVisible ? '-visible' : '-unVisible'}`}
      >
        <textarea
          className="sigh-text"
          placeholder="오늘 어떤 일이 있었나요?"
          value={sighText}
          onChange={handleInputChange}
        />
        <p>{sighText.length}/1000</p>
      </article>
      <button className="sigh-btn" onClick={handleStartButtonClick}>
        {buttonText}
      </button>
    </main>
  );
}
