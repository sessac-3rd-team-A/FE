import Link from 'next/link';
import { ShopApiRes, ShoppingApiResponse } from '@/types';
import '/src/styles/global.scss';
import '@/styles/profile/myShop.scss';
import ProfileMenu from './profileMenu';
import Image from 'next/image';
import profile_char from '/public/images/profile_char.svg';
import heart_eye from '/public/images/heart_eye.png';
import Cookies from 'js-cookie';
import myShopBack from '/public/images/myShopBack.svg';

const API = 'https://openapi.naver.com/v1/search/shop.json';
const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET;

// async function getUserInfo() {
//   try {
//     const bearerToken = Cookies.get('accessToken');
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}`, {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${bearerToken}`,
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await res;
//     console.log('data>>>>>>>>>>>>>>>>>>>',data);
//     return data;
//   } catch (err) {
//     throw new Error(`HTTP error! Status: ${err}`);
//   }
// }


async function SearchResult(): Promise<ShoppingApiResponse> {
  const query = '몰랑이 인형';
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

export default async function MyShopPage(): Promise<JSX.Element> {
  // await getUserInfo();
  
  const item: ShoppingApiResponse  = await SearchResult();
  const itemsResult: ShopApiRes[] = item.items;


  return (
    <div className="myShop-container">
      <div className="header-temp" />
      <Image
        src={myShopBack}
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
            {[...Array(4)].map((_, innerIndex) => {
              const productIndex = index * 4 + innerIndex;
              const product = itemsResult[productIndex];
              return product?.title ? (
                <Link
                  href={product.link}
                  key={`${product.productId}-${innerIndex}`}
                >
                  <div className="product-detail">
                    <img src={product.image} className="product-image" />
                    <div className="product-detail-explain">
                      <div className="product-item-name">
                        <span>상품명</span>
                        <br />{' '}
                        {product.title
                          .replace(/<b>/g, '')
                          .replace(/<\/b>/g, '')}
                      </div>
                      <br />
                      <span>가격</span> {product.lprice}
                    </div>
                  </div>
                </Link>
              ) : null;
            })}
          </div>
        ))}
      </div>
      <ProfileMenu />
    </div>
  );
}
