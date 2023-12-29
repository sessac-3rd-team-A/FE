/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
