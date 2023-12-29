import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sigh Result',
};

import SighResultPage from '@/containers/Sigh/result';

export default function sighResult() {
  return (
    <>
      <SighResultPage />
    </>
  );
}
