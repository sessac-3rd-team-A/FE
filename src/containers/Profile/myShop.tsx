import Link from 'next/link';
import { ShopApiRes } from '@/types';
import '/src/styles/global.scss';
import '@/styles/profile/myShop.scss';
import ProfileMenu from './profileMenu';
import Image from 'next/image';
import profile_char from '/public/images/profile_char.svg';
import heart_eye from '/public/images/heart_eye.png';

const API = 'https://openapi.naver.com/v1/search/shop.json';
const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET;

async function SearchResult(): Promise<any> {
  const query = '20대 여자 스트레스';
  const displayNum = 20;
  const url = `${API}?query=${encodeURIComponent(
    query,
  )}&display=${displayNum}&start=1&sort=date`;

  try {
    const headers = new Headers();
    headers.append('X-Naver-Client-Id', NAVER_CLIENT_ID || '');
    headers.append('X-Naver-Client-Secret', NAVER_CLIENT_SECRET || '');

    const res = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    return res.json();
  } catch (err) {
    console.error('fetch error:', err);
    throw err;
  }
}

export default async function MyShopPage() {
  const items = await SearchResult();
  const itemsResult: ShopApiRes[] = items.items;

  return (
    <div className="myShop-container">
      <div className="header-temp" />
      <img
        src="/images/profileShop_background.jpg"
        alt="배경 이미지"
        className="myShop-image-background"
      />
      <div className="myShop-char-container">
        <Image src={profile_char} alt="캐릭터" className="profile-char" />
        <Image src={heart_eye} alt="하트눈" className="char-eye" />
      </div>
      <div className="myShop-explain-container">
        <p id="RECOMMAND1">RECOMMAND</p>
        <p id="RECOMMAND2">
          당신의 최근 기분을 분석하여 기분이 좋아지는 아이템을 추천합니다.
        </p>
      </div>
      <div className="product-container">
        {itemsResult.map((item, index) => (
          <div className="product-detail-container" key={item.productId}>
            {[...Array(4)].map(
              (_, innerIndex) =>
                itemsResult[index * 4 + innerIndex]?.title && (
                  <Link href={itemsResult[index * 4 + innerIndex]?.link}>
                    <div className="product-detail" key={innerIndex}>
                      <img
                        src={itemsResult[index * 4 + innerIndex]?.image}
                        className="product-image"
                      />
                      타이틀: {itemsResult[index * 4 + innerIndex]?.title}
                      <br />
                      가격: {itemsResult[index * 4 + innerIndex]?.lprice}
                    </div>
                  </Link>
                ),
            )}
          </div>
        ))}
      </div>
      <ProfileMenu />
    </div>
  );
}
