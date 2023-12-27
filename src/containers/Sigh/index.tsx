'use client';

import '@/styles/sigh/index.scss';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/app/sigh/loading';

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

  const handleStartButtonClick = async () => {
    console.log(isLoading);

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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            textDiary: sighText,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('POST request successful:', data);
          localStorage.setItem('sighResult', JSON.stringify(data));
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
        setIsLoading(false);
        console.log(isLoading);
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
        <img
          src="/sigh/sigh_doodle_1.png"
          alt="doodle"
          className="sigh-doodle doodleA"
        />
        <img
          src="/sigh/sigh_doodle_2.png"
          alt="doodle"
          className="sigh-doodle doodleB"
        />
        <img
          src="/sigh/sigh_doodle_3.png"
          alt="doodle"
          className="sigh-doodle doodleC"
        />
        <img
          src="/sigh/sigh_doodle_4.png"
          alt="doodle"
          className="sigh-doodle doodleD"
        />
        <img
          src="/sigh/sigh_doodle_5.png"
          alt="doodle"
          className="sigh-doodle doodleE"
        />
        <img
          src="/sigh/sigh_doodle_6.png"
          alt="doodle"
          className="sigh-doodle doodleF"
        />
        <img
          src="/sigh/sigh_doodle_7.png"
          alt="doodle"
          className="sigh-doodle doodleG"
        />
        <img
          src="/sigh/sigh_doodle_8.png"
          alt="doodle"
          className="sigh-doodle doodleH"
        />
        <img
          src="/sigh/sigh_doodle_9.png"
          alt="doodle"
          className="sigh-doodle doodleI"
        />
        <img
          src="/sigh/sigh_doodle_10.png"
          alt="doodle"
          className="sigh-doodle doodleJ"
        />
      </div>
    </div>
  );
}
