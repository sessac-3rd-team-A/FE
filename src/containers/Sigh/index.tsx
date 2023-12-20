'use client';

import '@/styles/sigh/index.scss';
import React, { useState } from 'react';

export default function SighPage() {
  const [sighText, setSighText] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('START');

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    setSighText(newText);
  };

  const handleStartButtonClick = () => {
    setIsVisible((prevVisible) => !prevVisible);
    setButtonText((prevText) => (prevText === 'START' ? 'OK' : 'START'));
  };

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
