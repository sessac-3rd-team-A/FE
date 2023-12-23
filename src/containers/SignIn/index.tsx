'use client';
import '@/styles/signIn/index.scss';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil'; // recoil
import { userState } from '@/utils/state'; // recoil
import { useEffect } from 'react'; // recoil

export default function SignInPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [user, setUser] = useRecoilState(userState); // recoil

  useEffect(() => {
    console.log('Updated user state:', user);
  }, [user]); // recoil

  async function onSubmitSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const apiUrl = 'http://localhost:8080/auth/signin';
    const formData = new FormData(event.currentTarget);
    const formattedData = Object.fromEntries(formData);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: formattedData.userId,
        password: formattedData.password,
      }),
    });

    console.log(response.status);
    if (response.status == 200) {
      const data = await response.json();
      // recoil 상태 설정
      setUser({
        userId: data.userId,
        nickname: data.nickname,
        age: data.age,
        gender: data.gender,
        isLogin: true,
      });
      // 토큰 값은 로컬스토리지에 저장
      localStorage.setItem('token', data.token);

      router.push('/');
    }
  }

  async function onSubmitSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const apiUrl = 'http://localhost:8080/auth/signin';
    const formData = new FormData(event.currentTarget);
    const formattedData = Object.fromEntries(formData);
    console.log(formattedData);
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formattedData,
      }),
    });

    // Handle response if necessary
    console.log(response);
    const data = await response.json();
    console.log(data);
    // ...
  }

  return (
    <article className="sign-mainContainer">
      <div
        onClick={() => setIsLogin(!isLogin)}
        className="sign-checkboxContainer"
      >
        <div className={`sign-arrowlane ${isLogin ? '' : 'sign-register'}`}>
          <img className="sign-arrow" src="/signIn/signArrow.svg" />
        </div>
      </div>
      <div className="sign-contentContainer">
        <div className={`flipper ${isLogin ? '' : 'flip'}`}>
          <form className="sign-div front" onSubmit={onSubmitSignIn}>
            <p className="signIn-letter">SIGN IN</p>
            <input
              name="userId"
              type="text"
              id="id"
              placeholder="YOUR ID"
              minLength={2}
              maxLength={100}
            />
            <input
              name="password"
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

          <form className="sign-div back" onSubmit={onSubmitSignUp}>
            <p className="signIn-letter">SIGN UP</p>
            <input
              name="id"
              type="text"
              id="id"
              className="idSignUp"
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
            <input
              name="nickname"
              type="text"
              id="nickname"
              className="nickname"
              disabled
              placeholder="개피곤한 인간말종"
              minLength={2}
              maxLength={100}
            />
            <div className="age-and-gender">
              <select id="age" name="age" defaultValue={'Age'}>
                <option defaultValue="" disabled hidden>
                  Age
                </option>
                <option value="10대">10 대</option>
                <option value="20대">20 대</option>
                <option value="20대">20 대</option>
                <option value="20대">20 대</option>
                <option value="50대">50 대 이상</option>
              </select>
              <select id="gender" name="gender" defaultValue={'Gender'}>
                <option defaultValue="" disabled hidden>
                  Gender
                </option>
                <option value="female">여자</option>
                <option value="male">남자</option>
              </select>
            </div>
            <button type="submit" className="submit-button submit-signUp">
              SUBMIT
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
