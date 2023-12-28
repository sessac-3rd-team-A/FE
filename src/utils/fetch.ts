export default function responseInterceptor() {
  // request interceptor test

  // Client Side
  if (typeof window !== undefined) {
    // 토큰 값 해석해서 만료일 계산
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    const { fetch: originalFetch } = window;
    window.fetch = async (...args) => {
      // 리소스, 옵션 분리
      let [resource, options] = args;
      console.log('resource :: ', resource);
      console.log('options :: ', options);

      if (accessToken && refreshToken) {
        const aBase64Url = accessToken.split('.')[1];
        const aBase64 = aBase64Url.replace('-', '+').replace('_', '/');
        const { exp: aExp } = JSON.parse(window.atob(aBase64));
        const now = Date.now();
        // console.log('시간 비교', aExp, +now.toString().slice(0, 10));

        // 액세스 토큰 재발급 요청 전에 리프레시 만료 전인지 확인

        const isRefreshValid = isRefreshTokenExpired(refreshToken, now);
        if (isRefreshValid) {
          // 리프레시는 살아잇음 -> 액세스만 확인
          // 만료일과 현재 시간 비교

          if (aExp > +now.toString().slice(0, 10)) {
            // 만료
            // 액세스 토큰 재발급 요청
            const refreshRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_SERVER}/auth/newToken`,
              {
                method: 'POST',
                headers: { Authorization: `Bearer ${refreshToken}` },
              },
            );
            if (refreshRes.status === 200 || refreshRes.status === 201) {
              const data = await refreshRes.json();
              const newAccessToken = data.accessToken;
              localStorage.removeItem('accessToken');
              console.log('액세스 삭제 완료');
              localStorage.setItem('accessToken', newAccessToken);
              console.log('액세스 재설정 완료');

              console.log('액세스 바꾸고 재실행!!!');
              const result: Response = await originalFetch(resource, {
                ...options,
                headers: { Authorization: `Bearer ${newAccessToken}` },
              });
              return result;
            } else {
              // 새로운 access token 발급 요청에 대한 응답을 반환
              return refreshRes;
            }
          } else {
            // 만료 안됨 -> 원래 로직
            const originalRes = await originalFetch(resource, options);
            return originalRes;
          }
        } else {
          // 둘다 만료
          const noAuth = new Response('noAuth', {
            status: 1001,
            headers: { 'Content-type': 'application/json' },
          });
          return noAuth;
        }
      } else {
        const noAccessTokenRes = new Response('noAccessToken', {
          status: 1000,
          headers: { 'Content-type': 'application/json' },
        });
        return noAccessTokenRes;
      }
    };
  }
}

const isRefreshTokenExpired = (refreshToken: string, now: number) => {
  // 리프레시는 만료 안됐는지 검증
  const rBase64Url = refreshToken.split('.')[1];
  const rBase64 = rBase64Url.replace('-', '+').replace('_', '/');
  const { exp: rExp } = JSON.parse(window.atob(rBase64));

  return rExp < +now.toString().slice(0, 10) ? false : true;
};
