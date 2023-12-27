import '@/styles/loading.scss';
// import Image from 'next/image';
export default function Loading() {
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
      <h1>LOADING...</h1>
    </main>
  );
}
