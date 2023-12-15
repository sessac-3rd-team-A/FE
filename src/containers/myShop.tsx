import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import axios from 'axios';

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
      timeout: 3000 // 3초 이내 응답
    }) 
    return (
      <>
        <h1>성공함!</h1>
        <ul>
          {res.data.items.map(item => (
            <li key={item.link}>{item.title} : {item.lprice}</li>
          ))}
        </ul>
      </>
    );
  } catch (err) {
    console.log('error >>>>', err);
  }
}

export default async function MyShopContainer() {
  return(
    <>
      <div>myShopContainer!!!</div>
      <SearchResult />
    </>
  );
}