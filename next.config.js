const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/naver/:path*',
        destination: 'https://openapi.naver.com/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media1.jjalkey.com',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'example-bucket-seeun.s3.ap-northeast-2.amazonaws.com',
      },
    ],
  },
  output: 'standalone', // 이 줄을 추가하여 두 설정을 합침
};

module.exports = nextConfig;
