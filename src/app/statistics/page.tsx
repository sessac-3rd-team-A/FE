import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trend',
};

import TrendPage from '@/containers/Statistics';

export default function Statistics() {
  return <TrendPage></TrendPage>;
}
