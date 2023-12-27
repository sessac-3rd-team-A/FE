'use client';
import '@/styles/main.scss';
import '@/styles/header.scss';
import Link from 'next/link';
import { useRecoilState, useResetRecoilState } from 'recoil';
import {
  userState,
  selectedIconState,
  selectedImageState,
} from '@/utils/state';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const [selectedIcon, setSelectedIcon] = useRecoilState(selectedIconState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);

  const [isLogin, setIsLogin] = useState<boolean | undefined>();

  const handleMenuBar = () => {
    setSelectedIcon(2);
    setSelectedImage('/images/profileMenu_2.svg');
  };

  useEffect(() => {
    // console.log('user >>>>', user);
    user.isLogin ? setIsLogin(true) : setIsLogin(false);
  }, [user.isLogin]); // recoil

  return (
    <header className="headerContainer">
      <img src="/logo.svg" alt="logo" className="headerLogo" />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link href={'/'} className="headerMenu">
          Main
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
        <>
          <Link
            href={'/profile'}
            className="headerMenu signInBtn"
            onClick={handleMenuBar}
          >
            profile
          </Link>
          <div
            onClick={() => {
              resetUser();
              localStorage.clear();
            }}
          >
            로그아웃
          </div>
        </>
      )}
    </header>
  );
}
