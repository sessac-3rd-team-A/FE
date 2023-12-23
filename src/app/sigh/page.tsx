import SighPage from '@/containers/Sigh';
import { Suspense } from 'react';
import LoadingPage from './loading';

export default function Sigh() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SighPage />
    </Suspense>
  );
}
