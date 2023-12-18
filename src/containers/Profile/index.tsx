'use client';

import EmoCalendar from './EmoCalendar';
import '@/styles/profile/index.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileMenu from './profileMenu';
import { CiCircleChevRight } from 'react-icons/ci';
import DiaryModal from './diaryModal';
import { useEffect, useRef, useState } from 'react';

export default function ProfilePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className="profile-container">
      <section className="info-container">
        <div className="info-left">
          <p className="title">
            {/* {nickname}님, <br /> 오늘의 기분은 어떠신가요? */}
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
            <div
              style={{ cursor: 'pointer' }}
              className="link"
              onClick={() => {
                router.push('/');
              }}
            >
              <Link
                href="/"
                style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
              >
                한숨 쉬러 가기 <CiCircleChevRight />
              </Link>
            </div>
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
        <div className="info-right">
          <EmoCalendar setIsModalOpen={setIsModalOpen} />
        </div>
      </section>
      <ProfileMenu />
      {isModalOpen && <DiaryModal />}
    </div>
  );
}
