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
    // setSelectedIcon(2);
    router.push(isLogin ? '/profile' : '/');
  };

  useEffect(() => {
    // console.log('user >>>>', user);
    user.isLogin ? setIsLogin(true) : setIsLogin(false);
  }, [user.isLogin]); // recoil

  useEffect(() => {
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
        <Link href={'/sigh'} className="headerMenu middle">
          SIGH
        </Link>
        <Link href={'/statistics'} className="headerMenu">
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
