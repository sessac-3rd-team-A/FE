'use client'
import Link from 'next/link';
import { ShopApiRes, ShoppingApiResponse, TokenType } from '@/types';
import '/src/styles/global.scss';
import '@/styles/profile/myShop.scss';
import ProfileMenu from './profileMenu';
import Image from 'next/image';
import profile_char from '/public/images/profile_char.svg';
import heart_eye from '/public/images/heart_eye.png';
import myShopBack from '/public/images/profileShop_background.jpg';
import { useEffect, useState } from 'react';

const API = 'https://openapi.naver.com/v1/search/shop.json';
// const API = '/v1/search/shop.json';
const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_API_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_API_CLIENT_SECRET;

export default function MyShopPage():JSX.Element {
  const [accessToken, setAccessToken] = useState('');
  const [item, setItems] = useState<ShoppingApiResponse>();
  const [itemsResult, setItemsResult] = useState<ShopApiRes[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setAccessToken(localStorage.getItem('accessToken') || '');
        const user = await getUserInfo(accessToken);
        console.log('user >>>', user);
  
        const result = await SearchResult();
        setItems(result);
        setItemsResult(result.items || []);
        console.log('item >>>', item);
      } catch (error) {
        console.error('데이터를 불러오는 중 에러 발생:', error);
      }
    };
  
    fetchData();
  }, [accessToken]);
  

  async function getUserInfo(accessToken: string) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/profile/my-shop`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      throw new Error(`HTTP error! Status: ${err}`);
    }
  }
  
  async function SearchResult(): Promise<ShoppingApiResponse> {
    const query = '인형';
    const displayNum = 20;
    const url = `${API}?query=${encodeURIComponent(
      query,
    )}&display=${displayNum}&start=1&sort=date`;
      console.log('완성된 url >>>>', url);
    try {
      const headers = new Headers();
      headers.append('X-Naver-Client-Id', NAVER_CLIENT_ID || '');
      headers.append('X-Naver-Client-Secret', NAVER_CLIENT_SECRET || '');

      // console.log('header까진 됨!!!!!!!!!!');
      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      console.log('naver res >>>> ', res);
      return res.json();
    } catch (err) {
      console.error('fetch error:', err);
      throw err;
    }
  }

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
        {Array.isArray(itemsResult) && itemsResult.map((item, index) => (
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
