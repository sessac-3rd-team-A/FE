import '@/styles/main.scss';
import '@/styles/header.scss';
import Link from 'next/link';

export default function Header() {
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
        <Link href={'/trend'} className="headerMenu">
          TREND
        </Link>
      </div>
      <Link href={'/signIn'} className="headerMenu signInBtn">
        SIGN IN
      </Link>
    </header>
  );
}
