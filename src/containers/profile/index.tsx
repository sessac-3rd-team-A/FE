'use client';

import EmoCalendar from './emoCalendar';
import '@/styles/profile/index.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProfileMenu from './profileMenu';
import { CiCircleChevRight } from 'react-icons/ci';
import DiaryModal from './diaryModal';
import { useEffect, useRef, useState } from 'react';
import PGraph from './profileGraph';
import PRatio from './profileRatio';

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
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <section className="profile-container">
      <div
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
            <PRatio />
            <PGraph />
          </div>
        </div>
        <div className="info-right">
          <EmoCalendar setIsModalOpen={setIsModalOpen} />
        </div>
      </div>
      <div className={`${isModalOpen ? 'modalOn' : ''}`}>
        <ProfileMenu />
        <section className="whiteGradientBg" />
      </div>
      {isModalOpen && <DiaryModal />}
    </section>
  );
}
