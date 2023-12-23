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
import { SighResultType } from '@/types';
import { useRecoilState } from 'recoil'; // recoil
import { userState } from '@/utils/state'; // recoil

export default function ProfilePage() {
  const router = useRouter();
  const [modalDate, setModalDate] = useState<string>('');
  // const [emoData, setEmoData] = useState<sighResultType[]>([]);
  const [emoData, setEmoData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const backgroundRef = useRef(null);

  const [user, setUser] = useRecoilState(userState); // recoil
  useEffect(() => {
    console.log(user);
  }, []); // recoil

  const getUserInfo = async () => {
    try {
      const res = await fetch('http://localhost:8080/profile/dashboard', {
        cache: 'no-store',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log('fetch data :: ', data);

      setEmoData(data);
    } catch (error: any) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    getUserInfo();
    // Call the function
  }, []);

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
          <EmoCalendar
            setModalDate={setModalDate}
            setIsModalOpen={setIsModalOpen}
            emoData={emoData}
          />
        </div>
      </div>
      <div className={`${isModalOpen ? 'modalOn' : ''}`}>
        <ProfileMenu />
        <section className="whiteGradientBg" />
      </div>
      {isModalOpen && <DiaryModal emoData={emoData} modalDate={modalDate} />}
    </section>
  );
}
