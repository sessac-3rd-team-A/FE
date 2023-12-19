'use client';

import EmoCalendar from './EmoCalendar';
import '@/styles/profile/index.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileMenu from './profileMenu';
import { CiCircleChevRight } from 'react-icons/ci';
import DiaryModal from './diaryModal';
import { useEffect, useRef, useState } from 'react';
import PChart from './profileChart';

export default function ProfilePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const backgroundRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(this: Document, ev: MouseEvent): any {
      // 모달 바깥을 클릭하고, 모달이 열려있는 상태일 때 모달을 닫기
      if (
        backgroundRef.current &&
        (backgroundRef.current as HTMLElement).contains(ev.target as Node) &&
        isModalOpen
      ) {
        setIsModalOpen(false);
      }
    }

    // document 클릭 이벤트 리스너 추가
    document.addEventListener('click', handleClickOutside);

    // 컴포넌트가 unmount될 때 리스너 제거
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className="profile-container">
      <section
        ref={backgroundRef}
        className={`info-container ${isModalOpen ? 'modalOn' : ''}`}
      >
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
                <PChart />
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
      <div className={`${isModalOpen ? 'modalOn' : ''}`}>
        <ProfileMenu />
        <section className="whiteGradientBg" />
      </div>
      {isModalOpen && <DiaryModal />}
    </div>
  );
}
