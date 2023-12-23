'use client';
import Image from 'next/image';
import '@/styles/sigh/result.scss';
import resultDoodle from '/public/sigh/result_doodle_1.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ResultChart from './resultChart';

async function resultFetchData() {
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  console.log(id);
  const res = await fetch(`http://localhost:8080/api/diary/${id}`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data;
}

export default async function SighResultPage() {
  const sighResult = await resultFetchData();
  console.log(sighResult);

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
        </section>

        <section className="result-section result-meme">
          <h3>MAYBE... YOU NEED THIS GIF</h3>
          {sighResult && sighResult.recommendedGif && (
            <img
              src={sighResult.recommendedGif}
              alt="짤"
              className="result-memeImg"
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
