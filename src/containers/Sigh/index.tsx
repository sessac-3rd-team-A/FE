'use client';

import '@/styles/sigh.scss';
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
    <div className="sighContainer">
      <main className="sighMainContainer">
        <h1 className="sighH">Let me hear your sigh</h1>
        <article
          className={`sighWrite ${isVisible ? 'sighVisible' : 'sighUnVisible'}`}
        >
          <textarea
            className="sighText"
            placeholder="오늘 어떤 일이 있었나요?"
            value={sighText}
            onChange={handleInputChange}
          />
          <p>{sighText.length}/1000</p>
        </article>
        <button className="sighBtn" onClick={handleStartButtonClick}>
          {buttonText}
        </button>
      </main>
      <div className="sighDoodles">
        <img
          src="/sigh/sigh_doodle_1.png"
          alt="doodle"
          className="doodle doodleA"
        />
        <img
          src="/sigh/sigh_doodle_2.png"
          alt="doodle"
          className="doodle doodleB"
        />
        <img
          src="/sigh/sigh_doodle_3.png"
          alt="doodle"
          className="doodle doodleC"
        />
        <img
          src="/sigh/sigh_doodle_4.png"
          alt="doodle"
          className="doodle doodleD"
        />
        <img
          src="/sigh/sigh_doodle_5.png"
          alt="doodle"
          className="doodle doodleE"
        />
        <img
          src="/sigh/sigh_doodle_6.png"
          alt="doodle"
          className="doodle doodleF"
        />
        <img
          src="/sigh/sigh_doodle_7.png"
          alt="doodle"
          className="doodle doodleG"
        />
        <img
          src="/sigh/sigh_doodle_8.png"
          alt="doodle"
          className="doodle doodleH"
        />
        <img
          src="/sigh/sigh_doodle_9.png"
          alt="doodle"
          className="doodle doodleI"
        />
        <img
          src="/sigh/sigh_doodle_10.png"
          alt="doodle"
          className="doodle doodleJ"
        />
      </div>
    </div>
  );
}
