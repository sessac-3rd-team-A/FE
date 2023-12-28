export default function responseInterceptor() {
  // request interceptor test
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    // 리소스, 옵션 분리
    let [resource, options] = args;
    console.log('resource :: ', resource);
    console.log('options :: ', options);

    // 원래 fetch 실행 (응답 가로챌거니까)
    console.log('원래 fetch 실행!!!!');
    const response: Response = await originalFetch(resource, options);
    if (response.status === 401) {
      const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/auth/newToken`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
          },
        },
      );
      if (res2.status === 200 || res2.status === 201) {
        const data = await res2.json();
        const newAccessToken = data.accessToken;
        localStorage.removeItem('accessToken');
        console.log('액세스 삭제 완료');
        localStorage.setItem('accessToken', newAccessToken);
        console.log('액세스 재설정 완료');
        console.log('액세스 바꾸고 재실행!!!');

        const result: Response = await originalFetch(resource, {
          ...options,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
            'Content-Type': 'application/json',
          },
        });
        return result;
      } else {
        // 로그아웃 시켜야함
        return response;
      }
    } else {
      return response;
    }
  };
}
