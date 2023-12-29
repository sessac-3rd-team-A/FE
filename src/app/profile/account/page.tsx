import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Account Setting',
};

import MySettingPage from '@/containers/Account';

export default function MySetting() {
  return (
    <>
      <MySettingPage />
    </>
  );
}
