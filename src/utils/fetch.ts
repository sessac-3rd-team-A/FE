export default function responseInterceptor() {
  // request interceptor test
  const { fetch: originalFetch } = window;
  window.fetch = async (...args) => {
    // 리소스, 옵션 분리
    let [resource, options] = args;

    // 원래 fetch 실행 (응답 가로챌거니까)
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
        localStorage.setItem('accessToken', newAccessToken);

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
