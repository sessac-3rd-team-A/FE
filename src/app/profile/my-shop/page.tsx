import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My shop',
};

import MyShopPage from '@/containers/Myshop';

export default function MyShop() {
  return (
    <>
      <MyShopPage />
    </>
  );
}
