import { Metadata } from 'next';
import '../../public/fonts/styles.css';
import '@/styles/global.scss';
import Header from '@/containers/common/header';
import RecoilRootProvider from '@/utils/recoilRootProvider';
import Script from 'next/script';

export const metadata: Metadata = {
  title: {
    absolute: '',
    default: 'Ah-whew',
    template: 'Ah-whew | %s',
  },
  description: 'Generated by Next.js',
  icons: {
    icon: '/logo.svg',
  },
};

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <link rel="icon" href="/logo.svg" />
      <body>
        {/* 헤더 푸터 커스텀 해야함 */}
        <main>
          <RecoilRootProvider>
            <Header />
            {children}
          </RecoilRootProvider>
        </main>
      </body>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`}
      />
    </html>
  );
}
