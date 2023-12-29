import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sigh',
};

import SighPage from '@/containers/Sigh';

export default function Sigh() {
  return (
    <>
      <SighPage />
    </>
  );
}
