// 'use client';

import EmoCalendar from './emoCalendar';
import '@/styles/profile/index.scss';
import Link from 'next/link';
import ProfileMenu from './profileMenu';
import { CiCircleChevRight } from 'react-icons/ci';
import DiaryModal from './diaryModal';
// import { useEffect, useRef, useState } from 'react';
import PGraph from './profileGraph';
import PRatio from './profileRatio';
import { ProfileResultType } from '@/types';
import { useRecoilState } from 'recoil'; // recoil
import { userState } from '@/utils/state'; // recoil
import Cookies from 'js-cookie';

export default function ProfilePage() {
  // const router = useRouter();
  // const [modalDate, setModalDate] = useState<string>('');
  // const [emoData, setEmoData] = useState<ProfileResultType | null>(null);

  // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const backgroundRef = useRef(null);

  // recoil -> 닉네임을 설정하기 위한 상태값 추가로 설정
  // const [user, setUser] = useRecoilState(userState);
  // const [nickname, setNickname] = useState('');

  // const getUserInfo = async () => {
  //   console.log('쿠키 액세스 토큰 :: ', Cookies.get('accessToken'));
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_SERVER}/profile/dashboard/calendar`,
  //       {
  //         credentials: 'include',
  //         cache: 'no-store',
  //         method: 'GET',
  //         // headers: {
  //         //   'Content-Type': 'application/json',
  //         //   Authorization: `Bearer ${Cookies.get('accessToken')}`,
  //         // },
  //       },
  //     );

  //     if (!res.ok) {
  //       throw new Error(`HTTP error! Status: ${res.status}`);
  //     }

  //     const data: ProfileResultType = await res.json();
  //     console.log('fetch data :: ', data);

  //     setEmoData(data);
  //   } catch (error: any) {
  //     console.error('Error fetching data:', error.message);
  //   }
  // };

  // // 초기 렌더링 시 데이터 fetching
  // useEffect(() => {
  //   getUserInfo();
  // }, []);

  // 모달창 외부 클릭 시 종료
  // useEffect(() => {
  //   function handleClickOutside(this: Document, ev: MouseEvent): any {
  //     // 모달 바깥을 클릭하고, 모달이 열려있는 상태일 때 모달을 닫기
  //     if (
  //       backgroundRef.current &&
  //       (backgroundRef.current as HTMLElement).contains(ev.target as Node) &&
  //       isModalOpen
  //     ) {
  //       setIsModalOpen(false);
  //     }
  //   }
  //   document.addEventListener('click', handleClickOutside);

  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [isModalOpen]);

  // useEffect(() => {
  //   // setNickname(user.nickname);
  // }, []);

  return (
    <section className="profile-container">
      <div
      // ref={backgroundRef}
      // className={`info-container ${isModalOpen ? 'modalOn' : ''}`}
      >
        <div className="info-left">
          <p className="title">
            {/* {nickname}님, <br /> 오늘의 기분은 어떠신가요? */}
            {/* {nickname && `${nickname}님,`} */}
            {/* {user.nickname} */}
            <br /> 오늘의 기분은 어떠신가요?
          </p>
          <div className="left-content">
            <div className="count">
              {/* <div>{emoData?.calendar?.length}</div> */}
              <div>29</div>
              <div>
                <p>THE NUMBER OF</p>
                <p>SIGHS</p>
              </div>
            </div>
            <div
              style={{ cursor: 'pointer' }}
              className="link"
              // onClick={() => {
              //   // router.push('/sigh');
              // }}
            >
              <Link
                href="/sigh"
                style={{ display: 'flex', alignItems: 'center', gap: '20px' }}
              >
                한숨 쉬러 가기 <CiCircleChevRight />
              </Link>
            </div>
            <PRatio />
            {/* <PGraph /> */}
          </div>
        </div>
        <div className="info-right">
          {/* <EmoCalendar
            setModalDate={setModalDate}
            setIsModalOpen={setIsModalOpen}
            emoData={emoData}
          /> */}
        </div>
      </div>
      {/* <div className={`${isModalOpen ? 'modalOn' : ''}`}> */}
      <ProfileMenu />
      <section className="whiteGradientBg" />
      {/* </div> */}
      {/* {isModalOpen && <DiaryModal emoData={emoData} modalDate={modalDate} />} */}
    </section>
  );
}
