import { useParams } from 'next/navigation';
import EmoCalendar from './EmoCalendar';
import '@/styles/profile/index.scss';
import Link from 'next/link';

export default function ProfilePage() {
  // id 기반으로 nick

  return (
    <section className="profile-container">
      <div className="profile-left">
        <p>
          행복한 쿼카님, <br /> 오늘의 기분은 어떠신가요?
        </p>
        <div className="left-content">
          <div className="count">
            <div>29</div>
            <div>THE NUMBER OF SIGHS</div>
          </div>
          <Link href="/">
            <div className="link">한숨 쉬러 가기</div>
          </Link>
          <div className="ratio">MOOD RATIO</div>
          <div className="graph">MOOD GRAPH</div>
        </div>
      </div>
      <div className="profile-right">
        <EmoCalendar />
      </div>
    </section>
  );
}
