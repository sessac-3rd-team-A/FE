'use client';
import Image from 'next/image';
import '@/styles/sigh/result.scss';
import resultDoodle from '/public/sigh/result_doodle_1.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ResultChart from './resultChart';
import { useEffect, useState } from 'react';
import { SighResultType } from '@/types';
import Error404 from '../common/error404';
import { useRouter } from 'next/navigation';

export default function SighResultPage() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();

  const [sighResult, setSighResult] = useState<SighResultType | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

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

      setSighResult(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setIsError(true);
    }
  };

  useEffect(() => {
    getResultData();
  }, [id]);

  if (isError) {
    return <Error404 />;
  }

  // 카톡 공유
  if (typeof window !== 'undefined') {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }

    if (sighResult && window.Kakao && window.Kakao.Share) {
      const kakaoImg = sighResult.pictureDiary;
      const pathName = id;
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
        alert('http 환경에서는 제한된 기능입니다!');
        console.error('링크 복사 실패:', err);
      });
  };

  // saveBtn
  const recoilData =
    typeof window !== 'undefined'
      ? localStorage.getItem('recoil-persist')
      : null;

  const saveBtn = () => {
    if (recoilData != null) {
      const parsedData = JSON.parse(recoilData);
      if (parsedData && Object.keys(parsedData).length === 0) {
        router.push('/'); // 메인
      } else {
        router.push('/profile'); // 프로필
      }
    }
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
              <div className="result-kakao-btn">
                <Image src="/sigh/kakao.png" alt="kakao" fill sizes="null" />
              </div>
            </a>
            <div className="result-link-btn" onClick={copyLinkToClipboard}>
              <Image src="/sigh/link.png" alt="link" fill sizes="null" />
            </div>
          </div>
        </section>

        <section className="result-section result-meme">
          <h3>MAYBE... YOU NEED THIS GIF</h3>
          <div className="result-memeImg">
            {sighResult && sighResult.recommendedGif && (
              <Image
                src={sighResult.recommendedGif}
                alt="짤"
                fill
                style={{ borderRadius: '20px' }}
                sizes="null"
              />
            )}
          </div>
        </section>
        <section className="result-section result-sentiment">
          <h3>SENTIMENT</h3>
          {sighResult && <ResultChart sighResult={sighResult} />}
        </section>
        <section className="result-btns">
          <Link href={'/sigh'}>
            <button>RESTART</button>
          </Link>
          <button onClick={saveBtn}>SAVE</button>
        </section>
      </main>
      <div className="result-bgText">
        <p>AH-</p>
        <p>WHEW!</p>
      </div>
      <div className="result-doodle">
        <Image src={resultDoodle} alt="doodle" fill sizes="null" />
      </div>
    </div>
  );
}
