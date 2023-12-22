'use client'
import '@/styles/main.scss';
import '@/styles/header.scss';
import Link from 'next/link';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '@/utils/state';
import { useEffect } from 'react';

export default function Header() {
  const [user, setUser] = useRecoilState<{ userId: string; password: string; }>(userState);

  useEffect(() => {
    console.log("user >>>>", user)
  }, []) // recoil

  return (
    <header className="headerContainer">
      <img src="/logo.svg" alt="logo" className="headerLogo" />
      <div>
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
      {/* <Link href={'/signIn'} className="headerMenu signInBtn">
        SIGN IN
      </Link> */}
      { user.userId === '' ? (<Link href={'/signIn'} className="headerMenu signInBtn">
        SIGN IN
      </Link>) : (<Link href={'/profile'} className="headerMenu signInBtn">
        profile
      </Link>)}
    </header>
  );
}
