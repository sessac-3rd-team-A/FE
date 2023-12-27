'use client';
import Image from 'next/image';
import '@/styles/sigh/result.scss';
import resultDoodle from '/public/sigh/result_doodle_1.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ResultChart from './resultChart';
import { useEffect, useState } from 'react';
import { SighResultType } from '@/types';

export default function SighResultPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  console.log(id);

  const [sighResult, setSighResult] = useState<SighResultType | null>(null);
  const getResultData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/api/diary/${id}`,
        {
          cache: 'no-store',
          method: 'GET',
        },
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log('fetch data :: ', data);

      setSighResult(data);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getResultData();
  }, [id]);

  // 카톡 공유
  // csr에서만 실행
  if (typeof window !== 'undefined') {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }

    if (sighResult && window.Kakao && window.Kakao.Share) {
      const kakaoImg = sighResult.pictureDiary;
      const pathName = id;
      console.log(pathName);
      window.Kakao.Share.createCustomButton({
        container: '#kakaotalk-sharing-btn',
        templateId: 102205,
        templateArgs: {
          kakaoImg,
          pathName,
        },
      });
    }
  }

  // 링크 공유
  const copyLinkToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('링크 복사 실패:', err);
      });
  };

  return (
    <div className="result-container">
      <main className="result-mainContainer">
        <section className="result-section result-paint">
          <h3>TODAY'S AH-WHEW</h3>
          {sighResult && sighResult.pictureDiary && (
            <img
              src={sighResult.pictureDiary}
              alt="그림일기"
              className="result-painting"
            />
          )}
          <div className="result-share">
            <a
              id="kakaotalk-sharing-btn"
              style={{ width: 'fit-content', height: 'fit-content' }}
            >
              <Image
                src="/sigh/kakao.png"
                alt="kakao"
                width={50}
                height={50}
                className="result-kakao-btn"
              />
            </a>
            <Image
              src="/sigh/link.png"
              alt="link"
              width={50}
              height={50}
              className="result-link-btn"
              onClick={copyLinkToClipboard}
            />
          </div>
        </section>

        <section className="result-section result-meme">
          <h3>MAYBE... YOU NEED THIS GIF</h3>
          {sighResult && sighResult.recommendedGif && (
            <Image
              src={sighResult.recommendedGif}
              alt="짤"
              className="result-memeImg"
              width={600}
              height={600}
            />
          )}
        </section>
        <section className="result-section result-sentiment">
          <h3>SENTIMENT</h3>
          {sighResult && <ResultChart sighResult={sighResult} />}
        </section>
        <section className="result-btns">
          <Link href={'/sigh'}>
            <button>RESTART</button>
          </Link>
          <button>SAVE</button>
        </section>
      </main>
      <div className="result-bgText">
        <p>AH-</p>
        <p>WHEW!</p>
      </div>
      <Image src={resultDoodle} alt="doodle" className="result-doodle" />
    </div>
  );
}
