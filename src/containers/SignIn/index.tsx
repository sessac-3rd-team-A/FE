'use client';
import '@/styles/signIn/index.scss';
import { FormEvent, useState } from 'react';

export default function SignInPage() {
  const [isLogin, setIslogin] = useState<boolean>(true);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const apiUrl = 'http://localhost:8080/auth/signup';
    const formData = new FormData(event.currentTarget);
    const formattedData = Object.fromEntries(formData);
    console.log(formattedData);
    // const response = await fetch(apiUrl, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     textDiary: sighText,
    //   }),
    // });

    // Handle response if necessary
    // const data = await response.json();
    // ...
  }

  return (
    <article className="sign-mainContainer">
      <div
        onClick={() => setIslogin(!isLogin)}
        className="sign-checkboxContainer"
      >
        <div className={`sign-arrowlane ${isLogin ? '' : 'sign-register'}`}>
          <img className="sign-arrow" src="/signIn/signArrow.svg" />
        </div>
      </div>
      <div className="sign-contentContainer">
        <div className={`flipper ${isLogin ? '' : 'flip'}`}>
          <form className="sign-div front" onSubmit={onSubmit}>
            <p className="signIn-letter">SIGN IN</p>
            <input
              name="id"
              type="text"
              id="id"
              placeholder="YOUR ID"
              minLength={2}
              maxLength={100}
            />
            <input
              name="pw"
              type="text"
              id="pw"
              className="pw"
              placeholder="YOUR PASSWORD"
              minLength={2}
              maxLength={100}
            />
            <button type="submit" className="submit-button">
              SUBMIT
            </button>
          </form>

          <form className="sign-div back" onSubmit={onSubmit}>
            <p className="signIn-letter">SIGN</p>
            <input
              name="id"
              type="text"
              id="id"
              placeholder="YOUR ID"
              minLength={2}
              maxLength={100}
            />
            <input
              name="pw"
              type="text"
              id="pw"
              className="pw"
              placeholder="YOUR PASSWORD"
              minLength={2}
              maxLength={100}
            />
            <button type="submit" className="submit-button">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
