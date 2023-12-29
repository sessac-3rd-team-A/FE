'use client';
import '@/styles/signIn/index.scss';
import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState, useResetRecoilState } from 'recoil'; // recoil
import { userState } from '@/utils/state'; // recoil
import { useEffect } from 'react'; // recoil
import MovingEye from '@/components/movingEye';
import { useRafState } from 'react-use';

export default function SignInPage() {
  const router = useRouter();
  const resetUser = useResetRecoilState(userState);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [idd, setIdd] = useState<string>('test');
  const [user, setUser] = useRecoilState(userState); // recoil
  const eyeRef1 = useRef<HTMLDivElement>(null);
  const eyeRef2 = useRef<HTMLDivElement>(null);
  const eyeRef3 = useRef<HTMLDivElement>(null);
  const eyeRef4 = useRef<HTMLDivElement>(null);

  const [cord1, setCord1] = useRafState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });
  const [cord2, setCord2] = useRafState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });
  const [cord3, setCord3] = useRafState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });
  const [cord4, setCord4] = useRafState({
    top: false,
    right: false,
    bottom: false,
    left: false,
  });

  // 사용자의 임의적인 페이지 접근 막기
  useEffect(() => {
    if (user.isLogin) {
      if (window.confirm('이미 로그인된 상태입니다.\n로그아웃 하시겠습니까?')) {
        resetUser();
        localStorage.clear();
      } else {
        router.replace('/');
      }
    }
    // console.log('Updated user state:', user);
  }, []); // recoil

  const [isLoading, setIsLoading] = useState<boolean>(false);
  async function onSubmitSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/auth/signin`;
    const formData = new FormData(event.currentTarget);
    const formattedData = Object.fromEntries(formData);

    const response = await fetch(apiUrl, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: formattedData.userId,
        password: formattedData.password,
      }),
    }).catch((error) => {
      console.log(error);
      alert(error);
      setIsLoading(false);
    });
    if (response) {
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
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        // 토큰 값 쿠키에 저장
        // Cookies.set('accessToken', data.accessToken, { expires: 1 });
        // Cookies.set('refreshToken', data.refreshToken, { expires: 1 });

        router.push('/');
      } else {
        console.log(response.statusText);
        const data = await response.json();
        if (data.error == 'wrong userId') {
          alert('아이디가 틀렸습니다');
          setIsLoading(false);
        } else if (data.error == 'wrong password') {
          alert('비밀번호가 틀렸습니다');
          setIsLoading(false);
        }
      }
    }
  }

  async function onSubmitSignUp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const apiUrl = `${process.env.NEXT_PUBLIC_API_SERVER}/auth/signup`;
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
        age: formattedData.age,
        gender: formattedData.gender,
      }),
    }).catch((error) => {
      alert(error);
      setIsLoading(false);
    });
    if (response?.status == 200) {
      setIsLoading(false);
      setIsLogin(true);
    } else {
      alert('이미 존재하는 아이디입니다.');
      setIsLoading(false);
    }
  }

  return (
    <article className="sign-mainContainer">
      <p className="sign-text in">SIGN IN</p>
      <p className="sign-text up">SIGN UP</p>
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
              required
              defaultValue={'test123'}
              name="userId"
              type="text"
              id="id"
              placeholder="YOUR ID"
              minLength={4}
              maxLength={12}
            />
            <input
              required
              defaultValue={'test123'}
              name="password"
              type="password"
              id="pw"
              className="pw"
              placeholder="YOUR PASSWORD"
              minLength={4}
              maxLength={12}
            />
            <button
              disabled={isLoading}
              type="submit"
              className="submit-button"
            >
              {isLoading ? 'LOADING' : 'SUBMIT'}
            </button>
          </form>

          <form className="sign-div back" onSubmit={onSubmitSignUp}>
            <p className="signIn-letter">SIGN UP</p>
            <input
              required
              name="userId"
              type="text"
              id="reg-id"
              className="idSignUp"
              placeholder="YOUR ID"
              minLength={4}
              maxLength={12}
              // pattern="[a-z0-9]{4,12}"
              // title="패턴에 맞게 작성하세요"
            />
            <input
              required
              name="password"
              type="password"
              id="reg-pw"
              className="pw"
              placeholder="YOUR PASSWORD"
              minLength={4}
              maxLength={12}
            />
            <div className="age-and-gender">
              <div className="age-container">
                <select id="age" name="age" defaultValue={''} required>
                  <option value="" disabled hidden>
                    Age
                  </option>
                  <option value="10대">10 대</option>
                  <option value="20대">20 대</option>
                  <option value="30대">30 대</option>
                  <option value="40대">40 대</option>
                  <option value="50대">50 대 이상</option>
                </select>
                <img className="select-arrow" src="/signIn/down-arrow.svg" />
              </div>
              <div className="age-container">
                <select id="gender" name="gender" defaultValue={''} required>
                  <option value="" disabled hidden>
                    Gender
                  </option>
                  <option value="F">여자</option>
                  <option value="M">남자</option>
                </select>
                <img className="select-arrow" src="/signIn/down-arrow.svg" />
              </div>
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="submit-button submit-signUp"
            >
              {isLoading ? 'LOADING' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </div>
      <div className="monster mon1">
        <img style={{ width: '100%' }} src="/signIn/mon1.png" />
        <MovingEye
          eRef={eyeRef1}
          cord={cord1}
          setCord={setCord1}
          cName={'mon1-eye1'}
        />
        <MovingEye cName={'mon1-eye2'} cord={cord1} setCord={setCord1} />
      </div>
      <div className="monster mon2">
        <img style={{ width: '100%' }} src="/signIn/mon2.png" />
        <MovingEye
          eRef={eyeRef2}
          cord={cord2}
          setCord={setCord2}
          cName={'mon2-eye1'}
        />
        <MovingEye cName={'mon2-eye2'} cord={cord2} setCord={setCord2} />
      </div>
      <div className="monster mon3">
        <img style={{ width: '100%' }} src="/signIn/mon3.png" />
        <MovingEye
          eRef={eyeRef3}
          cord={cord3}
          setCord={setCord3}
          cName={'mon3-eye1'}
        />
        <MovingEye cName={'mon3-eye2'} cord={cord3} setCord={setCord3} />
      </div>
      <div className="monster mon4">
        <img style={{ width: '100%' }} src="/signIn/mon4.png" />
        <MovingEye
          eRef={eyeRef4}
          cord={cord4}
          setCord={setCord4}
          cName={'mon4-eye1'}
        />
        <MovingEye cName={'mon4-eye2'} cord={cord4} setCord={setCord4} />
      </div>
    </article>
  );
}
