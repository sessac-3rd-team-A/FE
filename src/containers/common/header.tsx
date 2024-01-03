'use client';
import '@/styles/main.scss';
import '@/styles/header.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState, selectedIconState } from '@/utils/state';
import { useEffect, useState } from 'react';
import responseInterceptor from '@/utils/fetch';

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const [selectedIcon, setSelectedIcon] = useRecoilState(selectedIconState);
  // const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);
  const [selectedImage, setSelectedImage] = useState<string>();

  const [isLogin, setIsLogin] = useState<boolean | undefined>();

  const handleMenuBar = () => {
    setSelectedIcon(2);
    router.push(isLogin ? '/profile' : '/');
  };

  const onClickResetRecoil = () => {
    setSelectedIcon(2);
  };

  // 액세스 토큰 만료 여부 판단 함수
  const isATokenExp = (aToken: string) => {
    const aBase64Url = aToken?.split('.')[1];
    const aBase64 = aBase64Url?.replace('-', '+').replace('_', '/');
    if (aBase64) {
      const now = Date.now();
      const { exp: aExp } = JSON.parse(window.atob(aBase64));

      return aExp < +now.toString().slice(0, 10) ? true : false;
    }
  };

  // 리프레시 토큰 만료됐을 때 갱신 하는 함수
  const updateRefresh = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    const rBase64Url = refreshToken?.split('.')[1];
    const rBase64 = rBase64Url?.replace('-', '+').replace('_', '/');
    if (rBase64 && accessToken) {
      const now = Date.now();
      const { exp: rExp } = JSON.parse(window.atob(rBase64));

      // 리프레시 토큰 만료 한시간 전에 체크
      // 이상 없으면 아무 행위도 하지 않음
      if (rExp - 60 * 60 < +now.toString().slice(0, 10)) {
        // 액세스 토큰도 동시 만료일 때 로그아웃 처리
        if (!isATokenExp(accessToken)) {
          resetUser();
          localStorage.clear();
          router.push('/');
          return;
        }

        try {
          const updateRefreshRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER}/auth/newRefreshToken`,
            {
              method: 'POST',
              headers: { Authorization: `Bearer ${accessToken}` },
            },
          );
          if (
            updateRefreshRes.status === 200 ||
            updateRefreshRes.status === 201
          ) {
            const data = await updateRefreshRes.json();
            const newRefreshToken: string = data.refreshToken;
            // 기존 로컬스토리지 리프레시 토큰 삭제 후 업데이트
            localStorage.removeItem('refreshToken');
            localStorage.setItem('refreshToken', newRefreshToken);
          }
        } catch (err: any) {
          console.error(err.message);
        }
      }
    }
  };

  useEffect(() => {
    user.isLogin ? setIsLogin(true) : setIsLogin(false);
  }, [user.isLogin]); // recoil

  useEffect(() => {
    // 초기 마운트 시
    // refresh token 만료됐는지 검증하는 함수
    updateRefresh();
    // access token 만료됐는지 검증하는 interceptor
    responseInterceptor();
  }, []);

  return (
    <header className="headerContainer">
      <Link href={'/'} className="headerLogo">
        <img src="/logo.svg" alt="logo" className="headerLogo" />
      </Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          href={isLogin ? '/profile' : '/'}
          className="headerMenu"
          onClick={handleMenuBar}
        >
          {isLogin ? 'PROFILE' : 'MAIN'}
        </Link>
        <Link
          href={'/sigh'}
          className="headerMenu middle"
          onClick={onClickResetRecoil}
        >
          SIGH
        </Link>
        <Link
          href={'/statistics'}
          className="headerMenu"
          onClick={onClickResetRecoil}
        >
          TREND
        </Link>
      </div>
      {!isLogin ? (
        <Link href={'/signIn'} className="headerMenu signInBtn">
          SIGN IN
        </Link>
      ) : (
        <div
          className="headerMenu signInBtn"
          onClick={() => {
            resetUser();
            localStorage.clear();
            router.replace('/');
          }}
        >
          SIGN OUT
        </div>
      )}
    </header>
  );
}
