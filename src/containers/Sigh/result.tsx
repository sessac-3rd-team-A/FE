'use client';

import '@/styles/sigh/result.scss';

export default function SighResultPage() {
  type resultType = {
    painting: string;
    meme: string;
    sentiment: string;
    confidence: {
      negative: number;
      positive: number;
      neutral: number;
    };
  };

  const sighResult: resultType = {
    painting:
      'https://mblogthumb-phinf.pstatic.net/MjAxODAxMThfNzEg/MDAxNTE2MjQ5ODE4MjEy.iLPbjW9BLeAjkI1ppclbNdn5kwzTW585Abkz7Qte7c4g.LntCl6JMg0i88zWyCUpQ_bTtcvQuitpFLL29CXgUl0sg.JPEG.qe4865/23.jpg?type=w800',
    meme: 'https://media1.jjalkey.com/media/1536141519140-6143a3e3c9.gif',
    sentiment: 'negative',
    confidence: {
      negative: 97.326324,
      positive: 0.29289702,
      neutral: 0.29289702,
    },
  };

  console.log(sighResult);

  return (
    <div className="resultContainer">
      <main className="resultMainContainer">
        <section className="resultSection resultPaint">
          <h3>TODAY'S AH-WHEW</h3>
          <img
            src={sighResult.painting}
            alt="그림일기"
            className="sighPainting"
          />
        </section>
        <section className="resultSection resultMeme">
          <h3>MAYBE... YOU NEED THIS GIF</h3>
          <img src={sighResult.meme} alt="짤" className="sighMeme" />
        </section>
        <section className="resultSection resultSentiment">
          <h3>SENTIMENT</h3>
          <article className="resultMemeArticle"></article>
        </section>
        <section className="resultBtns">
          <button>RESTART</button>
          <button>SAVE</button>
        </section>
      </main>
      <div className="resultBgText">
        <p>AH-</p>
        <p>WHEW!</p>
      </div>
      <img
        src="/sigh/result_doodle_1.png"
        alt="doodle"
        className="resultDoodle"
      />
    </div>
  );
}
