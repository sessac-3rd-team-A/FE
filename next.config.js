const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'media1.jjalkey.com',
      'localhost',
      'example-bucket-seeun.s3.ap-northeast-2.amazonaws.com',
    ],
  },
  output: 'standalone', // 이 줄을 추가하여 두 설정을 합침
};

module.exports = nextConfig;
