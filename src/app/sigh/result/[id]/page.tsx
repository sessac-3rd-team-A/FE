import SighResultPage from '@/containers/Sigh/result';
import { Suspense } from 'react';
import LoadingPage from './loading';

export default function sighResult() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SighResultPage />
    </Suspense>
  );
}
