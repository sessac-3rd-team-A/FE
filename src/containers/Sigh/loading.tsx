import '@/styles/loading.scss';
// import Image from 'next/image';
export default function SighLoading() {
  return (
    <main className="loading-main">
      <section className="loading-doodles">
        <img
          src="/loading/loading_doodle1.png"
          alt="doodle1"
          className="loading-doodle1"
        />
        <img
          src="/loading/loading_doodle2.png"
          alt="doodle2"
          className="loading-doodle2"
        />
        <img
          src="/loading/loading_doodle3.png"
          alt="doodle3"
          className="loading-doodle3"
        />
      </section>
      <div className="loading-messages">
        <h1 className="message1">이미지를 생성하는 중입니다!</h1>
        <h1 className="message2">조금만 기다려 주세요🙏</h1>
      </div>
    </main>
  );
}
