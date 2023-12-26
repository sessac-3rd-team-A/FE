import Cookies from 'js-cookie';

export async function httpRequest(method, url, body) {
  try {
    const res = await fetch(url, {
      method: method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    // 응답 성공했을 때
    if (res.status === 200 || res.status === 201) {
      const data = await res.json();
      return data;
    }

    // access 토큰이 없거나 하는 경우로 응답 실패했을 때
    let refreshToken = Cookies.get('refreshToken');

    // if (!refreshToken) {
    //   console.log('서버 사이드 쿠키!!!');
    //   const cookieStore = cookies();
    //   refreshToken = cookieStore.get('refreshToken');
    // }

    console.log('http 요청 중 refresh token :: ', refreshToken);

    if (res.status === 401 && refreshToken) {
      const res2 = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER}/auth/newToken`,
        {
          method: 'POST',
          credentials: 'include',
        },
      );

      console.log('res2 :: ', await res2.json());

      if (res2.ok) {
        const data = await res2.json();
        Cookies.remove('accessToken');
        Cookies.set('accessToken', data.accessToken, { expires: 1 });
        return httpRequest(method, url, body);
      }
    }
  } catch (error) {
    console.error('Error during HTTP request:', error.message);
    // Handle the error as needed (logging, notifying the user, etc.)
    throw error; // Re-throw the error to propagate it to the caller
  }
}
