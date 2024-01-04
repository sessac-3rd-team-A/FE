'use client';
import { useRecoilState } from 'recoil'; // recoil
import { userState } from '@/utils/state'; // recoil
import { useEffect, useState, useRef } from 'react'; // recoil
import '@/styles/main.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from '@/containers/common/footer';

interface Section {
  text: string;
  id?: number;
}

export default function MainPage() {
  const router = useRouter();
  // const [user, setUser] = useRecoilState(userState); // recoil
  const [loading, setLoading] = useState(false); // recoil
  const [isPage2, setIsPage2] = useState(false);
  const [isFooter, setIsFooter] = useState(false);
  const [wHeight, setWHeight] = useState(1920);
  const [wWidth, setWWidth] = useState(1920);
  const [pageCount, setPageCount] = useState(1); // 1, 2, 3
  // const [wWeight, setWWeight] = useState(window.innerWidth);
  // const [wHeight, setWHeight] = useState(window.innerHeight);

  const containerRef = useRef<HTMLDivElement>(null);
  const setScroll = (y: any) => {
    return window.scrollTo({
      top: y,
      left: 0,
      behavior: 'smooth',
    });
  };
  const handleCard = (isLeft: boolean) => {
    if (isLeft && pageCount > 1) {
      setPageCount(pageCount - 1);
    } else if (!isLeft && pageCount < 3) {
      setPageCount(pageCount + 1);
    }
  };

  const handleScroll = (e: any) => {
    // 2번째 페이지에서 카드 모두 넘겼을 때
    if (pageCount === 3) {
      if (e === 'ArrowDown' || e.deltaY > 0) {
        if (containerRef.current) {
          setScroll(window.innerHeight * 2 + 300);
          setIsPage2(false);
          setIsFooter(true);
        }
      } else if (isFooter && (e === 'ArrowUp' || e.deltaY < 0)) {
        setScroll(window.innerHeight);
        setIsPage2(true);
        setIsFooter(false);
      } else {
        setPageCount(pageCount - 1);
      }
    } else if (isPage2) {
      if (e === 'ArrowDown' || e.deltaY > 0) {
        setPageCount(pageCount + 1);
      } else if (e === 'ArrowUp' || e.deltaY < 0) {
        if (pageCount === 1) {
          setScroll(-window.innerHeight);
          setIsPage2(false);
        } else {
          setPageCount(pageCount - 1);
        }
      }
    } else {
      if (e === 'ArrowDown' || e.deltaY > 0) {
        if (containerRef.current) {
          setScroll(window.innerHeight);
          setIsPage2(true);
        }
      } else if (e === 'ArrowUp' || e.deltaY < 0) {
        setScroll(0);
        setIsPage2(false);
      }
    }
  };

  function navigateStart() {
    // if (pageCount == 3) {
    //   if (user.isLogin) {
    //     router.push('/profile');
    //   } else {
    //     alert('로그인 해주세요');
    //   }
    // } else {
    //   router.push('/sigh');
    // }
    router.push('/sigh');
  }

  useEffect(() => {
    function preventDefaultForScrollKeys(e: KeyboardEvent) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!loading) {
          setLoading(true);
          handleScroll(e.key);
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
        // handleScroll(e.key);
        // return false;
      }
    }

    function preventDefaultWheel(e: WheelEvent) {
      e.preventDefault();
      if (!loading) {
        setLoading(true);
        handleScroll(e);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }

    function preventDefault(e: Event) {
      e.preventDefault();
      if (!loading) {
        setLoading(true);
        handleScroll(e);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }

    // function preventDefaultTouch(e: TouchEvent) {
    //   e.preventDefault();

    //   if (!loading) {
    //     setLoading(true);
    //     const startY = e.touches[0].clientY;
    //     const handleMove = (moveEvent: TouchEvent) => {
    //       const deltaY = moveEvent.touches[0].clientY - startY;

    //       if (deltaY > 0) {
    //         handleScroll('ArrowUp');
    //       } else if (deltaY < 0) {
    //         handleScroll('ArrowDown');
    //       } else {
    //       }
    //       window.removeEventListener('touchmove', handleMove);
    //     };
    //     window.addEventListener('touchmove', handleMove);
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 500);
    //   }
    // }

    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener('wheel', preventDefaultWheel, { passive: false }); // modern desktop
    // window.addEventListener('touchstart', preventDefaultTouch, {
    //   passive: false,
    // }); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);

    return () => {
      window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.removeEventListener('wheel', preventDefaultWheel);
      // window.removeEventListener('touchstart', preventDefaultTouch);
      window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    };
  }, [isFooter, loading, isPage2, pageCount]);

  useEffect(() => {
    setWHeight(window.innerHeight);
    setWWidth(window.innerWidth);
  }, []);

  return (
    <div ref={containerRef} style={{ overflow: 'hidden' }}>
      <div
        className="mainWindContainer"
        style={wHeight <= 768 ? { height: wHeight } : {}}
      >
        <div className="mainWindImg">
          <Image
            src="/main/mainBlow.png"
            priority
            alt="바람"
            fill
            sizes="null"
          />
        </div>
        {/* <img className="mainWindImg" src="/main/mainBlow.png" alt="바람" /> */}
        <img
          className="mainFace mainSmileImg"
          src="/main/main_smile.png"
          alt="행복한얼굴"
        />
        <img className="mainFace mainStar3" src="/main/Star3.png" alt="스타3" />
        <img className="mainFace mainStar4" src="/main/Star4.png" alt="스타4" />
        <img className="mainFace mainStar1" src="/main/Star1.png" alt="스타1" />
        <img
          className="mainFace mainBadImg"
          src="/main/main_bad.png"
          alt="나쁜얼굴"
        />
        <img
          className="mainFace mainSadImg"
          src="/main/main_sad.png"
          alt="슬픈얼굴"
        />
        <img
          className="mainFace mainDieImg"
          src="/main/main_die.png"
          alt="죽은얼굴"
        />
        <p className="mainFace mainTitle">AH-WHEW!</p>
        <div className="mainContent">
          <p className="introLetter">{`Give Me Your Sigh.\nI'll Give You Happiness.`}</p>
        </div>
      </div>

      <div
        className={`mainCardContainer`}
        style={wWidth <= 768 ? { height: wHeight } : {}}
      >
        <div
          className={`mainCardContainer inner`}
          style={
            wWidth <= 768
              ? { height: `calc(${wHeight}px - 11.9791666667vw)` }
              : {}
          }
        >
          <div className={`mobileC`}>
            <div className="introContainer">
              <p className={`main2-intro ${pageCount === 1 ? 'fade-in' : ''}`}>
                {'TELL ME HOW WAS\nYOUR DAY?'}
              </p>
              <p className={`main2-intro ${pageCount === 2 ? 'fade-in' : ''}`}>
                {'WE WANT YOU\nTO FEEL BETTER'}
              </p>
              <p className={`main2-intro ${pageCount === 3 ? 'fade-in' : ''}`}>
                {'WE OFFER\nA MOOD CALENDAR'}
              </p>
              <p className={`main2-intro2 ${pageCount === 1 ? 'fade-in' : ''}`}>
                {
                  '당신의 하루는 어땠나요?\n혹시 고민하는 일이 잘 안풀리나요?\n당신이 느끼는 모든 감정을 아휴에 풀어주세요.'
                }
              </p>
              <p className={`main2-intro2 ${pageCount === 2 ? 'fade-in' : ''}`}>
                {
                  '들려준 당신의 하루로 그림 일기를 그려드려요.\n기분이 좋아지는 밈은 덤입니다.\n기분이 나아지길 빌게요.'
                }
              </p>
              <p className={`main2-intro2 ${pageCount === 3 ? 'fade-in' : ''}`}>
                {
                  '하루 하루의 그림 일기를 저장해드려요.\n당신만의 기분 달력을 완성해 보세요.'
                }
              </p>
              <button onClick={navigateStart} className="main2-start">
                START
              </button>
            </div>
          </div>
          <div className="main2-cardContainer">
            <img
              onClick={() => handleCard(false)}
              className="mobile-arrow"
              src="/main/tArrow.svg"
            />
            <img
              onClick={() => handleCard(true)}
              className="mobile-arrow left"
              src="/main/tArrow.svg"
            />
            <div className={`main2-card card1`}>
              <Image
                alt="imgCard"
                className="imgCard"
                src="/main/mainCard1.png"
                priority
                sizes="null"
                fill
              />
            </div>
            <div
              className={`main2-card card2 ${
                pageCount > 2 ? 'slide-out-tr' : ''
              }`}
            >
              <Image
                alt="imgCard"
                className="imgCard"
                src="/main/mainCard2.png"
                fill
                sizes="null"
              />
            </div>
            <div
              className={`main2-card card3 ${
                pageCount > 1 ? 'slide-out-tr' : ''
              }`}
            >
              <Image
                alt="imgCard"
                className="imgCard"
                src="/main/mainCard3.png"
                fill
                sizes="null"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
