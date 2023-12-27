import '@/styles/sigh/index.scss';
import { cookies } from 'next/headers';
import SighTexting from './sightexting';

export default function SighPage() {
  // 쿠키 토큰 값 가져오기
  const nextCookies = cookies();
  const accessToken = nextCookies.get('accessToken')?.value ?? null;
  const refreshToken = nextCookies.get('refreshToken')?.value ?? null;

  console.log('accessToken:', accessToken);
  console.log('refreshToken:', refreshToken);

  return (
    <div className="sigh-container">
      <SighTexting accessToken={accessToken} refreshToken={refreshToken} />
      <div className="sigh-doodles">
        <img
          src="/sigh/sigh_doodle_1.png"
          alt="doodle"
          className="sigh-doodle doodleA"
        />
        <img
          src="/sigh/sigh_doodle_2.png"
          alt="doodle"
          className="sigh-doodle doodleB"
        />
        <img
          src="/sigh/sigh_doodle_3.png"
          alt="doodle"
          className="sigh-doodle doodleC"
        />
        <img
          src="/sigh/sigh_doodle_4.png"
          alt="doodle"
          className="sigh-doodle doodleD"
        />
        <img
          src="/sigh/sigh_doodle_5.png"
          alt="doodle"
          className="sigh-doodle doodleE"
        />
        <img
          src="/sigh/sigh_doodle_6.png"
          alt="doodle"
          className="sigh-doodle doodleF"
        />
        <img
          src="/sigh/sigh_doodle_7.png"
          alt="doodle"
          className="sigh-doodle doodleG"
        />
        <img
          src="/sigh/sigh_doodle_8.png"
          alt="doodle"
          className="sigh-doodle doodleH"
        />
        <img
          src="/sigh/sigh_doodle_9.png"
          alt="doodle"
          className="sigh-doodle doodleI"
        />
        <img
          src="/sigh/sigh_doodle_10.png"
          alt="doodle"
          className="sigh-doodle doodleJ"
        />
      </div>
    </div>
  );
}
