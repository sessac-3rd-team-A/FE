import { cookies } from 'next/headers';

export const refreshAccess = async () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER}/auth/newToken`,
    {
      cache: 'no-store',
      credentials: 'include',
      method: 'POST',
      headers: {
        Cookie: `accessToken=${accessToken.value}; refreshToken=${refreshToken.value}`,
      },
    },
  );
  console.log('refresh raw response :: ', res);
  if (res.status === 200) {
    const data = await res.json();
    // 새로운 토큰을 사용하여 추가 작업 수행
    console.log('새로운 토큰 갱신 완료:', data);
    return data.accessToken;
  } else {
    // 토큰 갱신 실패 처리
    console.error('토큰 갱신 실패:', res.status);
  }
};
