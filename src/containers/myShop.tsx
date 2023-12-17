'use client'
import axios from 'axios';
import { ShopApiRes } from "@/types";

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
    console.log('error >>>>', err);
  }
}

export default async function MyShopContainer() {
  const items = await SearchResult();
  const itemsResult: ShopApiRes[] = items.items;
  // console.log("itemResult >>>> ", itemsResult);
  return(
    <>
      <image src='/profile/myShop_background.jpg'/>
      <ul>
        {itemsResult.map(item => (<li key={item.productId}>{item.title} - {item.lprice}</li>))}
      </ul>
    </>
  );
}