'use client';
import '@/styles/footer.scss';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footerContainer">
      <div className="footers">
        <div className="footerBBInfo">
          <img alt="logo" src="/logo.svg" className="footerLogo" />
          <p>
            이 프로젝트의 목적은 개인적인 학습과 기술 데모를 위한 것이며,
            상업적인 용도로 사용하지 않습니다.
          </p>
          <p>| 프로젝트기간 | 2023. 12. 18 ~ 12. 29</p>
          <Link href="https://even-taurus-17e.notion.site/Ah-whew-1c7815da1532435c81c35ff4a476c917?pvs=4">
            <img
              alt="notionIcon"
              src={'/main/notion.svg'}
              className="notionIcon"
            />
          </Link>
          <Link href="https://github.com/sessac-3rd-team-A">
            <img
              alt="githubIcon"
              src={'/main/github.svg'}
              className="githubIcon"
            />
          </Link>
        </div>
        <div className="footerTeamInfo">
          <div className="teamBack">
            <p>백엔드</p>
            <div className="personInfo">
              <div className="teamPerson">
                <p>김세은</p>
                <p>홍민영</p>
                <p>김정윤</p>
                <p>김효중</p>
              </div>
              <div className="personGithub">
                <Link href={'https://github.com/seeun0210'}>
                  <p>@seeun0210</p>
                </Link>
                <Link href={'https://github.com/HongMinYeong'}>
                  <p>@HongMinYeong</p>
                </Link>
                <Link href={'https://github.com/pipi-shortstocking'}>
                  <p>@pipi-shortstocking</p>
                </Link>
                <Link href={'https://github.com/rlagywnd4'}>
                  <p>@rlagywnd4</p>
                </Link>
              </div>
            </div>
          </div>
          <div className="teamBack">
            <p>프론트엔드</p>
            <div className="personInfo">
              <div className="teamPerson">
                <p>김지형</p>
                <p>김태훈</p>
                <p>이재욱</p>
                <p>김상우</p>
                <p>전수현</p>
              </div>
              <div className="personGithub">
                <Link href={'https://github.com/sy33002'}>
                  <p>@sy33002</p>
                </Link>
                <Link href={'https://github.com/hoonsdev'}>
                  <p>@hoonsdev</p>
                </Link>
                <Link href={'https://github.com/22-JWL'}>
                  <p>@22-JWL</p>
                </Link>
                <Link href={'https://github.com/Sangwoo97'}>
                  <p>@Sangwoo97</p>
                </Link>
                <Link href={'https://github.com/jjsh03'}>
                  <p>@jjsh03</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
