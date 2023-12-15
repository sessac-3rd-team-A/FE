import Image from 'next/image';
// import styles from './page.module.css'
import '@/styles/main.scss';

export default function Home() {
  return (
    <div className="mainWindContainer">
      <img className="mainWindImg" src="/mainBlow.png" alt="바람" />
      <img className="mainSmileImg" src="/main_smile.png" alt="행복한얼굴" />
    </div>
  );
}
