/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'media1.jjalkey.com',
      'localhost',
      'example-bucket-seeun.s3.ap-northeast-2.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
