import axios from 'axios';
// import { ShopApiRes } from "@/types";
import '/src/styles/global.scss';
import '@/styles/profile/myShop.scss';
import { useState, useEffect } from 'react';
import ProfileMenu from './profileMenu';
import Image from 'next/image';
import profile_char from '/public/images/profile_char.svg';
import heart_eye from '/public/images/heart_eye.png';

const API = 'https://openapi.naver.com/v1/search/shop.json';
const NAVER_CLIENT_ID = 'zU_PN2dzVWNX6xNUBsQe';
const NAVER_CLIENT_SECRET = 'LWe_w7kUpV';

async function SearchResult() {
  const query = '스트레스';
  const displayNum = 20;
  const url = `${API}?query=${encodeURIComponent(query)}&display=${displayNum}&start=1&sort=date`;

  try {
    const res = await axios.get(url, {
      headers: {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
      },
      timeout: 10000
    });
    return res.data;

  } catch (err) {
    console.error('axios error:', err);
    console.error('response status:', err.response?.status);
    console.error('response data:', err.response?.data);
    throw err;
  }
}

export default async function MyShopContainer() {
  // const [mounted, setMounted] = useState<boolean>(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  const items = await SearchResult();
  const itemsResult = items.items;

  return (
    // mounted && (
      <div className="myShop-container">
        <div className="header-temp" />
        <img
          src="/images/profileShop_background.jpg"
          alt="배경 이미지"
          className="myShop-image-background"
        />
        <div className='myShop-char-container'>
          <Image 
            src={profile_char} 
            alt='캐릭터' 
            className='profile-char'/>
          <Image 
            src={heart_eye}
            alt='하트눈'
            className='char-eye'/>
        </div>
        <div className='myShop-explain-container'>
              <p id='RECOMMAND1'>RECOMMAND</p>
              <p id='RECOMMAND2'>당신의 최근 기분을 분석하여 기분이 좋아지는 아이템을 추천합니다.</p>
            </div>
        <div>
          {itemsResult.map(item => 
            (<div key={item.productId}>{item.title} - {item.lprice}</div>))}
        </div>
        <ProfileMenu />
      </div>
    // )
  );
}
