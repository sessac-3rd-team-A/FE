import Link from 'next/link';
import './test/test.scss';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="TestNavbar">
          <Link href={'/chart'}>차트 홈</Link>
          <Link href={'/chart/test'}>테스트 페이지</Link>
        </div>
        <h1>layout</h1>

        {children}
      </body>
    </html>
  );
}
