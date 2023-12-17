import EmoCalendar from './EmoCalendar';
import '@/styles/profile/index.scss';
import Link from 'next/link';

export default function ProfilePage() {
  // id 기반으로 nick

  return (
    <section className="profile-container">
      <div className="profile-left">
        <p className="title">
          행복한 쿼카님, <br /> 오늘의 기분은 어떠신가요?
        </p>
        <div className="left-content">
          <div className="count">
            <div>29</div>
            <div>
              <p>THE NUMBER OF</p>
              <p>SIGHS</p>
            </div>
          </div>
          <Link href="/">
            <div className="link">한숨 쉬러 가기</div>
          </Link>
          <div className="ratio">
            {/* graph */}
            <span>monthly</span>
            <div>
              <p>MOOD</p>
              <p>RATIO</p>
            </div>
          </div>
          <div className="graph">
            <div>
              <p>MOOD</p>
              <p>GRAPH</p>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-right">
        <EmoCalendar />
      </div>
    </section>
  );
}
