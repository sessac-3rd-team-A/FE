'use client';
import axios from 'axios';
// import { ShopApiRes } from "@/types";
import '@/styles/profile/myShop.scss';
import { useState, useEffect } from 'react';
import ProfileMenu from './profileMenu';

const API = 'https://openapi.naver.com/v1/search/shop.json';
const NAVER_CLIENT_ID = 'zU_PN2dzVWNX6xNUBsQe';
const NAVER_CLIENT_SECRET = 'LWe_w7kUpV';

async function SearchResult() {
  const query = '스트레스';
  const displayNum = 2;
  const url = `${API}?query=${encodeURIComponent(
    query,
  )}&display=${displayNum}&start=1&sort=date`;

  // try {
  //   const res = await axios.get(url, {
  //     headers: {
  //       "X-Naver-Client-Id": NAVER_CLIENT_ID,
  //       "X-Naver-Client-Secret": NAVER_CLIENT_SECRET
  //     },
  //     timeout: 10000
  //   });

  //   return res.data;

  // } catch (err) {
  //   console.log('error >>>>', err);
  // }
}

export default async function MyShopContainer() {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const items = await SearchResult();
  // const itemsResult: ShopApiRes[] = items.items;

  return (
    mounted && (
      <div className="myShop-container">
        <div className="header-temp" />
        <img
          src="/images/profileShop_background.jpg"
          alt="배경 이미지"
          className="myShop-image-background"
        />
        <ul>
          {/* {itemsResult.map(item => (<li key={item.productId}>{item.title} - {item.lprice}</li>))} */}
        </ul>
        <ProfileMenu />
      </div>
    )
  );
}
