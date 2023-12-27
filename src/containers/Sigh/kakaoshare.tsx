import { useEffect } from 'react';
import Image from 'next/image';

const KakaoShareButton = () => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { Kakao } = window;
      if (!Kakao.isInitialized()) {
        Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
      }

      Kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: '맛이슈 MukBTI 테스트',
          description: '나와 어울리는 음식은?',
          imageUrl: 'https://이미지 url.png',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: '테스트 결과 보러가기',
            link: {
              webUrl: shareUrl,
              mobileWebUrl: shareUrl,
            },
          },
        ],
      });
    }
  }, [shareUrl]);

  return (
    <>
      <div>공유하기</div>
    </>
  );
};

export default KakaoShareButton;
