'use client';
import Image from 'next/image';
import '@/styles/sigh/result.scss';
import resultDoodle from '/public/sigh/result_doodle_1.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ResultChart from './resultChart';
import { useEffect, useState } from 'react';
import { SighResultType } from '@/types';

export default async function SighResultPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  console.log(id);
  const bearerToken =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  // const res = await fetch(`http://localhost:8080/api/diary/${id}`, {
  //   method: 'GET',
  //   headers: {
  //     Authorization: bearerToken ? `Bearer ${bearerToken}` : '',
  //     'Content-Type': 'application/json',
  //   },
  // });
  // const sighResult = await res.json();
  const [sighResult, setSighResult] = useState<SighResultType | null>(null);
  const getResultData = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/diary/${id}`, {
        cache: 'no-store',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });

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
  console.log(sighResult);

  useEffect(() => {
    getResultData();
    console.log(sighResult);
  }, [id]);
  console.log(sighResult);

  // 카톡 공유
  //css에서만 실행
  if (typeof window !== 'undefined') {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }

    if (sighResult && window.Kakao && window.Kakao.Share) {
      const kakaoImg = sighResult.pictureDiary;
      window.Kakao.Share.createCustomButton({
        container: '#kakaotalk-sharing-btn',
        templateId: 102205,
        templateArgs: {
          kakaoImg,
        },
      });
    }
  }

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
          <a
            id="kakaotalk-sharing-btn"
            href="javascript:;"
            className="kakao-share"
          >
            <img
              src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
              alt="카카오톡 공유 보내기 버튼"
            />
          </a>
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
