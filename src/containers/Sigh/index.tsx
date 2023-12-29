'use client';

import '@/styles/sigh/index.scss';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/app/sigh/loading';
import Image from 'next/image';

export default function SighPage() {
  const [sighText, setSighText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('START');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value.slice(0, 1000);
    setSighText(newText);
  };

  // 개행문자 에러
  const formattedSighText = sighText.replace(/\r\n|\r|\n/g, '');

  const handleStartButtonClick = async () => {
    const bearerToken =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    if (buttonText === 'START') {
      setIsVisible((prevVisible) => !prevVisible);
      setButtonText((prevText) => (prevText === 'START' ? 'OK' : 'START'));
    } else if (buttonText === 'OK') {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/api/diary`;
      setIsLoading(true);

      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            Authorization: bearerToken ? `Bearer ${bearerToken}` : '',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            textDiary: formattedSighText,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          router.push(`/sigh/result/${data.id}`);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
      }
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="sigh-container">
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
      <div className="sigh-doodles">
        <div className="sigh-doodle doodleA">
          <Image
            src="/sigh/sigh_doodle_1.png"
            alt="doodle"
            fill
            sizes="null"
            priority
          />
        </div>
        <div className="sigh-doodle doodleB">
          <Image src="/sigh/sigh_doodle_2.png" alt="doodle" fill sizes="null" />
        </div>
        <div className="sigh-doodle doodleC">
          <Image src="/sigh/sigh_doodle_3.png" alt="doodle" fill sizes="null" />
        </div>
        <div className="sigh-doodle doodleD">
          <Image
            src="/sigh/sigh_doodle_4.png"
            alt="doodle"
            fill
            sizes="null"
            priority
          />
        </div>
        <div className="sigh-doodle doodleE">
          <Image src="/sigh/sigh_doodle_5.png" alt="doodle" fill sizes="null" />
        </div>
        <div className="sigh-doodle doodleF">
          <Image
            src="/sigh/sigh_doodle_6.png"
            alt="doodle"
            fill
            sizes="null"
            priority
          />
        </div>
        <div className="sigh-doodle doodleG">
          <Image src="/sigh/sigh_doodle_7.png" alt="doodle" fill sizes="null" />
        </div>
        <div className="sigh-doodle doodleH">
          <Image src="/sigh/sigh_doodle_8.png" alt="doodle" fill sizes="null" />
        </div>
        <div className="sigh-doodle doodleI">
          <Image src="/sigh/sigh_doodle_9.png" alt="doodle" fill sizes="null" />
        </div>
        <div className="sigh-doodle doodleJ">
          <Image
            src="/sigh/sigh_doodle_10.png"
            alt="doodle"
            fill
            sizes="null"
          />
        </div>
      </div>
    </div>
  );
}
