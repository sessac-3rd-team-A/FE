/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/naver/:path*',
        destination: 'https://openapi.naver.com/:path*',
      }
    ]
  },
  images: {
    domains: [
      'media1.jjalkey.com',
      'localhost',
      'example-bucket-seeun.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
